import type {
    StowageFactorInput,
    StowageFactorResult,
  } from "@/types/calculation/freight/stowage";
  
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
  
  export function calculateStowageFactor(
    input: StowageFactorInput,
  ): StowageFactorResult {
    assertPositiveFinite(input.volume, "Volume");
    assertPositiveFinite(input.weight, "Weight");
  
    const factor = input.volume / input.weight;
  
    if (!Number.isFinite(factor)) {
      throw new Error(
        "Calculated stowage factor must be finite.",
      );
    }
  
    return {
      volume: input.volume,
      weight: input.weight,
      factor,
    };
  }