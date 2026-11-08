import type { CurrencyCode, Insurance, Money } from "@/types/calculation/landedCost";

export function calculateInsurance(
  insurance: Insurance,
  currency: CurrencyCode,
): Money {
  if (!insurance.enabled) {
    return {
      amount: 0,
      currency,
    };
  }

  if (!insurance.insuredValue) {
    throw new Error("Insured value is required when insurance is enabled.");
  }

  if (!Number.isFinite(insurance.insuredValue.amount)) {
    throw new Error("Insured value must be a finite number.");
  }

  if (insurance.insuredValue.currency !== currency) {
    throw new Error("Insured value must use the calculation currency.");
  }

  if (
    insurance.ratePercent === undefined ||
    !Number.isFinite(insurance.ratePercent)
  ) {
    if (insurance.ratePercent === undefined) {
      throw new Error("Insurance rate must be zero or greater.");
    }

    throw new Error("Insurance rate must be a finite number.");
  }

  if (insurance.ratePercent < 0) {
    throw new Error("Insurance rate must be zero or greater.");
  }

  const amount = insurance.insuredValue.amount * (insurance.ratePercent / 100);

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated insurance amount must be a finite number.");
  }

  return {
    amount,
    currency,
  };
}
