import {
  faBoxOpen,
  faCalculator,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface HowItWorksProps {
  locale: Locale;
}

const steps = [
  {
    key: "one",
    icon: faBoxOpen,
    side: "left",
  },
  {
    key: "two",
    icon: faCoins,
    side: "right",
  },
  {
    key: "three",
    icon: faCalculator,
    side: "left",
  },
] as const;

export function HowItWorks({ locale }: HowItWorksProps) {
  return (
    <section
      aria-labelledby="how-it-works-title"
      className="relative overflow-hidden border-t border-[var(--brand-primary-dark)] bg-[var(--brand-primary)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="how-it-works-title"
            className="text-3xl font-bold tracking-tight text-[var(--surface)] sm:text-4xl"
          >
            {translate(locale, "landing.howItWorks.title")}
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--surface)] sm:text-lg">
            {translate(locale, "landing.howItWorks.description")}
          </p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-6 hidden h-[calc(100%-3rem)] w-px -translate-x-1/2 bg-[var(--brand-primary-bright)] md:block"
          />

          <div className="flex flex-col gap-8 md:gap-10">
            {steps.map((step) => {
              const card = (
                <article className="rounded-2xl border border-[var(--brand-primary-light)] bg-[var(--brand-primary-dark)] p-6 shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)]">
                    <FontAwesomeIcon
                      icon={step.icon}
                      aria-hidden="true"
                      className="h-5 w-5 text-[var(--brand-primary)]"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[var(--surface)]">
                    {translate(
                      locale,
                      `landing.howItWorks.steps.${step.key}.title`,
                    )}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--surface)]">
                    {translate(
                      locale,
                      `landing.howItWorks.steps.${step.key}.description`,
                    )}
                  </p>
                </article>
              );

   const node = (
  <div className="relative z-10 hidden items-center justify-center md:flex">
    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--brand-primary-deep)] bg-[var(--surface)] shadow-lg">
      <FontAwesomeIcon
        icon={step.icon}
        aria-hidden="true"
        className="h-5 w-5 text-[var(--brand-primary)]"
      />
    </div>
  </div>
);

              return (
                <div
  key={step.key}
  className="grid gap-5 md:grid-cols-[1fr_5rem_1fr] md:items-center"
>
  <div>
    {step.side === "left" && card}
  </div>

  {node}

  <div>
    {step.side === "right" && card}
  </div>
</div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-[var(--brand-primary-light)] bg-[var(--brand-primary-dark)] px-6 py-5 text-center shadow-lg">
          <p className="text-base font-bold text-[var(--surface)] sm:text-lg">
            {translate(locale, "landing.howItWorks.result.title")}
          </p>

          <p className="mt-2 text-sm leading-6 text-[var(--surface)]">
            {translate(locale, "landing.howItWorks.result.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
