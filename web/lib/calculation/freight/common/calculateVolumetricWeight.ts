import type {
    VolumetricWeightInput,
    VolumetricWeightResult,
  } from "@/types/calculation/freight/volumetricWeight";
  
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
  
  export function calculateVolumetricWeight(
    input: VolumetricWeightInput,
  ): VolumetricWeightResult {
    assertPositiveFinite(input.length, "Length");
    assertPositiveFinite(input.width, "Width");
    assertPositiveFinite(input.height, "Height");
    assertPositiveFinite(input.divisor, "Divisor");
  
    const value =
      (input.length * input.width * input.height) /
      input.divisor;
  
    if (!Number.isFinite(value)) {
      throw new Error(
        "Calculated volumetric weight must be finite.",
      );
    }
  
    return {
      value,
      divisor: input.divisor,
    };
  }