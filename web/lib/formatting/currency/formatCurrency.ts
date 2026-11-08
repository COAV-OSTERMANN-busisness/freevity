import type { Locale } from "@/types/i18n/types";

export interface FormatCurrencyOptions {
  locale: Locale;
  currency: "USD" | "EUR" | "GBP" | "BRL" | "JPY";
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatCurrency(
  value: number,
  options: FormatCurrencyOptions
): string {
  const {
    locale,
    currency,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}
