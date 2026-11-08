/**
 * Cargo domain model.
 *
 * Represents the physical and commercial characteristics
 * of a shipment independently from the transport mode.
 */

/**
 * ISO 4217 currency code.
 *
 * Examples:
 * BRL, USD, EUR, JPY
 */
export type CurrencyCode = string;

/**
 * Supported weight units.
 */
export type WeightUnit = "g" | "kg" | "lb";

/**
 * Supported dimension units.
 */
export type DimensionUnit = "mm" | "cm" | "m" | "in" | "ft";

/**
 * Monetary value.
 */
export interface Money {
  amount: number;
  currency: CurrencyCode;
}

/**
 * Weight measurement.
 */
export interface Weight {
  value: number;
  unit: WeightUnit;
}

/**
 * Physical dimensions of a cargo package.
 *
 * Cubic volume must be derived from these dimensions.
 * A duplicated "volume" field is intentionally avoided.
 */
export interface CargoDimensions {
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}

/**
 * Package/containerization information.
 */
export interface CargoPackage {
  quantity: number;

  /**
   * Package type.
   *
   * Examples:
   * box, pallet, crate, drum, bag, container, other
   */
  type: string;

  dimensions?: CargoDimensions;

  /**
   * Weight of the package(s), when known.
   */
  weight?: Weight;

  /**
   * Optional textual identification.
   */
  description?: string;
}

/**
 * Individual cargo item.
 *
 * Represents the goods themselves, not the transportation service.
 */
export interface CargoItem {
  /**
   * Description of the merchandise.
   */
  description: string;

  /**
   * Number of units/items.
   */
  quantity: number;

  /**
   * Weight of this item or item group, when available.
   */
  weight?: Weight;

  /**
   * Commercial/customs declared value for this item.
   */
  declaredValue?: Money;

  /**
   * Optional product identifier.
   */
  sku?: string;

  /**
   * Optional HS / Harmonized System code.
   */
  hsCode?: string;

  /**
   * Optional package information associated with the item.
   */
  packages?: CargoPackage[];
}

/**
 * Cargo aggregate.
 */
export interface Cargo {
  /**
   * One or more merchandise items.
   */
  items: CargoItem[];

  /**
   * Total cargo weight.
   *
   * Required because weight is a fundamental input
   * for logistics calculations.
   */
  totalWeight: Weight;

  /**
   * Total declared value of the cargo.
   */
  declaredValue: Money;

  /**
   * Optional general cargo description.
   */
  description?: string;

  /**
   * Optional shipment-level packaging information.
   */
  packages?: CargoPackage[];

  /**
   * Optional operational notes.
   */
  notes?: string;
}