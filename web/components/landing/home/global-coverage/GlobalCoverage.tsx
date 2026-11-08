import {
  faGlobeAmericas,
  faGlobeAsia,
  faGlobeEurope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface GlobalCoverageProps {
  locale: Locale;
}

const markets = [
  {
    key: "brazil",
    icon: faLocationDot,
  },
  {
    key: "unitedStates",
    icon: faGlobeAmericas,
  },
  {
    key: "euroMarkets",
    icon: faGlobeEurope,
  },
  {
    key: "japan",
    icon: faGlobeAsia,
  },
] as const;

export function GlobalCoverage({ locale }: GlobalCoverageProps) {
  return (
    <section
      aria-labelledby="global-coverage-title"
      className="border-t border-[var(--brand-primary-dark)] bg-[var(--brand-primary)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="global-coverage-title"
            className="text-3xl font-bold tracking-tight text-[var(--surface)] sm:text-4xl"
          >
            {translate(locale, "landing.globalCoverage.title")}
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--surface)] sm:text-lg">
            {translate(locale, "landing.globalCoverage.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {markets.map((market) => (
            <article
              key={market.key}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)]">
                <FontAwesomeIcon
                  icon={market.icon}
                  aria-hidden="true"
                  className="h-5 w-5 text-white"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-[var(--text)]">
                {translate(
                  locale,
                  `landing.globalCoverage.markets.${market.key}.title`,
                )}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {translate(
                  locale,
                  `landing.globalCoverage.markets.${market.key}.description`,
                )}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex w-full justify-center">
          <p className="w-full max-w-2xl text-center text-sm leading-6 text-[var(--surface)]">
            {translate(locale, "landing.globalCoverage.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
