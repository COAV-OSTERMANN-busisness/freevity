import { describe, expect, it } from "vitest";
import { calculateRealityScore } from "@/lib/calculation/landedCost/calculateRealityScore";

describe("calculateRealityScore", () => {
  it("returns HIGH when all MVP factors are valid", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 20,
      totalWeight: { value: 100, unit: "kg" },
      cargoValue: { amount: 1000, currency: "USD" },
    });

    expect(result).toBe("HIGH");
  });

  it("returns MEDIUM when two MVP factors are valid", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 20,
      totalWeight: { value: 100, unit: "kg" },
      cargoValue: { amount: 0, currency: "BRL" },
    });

    expect(result).toBe("MEDIUM");
  });

  it("returns LOW when only one MVP factor is valid", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 20,
      totalWeight: { value: 0, unit: "kg" },
      cargoValue: { amount: 0, currency: "EUR" },
    });

    expect(result).toBe("LOW");
  });

  it("returns LOW when all MVP factors are zero", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 0,
      totalWeight: { value: 0, unit: "kg" },
      cargoValue: { amount: 0, currency: "JPY" },
    });

    expect(result).toBe("LOW");
  });

  it("accepts a zero logistics percentage", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 0,
      totalWeight: { value: 100, unit: "kg" },
      cargoValue: { amount: 1000, currency: "BRL" },
    });

    expect(result).toBe("HIGH");
  });

  it("throws when logistics percentage is negative", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: -1,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Logistics percentage must be zero or greater.");
  });

  it("throws when logistics percentage is NaN", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: Number.NaN,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Logistics percentage must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when logistics percentage is %s", (value) => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: value,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Logistics percentage must be a finite number.");
  });

  it("throws when total weight is negative", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value: -1, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Total weight must be zero or greater.");
  });

  it("throws when total weight is NaN", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value: Number.NaN, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Total weight must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when total weight is %s", (value) => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value, unit: "kg" },
        cargoValue: { amount: 1000, currency: "USD" },
      }),
    ).toThrow("Total weight must be a finite number.");
  });

  it("throws when cargo value is negative", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: -1, currency: "USD" },
      }),
    ).toThrow("Cargo value must be zero or greater.");
  });

  it("throws when cargo value is NaN", () => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: Number.NaN, currency: "USD" },
      }),
    ).toThrow("Cargo value must be a finite number.");
  });

  it.each([
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ])("throws when cargo value is %s", (value) => {
    expect(() =>
      calculateRealityScore({
        logisticsPercentage: 20,
        totalWeight: { value: 100, unit: "kg" },
        cargoValue: { amount: value, currency: "USD" },
      }),
    ).toThrow("Cargo value must be a finite number.");
  });

  it("accepts positive decimal values", () => {
    const result = calculateRealityScore({
      logisticsPercentage: 12.5,
      totalWeight: { value: 0.5, unit: "kg" },
      cargoValue: { amount: 100.75, currency: "EUR" },
    });

    expect(result).toBe("HIGH");
  });
});