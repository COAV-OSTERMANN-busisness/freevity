import type {
  MaritimeLclInput,
  MaritimeFreightResult,
} from "@/types/calculation/freight/maritimeFreight";

function assertPositiveFinite(value: number, field: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${field} must be a finite number greater than zero.`);
  }
}

function assertFiniteNonNegative(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a finite non-negative number.`);
  }
}

export function calculateMaritimeLcl(
  input: MaritimeLclInput
): MaritimeFreightResult {
  const { tariff } = input;

  assertPositiveFinite(input.actualWeight, "Actual weight");

  assertPositiveFinite(input.volume, "Volume");

  assertPositiveFinite(tariff.rate.amount, "Tariff rate");

  const weightInMetricTons = input.actualWeight / 1000;

  let tariffQuantity: number;

  switch (tariff.basis) {
    case "weight":
      tariffQuantity = weightInMetricTons;
      break;

    case "volume":
      tariffQuantity = input.volume;
      break;

    case "chargeableWeight":
      tariffQuantity = Math.max(weightInMetricTons, input.volume);
      break;

    case "flat":
      tariffQuantity = 1;
      break;

    case "unit":
      throw new Error(
        "Unit tariff basis is not supported by the current LCL freight input."
      );

    default: {
      const exhaustiveCheck: never = tariff.basis;

      throw new Error(`Unsupported LCL tariff basis: ${exhaustiveCheck}`);
    }
  }

  let amount = tariff.rate.amount * tariffQuantity;

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated LCL freight must be finite.");
  }

  if (tariff.minimumCharge) {
    if (tariff.minimumCharge.currency !== tariff.rate.currency) {
      throw new Error("Minimum charge currency must match tariff currency.");
    }

    assertFiniteNonNegative(tariff.minimumCharge.amount, "Minimum charge");

    amount = Math.max(amount, tariff.minimumCharge.amount);
  }

  return {
    type: "lcl",
    baseFreight: {
      amount,
      currency: tariff.rate.currency,
    },
  };
}