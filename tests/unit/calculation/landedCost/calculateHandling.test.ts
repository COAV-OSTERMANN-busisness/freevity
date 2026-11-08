import { describe, expect, it } from "vitest";
import { calculateHandling } from "@/lib/calculation/landedCost/calculateHandling";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateHandling", () => {
  it.each(currencies)(
    "returns zero when handling is not required using %s",
    (currency) => {
      const result = calculateHandling(
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

  it.each(currencies)("calculates handling charges using %s", (currency) => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "loading",
            amount: {
              amount: 100,
              currency,
            },
          },
        ],
      },
      currency,
    );

    expect(result).toEqual({
      amount: 100,
      currency,
    });
  });

  it("sums multiple handling charges", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "loading",
            amount: {
              amount: 50,
              currency: "BRL",
            },
          },
          {
            type: "packing",
            amount: {
              amount: 30,
              currency: "BRL",
            },
          },
          {
            type: "storage",
            amount: {
              amount: 20,
              currency: "BRL",
            },
          },
        ],
      },
      "BRL",
    );

    expect(result).toEqual({
      amount: 100,
      currency: "BRL",
    });
  });

  it("returns zero when required handling has no charges", () => {
    const result = calculateHandling(
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

  it("returns zero when the charges array is empty", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [],
      },
      "USD",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "USD",
    });
  });

  it("accepts zero charge amounts", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "loading",
            amount: {
              amount: 0,
              currency: "JPY",
            },
          },
        ],
      },
      "JPY",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "JPY",
    });
  });

  it("accepts decimal charge amounts", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "packing",
            amount: {
              amount: 125.75,
              currency: "EUR",
            },
          },
        ],
      },
      "EUR",
    );

    expect(result).toEqual({
      amount: 125.75,
      currency: "EUR",
    });
  });

  it("uses charge amount as the calculation source", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "loading",
            quantity: 10,
            unitPrice: {
              amount: 5,
              currency: "BRL",
            },
            amount: {
              amount: 42,
              currency: "BRL",
            },
          },
        ],
      },
      "BRL",
    );

    expect(result).toEqual({
      amount: 42,
      currency: "BRL",
    });
  });

  it("accepts a charge with unit price but without amount", () => {
    const result = calculateHandling(
      {
        required: true,
        charges: [
          {
            type: "loading",
            quantity: 10,
            unitPrice: {
              amount: 5,
              currency: "USD",
            },
          },
        ],
      },
      "USD",
    );

    expect(result).toEqual({
      amount: 0,
      currency: "USD",
    });
  });

  it("throws when a charge amount uses a different currency", () => {
    expect(() =>
      calculateHandling(
        {
          required: true,
          charges: [
            {
              type: "loading",
              amount: {
                amount: 50,
                currency: "EUR",
              },
            },
          ],
        },
        "BRL",
      ),
    ).toThrow("Handling charges must use the calculation currency.");
  });

  it("throws when a unit price uses a different currency", () => {
    expect(() =>
      calculateHandling(
        {
          required: true,
          charges: [
            {
              type: "loading",
              unitPrice: {
                amount: 5,
                currency: "USD",
              },
            },
          ],
        },
        "JPY",
      ),
    ).toThrow("Handling unit prices must use the calculation currency.");
  });

  it("throws when a charge amount is NaN", () => {
    expect(() =>
      calculateHandling(
        {
          required: true,
          charges: [
            {
              type: "loading",
              amount: {
                amount: Number.NaN,
                currency: "BRL",
              },
            },
          ],
        },
        "BRL",
      ),
    ).toThrow("Handling charge amounts must be finite numbers.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when a charge amount is %s",
    (amount) => {
      expect(() =>
        calculateHandling(
          {
            required: true,
            charges: [
              {
                type: "loading",
                amount: {
                  amount,
                  currency: "EUR",
                },
              },
            ],
          },
          "EUR",
        ),
      ).toThrow("Handling charge amounts must be finite numbers.");
    },
  );

  it("throws when a unit price is NaN", () => {
    expect(() =>
      calculateHandling(
        {
          required: true,
          charges: [
            {
              type: "loading",
              unitPrice: {
                amount: Number.NaN,
                currency: "USD",
              },
            },
          ],
        },
        "USD",
      ),
    ).toThrow("Handling unit prices must be finite numbers.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when a unit price is %s",
    (amount) => {
      expect(() =>
        calculateHandling(
          {
            required: true,
            charges: [
              {
                type: "loading",
                unitPrice: {
                  amount,
                  currency: "JPY",
                },
              },
            ],
          },
          "JPY",
        ),
      ).toThrow("Handling unit prices must be finite numbers.");
    },
  );

  it("throws when the calculated handling amount is not finite", () => {
    expect(() =>
      calculateHandling(
        {
          required: true,
          charges: [
            {
              type: "loading",
              amount: {
                amount: Number.MAX_VALUE,
                currency: "USD",
              },
            },
            {
              type: "packing",
              amount: {
                amount: Number.MAX_VALUE,
                currency: "USD",
              },
            },
          ],
        },
        "USD",
      ),
    ).toThrow("Calculated handling amount must be a finite number.");
  });
});
