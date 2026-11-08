import type { Money } from "./cargo";

/**
 * Additional cost categories that may participate
 * in a logistics calculation.
 */
export type OtherCostType =
  | "tax"
  | "duty"
  | "fee"
  | "surcharge"
  | "documentation"
  | "storage"
  | "inspection"
  | "terminal"
  | "security"
  | "other";

/**
 * Individual additional cost.
 */
export interface OtherCost {
  /**
   * Cost category.
   */
  type: OtherCostType;

  /**
   * Human-readable description of the cost.
   */
  description?: string;

  /**
   * Cost amount.
   */
  amount: Money;

  /**
   * Optional reference or document identifier.
   */
  reference?: string;
}

/**
 * Collection of additional costs associated
 * with a calculation.
 */
export interface OtherCosts {
  /**
   * Additional costs applied to the calculation.
   */
  items?: OtherCost[];

  /**
   * Optional general notes.
   */
  notes?: string;
}