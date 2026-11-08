import type { Locale } from "@/types/i18n/types";

export interface FormatVolumeOptions {
  locale: Locale;
  unit?: "liter" | "milliliter";
  maximumFractionDigits?: number;
}

export function formatVolume(
  value: number,
  options: FormatVolumeOptions
): string {
  const { locale, unit = "liter", maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "short",
    maximumFractionDigits,
  }).format(value);
}
