export type LengthUnit = "mm" | "cm" | "m" | "km";

const METERS_PER_UNIT: Readonly<Record<LengthUnit, number>> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
};

function assertFiniteNonNegative(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a finite non-negative number.`);
  }
}

export function convertLength(
  value: number,
  from: LengthUnit,
  to: LengthUnit
): number {
  assertFiniteNonNegative(value, "Length");

  const valueInMeters = value * METERS_PER_UNIT[from];

  return valueInMeters / METERS_PER_UNIT[to];
}

export function centimetersToMeters(value: number): number {
  return convertLength(value, "cm", "m");
}
