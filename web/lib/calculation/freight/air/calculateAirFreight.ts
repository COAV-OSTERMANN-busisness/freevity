
import type {
  AirFreightInput,
  AirFreightResult,
} from "@/types/calculation/freight/airFreight";

import { calculateChargeableWeight } from "../common/calculateChargeableWeight";

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

export function calculateAirFreight(
  input: AirFreightInput,
): AirFreightResult {
  const { tariff } = input;

  assertPositiveFinite(
    input.actualWeight,
    "Actual weight",
  );

  assertPositiveFinite(
    input.volumetricWeight,
    "Volumetric weight",
  );

  assertPositiveFinite(
    input.volume,
    "Total volume",
  );

  if (
    !Number.isSafeInteger(input.quantity) ||
    input.quantity <= 0
  ) {
    throw new Error(
      "Quantity must be a positive safe integer.",
    );
  }

  assertPositiveFinite(
    tariff.rate.amount,
    "Tariff rate",
  );

  const { chargeableWeight } =
    calculateChargeableWeight({
      actualWeight: input.actualWeight,
      volumetricWeight: input.volumetricWeight,
    });

  let tariffQuantity: number;

  switch (tariff.basis) {
    case "weight":
      tariffQuantity = input.actualWeight;
      break;

    case "chargeableWeight":
      tariffQuantity = chargeableWeight;
      break;

    case "flat":
      tariffQuantity = 1;
      break;

    case "volume":
      tariffQuantity = input.volume;
      break;

    case "unit":
      tariffQuantity = input.quantity;
      break;

    default: {
      const exhaustiveCheck: never = tariff.basis;

      throw new Error(
        `Unsupported air freight tariff basis: ${exhaustiveCheck}`,
      );
    }
  }

  let amount = tariff.rate.amount * tariffQuantity;

  if (!Number.isFinite(amount)) {
    throw new Error(
      "Calculated air freight must be finite.",
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

    assertNonNegativeFinite(
      tariff.minimumCharge.amount,
      "Minimum charge",
    );

    amount = Math.max(
      amount,
      tariff.minimumCharge.amount,
    );
  }

  return {
    actualWeight: input.actualWeight,
    volumetricWeight: input.volumetricWeight,
    chargeableWeight,
    baseFreight: {
      amount,
      currency: tariff.rate.currency,
    },
  };
}
