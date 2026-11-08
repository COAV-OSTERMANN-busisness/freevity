import type { Money } from "@/types/calculation/landedCost/cargo";

export interface LandedCostInput {
  freight: Money;
  insurance?: Money;
  customs?: Money;
  handling?: Money;
  localTransport?: Money;
  otherCosts?: Money;
}

export function calculateLandedCost(input: LandedCostInput): Money {
  const { freight, insurance, customs, handling, localTransport, otherCosts } =
    input;

  validateMoney(freight, "Freight amount");

  validateMoney(insurance, "Insurance amount");
  validateMoney(customs, "Customs amount");
  validateMoney(handling, "Handling amount");
  validateMoney(localTransport, "Local transport amount");
  validateMoney(otherCosts, "Other costs amount");

  assertSameCurrency(freight, [
    insurance,
    customs,
    handling,
    localTransport,
    otherCosts,
  ]);

  const amount =
    freight.amount +
    (insurance?.amount ?? 0) +
    (customs?.amount ?? 0) +
    (handling?.amount ?? 0) +
    (localTransport?.amount ?? 0) +
    (otherCosts?.amount ?? 0);

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated landed cost must be a finite number.");
  }

  return {
    amount,
    currency: freight.currency,
  };
}

function validateMoney(money: Money | undefined, fieldName: string): void {
  if (money && !Number.isFinite(money.amount)) {
    throw new Error(`${fieldName} must be a finite number.`);
  }
}

function assertSameCurrency(
  base: Money,
  values: Array<Money | undefined>,
): void {
  for (const value of values) {
    if (value && value.currency !== base.currency) {
      throw new Error("All monetary values must use the same currency.");
    }
  }
}
