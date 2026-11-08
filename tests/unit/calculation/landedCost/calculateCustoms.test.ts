import { describe, expect, it } from "vitest";
import { calculateCustoms } from "@/lib/calculation/landedCost/calculateCustoms";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateCustoms", () => {
  it.each(currencies)(
    "returns zero when customs are not required using %s",
    (currency) => {
      const result = calculateCustoms(
        {
          required: false,
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
    "returns duties using %s",
    (currency) => {
      const result = calculateCustoms(
        {
          required: true,
          duties: {
            amount: 100,
            currency,
          },
        },
        currency,
      );

      expect(result).toEqual({
        amount: 100,
        currency,
      });
    },
  );

  it.each(currencies)(
    "returns taxes using %s",
    (currency) => {
      const result = calculateCustoms(
        {
          required: true,
          taxes: {
            amount: 50,
            currency,
          },
        },
        currency,
      );

      expect(result).toEqual({
        amount: 50,
        currency,
      });
    },
  );

  it("sums duties and taxes", () => {
    const result = calculateCustoms(
      {
        required: true,
        duties: {
          amount: 100,
          currency: "BRL",
        },
        taxes: {
          amount: 50,
          currency: "BRL",
        },
      },
      "BRL",
    );

    expect(result).toEqual({
      amount: 150,
      currency: "BRL",
    });
  });

  it("returns zero when required customs have no duties or taxes", () => {
    const result = calculateCustoms(
      {
        required: true,
      },
      "EUR",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "EUR",
    });
  });

  it("accepts zero duties and taxes", () => {
    const result = calculateCustoms(
      {
        required: true,
        duties: {
          amount: 0,
          currency: "USD",
        },
        taxes: {
          amount: 0,
          currency: "USD",
        },
      },
      "USD",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "USD",
    });
  });

  it("accepts decimal duties and taxes", () => {
    const result = calculateCustoms(
      {
        required: true,
        duties: {
          amount: 125.75,
          currency: "JPY",
        },
        taxes: {
          amount: 14.25,
          currency: "JPY",
        },
      },
      "JPY",
    );

    expect(result).toEqual({
      amount: 140,
      currency: "JPY",
    });
  });

  it("throws when duties use a different currency", () => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          duties: {
            amount: 100,
            currency: "EUR",
          },
        },
        "BRL",
      ),
    ).toThrow("Customs duties must use the calculation currency.");
  });

  it("throws when taxes use a different currency", () => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          taxes: {
            amount: 50,
            currency: "JPY",
          },
        },
        "USD",
      ),
    ).toThrow("Customs taxes must use the calculation currency.");
  });

  it("throws when duties amount is NaN", () => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          duties: {
            amount: Number.NaN,
            currency: "BRL",
          },
        },
        "BRL",
      ),
    ).toThrow("Customs duties must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when duties amount is %s", (amount) => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          duties: {
            amount,
            currency: "EUR",
          },
        },
        "EUR",
      ),
    ).toThrow("Customs duties must be a finite number.");
  });

  it("throws when taxes amount is NaN", () => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          taxes: {
            amount: Number.NaN,
            currency: "USD",
          },
        },
        "USD",
      ),
    ).toThrow("Customs taxes must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when taxes amount is %s", (amount) => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          taxes: {
            amount,
            currency: "JPY",
          },
        },
        "JPY",
      ),
    ).toThrow("Customs taxes must be a finite number.");
  });

  it("throws when the calculated customs amount is not finite", () => {
    expect(() =>
      calculateCustoms(
        {
          required: true,
          duties: {
            amount: Number.MAX_VALUE,
            currency: "USD",
          },
          taxes: {
            amount: Number.MAX_VALUE,
            currency: "USD",
          },
        },
        "USD",
      ),
    ).toThrow("Calculated customs amount must be a finite number.");
  });
});