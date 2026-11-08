import type {
  MaritimeFclInput,
  MaritimeFreightResult,
} from "@/types/calculation/freight/maritimeFreight";

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

function assertPositiveSafeInteger(
  value: number,
  field: string,
): void {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(
      `${field} must be a positive safe integer.`,
    );
  }
}

export function calculateMaritimeFcl(
  input: MaritimeFclInput,
): MaritimeFreightResult {
  const { tariff, containerQuantity } = input;

  assertPositiveFinite(
    tariff.rate.amount,
    "Tariff rate",
  );

  let tariffQuantity: number;

  switch (tariff.basis) {
    case "unit":
      assertPositiveSafeInteger(
        containerQuantity,
        "Container quantity",
      );

      tariffQuantity = containerQuantity;
      break;

    case "flat":
      tariffQuantity = 1;
      break;

    case "weight":
    case "volume":
    case "chargeableWeight":
      throw new Error(
        `Tariff basis "${tariff.basis}" is not supported for FCL freight.`,
      );

    default: {
      const exhaustiveCheck: never = tariff.basis;

      throw new Error(
        `Unsupported FCL tariff basis: ${exhaustiveCheck}`,
      );
    }
  }

  let amount =
    tariff.rate.amount * tariffQuantity;

  if (!Number.isFinite(amount)) {
    throw new Error(
      "Calculated FCL freight must be finite.",
    );
  }

  if (tariff.minimumCharge) {
    if (
      tariff.minimumCharge.currency !==
      tariff.rate.currency
    ) {
      throw new Error(
        "Minimum charge currency must match tariff currency.",
      );
    }

    assertFiniteNonNegative(
      tariff.minimumCharge.amount,
      "Minimum charge",
    );

    amount = Math.max(
      amount,
      tariff.minimumCharge.amount,
    );
  }

  return {
    type: "fcl",
    baseFreight: {
      amount,
      currency: tariff.rate.currency,
    },
  };
}