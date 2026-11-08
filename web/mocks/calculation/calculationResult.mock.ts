import type { CalculationResult } from "@/types/calculation/landedCost/calculationResult";

export const mockCalculationResult: CalculationResult = {
  currency: "USD",

  breakdown: {
    cargo: {
      amount: 4000,
      currency: "USD",
    },
    freight: {
      amount: 650,
      currency: "USD",
    },
    insurance: {
      amount: 80,
      currency: "USD",
    },
    customs: {
      amount: 250,
      currency: "USD",
    },
    handling: {
      amount: 60,
      currency: "USD",
    },
    localTransport: {
      amount: 100,
      currency: "USD",
    },
    otherCosts: {
      amount: 70,
      currency: "USD",
    },
  },

  totalLandedCost: {
    amount: 5210,
    currency: "USD",
  },

  costPerKg: {
    amount: 20.84,
    currency: "USD",
  },

  costPerUnit: {
    amount: 521,
    currency: "USD",
  },

  logisticsPercentage: 30.25,

  realityScore: "HIGH",

  calculatedAt: "2026-08-30T18:00:00.000Z",

  reference: "MOCK-CALCULATION-001",
};