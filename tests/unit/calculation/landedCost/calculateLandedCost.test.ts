import { describe, expect, it } from "vitest";
import { calculateLandedCost } from "@/lib/calculation/landedCost/calculateLandedCost";

const currencies = ["BRL", "EUR", "USD", "JPY"];

describe("calculateLandedCost", () => {
  it.each(currencies)("returns freight as landed cost using %s", (currency) => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency,
      },
    });

    expect(result).toEqual({
      amount: 100,
      currency,
    });
  });

  it("returns the freight amount when optional costs are omitted", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "BRL",
      },
      insurance: undefined,
      customs: undefined,
      handling: undefined,
      localTransport: undefined,
      otherCosts: undefined,
    });

    expect(result).toEqual({
      amount: 100,
      currency: "BRL",
    });
  });

  it("sums insurance into landed cost", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "EUR",
      },
      insurance: {
        amount: 25,
        currency: "EUR",
      },
    });

    expect(result).toEqual({
      amount: 125,
      currency: "EUR",
    });
  });

  it("sums customs into landed cost", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "USD",
      },
      customs: {
        amount: 50,
        currency: "USD",
      },
    });

    expect(result).toEqual({
      amount: 150,
      currency: "USD",
    });
  });

  it("sums handling into landed cost", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "JPY",
      },
      handling: {
        amount: 25,
        currency: "JPY",
      },
    });

    expect(result).toEqual({
      amount: 125,
      currency: "JPY",
    });
  });

  it("sums local transport into landed cost", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "BRL",
      },
      localTransport: {
        amount: 30,
        currency: "BRL",
      },
    });

    expect(result).toEqual({
      amount: 130,
      currency: "BRL",
    });
  });

  it("sums other costs into landed cost", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "EUR",
      },
      otherCosts: {
        amount: 40,
        currency: "EUR",
      },
    });

    expect(result).toEqual({
      amount: 140,
      currency: "EUR",
    });
  });

  it("sums all landed cost components", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "USD",
      },
      insurance: {
        amount: 10,
        currency: "USD",
      },
      customs: {
        amount: 20,
        currency: "USD",
      },
      handling: {
        amount: 15,
        currency: "USD",
      },
      localTransport: {
        amount: 25,
        currency: "USD",
      },
      otherCosts: {
        amount: 30,
        currency: "USD",
      },
    });

    expect(result).toEqual({
      amount: 200,
      currency: "USD",
    });
  });

  it("accepts zero optional costs", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100,
        currency: "BRL",
      },
      insurance: {
        amount: 0,
        currency: "BRL",
      },
      customs: {
        amount: 0,
        currency: "BRL",
      },
      handling: {
        amount: 0,
        currency: "BRL",
      },
      localTransport: {
        amount: 0,
        currency: "BRL",
      },
      otherCosts: {
        amount: 0,
        currency: "BRL",
      },
    });

    expect(result).toEqual({
      amount: 100,
      currency: "BRL",
    });
  });

  it("accepts decimal monetary values", () => {
    const result = calculateLandedCost({
      freight: {
        amount: 100.25,
        currency: "EUR",
      },
      insurance: {
        amount: 10.5,
        currency: "EUR",
      },
      customs: {
        amount: 20.75,
        currency: "EUR",
      },
      handling: {
        amount: 5.25,
        currency: "EUR",
      },
      localTransport: {
        amount: 3.5,
        currency: "EUR",
      },
      otherCosts: {
        amount: 9.75,
        currency: "EUR",
      },
    });

    expect(result).toEqual({
      amount: 150,
      currency: "EUR",
    });
  });

  it("throws when insurance uses a different currency", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "BRL",
        },
        insurance: {
          amount: 10,
          currency: "EUR",
        },
      }),
    ).toThrow("All monetary values must use the same currency.");
  });

  it("throws when customs uses a different currency", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "BRL",
        },
        customs: {
          amount: 10,
          currency: "USD",
        },
      }),
    ).toThrow("All monetary values must use the same currency.");
  });

  it("throws when handling uses a different currency", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "BRL",
        },
        handling: {
          amount: 10,
          currency: "JPY",
        },
      }),
    ).toThrow("All monetary values must use the same currency.");
  });

  it("throws when local transport uses a different currency", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "EUR",
        },
        localTransport: {
          amount: 10,
          currency: "USD",
        },
      }),
    ).toThrow("All monetary values must use the same currency.");
  });

  it("throws when other costs use a different currency", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "USD",
        },
        otherCosts: {
          amount: 10,
          currency: "JPY",
        },
      }),
    ).toThrow("All monetary values must use the same currency.");
  });

  it("throws when freight amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: Number.NaN,
          currency: "BRL",
        },
      }),
    ).toThrow("Freight amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when freight amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount,
            currency: "EUR",
          },
        }),
      ).toThrow("Freight amount must be a finite number.");
    },
  );

  it("throws when insurance amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "USD",
        },
        insurance: {
          amount: Number.NaN,
          currency: "USD",
        },
      }),
    ).toThrow("Insurance amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when insurance amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount: 100,
            currency: "USD",
          },
          insurance: {
            amount,
            currency: "USD",
          },
        }),
      ).toThrow("Insurance amount must be a finite number.");
    },
  );

  it("throws when customs amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "JPY",
        },
        customs: {
          amount: Number.NaN,
          currency: "JPY",
        },
      }),
    ).toThrow("Customs amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when customs amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount: 100,
            currency: "JPY",
          },
          customs: {
            amount,
            currency: "JPY",
          },
        }),
      ).toThrow("Customs amount must be a finite number.");
    },
  );

  it("throws when handling amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "BRL",
        },
        handling: {
          amount: Number.NaN,
          currency: "BRL",
        },
      }),
    ).toThrow("Handling amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when handling amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount: 100,
            currency: "BRL",
          },
          handling: {
            amount,
            currency: "BRL",
          },
        }),
      ).toThrow("Handling amount must be a finite number.");
    },
  );

  it("throws when local transport amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "EUR",
        },
        localTransport: {
          amount: Number.NaN,
          currency: "EUR",
        },
      }),
    ).toThrow("Local transport amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when local transport amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount: 100,
            currency: "EUR",
          },
          localTransport: {
            amount,
            currency: "EUR",
          },
        }),
      ).toThrow("Local transport amount must be a finite number.");
    },
  );

  it("throws when other costs amount is NaN", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: 100,
          currency: "USD",
        },
        otherCosts: {
          amount: Number.NaN,
          currency: "USD",
        },
      }),
    ).toThrow("Other costs amount must be a finite number.");
  });

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    "throws when other costs amount is %s",
    (amount) => {
      expect(() =>
        calculateLandedCost({
          freight: {
            amount: 100,
            currency: "USD",
          },
          otherCosts: {
            amount,
            currency: "USD",
          },
        }),
      ).toThrow("Other costs amount must be a finite number.");
    },
  );

  it("throws when the landed cost total is not finite", () => {
    expect(() =>
      calculateLandedCost({
        freight: {
          amount: Number.MAX_VALUE,
          currency: "JPY",
        },
        insurance: {
          amount: Number.MAX_VALUE,
          currency: "JPY",
        },
      }),
    ).toThrow("Calculated landed cost must be a finite number.");
  });
});
