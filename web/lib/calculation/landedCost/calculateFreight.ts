import type { Freight, Money } from "@/types/calculation/landedCost";

export function calculateFreight(freight: Freight): Money {
  if (!freight.amount) {
    throw new Error("Freight amount is required.");
  }

  if (!Number.isFinite(freight.amount.amount)) {
    throw new Error("Freight amount must be a finite number.");
  }

  const baseCurrency = freight.amount.currency;
  const additionalCharges = freight.additionalCharges ?? [];

  for (const charge of additionalCharges) {
    if (!Number.isFinite(charge.amount)) {
      throw new Error("Additional charge must be a finite number.");
    }

    if (charge.currency !== baseCurrency) {
      throw new Error("All freight values must use the same currency.");
    }
  }

  if (freight.minimumCharge) {
    if (!Number.isFinite(freight.minimumCharge.amount)) {
      throw new Error("Minimum charge must be a finite number.");
    }

    if (freight.minimumCharge.currency !== baseCurrency) {
      throw new Error("All freight values must use the same currency.");
    }
  }

  const additionalAmount = additionalCharges.reduce(
    (total, charge) => total + charge.amount,
    0,
  );

  const calculatedAmount = freight.amount.amount + additionalAmount;

  const minimumAmount = freight.minimumCharge?.amount ?? 0;

  const amount = Math.max(calculatedAmount, minimumAmount);

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated freight must be a finite number.");
  }

  return {
    amount,
    currency: baseCurrency,
  };
}
