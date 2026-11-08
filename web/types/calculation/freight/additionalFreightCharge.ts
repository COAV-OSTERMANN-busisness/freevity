import type { FreightMoney } from "./freightTariff";

export interface AdditionalFreightCharge {
  id: string;
  label: string;
  amount: FreightMoney;
}
