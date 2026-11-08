import { describe, expect, it } from "vitest";
import { calculateLogisticsPercentage } from "@/lib/calculation/landedCost/calculateLogisticsPercentage";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateLogisticsPercentage", () => {
  it.each(currencies)(
    "calculates the logistics percentage using %s",
    (currency) => {
      const result = calculateLogisticsPercentage(
        { amount: 200, currency },
        { amount: 1000, currency },
      );

      expect(result).toBe(20);
    },
  );

  it("returns zero when logistics cost is zero", () => {
    const result = calculateLogisticsPercentage(
      { amount: 0, currency: "BRL" },
      { amount: 1000, currency: "BRL" },
    );

    expect(result).toBe(0);
  });

  it("returns a decimal percentage", () => {
    const result = calculateLogisticsPercentage(
      { amount: 125, currency: "EUR" },
      { amount: 1000, currency: "EUR" },
    );

    expect(result).toBe(12.5);
  });

  it("throws when logistics cost is negative", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: -100, currency: "USD" },
        { amount: 1000, currency: "USD" },
      ),
    ).toThrow("Logistics cost must be zero or greater.");
  });

  it("throws when cargo value is zero", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: 200, currency: "USD" },
        { amount: 0, currency: "USD" },
      ),
    ).toThrow("Cargo value must be greater than zero.");
  });

  it("throws when cargo value is negative", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: 200, currency: "JPY" },
        { amount: -1000, currency: "JPY" },
      ),
    ).toThrow("Cargo value must be greater than zero.");
  });

  it("throws when logistics cost and cargo value use different currencies", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: 200, currency: "BRL" },
        { amount: 1000, currency: "EUR" },
      ),
    ).toThrow("Logistics cost and cargo value must use the same currency.");
  });

  it("throws when logistics cost is NaN", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: Number.NaN, currency: "USD" },
        { amount: 1000, currency: "USD" },
      ),
    ).toThrow("Logistics cost must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when logistics cost is %s",
    (amount) => {
      expect(() =>
        calculateLogisticsPercentage(
          { amount, currency: "USD" },
          { amount: 1000, currency: "USD" },
        ),
      ).toThrow("Logistics cost must be a finite number.");
    },
  );

  it("throws when cargo value is NaN", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: 200, currency: "EUR" },
        { amount: Number.NaN, currency: "EUR" },
      ),
    ).toThrow("Cargo value must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when cargo value is %s",
    (amount) => {
      expect(() =>
        calculateLogisticsPercentage(
          { amount: 200, currency: "JPY" },
          { amount, currency: "JPY" },
        ),
      ).toThrow("Cargo value must be a finite number.");
    },
  );

  it("throws when the calculated percentage is not finite", () => {
    expect(() =>
      calculateLogisticsPercentage(
        { amount: Number.MAX_VALUE, currency: "USD" },
        { amount: Number.MIN_VALUE, currency: "USD" },
      ),
    ).toThrow("Calculated logistics percentage must be a finite number.");
  });
});
