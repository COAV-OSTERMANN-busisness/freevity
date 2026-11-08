
import type {
  FreightCalculationInput,
} from "@/types/calculation/freight/freightCalculationInput";

import type {
  FreightResult,
} from "@/types/calculation/freight/freightResult";

import type {
  FreightMoney,
  FreightTariffBasis,
} from "@/types/calculation/freight/freightTariff";

import type {
  RoadFreightResult,
} from "@/types/calculation/freight/roadFreight";

import { calculateNationalFreight } from "./national/calculateNationalFreight";
import { calculateInternationalFreight } from "./international/calculateInternationalFreight";

function assertFiniteNonNegative(
  value: number,
  field: string,
): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(
      `${field} must be a finite non-negative number.`,
    );
  }
}

function resolveTariffBasis(
  input: FreightCalculationInput,
): FreightTariffBasis {
  switch (input.mode) {
    case "road":
      if (!input.road) {
        throw new Error(
          "Road freight input is required.",
        );
      }

      return input.road.tariff.basis;

    case "air":
      if (!input.air) {
        throw new Error(
          "Air freight input is required.",
        );
      }

      return input.air.tariff.basis;

    case "maritime":
      if (!input.maritime) {
        throw new Error(
          "Maritime freight input is required.",
        );
      }

      if (input.maritime.type === "fcl") {
        if (!input.maritime.fcl) {
          throw new Error(
            "FCL freight input is required.",
          );
        }

        return input.maritime.fcl.tariff.basis;
      }

      if (!input.maritime.lcl) {
        throw new Error(
          "LCL freight input is required.",
        );
      }

      return input.maritime.lcl.tariff.basis;

    default: {
      const exhaustiveCheck: never = input.mode;

      throw new Error(
        `Unsupported freight mode: ${exhaustiveCheck}`,
      );
    }
  }
}

function resolveFreightCalculation(
  input: FreightCalculationInput,
) {
  return input.scope === "national"
    ? calculateNationalFreight(input)
    : calculateInternationalFreight(input);
}

export function calculateFreightSimulation(
  input: FreightCalculationInput,
): FreightResult {
  const calculation = resolveFreightCalculation(input);

  const baseFreight: FreightMoney = calculation.baseFreight;

  assertFiniteNonNegative(
    baseFreight.amount,
    "Base freight",
  );

  const additionalCharges =
    input.additionalCharges ?? [];

  let additionalChargesTotal = 0;

  for (const charge of additionalCharges) {
    if (!charge.id.trim()) {
      throw new Error(
        "Additional freight charge id is required.",
      );
    }

    if (!charge.label.trim()) {
      throw new Error(
        "Additional freight charge label is required.",
      );
    }

    assertFiniteNonNegative(
      charge.amount.amount,
      `Additional charge "${charge.label}"`,
    );

    if (
      charge.amount.currency !==
      baseFreight.currency
    ) {
      throw new Error(
        `Additional charge "${charge.label}" currency must match freight currency.`,
      );
    }

    additionalChargesTotal +=
      charge.amount.amount;

    if (!Number.isFinite(additionalChargesTotal)) {
      throw new Error(
        "Additional freight charges total must be finite.",
      );
    }
  }

  const totalAmount =
    baseFreight.amount +
    additionalChargesTotal;

  if (!Number.isFinite(totalAmount)) {
    throw new Error(
      "Total freight must be finite.",
    );
  }

  const result: FreightResult = {
    scope: input.scope,
    mode: input.mode,

    currency: baseFreight.currency,

    baseFreight,

    additionalCharges,

    totalFreight: {
      amount: totalAmount,
      currency: baseFreight.currency,
    },

    tariffBasis: resolveTariffBasis(input),
  };

  switch (input.mode) {
    case "road":
      if (input.road) {
        const roadCalculation =
          calculation as RoadFreightResult;

        result.actualWeight =
          input.road.actualWeight;

        result.volume =
          input.road.volume;

        // Indicadores da fórmula rodoviária aprovada.
        result.cubedWeightKg =
          roadCalculation.cubedWeightKg;

        result.chargeableWeight =
          roadCalculation.chargeableWeightKg;
      }

      break;

    case "air":
      if (input.air) {
        result.actualWeight =
          input.air.actualWeight;

        result.volumetricWeight =
          input.air.volumetricWeight;

        result.chargeableWeight =
          Math.max(
            input.air.actualWeight,
            input.air.volumetricWeight,
          );
      }

      break;

    case "maritime":
      if (
        input.maritime?.type === "lcl" &&
        input.maritime.lcl
      ) {
        result.actualWeight =
          input.maritime.lcl.actualWeight;

        result.volume =
          input.maritime.lcl.volume;
      }

      break;
  }

  return result;
}
