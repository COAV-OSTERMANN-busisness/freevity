"use client";

import Link from "next/link";

import { LanguageSelector } from "@/components/layout/language-selector";
import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/components/providers/i18n";
import { messages } from "@/lib/i18n/messages";

export type HeaderNavigationKey = keyof typeof messages.en.common.header;

export interface HeaderNavigationItem {
  labelKey: HeaderNavigationKey;
  href: string;
}

export interface HeaderAction {
  labelKey: HeaderNavigationKey;
  href: string;
}

export interface HeaderProps {
  navigation: readonly HeaderNavigationItem[];
  primaryAction?: HeaderAction;
  mobileMenuLabel?: string;
}

interface NavigationLinksProps {
  items: readonly HeaderNavigationItem[];
  mobile?: boolean;
}

function NavigationLinks({ items, mobile = false }: NavigationLinksProps) {
  const { locale } = useI18n();
  const translations = messages[locale].common.header;

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            mobile
              ? "rounded-lg px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-background)] hover:text-[var(--color-primary)]"
              : "text-sm font-medium text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
          }
          style={{ color: "black" }}
        >
          {translations[item.labelKey]}
        </Link>
      ))}
    </>
  );
}

function PrimaryAction({
  action,
  mobile = false,
}: {
  action: HeaderAction;
  mobile?: boolean;
}) {
  const { locale } = useI18n();
  const translations = messages[locale].common.header;

  return (
    <Link
      href={action.href}
      className={
        mobile
          ? "mt-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-[var(--color-primary-dark)]"
          : "rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
      }
      style={{ color: "black" }}
    >
      {translations[action.labelKey]}
    </Link>
  );
}

export function Header({
  navigation,
  primaryAction,
  mobileMenuLabel,
}: HeaderProps) {
  const { locale } = useI18n();
  const translations = messages[locale].common.header;

  const resolvedMobileMenuLabel = mobileMenuLabel ?? translations.mobileMenu;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo
          variant="icon"
          href="/"
          width={40}
          priority
          className="h-10 w-10 object-contain"
        />

        <div className="flex items-center gap-4">
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 md:flex"
          >
            <NavigationLinks items={navigation} />

            {primaryAction && <PrimaryAction action={primaryAction} />}
          </nav>

          <LanguageSelector />

          <details className="relative md:hidden">
            <summary
              aria-label={resolvedMobileMenuLabel}
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text)] [&::-webkit-details-marker]:hidden"
            >
              <span className="sr-only">{resolvedMobileMenuLabel}</span>

              <span className="flex flex-col gap-1.5" aria-hidden="true">
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
                <span className="h-0.5 w-5 bg-current" />
              </span>
            </summary>

            <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-lg">
              <nav aria-label="Mobile navigation" className="flex flex-col">
                <NavigationLinks items={navigation} mobile />

                {primaryAction && (
                  <PrimaryAction action={primaryAction} mobile />
                )}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
