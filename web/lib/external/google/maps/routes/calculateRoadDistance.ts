import { getGoogleMapsApiKey } from "../config";
import {
  geocodeLocation,
  type GeocodedLocation,
} from "../geocoding/geocodeLocation";

interface GoogleRoutesResponse {
  routes?: Array<{
    distanceMeters?: number;
  }>;
}

interface GoogleLatLng {
  latitude: number;
  longitude: number;
}

export interface RoadDistanceResult {
  distanceKm: number;
  origin: GeocodedLocation;
  destination: GeocodedLocation;
}

const GOOGLE_ROUTES_URL =
  "https://routes.googleapis.com/directions/v2:computeRoutes";

function isValidDistance(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

function toGoogleLatLng(location: GeocodedLocation): GoogleLatLng {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export async function calculateRoadDistance(
  origin: string,
  destination: string
): Promise<RoadDistanceResult> {
  const normalizedOrigin = origin.trim();
  const normalizedDestination = destination.trim();

  if (!normalizedOrigin) {
    throw new Error("Origin is required.");
  }

  if (!normalizedDestination) {
    throw new Error("Destination is required.");
  }

  const [originCoordinates, destinationCoordinates] = await Promise.all([
    geocodeLocation(normalizedOrigin),
    geocodeLocation(normalizedDestination),
  ]);

  if (process.env.NODE_ENV === "development") {
    console.info("Road distance geocoding:", {
      origin: {
        input: normalizedOrigin,
        coordinates: originCoordinates,
      },
      destination: {
        input: normalizedDestination,
        coordinates: destinationCoordinates,
      },
    });
  }

  const apiKey = getGoogleMapsApiKey();

  const response = await fetch(GOOGLE_ROUTES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: {
        location: {
          latLng: toGoogleLatLng(originCoordinates),
        },
      },
      destination: {
        location: {
          latLng: toGoogleLatLng(destinationCoordinates),
        },
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      computeAlternativeRoutes: false,
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
      units: "METRIC",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();

    throw new Error(
      `Google Routes API request failed with status ${response.status}: ${errorBody}`
    );
  }

  const data = (await response.json()) as GoogleRoutesResponse;

  if (process.env.NODE_ENV === "development") {
    console.info("Google Routes response:", data);
  }

  const distanceMeters = data.routes?.[0]?.distanceMeters;

  if (!isValidDistance(distanceMeters)) {
    throw new Error(
      `No road route was found between "${normalizedOrigin}" and "${normalizedDestination}".`
    );
  }

  return {
    distanceKm: distanceMeters / 1000,
    origin: originCoordinates,
    destination: destinationCoordinates,
  };
}