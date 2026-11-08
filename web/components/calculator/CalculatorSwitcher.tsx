"use client";

export type CalculatorType =
  | "freight"
  | "landedCost";

interface CalculatorSwitcherProps {
  activeCalculator: CalculatorType;
  onChange: (calculator: CalculatorType) => void;

  freightLabel: string;
  landedCostLabel: string;
}

export function CalculatorSwitcher({
  activeCalculator,
  onChange,
  freightLabel,
  landedCostLabel,
}: CalculatorSwitcherProps) {
  return (
    <div
      className="flex w-full gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2"
      role="group"
    >
      <button
        type="button"
        onClick={() => onChange("freight")}
        aria-pressed={activeCalculator === "freight"}
        className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:text-base"
        style={{
          backgroundColor:
            activeCalculator === "freight"
              ? "var(--brand-primary)"
              : "transparent",
          color:
            activeCalculator === "freight"
              ? "#ffffff"
              : "var(--color-text)",
        }}
      >
        {freightLabel}
      </button>

      <button
        type="button"
        onClick={() => onChange("landedCost")}
        aria-pressed={activeCalculator === "landedCost"}
        className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:text-base"
        style={{
          backgroundColor:
            activeCalculator === "landedCost"
              ? "var(--brand-primary)"
              : "transparent",
          color:
            activeCalculator === "landedCost"
              ? "#ffffff"
              : "var(--color-text)",
        }}
      >
        {landedCostLabel}
      </button>
    </div>
  );
}