import type { FreightTransportScope } from "@/types/calculation/freight";

function normalizeCountryCode(countryCode: string): string {
  const normalizedCountryCode = countryCode.trim().toUpperCase();

  if (!normalizedCountryCode) {
    throw new Error("Country code is required.");
  }

  return normalizedCountryCode;
}

export function resolveFreightScope(
  originCountry: string,
  destinationCountry: string
): FreightTransportScope {
  const normalizedOriginCountry = normalizeCountryCode(originCountry);
  const normalizedDestinationCountry = normalizeCountryCode(destinationCountry);

  return normalizedOriginCountry === normalizedDestinationCountry
    ? "national"
    : "international";
}