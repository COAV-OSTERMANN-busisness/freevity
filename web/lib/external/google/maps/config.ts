const GOOGLE_MAPS_API_KEY_ENV = "GOOGLE_MAPS_API_KEY";

export function getGoogleMapsApiKey(): string {
  const apiKey = process.env[GOOGLE_MAPS_API_KEY_ENV];

  if (!apiKey) {
    throw new Error(
      `${GOOGLE_MAPS_API_KEY_ENV} is not configured.`
    );
  }

  return apiKey;
}