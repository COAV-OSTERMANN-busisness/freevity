import { describe, expect, it } from "vitest";
import { calculateCostPerUnit } from "@/lib/calculation/landedCost/calculateCostPerUnit";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateCostPerUnit", () => {
  it.each(currencies)("calculates cost per unit using %s", (currency) => {
    const result = calculateCostPerUnit({ amount: 100, currency }, 10);

    expect(result).toEqual({
      amount: 10,
      currency,
    });
  });

  it("returns a decimal result when the total cost is not evenly divisible", () => {
    const result = calculateCostPerUnit({ amount: 100, currency: "USD" }, 3);

    expect(result.amount).toBeCloseTo(33.3333333333, 10);
    expect(result.currency).toBe("USD");
  });

  it("handles fractional quantities", () => {
    const result = calculateCostPerUnit({ amount: 50, currency: "EUR" }, 0.5);

    expect(result).toEqual({
      amount: 100,
      currency: "EUR",
    });
  });

  it("preserves a zero total cost", () => {
    const result = calculateCostPerUnit({ amount: 0, currency: "JPY" }, 10);

    expect(result).toEqual({
      amount: 0,
      currency: "JPY",
    });
  });

  it("accepts a positive decimal total cost", () => {
    const result = calculateCostPerUnit({ amount: 125.75, currency: "BRL" }, 5);

    expect(result).toEqual({
      amount: 25.15,
      currency: "BRL",
    });
  });

  it("throws when quantity is zero", () => {
    expect(() =>
      calculateCostPerUnit({ amount: 100, currency: "BRL" }, 0),
    ).toThrow("Quantity must be greater than zero.");
  });

  it("throws when quantity is negative", () => {
    expect(() =>
      calculateCostPerUnit({ amount: 100, currency: "EUR" }, -5),
    ).toThrow("Quantity must be greater than zero.");
  });

  it("throws when quantity is NaN", () => {
    expect(() =>
      calculateCostPerUnit({ amount: 100, currency: "USD" }, Number.NaN),
    ).toThrow("Quantity must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when quantity is %s",
    (quantity) => {
      expect(() =>
        calculateCostPerUnit({ amount: 100, currency: "USD" }, quantity),
      ).toThrow("Quantity must be a finite number.");
    },
  );

  it("throws when total cost is NaN", () => {
    expect(() =>
      calculateCostPerUnit({ amount: Number.NaN, currency: "BRL" }, 10),
    ).toThrow("Total cost must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when total cost is %s",
    (amount) => {
      expect(() =>
        calculateCostPerUnit({ amount, currency: "JPY" }, 10),
      ).toThrow("Total cost must be a finite number.");
    },
  );

  it("throws when the calculated cost per unit becomes infinite", () => {
    expect(() =>
      calculateCostPerUnit(
        { amount: Number.MAX_VALUE, currency: "USD" },
        Number.MIN_VALUE,
      ),
    ).toThrow("Calculated cost per unit must be a finite number.");
  });
});
