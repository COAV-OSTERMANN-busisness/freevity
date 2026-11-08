export interface ChargeableWeightInput {
  actualWeight: number;
  volumetricWeight: number;
}

export interface ChargeableWeightResult {
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
}
