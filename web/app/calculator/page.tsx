import { Advertising } from "@/components/advertising";
import { CalculatorWorkspace } from "@/components/calculator";
import { mockCalculationResult, mockFreightResult } from "@/mocks/calculation";

export default function CalculatorPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section
        aria-label="Advertising"
        className="border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-8 sm:px-6 lg:px-8"
      >
        <div
          className="mx-auto flex min-h-32 w-full max-w-7xl items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]"
          style={{ marginTop: "3rem" }}
        >
          <Advertising
            provider="google"
            format="banner"
          />
        </div>
      </section>

      <CalculatorWorkspace
        landedCostResult={mockCalculationResult}
      />
    </div>
  );
}