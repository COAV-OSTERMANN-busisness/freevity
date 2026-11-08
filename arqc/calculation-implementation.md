# Frevity Calculation Module — Implementation Guide

## 1. Purpose

The `calculation` module is the mathematical and domain core of Frevity.

Its responsibility is to represent shipment/cargo data, represent logistics cost components, calculate derived costs and metrics, and produce a final landed-cost result.

The module is intentionally independent from React, Next.js, Tailwind, browser APIs, analytics, advertisements, persistence, and external carrier/routing APIs.

The architectural flow is:

```text
User Input
    ↓
Validation
    ↓
Calculation Domain Model
    ↓
Calculation Engine
    ↓
Calculation Result
    ↓
Presentation / Formatting / UI
```

The key principle is:

> Types describe the business objects. Functions implement deterministic business calculations. Presentation formats the result.

---

# 2. Module structure

```text
web/
├── types/
│   └── calculation/
│       ├── cargo.ts
│       ├── transport.ts
│       ├── freight.ts
│       ├── insurance.ts
│       ├── customs.ts
│       ├── handling.ts
│       ├── localTransport.ts
│       ├── otherCosts.ts
│       ├── calculationResult.ts
│       └── index.ts
│
└── lib/
    └── calculation/
        ├── calculateFreight.ts
        ├── calculateInsurance.ts
        ├── calculateCustoms.ts
        ├── calculateHandling.ts
        ├── calculateLocalTransport.ts
        ├── calculateLandedCost.ts
        ├── calculateCostPerKg.ts
        ├── calculateCostPerUnit.ts
        └── calculateLogisticsPercentage.ts
```

There are two conceptual layers:

```text
types/calculation
        ↓
"What data exists?"

lib/calculation
        ↓
"What do we do with that data?"
```

---

# 3. Type vs function

A type such as:

```ts
interface Money {
  amount: number;
  currency: CurrencyCode;
}
```

does not calculate anything. It describes valid data.

A function such as:

```ts
function calculateCostPerKg(...) {
  ...
}
```

contains behavior.

Therefore:

```text
TYPE
  = structure / contract / shape of data

FUNCTION
  = behavior / rule / calculation applied to data
```

This separation is fundamental to keeping the calculation engine reusable and testable.

---

# 4. `cargo.ts`

## Responsibility

`cargo.ts` represents the physical and commercial characteristics of the shipment.

It describes what is being transported, not the transport service itself.

## `CurrencyCode`

```ts
export type CurrencyCode = string;
```

Represents a currency code such as `BRL`, `USD`, `EUR` or `JPY`.

Relationship:

```text
Money
 └── currency
      └── CurrencyCode
```

## `WeightUnit`

```ts
export type WeightUnit = "g" | "kg" | "lb";
```

Defines the supported weight units.

## `DimensionUnit`

```ts
export type DimensionUnit = "mm" | "cm" | "m" | "in" | "ft";
```

Defines supported physical dimension units.

## `Money`

```ts
export interface Money {
  amount: number;
  currency: CurrencyCode;
}
```

Represents a monetary value.

Example:

```ts
{
  amount: 1500,
  currency: "USD"
}
```

`amount` is the numeric value and `currency` identifies its monetary unit.

## `Weight`

```ts
export interface Weight {
  value: number;
  unit: WeightUnit;
}
```

Represents a physical weight.

Example:

```ts
{
  value: 500,
  unit: "kg"
}
```

## `CargoDimensions`

```ts
export interface CargoDimensions {
  length: number;
  width: number;
  height: number;
  unit: DimensionUnit;
}
```

Represents package dimensions.

Volume is intentionally derived rather than stored:

```text
Volume = length × width × height
```

This avoids two competing sources of truth.

## `CargoPackage`

```ts
export interface CargoPackage {
  quantity: number;
  type: string;
  dimensions?: CargoDimensions;
  weight?: Weight;
  description?: string;
}
```

Represents packaging/containerization.

Relationship:

```text
CargoPackage
 ├── dimensions → CargoDimensions
 └── weight     → Weight
```

## `CargoItem`

```ts
export interface CargoItem {
  description: string;
  quantity: number;
  weight?: Weight;
  declaredValue?: Money;
  sku?: string;
  hsCode?: string;
  packages?: CargoPackage[];
}
```

Represents the merchandise itself.

Important distinction:

```text
CargoItem = goods
CargoPackage = packaging
```

## `Cargo`

```ts
export interface Cargo {
  items: CargoItem[];
  totalWeight: Weight;
  declaredValue: Money;
  description?: string;
  packages?: CargoPackage[];
  notes?: string;
}
```

Represents the cargo as a whole.

Relationship:

```text
Cargo
 ├── items[] → CargoItem
 ├── totalWeight → Weight
 ├── declaredValue → Money
 ├── packages[] → CargoPackage
 └── notes
```

---

# 5. `transport.ts`

## Responsibility

Represents how and where the shipment is transported.

## `TransportMode`

```ts
export type TransportMode = "air" | "road" | "maritime";
```

MVP supports three transport modes.

## `TransportScope`

```ts
export type TransportScope = "national" | "international";
```

National means origin and destination are in the same country.

International means they are in different countries.

## `CountryCode`

```ts
export type CountryCode = string;
```

Represents a country code such as `BR`, `US`, `JP` or `ES`.

## `TransportLocation`

```ts
export interface TransportLocation {
  country: CountryCode;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  address?: string;
}
```

Represents a transport location.

`country` is required; more detailed address information can be absent.

## `Transport`

```ts
export interface Transport {
  mode: TransportMode;
  scope: TransportScope;
  origin: TransportLocation;
  destination: TransportLocation;
  distanceKm?: number;
  reference?: string;
  notes?: string;
}
```

Relationship:

```text
Transport
 ├── mode
 ├── scope
 ├── origin → TransportLocation
 ├── destination → TransportLocation
 ├── distanceKm
 ├── reference
 └── notes
```

`distanceKm` is canonical internal distance. A future routing provider can supply it without becoming a dependency of the calculation engine.

---

# 6. `freight.ts`

## `FreightPayer`

```ts
export type FreightPayer =
  | "shipper"
  | "consignee"
  | "thirdParty";
```

Identifies who pays the freight.

## `FreightBasis`

```ts
export type FreightBasis =
  | "weight"
  | "volume"
  | "chargeableWeight"
  | "unit"
  | "flat";
```

Describes the commercial basis of a freight charge.

The basis itself is not a pricing formula.

## `Freight`

```ts
export interface Freight {
  mode: TransportMode;
  basis: FreightBasis;
  amount?: Money;
  payer?: FreightPayer;
  minimumCharge?: Money;
  additionalCharges?: Money[];
  reference?: string;
}
```

Relationship:

```text
Freight
 ├── mode → TransportMode
 ├── basis → FreightBasis
 ├── amount → Money
 ├── payer → FreightPayer
 ├── minimumCharge → Money
 └── additionalCharges[] → Money
```

The MVP does not invent a universal tariff from distance, weight, volume or mode.

---

# 7. `insurance.ts`

## `InsuranceBasis`

```ts
export type InsuranceBasis =
  | "declaredValue"
  | "cargoValue"
  | "shipmentValue";
```

Defines what value is used as the insurance basis.

## `Insurance`

```ts
export interface Insurance {
  enabled: boolean;
  insuredValue?: Money;
  basis?: InsuranceBasis;
  ratePercent?: number;
  amount?: Money;
  policyReference?: string;
}
```

Important fields:

```text
enabled       → whether insurance participates
insuredValue  → value used for calculation
basis         → meaning of that value
ratePercent   → insurance percentage
amount        → calculated/external amount
policyReference → external reference
```

Current insurance formula:

```text
Insurance = insuredValue × ratePercent / 100
```

---

# 8. `customs.ts`

## `Incoterm`

The model represents the 11 Incoterms 2020:

```text
EXW
FCA
CPT
CIP
DAP
DPU
DDP
FAS
FOB
CFR
CIF
```

## `CustomsProcedure`

```ts
export type CustomsProcedure =
  | "import"
  | "export"
  | "transit"
  | "other";
```

## `Customs`

```ts
export interface Customs {
  required: boolean;
  procedure?: CustomsProcedure;
  incoterm?: Incoterm;
  declaredValue?: Money;
  tariffCode?: string;
  originCountry?: string;
  destinationCountry?: string;
  documentReference?: string;
  duties?: Money;
  taxes?: Money;
  notes?: string;
}
```

This is intentionally generic.

Country-specific customs legislation and tax formulas do not belong inside this generic type.

---

# 9. `handling.ts`

## `HandlingType`

```ts
export type HandlingType =
  | "loading"
  | "unloading"
  | "packing"
  | "unpacking"
  | "palletizing"
  | "storage"
  | "other";
```

Defines handling categories.

## `HandlingCharge`

```ts
export interface HandlingCharge {
  type: HandlingType;
  quantity?: number;
  unitPrice?: Money;
  amount?: Money;
  description?: string;
}
```

Represents one handling charge.

## `Handling`

```ts
export interface Handling {
  required: boolean;
  charges?: HandlingCharge[];
  notes?: string;
}
```

The current calculation uses `amount` as the authoritative total charge.

It does not automatically assume:

```text
quantity × unitPrice
```

because that commercial derivation rule was not defined.

---

# 10. `localTransport.ts`

## `LocalTransportStage`

```ts
export type LocalTransportStage =
  | "origin"
  | "destination";
```

Indicates where the local transport occurs.

## `LocalTransportCharge`

```ts
export interface LocalTransportCharge {
  mode: TransportMode;
  origin?: TransportLocation;
  destination?: TransportLocation;
  distanceKm?: number;
  amount?: Money;
  reference?: string;
  description?: string;
}
```

Represents one local transportation leg.

## `LocalTransport`

```ts
export interface LocalTransport {
  required: boolean;
  stage?: LocalTransportStage;
  charges?: LocalTransportCharge[];
  notes?: string;
}
```

The current engine sums supplied charges. It does not invent a `distanceKm × ratePerKm` formula.

---

# 11. `otherCosts.ts`

## `OtherCostType`

```ts
export type OtherCostType =
  | "tax"
  | "duty"
  | "fee"
  | "surcharge"
  | "documentation"
  | "storage"
  | "inspection"
  | "terminal"
  | "security"
  | "other";
```

Classifies additional costs.

## `OtherCost`

```ts
export interface OtherCost {
  type: OtherCostType;
  description?: string;
  amount: Money;
  reference?: string;
}
```

`amount` is required because the item must have a monetary value to participate in the total.

## `OtherCosts`

```ts
export interface OtherCosts {
  items?: OtherCost[];
  notes?: string;
}
```

Represents the collection of additional costs.

---

# 12. `calculationResult.ts`

## `CalculationBreakdown`

```ts
export interface CalculationBreakdown {
  cargo?: Money;
  freight?: Money;
  insurance?: Money;
  customs?: Money;
  handling?: Money;
  localTransport?: Money;
  otherCosts?: Money;
}
```

Provides the itemized cost breakdown.

## `RealityScore`

```ts
export type RealityScore = "LOW" | "MEDIUM" | "HIGH";
```

This is a planning/reliability indicator.

It is not an official customs, tax, carrier, legal or guaranteed landed-cost classification.

## `CalculationResult`

```ts
export interface CalculationResult {
  currency: string;
  breakdown: CalculationBreakdown;
  totalLandedCost: Money;
  costPerKg: Money;
  costPerUnit: Money;
  logisticsPercentage: number;
  realityScore: RealityScore;
  calculatedAt?: string;
  reference?: string;
}
```

This is the output contract of the calculation engine.

The principal derived values are:

```text
totalLandedCost
costPerKg
costPerUnit
logisticsPercentage
realityScore
```

---

# 13. `index.ts`

The calculation barrel exports all calculation types and the established formatting utilities.

It allows consumers to import from the domain boundary:

```ts
import type {
  Cargo,
  Money,
  Freight,
  Insurance,
  Customs,
  CalculationResult,
} from "@/types/calculation";
```

instead of knowing every internal file path.

The module exports:

```text
cargo
transport
freight
insurance
customs
handling
localTransport
otherCosts
calculationResult
```

There is intentionally no generic `web/types/index.ts`.

---

# 14. Calculation engine

The implementation files under `web/lib/calculation/` contain behavior.

The nine current responsibilities are:

```text
calculateFreight()
calculateInsurance()
calculateCustoms()
calculateHandling()
calculateLocalTransport()
calculateLandedCost()
calculateCostPerKg()
calculateCostPerUnit()
calculateLogisticsPercentage()
```

All are designed to be deterministic and React-independent.

---

# 15. `calculateFreight()`

Formula:

```text
FreightSubtotal = BaseFreight + Σ AdditionalCharges
```

Then:

```text
FinalFreight = max(FreightSubtotal, MinimumCharge)
```

Or:

```text
F = B + ΣAᵢ

FinalFreight = max(F, M)
```

Where:

- `B` = base freight
- `Aᵢ` = additional freight charges
- `M` = minimum charge

The function validates that the freight components use one currency.

It does not invent pricing formulas from distance, weight, volume or transport mode.

---

# 16. `calculateInsurance()`

If insurance is disabled:

```text
Insurance = 0
```

If enabled:

```text
Insurance = InsuredValue × RatePercent / 100
```

Example:

```text
Insured value = $10,000
Rate = 1.5%

Insurance = 10,000 × 1.5 / 100
          = $150
```

The function validates that an insured value exists, that its currency matches the calculation currency, and that the rate is not negative.

---

# 17. `calculateCustoms()`

If customs is not required:

```text
Customs = 0
```

Otherwise:

```text
Customs = Duties + Taxes
```

The function does not invent tax or duty rates.

Those values must already be determined by the appropriate business/customs layer.

---

# 18. `calculateHandling()`

If handling is not required:

```text
Handling = 0
```

Otherwise:

```text
Handling = Σ ChargeAmountᵢ
```

The current implementation uses `amount` as the source of truth.

It does not automatically calculate:

```text
quantity × unitPrice
```

without an explicit business rule.

---

# 19. `calculateLocalTransport()`

If local transport is not required:

```text
LocalTransport = 0
```

Otherwise:

```text
LocalTransport = Σ ChargeAmountᵢ
```

`distanceKm` remains domain data for future pricing policies.

---

# 20. `calculateLandedCost()`

This is the central aggregation.

Formula:

```text
LandedCost =
    Freight
  + Insurance
  + Customs
  + Handling
  + LocalTransport
  + OtherCosts
```

Mathematically:

```text
LC = F + I + C + H + LT + O
```

The engine also verifies currency consistency.

For example:

```text
100 BRL + 100 BRL
```

is valid.

But:

```text
100 BRL + 100 USD
```

must not be silently treated as one monetary total.

Currency resolution happens before the calculation engine.

---

# 21. `calculateCostPerKg()`

Formula:

```text
CostPerKg = TotalCost / WeightKg
```

The function normalizes the supplied weight.

Conversions:

```text
kg = g / 1000
```

and:

```text
kg = lb × 0.45359237
```

Example:

```text
Total cost = $2,000
Weight = 500 kg

CostPerKg = 2,000 / 500
          = $4/kg
```

Weight must be greater than zero.

---

# 22. `calculateCostPerUnit()`

Formula:

```text
CostPerUnit = TotalCost / Quantity
```

Example:

```text
Total cost = $10,000
Quantity = 500

CostPerUnit = 10,000 / 500
            = $20/unit
```

Quantity must be greater than zero.

---

# 23. `calculateLogisticsPercentage()`

Formula:

```text
LogisticsPercentage =
    LogisticsCost / CargoValue × 100
```

Mathematically:

```text
LP = (L / V) × 100
```

Where:

- `L` = logistics cost
- `V` = cargo value
- `LP` = logistics percentage

Example:

```text
Logistics cost = $2,000
Cargo value = $20,000

LP = (2,000 / 20,000) × 100
   = 10%
```

Cargo value must be greater than zero and both monetary values must use the same currency.

The function returns a raw number. Display formatting such as `10.00%` belongs to the formatting layer.

---

# 24. Complete calculation flow

```text
                    Freight
                       │
                       ▼
               calculateFreight()
                       │
                       ▼
                    Freight
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
 Insurance          Customs          Handling
       │               │                │
       ▼               ▼                ▼
calculate...       calculate...      calculate...
       │               │                │
       └───────────────┼────────────────┘
                       │
              Local Transport
                       │
                       ▼
             calculateLocalTransport()
                       │
                       ▼
                  Other Costs
                       │
                       ▼
             calculateLandedCost()
                       │
                       ▼
                Total Landed Cost
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
     Cost / Kg    Cost / Unit   Logistics %
          │            │             │
          └────────────┼─────────────┘
                       ▼
              CalculationResult
```

---

# 25. Currency architecture

A critical rule is:

```text
Currency policy ≠ calculation formula
```

The engine does not determine the authoritative currency from locale.

The conceptual flow is:

```text
Country + Scope
       ↓
Currency Resolution
       ↓
Calculation Input
       ↓
Calculation Engine
       ↓
Calculation Result
```

The calculation engine receives already-resolved monetary values.

Therefore the engine can validate:

```text
Money.currency
```

without knowing country-specific currency policy.

---

# 26. Why distance does not automatically produce a price

A developer may see:

```ts
distanceKm?: number;
```

and assume:

```text
freight = distanceKm × ratePerKm
```

That would be an invented commercial rule.

The current domain does not define:

```text
ratePerKm
ratePerKg
ratePerVolume
```

Therefore the current engine uses supplied monetary amounts.

A future tariff layer can be introduced independently:

```text
Tariff Policy
     ↓
Freight Calculation
     ↓
Money
     ↓
Landed Cost Engine
```

---

# 27. Why `Money` is a domain type

Using:

```ts
number
```

alone loses currency information.

Using:

```ts
Money
```

preserves:

```text
amount
currency
```

This lets the engine detect incompatible arithmetic such as:

```text
BRL + USD
```

before producing a misleading result.

---

# 28. TypeScript syntax used in this module

## Optional property

```ts
amount?: Money;
```

means the property may not exist.

## Array

```ts
CargoItem[]
```

means an array of `CargoItem`.

## Union

```ts
"air" | "road" | "maritime"
```

means only one of those values is allowed.

## Nested type

```ts
weight?: Weight;
```

means the property, when present, must follow the `Weight` structure.

## Optional chaining

```ts
insurance?.amount
```

means access `amount` only when `insurance` exists.

## Nullish coalescing

```ts
insurance?.amount ?? 0
```

means use the amount when present; otherwise use zero.

---

# 29. Why the engine is pure

The calculation functions should behave like mathematical functions:

```text
same input
    ↓
same output
```

They should not depend on:

- React state
- browser APIs
- UI state
- random values
- network requests
- localStorage
- analytics
- database state

For example:

```text
calculateCostPerKg($2,000, 500kg)
```

should always return:

```text
$4/kg
```

This makes unit testing straightforward.

---

# 30. Dependency direction

The intended dependency direction is:

```text
Domain Types
     ↑
Calculation Functions
     ↑
Application / UI
```

Calculation functions may depend on domain types.

Domain types must not depend on React or UI components.

The calculation engine should never import:

```ts
React
useState
Next.js components
Tailwind classes
```

---

# 31. Complete domain model

```text
PHYSICAL DOMAIN
    Cargo
    Weight
    Dimensions
    Packages

TRANSPORT DOMAIN
    Transport
    Location
    Mode
    Scope

COST DOMAIN
    Freight
    Insurance
    Customs
    Handling
    Local Transport
    Other Costs

CALCULATION DOMAIN
    calculateFreight()
    calculateInsurance()
    calculateCustoms()
    calculateHandling()
    calculateLocalTransport()
    calculateLandedCost()
    calculateCostPerKg()
    calculateCostPerUnit()
    calculateLogisticsPercentage()

RESULT DOMAIN
    CalculationBreakdown
    CalculationResult
    RealityScore
```

---

# 32. Example complete shipment

```ts
const cargo: Cargo = {
  items: [
    {
      description: "Industrial equipment",
      quantity: 10,
      weight: {
        value: 500,
        unit: "kg",
      },
      declaredValue: {
        amount: 20000,
        currency: "USD",
      },
    },
  ],
  totalWeight: {
    value: 500,
    unit: "kg",
  },
  declaredValue: {
    amount: 20000,
    currency: "USD",
  },
};
```

Freight:

```ts
const freight: Freight = {
  mode: "road",
  basis: "weight",
  amount: {
    amount: 1500,
    currency: "USD",
  },
};
```

Insurance:

```ts
const insurance: Insurance = {
  enabled: true,
  insuredValue: {
    amount: 20000,
    currency: "USD",
  },
  basis: "cargoValue",
  ratePercent: 1.5,
};
```

Insurance:

```text
20,000 × 1.5 / 100 = 300 USD
```

The final landed cost then aggregates:

```text
Freight
+ Insurance
+ Customs
+ Handling
+ Local Transport
+ Other Costs
```

---

# 33. What the module deliberately does not do

The current MVP does not implement:

```text
- global FX conversion
- country-specific tax engines
- country-specific customs legislation
- carrier tariff databases
- automatic freight quotes
- automatic route calculation
- rate-per-km pricing
- rate-per-kg pricing
- external carrier APIs
- database persistence
- calculation history
- authentication
- UI state
```

These boundaries are intentional.

The goal is to keep the calculation core deterministic, reusable and extensible.

---

# 34. Junior developer mental model

Remember:

```text
cargo.ts
    "What is the cargo?"

transport.ts
    "Where/how does it move?"

freight.ts
    "What is the main freight charge?"

insurance.ts
    "What insurance applies?"

customs.ts
    "What customs costs apply?"

handling.ts
    "What handling costs apply?"

localTransport.ts
    "What local transport costs apply?"

otherCosts.ts
    "What other costs apply?"

calculationResult.ts
    "What did the engine produce?"

calculate*.ts
    "How is each part calculated?"
```

The core formulas are:

```text
LANDED COST
=
FREIGHT
+
INSURANCE
+
CUSTOMS
+
HANDLING
+
LOCAL TRANSPORT
+
OTHER COSTS

COST PER KG
=
LANDED COST / TOTAL WEIGHT IN KG

COST PER UNIT
=
LANDED COST / UNIT QUANTITY

LOGISTICS %
=
LOGISTICS COST / CARGO VALUE × 100
```

---

# 35. Architectural rule

Do not add a formula merely because a field exists.

For example:

```ts
distanceKm
```

does not automatically mean:

```text
distanceKm × rate
```

And:

```ts
quantity
unitPrice
```

does not automatically mean:

```text
quantity × unitPrice
```

A formula must come from an explicit business rule.

This prevents commercially incorrect assumptions from entering the calculation engine.

---

# 36. Final summary

The calculation module follows:

```text
MODEL THE SHIPMENT
        ↓
MODEL THE COSTS
        ↓
CALCULATE EACH COMPONENT
        ↓
SUM THE LANDED COST
        ↓
DERIVE USEFUL METRICS
        ↓
RETURN A STRUCTURED RESULT
```

The architecture deliberately separates:

```text
DATA
  ≠
BUSINESS CALCULATION
  ≠
FORMATTING
  ≠
UI
```

This separation keeps the Frevity calculation core testable, understandable and reusable as the product evolves.
