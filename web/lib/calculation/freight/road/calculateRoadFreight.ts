
import type {
  RoadFreightInput,
  RoadFreightResult,
} from "@/types/calculation/freight/roadFreight";

const ROAD_CUBAGE_FACTOR_KG_PER_M3 = 300;

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

export function calculateRoadFreight(
  input: RoadFreightInput,
): RoadFreightResult {
  const { tariff } = input;

  assertPositiveFinite(
    tariff.rate.amount,
    "Tariff rate",
  );

  assertPositiveFinite(
    input.actualWeight,
    "Actual weight",
  );

  assertPositiveFinite(
    input.volume,
    "Volume",
  );

  assertPositiveFinite(
    input.quantity,
    "Quantity",
  );

  if (!Number.isSafeInteger(input.quantity)) {
    throw new Error(
      "Quantity must be a safe integer.",
    );
  }

  // Pc = Vt × 300
  // O volume recebido já representa toda a remessa.
  const cubedWeightKg =
    input.volume * ROAD_CUBAGE_FACTOR_KG_PER_M3;

  // Pt = max(Pr, Pc)
  // O peso informado já é o peso total da remessa.
  const chargeableWeightKg = Math.max(
    input.actualWeight,
    cubedWeightKg,
  );

  let tariffQuantity: number;

  switch (tariff.basis) {
    case "weight":
      tariffQuantity = input.actualWeight;
      break;

    case "volume":
      tariffQuantity = input.volume;
      break;

    case "unit":
      tariffQuantity = input.quantity;
      break;

    case "flat":
      tariffQuantity = 1;
      break;

    case "chargeableWeight":
      tariffQuantity = chargeableWeightKg;
      break;

    default: {
      const exhaustiveCheck: never = tariff.basis;

      throw new Error(
        `Unsupported road freight tariff basis: ${exhaustiveCheck}`,
      );
    }
  }

  // Fb = Pt × Tkg para a base chargeableWeight.
  // Nas demais bases, utiliza-se a unidade selecionada.
  let amount = tariff.rate.amount * tariffQuantity;

  if (!Number.isFinite(amount)) {
    throw new Error(
      "Calculated road freight must be finite.",
    );
  }

  // Fb = max(valor calculado, Fmin)
  if (tariff.minimumCharge) {
    if (
      tariff.minimumCharge.currency !==
      tariff.rate.currency
    ) {
      throw new Error(
        "Minimum charge currency must match tariff currency.",
      );
    }

    if (
      !Number.isFinite(tariff.minimumCharge.amount) ||
      tariff.minimumCharge.amount < 0
    ) {
      throw new Error(
        "Minimum charge must be a finite non-negative number.",
      );
    }

    amount = Math.max(
      amount,
      tariff.minimumCharge.amount,
    );
  }

  if (
    !Number.isFinite(cubedWeightKg) ||
    !Number.isFinite(chargeableWeightKg)
  ) {
    throw new Error(
      "Calculated road freight weights must be finite.",
    );
  }

  return {
    baseFreight: {
      amount,
      currency: tariff.rate.currency,
    },
    cubedWeightKg,
    chargeableWeightKg,
  };
}
