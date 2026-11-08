import type { Money } from "./cargo";

/**
 * Types of cargo handling operations.
 */
export type HandlingType =
  | "loading"
  | "unloading"
  | "packing"
  | "unpacking"
  | "palletizing"
  | "storage"
  | "other";

/**
 * Individual handling charge.
 */
export interface HandlingCharge {
  /**
   * Type of handling operation.
   */
  type: HandlingType;

  /**
   * Quantity involved in the operation.
   */
  quantity?: number;

  /**
   * Unit price, when applicable.
   */
  unitPrice?: Money;

  /**
   * Total charge for this operation.
   */
  amount?: Money;

  /**
   * Optional description.
   */
  description?: string;
}

/**
 * Handling information for a shipment.
 */
export interface Handling {
  /**
   * Indicates whether handling charges/operations exist.
   */
  required: boolean;

  /**
   * Handling operations associated with the shipment.
   */
  charges?: HandlingCharge[];

  /**
   * Optional general handling notes.
   */
  notes?: string;
}