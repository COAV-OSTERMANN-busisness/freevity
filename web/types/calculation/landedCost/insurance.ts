import type { Money } from "./cargo";

/**
 * Insurance calculation basis.
 */
export type InsuranceBasis =
  | "declaredValue"
  | "cargoValue"
  | "shipmentValue";

/**
 * Insurance information associated with a shipment.
 */
export interface Insurance {
  /**
   * Indicates whether insurance is requested.
   */
  enabled: boolean;

  /**
   * Value used as the insurance calculation basis.
   *
   * Optional because insurance may not be requested.
   */
  insuredValue?: Money;

  /**
   * Basis used to determine the insured value.
   */
  basis?: InsuranceBasis;

  /**
   * Insurance rate as a percentage.
   *
   * Example:
   * 1.5 means 1.5%.
   */
  ratePercent?: number;

  /**
   * Calculated or externally provided insurance amount.
   */
  amount?: Money;

  /**
   * Optional policy/reference identifier.
   */
  policyReference?: string;
}