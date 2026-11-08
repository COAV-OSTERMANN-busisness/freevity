export type FreightTariffBasis =
  | "weight"
  | "volume"
  | "chargeableWeight"
  | "unit"
  | "flat";

export interface FreightMoney {
  amount: number;
  currency: string;
}

export interface FreightTariff {
  basis: FreightTariffBasis;
  rate: FreightMoney;
  minimumCharge?: FreightMoney;
}
