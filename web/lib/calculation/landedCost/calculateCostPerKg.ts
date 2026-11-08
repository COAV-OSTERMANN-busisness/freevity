import type { Money, Weight } from "@/types/calculation/landedCost";

export function calculateCostPerKg(
  totalCost: Money,
  totalWeight: Weight,
): Money {
  if (!Number.isFinite(totalCost.amount)) {
    throw new Error("Total cost must be a finite number.");
  }

  if (!Number.isFinite(totalWeight.value)) {
    throw new Error("Total weight must be a finite number.");
  }

  if (totalWeight.value <= 0) {
    throw new Error("Total weight must be greater than zero.");
  }

  const weightInKg = convertToKg(totalWeight);

  if (!Number.isFinite(weightInKg) || weightInKg <= 0) {
    throw new Error("Total weight must be greater than zero.");
  }

  const amount = totalCost.amount / weightInKg;

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated cost per kilogram must be a finite number.");
  }

  return {
    amount,
    currency: totalCost.currency,
  };
}

function convertToKg(weight: Weight): number {
  switch (weight.unit) {
    case "g":
      return weight.value / 1000;

    case "kg":
      return weight.value;

    case "lb":
      return weight.value * 0.45359237;

    default:
      return assertNever(weight.unit);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unsupported weight unit: ${String(value)}`);
}