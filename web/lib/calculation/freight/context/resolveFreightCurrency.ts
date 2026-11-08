import type { FreightTransportScope } from "@/types/calculation/freight";

const NATIONAL_CURRENCY_BY_COUNTRY: Readonly<Record<string, string>> = {
  BR: "BRL",
  JP: "JPY",

  US: "USD",

  AT: "EUR",
  BE: "EUR",
  CY: "EUR",
  DE: "EUR",
  EE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  HR: "EUR",
  IE: "EUR",
  IT: "EUR",
  LT: "EUR",
  LU: "EUR",
  LV: "EUR",
  MT: "EUR",
  NL: "EUR",
  PT: "EUR",
  SI: "EUR",
  SK: "EUR",
};

function normalizeCountryCode(countryCode: string): string {
  const normalizedCountryCode = countryCode.trim().toUpperCase();

  if (!normalizedCountryCode) {
    throw new Error("Country code is required.");
  }

  return normalizedCountryCode;
}

export function resolveFreightCurrency(
  scope: FreightTransportScope,
  originCountry: string
): string {
  if (scope === "international") {
    return "USD";
  }

  const normalizedOriginCountry = normalizeCountryCode(originCountry);
  const currency = NATIONAL_CURRENCY_BY_COUNTRY[normalizedOriginCountry];

  if (!currency) {
    throw new Error(
      `National freight simulation is not supported for country "${normalizedOriginCountry}".`
    );
  }

  return currency;
}