import { describe, expect, it } from "vitest";
import { calculateLocalTransport } from "@/lib/calculation/landedCost/calculateLocalTransport";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateLocalTransport", () => {
  it.each(currencies)(
    "returns zero when local transport is not required using %s",
    (currency) => {
      const result = calculateLocalTransport(
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
    "calculates local transport charges using %s",
    (currency) => {
      const result = calculateLocalTransport(
        {
          required: true,
          charges: [
            {
              mode: "road",
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
    },
  );

  it("sums multiple local transport charges", () => {
    const result = calculateLocalTransport(
      {
        required: true,
        charges: [
          {
            mode: "road",
            amount: {
              amount: 40,
              currency: "BRL",
            },
          },
          {
            mode: "road",
            amount: {
              amount: 60,
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

  it("returns zero when required local transport has no charges", () => {
    const result = calculateLocalTransport(
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
    const result = calculateLocalTransport(
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
    const result = calculateLocalTransport(
      {
        required: true,
        charges: [
          {
            mode: "road",
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
    const result = calculateLocalTransport(
      {
        required: true,
        charges: [
          {
            mode: "road",
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

  it("accepts charges without an amount", () => {
    const result = calculateLocalTransport(
      {
        required: true,
        charges: [
          {
            mode: "road",
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

  it("throws when a local transport charge uses a different currency", () => {
    expect(() =>
      calculateLocalTransport(
        {
          required: true,
          charges: [
            {
              mode: "road",
              amount: {
                amount: 40,
                currency: "EUR",
              },
            },
          ],
        },
        "BRL",
      ),
    ).toThrow("Local transport charges must use the calculation currency.");
  });

  it("throws when a charge amount is NaN", () => {
    expect(() =>
      calculateLocalTransport(
        {
          required: true,
          charges: [
            {
              mode: "road",
              amount: {
                amount: Number.NaN,
                currency: "BRL",
              },
            },
          ],
        },
        "BRL",
      ),
    ).toThrow("Local transport charge amounts must be finite numbers.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when a charge amount is %s",
    (amount) => {
      expect(() =>
        calculateLocalTransport(
          {
            required: true,
            charges: [
              {
                mode: "road",
                amount: {
                  amount,
                  currency: "EUR",
                },
              },
            ],
          },
          "EUR",
        ),
      ).toThrow("Local transport charge amounts must be finite numbers.");
    },
  );

  it("throws when the calculated local transport amount is not finite", () => {
    expect(() =>
      calculateLocalTransport(
        {
          required: true,
          charges: [
            {
              mode: "road",
              amount: {
                amount: Number.MAX_VALUE,
                currency: "USD",
              },
            },
            {
              mode: "road",
              amount: {
                amount: Number.MAX_VALUE,
                currency: "USD",
              },
            },
          ],
        },
        "USD",
      ),
    ).toThrow("Calculated local transport amount must be a finite number.");
  });
});
