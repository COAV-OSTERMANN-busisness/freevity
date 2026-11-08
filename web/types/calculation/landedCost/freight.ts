import type { Money } from "./cargo";
import type { TransportMode } from "./transport";

/**
 * Freight payment responsibility.
 *
 * Indicates who is responsible for paying the freight.
 */
export type FreightPayer = "shipper" | "consignee" | "thirdParty";

/**
 * Freight charge basis.
 *
 * Different modes may use different commercial bases.
 */
export type FreightBasis =
  | "weight"
  | "volume"
  | "chargeableWeight"
  | "unit"
  | "flat";
  
/**
 * Freight information.
 */
export interface Freight {
  /**
   * Transportation mode associated with the freight.
   */
  mode: TransportMode;

  /**
   * Commercial basis used for the freight charge.
   */
  basis: FreightBasis;

  /**
   * Amount charged for the freight.
   *
   * Optional because the calculation engine may calculate
   * the freight instead of receiving a predefined amount.
   */
  amount?: Money;

  /**
   * Party responsible for the freight payment.
   */
  payer?: FreightPayer;

  /**
   * Optional minimum freight charge.
   */
  minimumCharge?: Money;

  /**
   * Optional additional freight charges.
   */
  additionalCharges?: Money[];

  /**
   * Optional carrier quotation/reference.
   */
  reference?: string;
}