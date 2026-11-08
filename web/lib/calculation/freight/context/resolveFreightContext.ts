import type { FreightTransportScope } from "@/types/calculation/freight";

import { resolveFreightCurrency } from "./resolveFreightCurrency";
import { resolveFreightScope } from "./resolveFreightScope";

export interface FreightContext {
  scope: FreightTransportScope;
  currency: string;
  originCountry: string;
  destinationCountry: string;
}

function normalizeCountryCode(countryCode: string): string {
  return countryCode.trim().toUpperCase();
}

export function resolveFreightContext(
  originCountry: string,
  destinationCountry: string
): FreightContext {
  const normalizedOriginCountry = normalizeCountryCode(originCountry);
  const normalizedDestinationCountry =
    normalizeCountryCode(destinationCountry);

  const scope = resolveFreightScope(
    normalizedOriginCountry,
    normalizedDestinationCountry
  );

  const currency = resolveFreightCurrency(
    scope,
    normalizedOriginCountry
  );

  return {
    scope,
    currency,
    originCountry: normalizedOriginCountry,
    destinationCountry: normalizedDestinationCountry,
  };
}