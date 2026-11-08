import type { Locale } from "@/types/i18n/types";

export interface FormatDistanceOptions {
  locale: Locale;
  unit?: "kilometer" | "meter";
  maximumFractionDigits?: number;
}

export function formatDistance(
  value: number,
  options: FormatDistanceOptions
): string {
  const { locale, unit = "kilometer", maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: "short",
    maximumFractionDigits,
  }).format(value);
}
