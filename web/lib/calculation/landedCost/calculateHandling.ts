import type { CurrencyCode, Handling, Money } from "@/types/calculation/landedCost";

export function calculateHandling(
  handling: Handling,
  currency: CurrencyCode,
): Money {
  if (!handling.required) {
    return {
      amount: 0,
      currency,
    };
  }

  const charges = handling.charges ?? [];

  for (const charge of charges) {
    if (charge.amount) {
      if (!Number.isFinite(charge.amount.amount)) {
        throw new Error("Handling charge amounts must be finite numbers.");
      }

      if (charge.amount.currency !== currency) {
        throw new Error("Handling charges must use the calculation currency.");
      }
    }

    if (charge.unitPrice) {
      if (!Number.isFinite(charge.unitPrice.amount)) {
        throw new Error("Handling unit prices must be finite numbers.");
      }

      if (charge.unitPrice.currency !== currency) {
        throw new Error(
          "Handling unit prices must use the calculation currency.",
        );
      }
    }
  }

  const amount = charges.reduce(
    (total, charge) => total + (charge.amount?.amount ?? 0),
    0,
  );

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated handling amount must be a finite number.");
  }

  return {
    amount,
    currency,
  };
}
