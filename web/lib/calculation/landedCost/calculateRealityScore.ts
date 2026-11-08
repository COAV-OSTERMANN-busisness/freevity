import type { Money, RealityScore, Weight } from "@/types/calculation/landedCost";

export interface RealityScoreInput {
  logisticsPercentage: number;
  totalWeight: Weight;
  cargoValue: Money;
}

/**
 * Calculates the Reality Score used as a planning/estimation indicator.
 *
 * MVP scoring model:
 * - Weight information: 20 points
 * - Cargo value information: 20 points
 * - Logistics percentage: 20 points
 *
 * The current MVP uses three factors because the domain already provides
 * these concepts explicitly.
 *
 * Maximum raw score: 60 points.
 * The raw score is normalized to a 0-100 scale before classification.
 *
 * Classification:
 * - 70-100 → HIGH
 * - 40-69  → MEDIUM
 * - 0-39   → LOW
 *
 * IMPORTANT:
 * This score is an estimation/planning indicator.
 * It is NOT:
 * - a statistical prediction;
 * - an official customs calculation;
 * - a tax authority determination;
 * - a legal classification;
 * - a carrier quotation;
 * - a guaranteed landed cost.
 *
 * FUTURE EXTENSIONS:
 *
 * The original product concept also identifies:
 *
 * 1. Estimated cost count
 *    The current domain does not explicitly identify which costs are
 *    estimated. A future domain model should represent this explicitly
 *    instead of inferring it inside the calculation engine.
 *
 * 2. Uncertainty level
 *    The current domain does not contain an explicit uncertainty model.
 *    A future domain change should define how uncertainty is represented
 *    before incorporating it into this score.
 *
 * When those concepts become available, the scoring model can evolve from
 * the current three-factor model to a five-factor weighted model.
 */
export function calculateRealityScore(input: RealityScoreInput): RealityScore {
  validateInput(input);

  const weightScore = input.totalWeight.value > 0 ? 20 : 0;

  const cargoValueScore = input.cargoValue.amount > 0 ? 20 : 0;

  const logisticsPercentageScore = input.logisticsPercentage >= 0 ? 20 : 0;

  const rawScore = weightScore + cargoValueScore + logisticsPercentageScore;

  const normalizedScore = (rawScore / 60) * 100;

  return scoreToRealityScore(normalizedScore);
}

function validateInput(input: RealityScoreInput): void {
  if (!Number.isFinite(input.logisticsPercentage)) {
    throw new Error("Logistics percentage must be a finite number.");
  }

  if (input.logisticsPercentage < 0) {
    throw new Error("Logistics percentage must be zero or greater.");
  }

  if (!Number.isFinite(input.totalWeight.value)) {
    throw new Error("Total weight must be a finite number.");
  }

  if (input.totalWeight.value < 0) {
    throw new Error("Total weight must be zero or greater.");
  }

  if (!Number.isFinite(input.cargoValue.amount)) {
    throw new Error("Cargo value must be a finite number.");
  }

  if (input.cargoValue.amount < 0) {
    throw new Error("Cargo value must be zero or greater.");
  }
}

function scoreToRealityScore(score: number): RealityScore {
  if (score >= 70) {
    return "HIGH";
  }

  if (score >= 40) {
    return "MEDIUM";
  }

  return "LOW";
}
