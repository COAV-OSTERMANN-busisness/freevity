import type { Locale } from "@/types/i18n/types";

export interface FormatPercentageOptions {
  locale: Locale;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatPercentage(
  value: number,
  options: FormatPercentageOptions
): string {
  const {
    locale,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}
