/**
 * Supported transportation modes.
 *
 * The model is intentionally limited to the three modes
 * defined for the MVP.
 */
export type TransportMode = "air" | "road" | "maritime";

/**
 * Geographic scope of the shipment.
 */
export type TransportScope = "national" | "international";

/**
 * Country represented by an ISO 3166-1 alpha-2 code.
 *
 * Examples:
 * BR, US, JP, ES
 */
export type CountryCode = string;

/**
 * Transport location.
 *
 * Address details remain optional because the calculation
 * may be performed before the complete address is known.
 */
export interface TransportLocation {
  country: CountryCode;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  address?: string;
}

/**
 * Main transport definition.
 */
export interface Transport {
  mode: TransportMode;
  scope: TransportScope;

  origin: TransportLocation;
  destination: TransportLocation;

  /**
   * Optional distance supplied by the user or calculated
   * by an external routing/geographic service.
   */
  distanceKm?: number;

  /**
   * Optional route/reference information.
   */
  reference?: string;

  /**
   * Optional operational notes.
   */
  notes?: string;
}