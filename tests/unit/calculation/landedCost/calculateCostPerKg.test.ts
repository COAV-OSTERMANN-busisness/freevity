import { describe, expect, it } from "vitest";
import { calculateCostPerKg } from "@/lib/calculation/landedCost/calculateCostPerKg";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateCostPerKg", () => {
  it.each(currencies)("calculates cost per kilogram using %s", (currency) => {
    const result = calculateCostPerKg(
      { amount: 100, currency },
      { value: 10, unit: "kg" },
    );

    expect(result).toEqual({
      amount: 10,
      currency,
    });
  });

  it("converts grams to kilograms", () => {
    const result = calculateCostPerKg(
      { amount: 100, currency: "BRL" },
      { value: 5000, unit: "g" },
    );

    expect(result).toEqual({
      amount: 20,
      currency: "BRL",
    });
  });

  it("converts pounds to kilograms", () => {
    const result = calculateCostPerKg(
      { amount: 100, currency: "USD" },
      { value: 10, unit: "lb" },
    );

    expect(result.amount).toBeCloseTo(22.046226218487757, 12);
    expect(result.currency).toBe("USD");
  });

  it("handles fractional kilogram values", () => {
    const result = calculateCostPerKg(
      { amount: 50, currency: "EUR" },
      { value: 0.5, unit: "kg" },
    );

    expect(result).toEqual({
      amount: 100,
      currency: "EUR",
    });
  });

  it("preserves a zero total cost", () => {
    const result = calculateCostPerKg(
      { amount: 0, currency: "JPY" },
      { value: 10, unit: "kg" },
    );

    expect(result).toEqual({
      amount: 0,
      currency: "JPY",
    });
  });

  it("throws when total weight is zero", () => {
    expect(() =>
      calculateCostPerKg(
        { amount: 100, currency: "BRL" },
        { value: 0, unit: "kg" },
      ),
    ).toThrow("Total weight must be greater than zero.");
  });

  it("throws when total weight is negative", () => {
    expect(() =>
      calculateCostPerKg(
        { amount: 100, currency: "EUR" },
        { value: -5, unit: "kg" },
      ),
    ).toThrow("Total weight must be greater than zero.");
  });

  it("throws when total weight is NaN", () => {
    expect(() =>
      calculateCostPerKg(
        { amount: 100, currency: "USD" },
        { value: Number.NaN, unit: "kg" },
      ),
    ).toThrow("Total weight must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when total weight is %s",
    (value) => {
      expect(() =>
        calculateCostPerKg(
          { amount: 100, currency: "USD" },
          { value, unit: "kg" },
        ),
      ).toThrow("Total weight must be a finite number.");
    },
  );

  it("throws when total cost is NaN", () => {
    expect(() =>
      calculateCostPerKg(
        { amount: Number.NaN, currency: "BRL" },
        { value: 10, unit: "kg" },
      ),
    ).toThrow("Total cost must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when total cost is %s",
    (amount) => {
      expect(() =>
        calculateCostPerKg(
          { amount, currency: "JPY" },
          { value: 10, unit: "kg" },
        ),
      ).toThrow("Total cost must be a finite number.");
    },
  );
});
