export interface CalculateVolumeInput {
  length: number;
  width: number;
  height: number;
}

function assertPositiveFinite(value: number, field: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${field} must be a finite number greater than zero.`);
  }
}

export function calculateVolume({
  length,
  width,
  height,
}: CalculateVolumeInput): number {
  assertPositiveFinite(length, "Length");
  assertPositiveFinite(width, "Width");
  assertPositiveFinite(height, "Height");

  const volume = length * width * height;

  if (!Number.isFinite(volume)) {
    throw new Error("Calculated volume must be finite.");
  }

  return volume;
}
