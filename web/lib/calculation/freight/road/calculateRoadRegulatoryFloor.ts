import type {
    RoadRegulatoryFloorInput,
    RoadRegulatoryFloorResult,
  } from "@/types/calculation/freight/roadFreight";
  
  function assertNonNegativeFinite(
    value: number,
    field: string,
  ): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `${field} must be a finite non-negative number.`,
      );
    }
  }
  
  export function calculateRoadRegulatoryFloor(
    input: RoadRegulatoryFloorInput,
  ): RoadRegulatoryFloorResult {
    assertNonNegativeFinite(
      input.distanceKm,
      "Distance",
    );
  
    assertNonNegativeFinite(
      input.displacementCoefficient,
      "Displacement coefficient",
    );
  
    assertNonNegativeFinite(
      input.loadUnloadCoefficient,
      "Load/unload coefficient",
    );
  
    if (!input.currency.trim()) {
      throw new Error(
        "Regulatory floor currency is required.",
      );
    }
  
    const amount =
      input.distanceKm *
        input.displacementCoefficient +
      input.loadUnloadCoefficient;
  
    if (!Number.isFinite(amount)) {
      throw new Error(
        "Calculated regulatory floor must be finite.",
      );
    }
  
    return {
      amount: {
        amount,
        currency: input.currency,
      },
    };
  }