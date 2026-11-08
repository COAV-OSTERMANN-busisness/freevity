"use client";

import { LOCALE_LABELS, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { useI18n } from "@/components/providers/i18n";

export interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  return (
    <label className={`flex items-center gap-2 ${className}`}>
      <span className="sr-only">Language</span>

      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
        aria-label="Language"
      >
        {SUPPORTED_LOCALES.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {LOCALE_LABELS[supportedLocale]}
          </option>
        ))}
      </select>
    </label>
  );
}
