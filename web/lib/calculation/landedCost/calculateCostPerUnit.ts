import type { Money } from "@/types/calculation/landedCost";

export function calculateCostPerUnit(
  totalCost: Money,
  quantity: number,
): Money {
  if (!Number.isFinite(totalCost.amount)) {
    throw new Error("Total cost must be a finite number.");
  }

  if (!Number.isFinite(quantity)) {
    throw new Error("Quantity must be a finite number.");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  const amount = totalCost.amount / quantity;

  if (!Number.isFinite(amount)) {
    throw new Error("Calculated cost per unit must be a finite number.");
  }

  return {
    amount,
    currency: totalCost.currency,
  };
}
