import type { Locale } from "../../types/i18n/types";

export const SUPPORTED_LOCALES: readonly Locale[] = [
  "en",
  "es",
  "pt",
  "ja",
] as const;

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  ja: "日本語",
};

export function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}
