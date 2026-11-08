import type { Locale } from "@/types/i18n/types";

export interface FormatNumberOptions {
  locale: Locale;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}

export function formatNumber(
  value: number,
  options: FormatNumberOptions
): string {
  const {
    locale,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true,
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(value);
}
