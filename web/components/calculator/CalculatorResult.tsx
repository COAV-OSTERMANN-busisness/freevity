"use client";

import { messages } from "@/lib/i18n/messages";

import { useI18n } from "@/components/providers/i18n";

import type { FreightResult } from "@/types/calculation/freight/freightResult";
import type { CalculationResult } from "@/types/calculation/landedCost/calculationResult";

interface CalculatorResultProps {
  result: CalculationResult | FreightResult;
}

function formatMoney(
  amount: number,
  currency: string,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatPercentage(
  value: number,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

function formatNumber(
  value: number,
  locale: string,
  maximumFractionDigits = 2,
): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
  }).format(value);
}

function isFreightResult(
  result: CalculationResult | FreightResult,
): result is FreightResult {
  return "totalFreight" in result;
}

export function CalculatorResult({
  result,
}: CalculatorResultProps) {
  const { locale } = useI18n();

  /*
   * Freight Calculator result.
   *
   * This branch is isolated from the existing landed-cost
   * presentation so the original calculator remains unchanged.
   */
  if (isFreightResult(result)) {
    const translations =
      messages[locale].calculator.freight.result;

    const breakdownItems = [
      {
        key: "baseFreight",
        label: translations.breakdown.baseFreight,
        value: result.baseFreight,
      },
      ...result.additionalCharges.map((charge) => ({
        key: charge.id,
        label: charge.label,
        value: charge.amount,
      })),
    ];

    const metrics: Array<{
      key: string;
      label: string;
      value: string;
    }> = [];

    if (result.actualWeight !== undefined) {
      metrics.push({
        key: "actualWeight",
        label: translations.metrics.actualWeight,
        value: `${formatNumber(
          result.actualWeight,
          locale,
        )} kg`,
      });
    }

    if (result.volumetricWeight !== undefined) {
      metrics.push({
        key: "volumetricWeight",
        label: translations.metrics.volumetricWeight,
        value: `${formatNumber(
          result.volumetricWeight,
          locale,
        )} kg`,
      });
    }

    if (result.chargeableWeight !== undefined) {
      metrics.push({
        key: "chargeableWeight",
        label: translations.metrics.chargeableWeight,
        value: `${formatNumber(
          result.chargeableWeight,
          locale,
        )} kg`,
      });
    }

    if (result.volume !== undefined) {
      metrics.push({
        key: "volume",
        label: translations.metrics.volume,
        value: `${formatNumber(
          result.volume,
          locale,
          4,
        )} m³`,
      });
    }

    metrics.push(
      {
        key: "transportMode",
        label: translations.metrics.transportMode,
        value: translations.modes[result.mode],
      },
      {
        key: "operation",
        label: translations.metrics.operation,
        value: translations.scope[result.scope],
      },
    );

    return (
      <section
        aria-labelledby="calculator-result-title"
        className="w-full bg-[var(--color-background)] py-12"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2
              id="calculator-result-title"
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: "var(--color-text)" }}
            >
              {translations.title}
            </h2>

            <p
              className="mt-2 max-w-2xl text-sm leading-6 sm:text-base"
              style={{ color: "var(--color-muted)" }}
            >
              {translations.description}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-muted)" }}
              >
                {translations.totalLabel}
              </span>

              <div
                className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ color: "var(--brand-primary)" }}
              >
                {formatMoney(
                  result.totalFreight.amount,
                  result.totalFreight.currency,
                  locale,
                )}
              </div>

              <div className="mt-8 space-y-4">
                {breakdownItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-b-0"
                  >
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {item.label}
                    </span>

                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {formatMoney(
                        item.value.amount,
                        item.value.currency,
                        locale,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {metrics.map((metric) => (
                <div
                  key={metric.key}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {metric.label}
                  </span>

                  <div
                    className="mt-2 text-2xl font-bold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /*
   * Existing Landed Cost result.
   * Original implementation preserved.
   */
  const translations =
    messages[locale].calculator.result;

  const breakdownItems = [
    {
      key: "cargo",
      label: translations.breakdown.cargo,
      value: result.breakdown.cargo,
    },
    {
      key: "freight",
      label: translations.breakdown.freight,
      value: result.breakdown.freight,
    },
    {
      key: "insurance",
      label: translations.breakdown.insurance,
      value: result.breakdown.insurance,
    },
    {
      key: "customs",
      label: translations.breakdown.customs,
      value: result.breakdown.customs,
    },
    {
      key: "handling",
      label: translations.breakdown.handling,
      value: result.breakdown.handling,
    },
    {
      key: "localTransport",
      label: translations.breakdown.localTransport,
      value: result.breakdown.localTransport,
    },
    {
      key: "otherCosts",
      label: translations.breakdown.otherCosts,
      value: result.breakdown.otherCosts,
    },
  ];

  const realityScoreLabel =
    translations.realityScore[
      result.realityScore.toLowerCase() as
        | "low"
        | "medium"
        | "high"
    ];

  return (
    <section
      aria-labelledby="calculator-result-title"
      className="w-full bg-[var(--color-background)] py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="calculator-result-title"
            className="text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--color-text)" }}
          >
            {translations.title}
          </h2>

          <p
            className="mt-2 max-w-2xl text-sm leading-6 sm:text-base"
            style={{ color: "var(--color-muted)" }}
          >
            {translations.description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              {translations.totalLabel}
            </span>

            <div
              className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
              style={{ color: "var(--brand-primary)" }}
            >
              {formatMoney(
                result.totalLandedCost.amount,
                result.totalLandedCost.currency,
                locale,
              )}
            </div>

            <div className="mt-8 space-y-4">
              {breakdownItems.map((item) => {
                if (!item.value) {
                  return null;
                }

                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-3 last:border-b-0"
                  >
                    <span
                      className="text-sm"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {item.label}
                    </span>

                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {formatMoney(
                        item.value.amount,
                        item.value.currency,
                        locale,
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {translations.metrics.costPerKg}
              </span>

              <div
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {formatMoney(
                  result.costPerKg.amount,
                  result.costPerKg.currency,
                  locale,
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {translations.metrics.costPerUnit}
              </span>

              <div
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {formatMoney(
                  result.costPerUnit.amount,
                  result.costPerUnit.currency,
                  locale,
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {translations.metrics.logisticsPercentage}
              </span>

              <div
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {formatPercentage(
                  result.logisticsPercentage,
                  locale,
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {translations.realityScore.label}
              </span>

              <div
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--brand-primary)" }}
              >
                {realityScoreLabel}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}