import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "@/lib/i18n/translate";
import type { Locale } from "@/types/i18n/types";

interface FAQProps {
  locale: Locale;
}

const questions = ["one", "two", "three", "four", "five"] as const;

export function FAQ({ locale }: FAQProps) {
  return (
    <section
      aria-labelledby="faq-title"
      className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="faq-title"
            className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl"
          >
            {translate(locale, "landing.faq.title")}
          </h2>

          <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
            {translate(locale, "landing.faq.description")}
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {questions.map((question) => (
            <details
              key={question}
              className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 text-base font-bold text-[var(--text)]">
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-[var(--brand-primary)]"
                />

                <span className="flex-1">
                  {translate(locale, `landing.faq.items.${question}.question`)}
                </span>

                <span className="text-xl text-[var(--brand-primary)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 pl-9 text-sm leading-7 text-[var(--muted)]">
                {translate(locale, `landing.faq.items.${question}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
