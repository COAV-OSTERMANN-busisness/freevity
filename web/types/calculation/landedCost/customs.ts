import type { Money } from "./cargo";

/**
 * Incoterms 2020.
 *
 * The complete set of 11 ICC Incoterms is represented here.
 */
export type Incoterm =
  | "EXW"
  | "FCA"
  | "CPT"
  | "CIP"
  | "DAP"
  | "DPU"
  | "DDP"
  | "FAS"
  | "FOB"
  | "CFR"
  | "CIF";

/**
 * Customs procedure.
 *
 * This remains intentionally generic so the model can support
 * different national customs systems.
 */
export type CustomsProcedure =
  | "import"
  | "export"
  | "transit"
  | "other";

/**
 * Customs information.
 *
 * All fields are optional because this model must also support
 * national shipments and international shipments at different
 * stages of completion.
 */
export interface Customs {
  /**
   * Indicates whether customs processing is involved.
   */
  required: boolean;

  /**
   * Customs procedure when applicable.
   */
  procedure?: CustomsProcedure;

  /**
   * Incoterm used for an international commercial transaction.
   */
  incoterm?: Incoterm;

  /**
   * Declared customs value.
   */
  declaredValue?: Money;

  /**
   * Customs/tariff classification.
   *
   * Examples include HS code or a country-specific equivalent.
   */
  tariffCode?: string;

  /**
   * Optional country of origin of the goods.
   */
  originCountry?: string;

  /**
   * Optional destination country.
   */
  destinationCountry?: string;

  /**
   * Optional customs documentation/reference.
   */
  documentReference?: string;

  /**
   * Optional customs duties.
   */
  duties?: Money;

  /**
   * Optional customs taxes.
   */
  taxes?: Money;

  /**
   * Optional customs-related notes.
   */
  notes?: string;
}