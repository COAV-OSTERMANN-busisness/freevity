import type { CurrencyCode, Customs, Money } from "@/types/calculation/landedCost";

export function calculateCustoms(
  customs: Customs,
  currency: CurrencyCode,
): Money {
  if (!customs.required) {
    return {
      amount: 0,
      currency,
    };
  }

  const duties = customs.duties;
  const taxes = customs.taxes;

  if (duties) {
    if (!Number.isFinite(duties.amount)) {
      throw new Error("Customs duties must be a finite number.");
    }

    if (duties.currency !== currency) {
      throw new Error("Customs duties must use the calculation currency.");
    }
  }

  if (taxes) {
    if (!Number.isFinite(taxes.amount)) {
      throw new Error("Customs taxes must be a finite number.");
    }

    if (taxes.currency !== currency) {
      throw new Error("Customs taxes must use the calculation currency.");
    }
  }

  const amount = (duties?.amount ?? 0) + (taxes?.amount ?? 0);

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated customs amount must be a finite number.");
  }

  return {
    amount,
    currency,
  };
}
