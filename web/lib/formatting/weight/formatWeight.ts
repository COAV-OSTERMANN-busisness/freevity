import type { Locale } from "@/types/i18n/types";

export interface FormatWeightOptions {
  locale: Locale;
  unit?: "kilogram" | "gram";
  maximumFractionDigits?: number;
}

export function formatWeight(
  value: number,
  options: FormatWeightOptions
): string {
  const { locale, unit = "kilogram", maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "short",
    maximumFractionDigits,
  }).format(value);
}
