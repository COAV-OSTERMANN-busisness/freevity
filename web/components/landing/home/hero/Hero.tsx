import Image from "next/image";
import Link from "next/link";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  return (
    <section
      aria-labelledby="landing-title"
      className="relative flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <span className="mb-6 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-primary)]">
            {translate(locale, "landing.hero.badge")}
          </span>

          <h1
            id="landing-title"
            className="max-w-4xl text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl"
          >
            {translate(locale, "landing.hero.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            {translate(locale, "landing.hero.description")}
          </p>

          <Link
            href="/calculator"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-[var(--brand-primary)] px-8 py-3 font-semibold shadow-sm transition-colors hover:bg-[var(--brand-primary-dark)] active:bg-[var(--brand-primary-deep)]"
          >
            {translate(locale, "landing.hero.cta")}
          </Link>
        </div>

        <div className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center">
          <div className="relative h-72 w-full overflow-hidden rounded-xl shadow-lg sm:h-96">
            <Image
              src="https://images.unsplash.com/photo-1784915475851-326b1ebc072d?auto=format&fit=crop&w=1200&q=80"
              alt={translate(locale, "landing.hero.imageAlt")}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>

          <div className="absolute left-1/2 top-full w-11/12 max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-lg lg:left-auto lg:right-0 lg:top-8 lg:translate-x-0 lg:translate-y-0">
            <div className="mb-2 text-center font-semibold text-[var(--color-primary)]">
              {translate(locale, "landing.hero.summary.title")}
            </div>

            <div className="flex flex-col gap-1 text-sm text-[var(--color-text)]">
              <div className="flex justify-between gap-4">
                <span>{translate(locale, "landing.hero.summary.freight")}</span>
                <span>
                  {translate(locale, "landing.hero.summary.freightValue")}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>
                  {translate(locale, "landing.hero.summary.insurance")}
                </span>
                <span>
                  {translate(locale, "landing.hero.summary.insuranceValue")}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>{translate(locale, "landing.hero.summary.customs")}</span>
                <span>
                  {translate(locale, "landing.hero.summary.customsValue")}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>
                  {translate(locale, "landing.hero.summary.handling")}
                </span>
                <span>
                  {translate(locale, "landing.hero.summary.handlingValue")}
                </span>
              </div>

              <div className="mt-2 flex justify-between gap-4 border-t border-[var(--color-border)] pt-2 font-bold">
                <span>{translate(locale, "landing.hero.summary.total")}</span>
                <span>
                  {translate(locale, "landing.hero.summary.totalValue")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
