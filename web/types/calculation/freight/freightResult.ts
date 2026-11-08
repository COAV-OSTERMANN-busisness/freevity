
import type { AdditionalFreightCharge } from "./additionalFreightCharge";
import type {
  FreightMoney,
  FreightTariffBasis,
} from "./freightTariff";
import type {
  FreightTransportMode,
  FreightTransportScope,
} from "./freightCalculationInput";

export interface FreightResult {
  scope: FreightTransportScope;
  mode: FreightTransportMode;

  currency: string;

  baseFreight: FreightMoney;
  additionalCharges: AdditionalFreightCharge[];
  totalFreight: FreightMoney;

  actualWeight?: number;
  volumetricWeight?: number;
  cubedWeightKg?: number;
  chargeableWeight?: number;
  volume?: number;
  stowageFactor?: number;

  tariffBasis: FreightTariffBasis;
}
