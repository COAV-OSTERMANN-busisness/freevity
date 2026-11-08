import { describe, expect, it } from "vitest";
import { calculateFreight } from "@/lib/calculation/landedCost/calculateFreight";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateFreight", () => {
  it.each(currencies)(
    "returns the base freight amount using %s",
    (currency) => {
      const result = calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: 100,
          currency,
        },
      });

      expect(result).toEqual({
        amount: 100,
        currency,
      });
    },
  );

  it("returns zero freight when the amount is zero", () => {
    const result = calculateFreight({
      mode: "road",
      basis: "weight",
      amount: {
        amount: 0,
        currency: "BRL",
      },
    });

    expect(result).toEqual({
      amount: 0,
      currency: "BRL",
    });
  });

  it("adds a single additional charge", () => {
    const result = calculateFreight({
      mode: "air",
      basis: "weight",
      amount: {
        amount: 100,
        currency: "USD",
      },
      additionalCharges: [
        {
          amount: 25,
          currency: "USD",
        },
      ],
    });

    expect(result).toEqual({
      amount: 125,
      currency: "USD",
    });
  });

  it("adds multiple additional charges", () => {
    const result = calculateFreight({
      mode: "maritime",
      basis: "flat",
      amount: {
        amount: 100,
        currency: "EUR",
      },
      additionalCharges: [
        {
          amount: 20,
          currency: "EUR",
        },
        {
          amount: 30,
          currency: "EUR",
        },
      ],
    });

    expect(result).toEqual({
      amount: 150,
      currency: "EUR",
    });
  });

  it("uses zero when additional charges are omitted", () => {
    const result = calculateFreight({
      mode: "road",
      basis: "unit",
      amount: {
        amount: 100,
        currency: "JPY",
      },
      additionalCharges: [],
    });

    expect(result).toEqual({
      amount: 100,
      currency: "JPY",
    });
  });

  it("keeps the calculated amount when minimum charge is lower", () => {
    const result = calculateFreight({
      mode: "air",
      basis: "weight",
      amount: {
        amount: 100,
        currency: "USD",
      },
      additionalCharges: [
        {
          amount: 50,
          currency: "USD",
        },
      ],
      minimumCharge: {
        amount: 120,
        currency: "USD",
      },
    });

    expect(result).toEqual({
      amount: 150,
      currency: "USD",
    });
  });

  it("uses the minimum charge when it is higher", () => {
    const result = calculateFreight({
      mode: "road",
      basis: "weight",
      amount: {
        amount: 100,
        currency: "BRL",
      },
      additionalCharges: [
        {
          amount: 20,
          currency: "BRL",
        },
      ],
      minimumCharge: {
        amount: 150,
        currency: "BRL",
      },
    });

    expect(result).toEqual({
      amount: 150,
      currency: "BRL",
    });
  });

  it("keeps the calculated amount when it equals minimum charge", () => {
    const result = calculateFreight({
      mode: "maritime",
      basis: "flat",
      amount: {
        amount: 100,
        currency: "EUR",
      },
      minimumCharge: {
        amount: 100,
        currency: "EUR",
      },
    });

    expect(result).toEqual({
      amount: 100,
      currency: "EUR",
    });
  });

  it("throws when freight amount is missing", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
      }),
    ).toThrow("Freight amount is required.");
  });

  it("throws when an additional charge uses a different currency", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: 100,
          currency: "BRL",
        },
        additionalCharges: [
          {
            amount: 25,
            currency: "EUR",
          },
        ],
      }),
    ).toThrow("All freight values must use the same currency.");
  });

  it("throws when minimum charge uses a different currency", () => {
    expect(() =>
      calculateFreight({
        mode: "road",
        basis: "weight",
        amount: {
          amount: 100,
          currency: "USD",
        },
        minimumCharge: {
          amount: 150,
          currency: "JPY",
        },
      }),
    ).toThrow("All freight values must use the same currency.");
  });

  it("throws when the base freight amount is NaN", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: Number.NaN,
          currency: "USD",
        },
      }),
    ).toThrow("Freight amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when the base freight amount is %s",
    (amount) => {
      expect(() =>
        calculateFreight({
          mode: "air",
          basis: "weight",
          amount: {
            amount,
            currency: "USD",
          },
        }),
      ).toThrow("Freight amount must be a finite number.");
    },
  );

  it("throws when an additional charge amount is NaN", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: 100,
          currency: "USD",
        },
        additionalCharges: [
          {
            amount: Number.NaN,
            currency: "USD",
          },
        ],
      }),
    ).toThrow("Additional charge must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when an additional charge amount is %s",
    (amount) => {
      expect(() =>
        calculateFreight({
          mode: "air",
          basis: "weight",
          amount: {
            amount: 100,
            currency: "USD",
          },
          additionalCharges: [
            {
              amount,
              currency: "USD",
            },
          ],
        }),
      ).toThrow("Additional charge must be a finite number.");
    },
  );

  it("throws when minimum charge amount is NaN", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: 100,
          currency: "EUR",
        },
        minimumCharge: {
          amount: Number.NaN,
          currency: "EUR",
        },
      }),
    ).toThrow("Minimum charge must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when minimum charge amount is %s",
    (amount) => {
      expect(() =>
        calculateFreight({
          mode: "air",
          basis: "weight",
          amount: {
            amount: 100,
            currency: "EUR",
          },
          minimumCharge: {
            amount,
            currency: "EUR",
          },
        }),
      ).toThrow("Minimum charge must be a finite number.");
    },
  );

  it("throws when the calculated freight becomes non-finite", () => {
    expect(() =>
      calculateFreight({
        mode: "air",
        basis: "weight",
        amount: {
          amount: Number.MAX_VALUE,
          currency: "JPY",
        },
        additionalCharges: [
          {
            amount: Number.MAX_VALUE,
            currency: "JPY",
          },
        ],
      }),
    ).toThrow("Calculated freight must be a finite number.");
  });
});
