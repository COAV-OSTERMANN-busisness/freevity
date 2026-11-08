
import type {
  FreightMoney,
  FreightTariff,
} from "./freightTariff";

export interface RoadFreightInput {
  actualWeight: number;
  volume: number;
  quantity: number;
  tariff: FreightTariff;
}

export interface RoadFreightResult {
  baseFreight: FreightMoney;
  cubedWeightKg: number;
  chargeableWeightKg: number;
}

export interface RoadRegulatoryFloorInput {
  distanceKm: number;
  displacementCoefficient: number;
  loadUnloadCoefficient: number;
  currency: string;
}

export interface RoadRegulatoryFloorResult {
  amount: FreightMoney;
}
