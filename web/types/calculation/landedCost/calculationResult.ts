import type { Money } from "./cargo";

/**
 * Breakdown of the calculated logistics costs.
 *
 * Individual components remain optional because
 * not every calculation requires every cost category.
 */
export interface CalculationBreakdown {
  /**
   * Cargo-related cost.
   */
  cargo?: Money;

  /**
   * Main freight cost.
   */
  freight?: Money;

  /**
   * Insurance cost.
   */
  insurance?: Money;

  /**
   * Customs-related costs.
   */
  customs?: Money;

  /**
   * Handling costs.
   */
  handling?: Money;

  /**
   * Local transportation costs.
   */
  localTransport?: Money;

  /**
   * Other additional costs.
   */
  otherCosts?: Money;
}

/**
 * Planning indicator for the reliability of the estimation.
 *
 * This is not an official customs, tax, legal,
 * carrier, or guaranteed landed-cost classification.
 */
export type RealityScore = "LOW" | "MEDIUM" | "HIGH";

/**
 * Final result produced by the landed cost calculation engine.
 *
 * The result contains both the detailed cost breakdown
 * and the derived metrics required by the application.
 */
export interface CalculationResult {
  /**
   * Currency used for the calculated monetary values.
   */
  currency: string;

  /**
   * Individual cost components used in the calculation.
   */
  breakdown: CalculationBreakdown;

  /**
   * Total landed cost.
   */
  totalLandedCost: Money;

  /**
   * Landed cost per kilogram.
   */
  costPerKg: Money;

  /**
   * Landed cost per cargo unit.
   */
  costPerUnit: Money;

  /**
   * Logistics cost expressed as a percentage.
   */
  logisticsPercentage: number;

  /**
   * Planning indicator representing the estimation reliability.
   */
  realityScore: RealityScore;

  /**
   * Timestamp indicating when the calculation was performed.
   */
  calculatedAt?: string;

  /**
   * Optional calculation/reference identifier.
   */
  reference?: string;
}
