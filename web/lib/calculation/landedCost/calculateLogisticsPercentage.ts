import type { Money } from "@/types/calculation/landedCost";

export function calculateLogisticsPercentage(
  logisticsCost: Money,
  cargoValue: Money,
): number {
  if (!Number.isFinite(logisticsCost.amount)) {
    throw new Error("Logistics cost must be a finite number.");
  }

  if (!Number.isFinite(cargoValue.amount)) {
    throw new Error("Cargo value must be a finite number.");
  }

  if (logisticsCost.amount < 0) {
    throw new Error("Logistics cost must be zero or greater.");
  }

  if (cargoValue.amount <= 0) {
    throw new Error("Cargo value must be greater than zero.");
  }

  if (logisticsCost.currency !== cargoValue.currency) {
    throw new Error(
      "Logistics cost and cargo value must use the same currency.",
    );
  }

  const percentage = (logisticsCost.amount / cargoValue.amount) * 100;

  if (!Number.isFinite(percentage)) {
    throw new Error(
      "Calculated logistics percentage must be a finite number.",
    );
  }

  return percentage;
}