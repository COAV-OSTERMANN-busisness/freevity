import type {
    ChargeableWeightInput,
    ChargeableWeightResult,
  } from "@/types/calculation/freight/chargeableWeight";
  
  function assertPositiveFinite(
    value: number,
    field: string,
  ): void {
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(
        `${field} must be a finite number greater than zero.`,
      );
    }
  }
  
  export function calculateChargeableWeight(
    input: ChargeableWeightInput,
  ): ChargeableWeightResult {
    assertPositiveFinite(
      input.actualWeight,
      "Actual weight",
    );
  
    assertPositiveFinite(
      input.volumetricWeight,
      "Volumetric weight",
    );
  
    const chargeableWeight = Math.max(
      input.actualWeight,
      input.volumetricWeight,
    );
  
    return {
      actualWeight: input.actualWeight,
      volumetricWeight: input.volumetricWeight,
      chargeableWeight,
    };
  }