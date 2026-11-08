import { describe, expect, it } from "vitest";
import { calculateInsurance } from "@/lib/calculation/landedCost/calculateInsurance";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateInsurance", () => {
  it.each(currencies)(
    "returns zero when insurance is disabled using %s",
    (currency) => {
      const result = calculateInsurance(
        {
          enabled: false,
        },
        currency,
      );

      expect(result).toEqual({
        amount: 0,
        currency,
      });
    },
  );

  it.each(currencies)(
    "calculates insurance using %s",
    (currency) => {
      const result = calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency,
          },
          ratePercent: 2.5,
        },
        currency,
      );

      expect(result).toEqual({
        amount: 25,
        currency,
      });
    },
  );

  it("calculates insurance with a decimal insured value", () => {
    const result = calculateInsurance(
      {
        enabled: true,
        insuredValue: {
          amount: 1250.75,
          currency: "BRL",
        },
        ratePercent: 2,
      },
      "BRL",
    );

    expect(result.amount).toBeCloseTo(25.015, 10);
    expect(result.currency).toBe("BRL");
  });

  it("returns zero when the insurance rate is zero", () => {
    const result = calculateInsurance(
      {
        enabled: true,
        insuredValue: {
          amount: 1000,
          currency: "EUR",
        },
        ratePercent: 0,
      },
      "EUR",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "EUR",
    });
  });

  it("throws when insurance is enabled without an insured value", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          ratePercent: 2,
        },
        "USD",
      ),
    ).toThrow(
      "Insured value is required when insurance is enabled.",
    );
  });

  it("throws when the insurance rate is undefined", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency: "JPY",
          },
        },
        "JPY",
      ),
    ).toThrow("Insurance rate must be zero or greater.");
  });

  it("throws when the insurance rate is negative", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency: "USD",
          },
          ratePercent: -1,
        },
        "USD",
      ),
    ).toThrow("Insurance rate must be zero or greater.");
  });

  it("throws when the insured value uses a different currency", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency: "EUR",
          },
          ratePercent: 2,
        },
        "BRL",
      ),
    ).toThrow(
      "Insured value must use the calculation currency.",
    );
  });

  it("throws when the insurance rate is NaN", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency: "USD",
          },
          ratePercent: Number.NaN,
        },
        "USD",
      ),
    ).toThrow("Insurance rate must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when the insurance rate is %s", (ratePercent) => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: 1000,
            currency: "USD",
          },
          ratePercent,
        },
        "USD",
      ),
    ).toThrow("Insurance rate must be a finite number.");
  });

  it("throws when insured value amount is NaN", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: Number.NaN,
            currency: "BRL",
          },
          ratePercent: 2,
        },
        "BRL",
      ),
    ).toThrow("Insured value must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when insured value amount is %s", (amount) => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount,
            currency: "EUR",
          },
          ratePercent: 2,
        },
        "EUR",
      ),
    ).toThrow("Insured value must be a finite number.");
  });

  it("throws when the calculated insurance amount is not finite", () => {
    expect(() =>
      calculateInsurance(
        {
          enabled: true,
          insuredValue: {
            amount: Number.MAX_VALUE,
            currency: "JPY",
          },
          ratePercent: Number.MAX_VALUE,
        },
        "JPY",
      ),
    ).toThrow(
      "Calculated insurance amount must be a finite number.",
    );
  });
});