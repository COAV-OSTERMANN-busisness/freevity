export type VolumeUnit = "cm3" | "m3";

const CUBIC_METERS_PER_UNIT: Readonly<Record<VolumeUnit, number>> = {
  cm3: 0.000001,
  m3: 1,
};

function assertFiniteNonNegative(value: number, field: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${field} must be a finite non-negative number.`);
  }
}

export function convertVolume(
  value: number,
  from: VolumeUnit,
  to: VolumeUnit
): number {
  assertFiniteNonNegative(value, "Volume");

  const valueInCubicMeters =
    value * CUBIC_METERS_PER_UNIT[from];

  return valueInCubicMeters / CUBIC_METERS_PER_UNIT[to];
}

export function cubicCentimetersToCubicMeters(
  value: number
): number {
  return convertVolume(value, "cm3", "m3");
}