"use client";

import type { AdditionalFreightCharge } from "@/types/calculation/freight/additionalFreightCharge";

interface AdditionalFreightFieldProps {
  charge: AdditionalFreightCharge;
  valueLabel: string;
  removeLabel: string;
  onAmountChange: (
    id: string,
    amount: number,
  ) => void;
  onRemove: (id: string) => void;
}

export function AdditionalFreightField({
  charge,
  valueLabel,
  removeLabel,
  onAmountChange,
  onRemove,
}: AdditionalFreightFieldProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <label className="block">
        <span
          className="mb-2 block text-sm font-medium"
          style={{ color: "var(--color-text)" }}
        >
          {charge.label}
        </span>

        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {charge.amount.currency}
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={
              Number.isFinite(charge.amount.amount)
                ? charge.amount.amount
                : ""
            }
            aria-label={`${charge.label} - ${valueLabel}`}
            onChange={(event) => {
              const value = event.target.value;

              onAmountChange(
                charge.id,
                value === "" ? 0 : Number(value),
              );
            }}
            className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] py-3 pr-4 pl-16 text-sm outline-none transition"
            style={{ color: "var(--color-text)" }}
          />
        </div>
      </label>

      <button
        type="button"
        onClick={() => onRemove(charge.id)}
        aria-label={`${removeLabel}: ${charge.label}`}
        className="min-h-11 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold transition"
        style={{
          color: "var(--color-text)",
          backgroundColor: "var(--color-background)",
        }}
      >
        {removeLabel}
      </button>
    </div>
  );
}