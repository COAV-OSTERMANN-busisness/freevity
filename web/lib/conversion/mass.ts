export type MassUnit = "g" | "kg" | "t";

const KILOGRAMS_PER_UNIT: Readonly<Record<MassUnit, number>> = {
  g: 0.001,
  kg: 1,
  t: 1000,
};

export function convertMass(
  value: number,
  from: MassUnit,
  to: MassUnit
): number {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error("Mass must be a finite non-negative number.");
  }

  return (value * KILOGRAMS_PER_UNIT[from]) / KILOGRAMS_PER_UNIT[to];
}
