# Frevity --- Application Architecture

## 1. Architecture Identification

**Official classification:**

> **Modular Monolith Frontend Architecture with Domain-Centric Layering
> and Static-First Hybrid Rendering.**

Frevity v0.1.0 is a single Next.js application containing two product
surfaces:

-   `/` --- Landing Page
-   `/calculator` --- Application Page

There is no separate backend, database, Redis layer, authentication
service, or microservice architecture in the MVP.

High-level model:

``` text
                         FREVITY
                            |
                    Next.js Application
                            |
             +--------------+--------------+
             |                             |
          Landing                      Calculator
           `/`                         `/calculator`
             |                             |
             +--------------+--------------+
                            |
                     Shared Modules
                            |
             +--------------+--------------+
             |              |              |
            i18n        Formatters      Constants
                            |
                       Domain Layer
                            |
                  Calculation Engine
```

------------------------------------------------------------------------

# 2. Why This Architecture Was Chosen

The architecture is driven by business requirements and the two-day
delivery window.

The MVP needs:

-   global availability;
-   four languages;
-   SEO;
-   a high-performance landing page;
-   an interactive calculator;
-   deterministic calculations;
-   ads;
-   analytics;
-   responsive UI;
-   production deployment.

It does **not** currently need:

-   accounts;
-   persistence;
-   calculation history;
-   external carrier APIs;
-   server-only secrets;
-   background jobs;
-   a public API.

Therefore, a separate backend would add complexity without providing
enough MVP value.

The central decision is:

> **Keep infrastructure simple while keeping business logic strictly
> separated from presentation.**

------------------------------------------------------------------------

# 3. Core Architectural Principle

The React/Next.js UI must never own the calculation rules.

Correct flow:

``` text
User Input
    |
    v
Validation
    |
    v
Domain Model
    |
    v
Calculation Engine
    |
    v
Calculation Result
    |
    v
Presentation
```

The calculation engine must be independent from:

-   React;
-   Next.js;
-   Tailwind;
-   browser APIs;
-   analytics;
-   advertising.

This makes the domain logic independently testable and allows a future
backend/API extraction without rewriting the business rules.

------------------------------------------------------------------------

# 4. Architectural Layers

## 4.1 Presentation Layer

Responsible for:

-   pages;
-   layouts;
-   components;
-   forms;
-   responsive behavior;
-   accessibility;
-   displaying results.

Primary locations:

``` text
app/
components/
```

------------------------------------------------------------------------

## 4.2 Application Interaction Layer

Responsible for coordinating user actions:

-   submit calculation;
-   reset;
-   language change;
-   UI state;
-   interaction flow.

It coordinates the domain but does not redefine mathematical rules.

------------------------------------------------------------------------

## 4.3 Domain Layer

Responsible for Frevity business logic.

Examples:

``` text
calculateFreight()
calculateInsurance()
calculateCustoms()
calculateHandling()
calculateLocalTransport()
calculateLandedCost()
calculateCostPerKg()
calculateCostPerUnit()
calculateLogisticsPercentage()
calculateRealityScore()
```

This is the most important architectural layer.

------------------------------------------------------------------------

## 4.4 Shared Services / Utilities

Responsible for cross-cutting capabilities:

``` text
i18n
formatters
constants
validation helpers
```

They must not contain hidden business calculations.

------------------------------------------------------------------------

# 5. Project Structure

The project starts with the Next.js-generated structure and evolves
toward:

``` text
frevity/
|
├── app/
│   ├── calculator/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── calculator/
│   │   ├── CalculatorForm.tsx
│   │   ├── CalculatorResult.tsx
│   │   ├── CostBreakdown.tsx
│   │   └── RealityScore.tsx
│   │
│   ├── landing/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   │
│   ├── layout/
│   │   └── LanguageSelector.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── ...
│
├── lib/
│   ├── calculator/
│   │   ├── engine.ts
│   │   ├── freight.ts
│   │   ├── insurance.ts
│   │   ├── customs.ts
│   │   ├── handling.ts
│   │   ├── landed-cost.ts
│   │   ├── reality-score.ts
│   │   └── types.ts
│   │
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── pt.json
│   │   └── ja.json
│   │
│   ├── formatters/
│   │   ├── currency.ts
│   │   ├── number.ts
│   │   ├── weight.ts
│   │   └── distance.ts
│   │
│   └── constants/
│       └── index.ts
│
├── types/
│   └── index.ts
│
├── public/
│   └── brand/
│
├── tests/
│   ├── calculator/
│   └── ...
│
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

The exact number of files may change. The responsibilities must remain.

------------------------------------------------------------------------

# 6. Routing

MVP routes:

``` text
/
└── Landing Page

/calculator
└── Application Page
```

No unnecessary routes should be introduced in v0.1.0.

------------------------------------------------------------------------

# 7. Rendering Strategy

Frevity uses **static-first hybrid rendering**.

## Landing

Prefer Server Components/static rendering because the landing is:

-   SEO-oriented;
-   mostly static;
-   content-heavy;
-   not dependent on client state.

## Calculator

Only interactive portions should be Client Components.

The Client Component coordinates the calculator interaction but does not own
or redefine the business calculation rules.

Conceptually:

``` text
Server Component
      |
      v
Calculator Page
      |
      v
Client Component
      |
      +--> form state
      +--> UI/input validation
      |
      v
Domain Model
      |
      v
Calculation Engine
      |
      v
Calculation Result
      |
      v
Result Presentation
```

The Client Component may collect input, manage local state, perform
presentation-level validation, invoke the domain calculation engine, and
display the resulting data.

It must not implement or duplicate the mathematical rules of the domain.

Do not turn the whole application into a Client Component without a
concrete reason.

------------------------------------------------------------------------

# 8. State Management

No Redux, Zustand, MobX or equivalent global state library in v0.1.0.

The calculator state is local to the calculator experience.

Preferred:

``` text
React local state
       +
derived calculation result
```

Global state becomes justified only when future requirements actually
demand cross-page shared state.

------------------------------------------------------------------------

# 9. Domain Model

The domain must represent business concepts rather than HTML fields.

Conceptual input:

``` text
CalculationInput

- origin
- destination
- transportMode
- cargo
- freight
- insurance
- customs
- handling
- localTransport
- otherCosts
```

Cargo:

``` text
Cargo

- weight
- volume
- quantity
- declaredValue
```

Result:

``` text
CalculationResult

- freightCost
- insuranceCost
- customsCost
- handlingCost
- localTransportCost
- otherCosts
- totalLandedCost
- costPerKg
- costPerUnit
- logisticsPercentage
- realityScore
```

------------------------------------------------------------------------

# 10. Calculation Engine

The calculation engine is the heart of Frevity.

It must be:

-   deterministic;
-   pure where possible;
-   side-effect free;
-   independently testable;
-   framework-independent.

Architecture:

``` text
CalculationInput
        |
        v
Domain Validation
        |
        v
 Calculation Engine
        |
        +--> Freight
        +--> Insurance
        +--> Customs
        +--> Handling
        +--> Local Transport
        +--> Other Costs
        |
        v
 CalculationResult
```

A small public API is preferred:

``` text
calculateLandedCost(input)
```

Internal calculations can remain decomposed.

------------------------------------------------------------------------

# 11. Reality Score

Reality Score is a product planning indicator.

MVP categories may be:

``` text
LOW
MEDIUM
HIGH
```

or an equivalent numerical representation.

It must be presented as an estimation/planning indicator.

It must not claim to be:

-   an official customs calculation;
-   a legal classification;
-   a tax authority determination;
-   a guaranteed landed cost;
-   a carrier quotation.

------------------------------------------------------------------------

# 12. Validation

Validation happens before calculation.

Validation has two responsibilities:

``` text
Raw Form Data
      |
      v
UI / Input Validation
      |
   invalid ------> UI Error
      |
    valid
      |
      v
Domain Model
      |
      v
Domain Validation
      |
   invalid ------> Calculation Error
      |
    valid
      |
      v
Calculation
```

UI / Input Validation is responsible for presentation-level concerns:

-   required fields;
-   input format;
-   basic numeric parsing;
-   user-facing validation messages.

Domain Validation is responsible for protecting business rules:

-   non-negative values;
-   impossible combinations;
-   meaningful ranges;
-   domain invariants.

The domain must defend itself against invalid input even when called outside
the UI.

UI validation must never be treated as a substitute for domain validation.
------------------------------------------------------------------------

# 13. Formatting

The domain produces numeric values.

Presentation decides how they are displayed.

Example:

``` text
4820
```

may become:

``` text
$4,820.00
R$ 4.820,00
¥4,820
```

depending on locale/currency.

Formatting must never change the underlying calculation.

------------------------------------------------------------------------

# 14. Internationalization

MVP languages:

``` text
English
Spanish
Portuguese
Japanese
```

Locale identifiers:

``` text
en
es
pt
ja
```

Language, country and currency are separate concepts.

Example:

``` text
Language = English
Country  = Brazil
Currency = BRL
```

must be technically possible.

------------------------------------------------------------------------

# 15. Locale Detection

Initial interface language can be inferred from browser locale
information.

Preferred flow:

``` text
navigator.languages
       |
       v
Supported locale?
       |
       v
Application locale
```

Manual language selection must remain available.

Precise GPS is not required for language selection.

------------------------------------------------------------------------

# 16. Persistence

No database is required for v0.1.0.

No account or calculation history is required.

Current model:

``` text
Browser
   |
   v
Calculation
   |
   v
Result
```

Future persistence may be introduced after product validation.

------------------------------------------------------------------------

# 17. Backend Decision

There is intentionally **no separate backend** in the MVP.

A backend becomes justified when Frevity requires:

-   authentication;
-   persistent accounts;
-   saved calculations;
-   server-only secrets;
-   external API orchestration;
-   authoritative server calculations;
-   subscriptions;
-   public API consumers.

Future:

``` text
Next.js
   |
   v
API
   |
   v
Calculation Service
   |
   v
Database
```

The current domain boundary is designed to make this extraction
possible.

------------------------------------------------------------------------

# 18. Why Not Microservices?

Microservices are rejected for the MVP.

There are currently:

-   no independent services;
-   no distributed workload;
-   no service-specific scaling requirement;
-   no organizational need for independent deployment.

Microservices would add:

-   network calls;
-   deployment complexity;
-   observability complexity;
-   failure modes;
-   development overhead.

> Microservices solve a problem Frevity does not currently have.

------------------------------------------------------------------------

# 19. Why Not Node.js/Express Backend?

Rejected for v0.1.0 because it would add a second deployable application
without a concrete MVP requirement.

The current calculation is deterministic and can safely execute locally.

A backend becomes valuable when server-side state or external
integrations appear.

------------------------------------------------------------------------

# 20. Why Not PostgreSQL?

There is no persistent entity requiring storage in v0.1.0.

Current:

``` text
Input -> Calculation -> Result
```

Future entities may include:

``` text
User
Calculation
SavedScenario
Subscription
Organization
ApiKey
```

At that point PostgreSQL can be introduced.

------------------------------------------------------------------------

# 21. Why Not Redis?

There is no cacheable backend workload.

No Redis is needed for:

-   sessions;
-   shared cache;
-   queues;
-   expensive server computation;
-   API rate limiting.

Introduce it only when an actual requirement appears.

------------------------------------------------------------------------

# 22. Why Not Redux/Zustand?

The application does not currently have complex cross-page state.

A global state library would add dependency and cognitive overhead
without sufficient benefit.

------------------------------------------------------------------------

# 23. Why Not Full Clean Architecture?

Frevity adopts the **principles** of separation but not heavyweight
Clean Architecture ceremony.

We do not need a large structure of:

``` text
entities/
use-cases/
repositories/
ports/
adapters/
controllers/
gateways/
```

for a two-page calculator with no persistence.

The useful rule is retained:

> Business logic remains independent from presentation.

------------------------------------------------------------------------

# 24. Why Not Monorepo?

There is currently only one application.

A monorepo becomes interesting if the product grows into:

``` text
web
mobile
api
shared-domain
shared-ui
sdk
```

That is future scope.

------------------------------------------------------------------------

# 25. Why Next.js?

Frevity has two different needs:

``` text
Marketing / SEO
+
Interactive Application
```

Next.js supports both in one deployable application.

Benefits:

-   routing;
-   server rendering;
-   static generation;
-   React ecosystem;
-   TypeScript;
-   production optimization;
-   strong SEO capabilities;
-   client/server component model.

This fits the two-page product particularly well.

------------------------------------------------------------------------

# 26. Why TypeScript?

The domain contains structured logistics and financial concepts:

``` text
CalculationInput
CalculationResult
Cargo
TransportMode
Currency
```

Strong typing improves:

-   correctness;
-   refactoring;
-   domain modeling;
-   IDE support;
-   maintainability.

------------------------------------------------------------------------

# 27. Why Tailwind?

Tailwind is selected for rapid, consistent responsive development during
the two-day MVP.

It provides:

-   fast iteration;
-   responsive utilities;
-   design-token integration;
-   low custom-CSS overhead.

------------------------------------------------------------------------

# 28. Package Manager

The official package manager is:

``` text
npm
```

The lockfile is:

``` text
package-lock.json
```

Do not introduce:

``` text
pnpm-lock.yaml
yarn.lock
bun.lock
```

unless the architecture is deliberately changed.

------------------------------------------------------------------------

# 29. Performance Architecture

Performance is a first-class requirement.

Rules:

1.  Minimize browser JavaScript.
2.  Prefer Server Components for static content.
3.  Avoid unnecessary dependencies.
4.  Keep calculation logic lightweight.
5.  Optimize images.
6.  Avoid unnecessary client rendering.
7.  Load third-party scripts responsibly.
8.  Keep advertising non-blocking where possible.

Targets:

``` text
LCP < 1.5s
INP < 200ms
CLS < 0.1
```

These are engineering targets, not guarantees.

The largest likely performance risks are:

-   unnecessary JavaScript;
-   images;
-   third-party scripts;
-   advertising;
-   excessive client rendering.

------------------------------------------------------------------------

# 30. Design System

Frevity brand colors:

``` text
Primary       #1474E2
Primary Dark  #1555DD
Secondary     #1ED3B1
Secondary     #16B4C6
Navy          #101D32
Background    #F8FAFC
Surface       #FFFFFF
Border        #E2E8F0
Muted         #64748B
```

Primary gradient:

``` text
#1555DD
    ->
#1474E2
    ->
#16B4C6
    ->
#1ED3B1
```

Design tokens should be centralized rather than scattered throughout
components.

------------------------------------------------------------------------

# 31. Component Architecture

## Landing

``` text
components/landing/
```

Marketing/presentation components.

## Calculator

``` text
components/calculator/
```

Application-specific interactive components.

## UI

``` text
components/ui/
```

Reusable visual primitives.

UI primitives must not know business rules.

------------------------------------------------------------------------

# 32. Analytics

Analytics is external to the domain.

Correct:

``` text
User Action
   |
   +--> Calculation
   |
   +--> Analytics Event
```

Suggested MVP events:

``` text
landing_view
calculator_open
calculation_started
calculation_completed
language_changed
```

The calculation engine must work even if analytics fails.

------------------------------------------------------------------------

# 33. Advertising

Ads are a monetization layer, not a business-domain dependency.

Rules:

-   non-intrusive;
-   no ads inside critical controls;
-   no ads blocking results;
-   no deceptive placement;
-   avoid unnecessary third-party JavaScript;
-   do not significantly degrade performance.

The calculator must function without advertising.

------------------------------------------------------------------------

# 34. SEO

Primary SEO surface:

``` text
/
```

Requirements:

-   semantic HTML;
-   title;
-   description;
-   canonical;
-   Open Graph;
-   robots;
-   sitemap;
-   heading hierarchy;
-   structured data where appropriate.

Target search concepts include:

``` text
landed cost calculator
freight cost calculator
import cost calculator
shipping cost estimator
```

No keyword stuffing.

------------------------------------------------------------------------

# 35. Accessibility

Core requirements:

-   semantic forms;
-   labels;
-   keyboard navigation;
-   visible focus;
-   adequate contrast;
-   logical headings;
-   accessible error messages;
-   accessible interactive controls.

------------------------------------------------------------------------

# 36. Security

Even without a backend:

-   never expose secrets in client code;
-   never commit `.env`;
-   validate input;
-   keep dependencies updated;
-   avoid unsafe HTML injection;
-   review third-party scripts;
-   use HTTPS in production.

Client-side calculation does not mean client-side trust.

If future server-authoritative calculations are introduced, the server
must independently validate all input.

------------------------------------------------------------------------

# 37. Testing Architecture

## Unit tests

Highest priority:

``` text
Calculation Engine
```

Test:

-   freight;
-   insurance;
-   customs;
-   handling;
-   local transport;
-   total;
-   cost/kg;
-   cost/unit;
-   logistics percentage;
-   reality score;
-   edge cases.

## Integration tests

Validate:

``` text
Form
 |
 v
Validation
 |
 v
Engine
 |
 v
Result
```

## E2E

Critical journey:

``` text
Landing
 |
 v
Calculator
 |
 v
Fill inputs
 |
 v
Calculate
 |
 v
Result
```

Testing effort must remain proportional to the MVP deadline and risk.

------------------------------------------------------------------------

# 38. Git Architecture

Branches:

``` text
main
development
feature/*
fix/*
```

Rules:

-   small logical commits;
-   English commit messages;
-   no unrelated changes;
-   release tags.

MVP release:

``` text
v0.1.0
```

------------------------------------------------------------------------

# 39. Deployment Architecture

Target:

``` text
Git Repository
       |
       v
Managed Next.js Hosting
       |
       v
frevity.com
       |
       v
HTTPS
```

The MVP must be deployable without custom backend infrastructure.

------------------------------------------------------------------------

# 40. Domain

Canonical domain:

``` text
frevity.com
```

Expected:

``` text
HTTP
 |
 v
HTTPS
 |
 v
Canonical domain
```

If `www` is used, one canonical version must be selected and the
alternate redirected.

------------------------------------------------------------------------

# 41. Observability

Frevity uses **Grafana Cloud** as its observability platform.

The observability layer is external to the application domain and must not
introduce dependencies into the calculation engines.

Initial observability scope:

- application monitoring;
- runtime error visibility;
- logs;
- performance monitoring;
- operational dashboards;
- alerts where appropriate.

Conceptually:

Application
    |
    +--> Freight Engine
    |
    +--> Landed Cost Engine
    |
    +--> Analytics
    |
    +--> Grafana Cloud

Observability failures must not prevent freight or landed-cost calculations
from executing.

------------------------------------------------------------------------

# 42. Business Architecture

The technical architecture reflects the business model.

MVP funnel:

``` text
Traffic
   |
   v
Landing
   |
   v
Calculator CTA
   |
   v
Calculation
   |
   v
Result
   |
   v
Return / Reuse
```

Initial monetization:

``` text
Traffic
   |
   v
Ads
```

Potential future:

``` text
Free
 |
 +--> Ads

Premium
 |
 +--> Advanced calculations
 +--> Saved scenarios
 +--> History
 +--> Export
 +--> API
```

Future monetization is explicitly outside v0.1.0.

------------------------------------------------------------------------

# 43. Product Boundary

Frevity v0.1.0 is:

> A lightweight global web tool for estimating total landed cost and
> understanding logistics cost reality for a shipment.

It is not:

-   a freight booking platform;
-   a customs authority;
-   a carrier marketplace;
-   a tax filing system;
-   a legal customs engine;
-   a freight forwarding company;
-   a transportation management system.

This boundary protects scope and product positioning.

------------------------------------------------------------------------

# 44. Non-Functional Requirements

## Performance

Fast initial load and responsive interaction.

## Availability

Use managed production hosting.

## Scalability

The MVP should scale through the hosting platform without immediate
architectural redesign.

## Maintainability

Business logic remains isolated.

## Testability

Calculation rules are independently testable.

## Accessibility

Core calculator flow is keyboard accessible.

## Internationalization

Four initial languages.

## Security

No client-side secrets and robust input validation.

------------------------------------------------------------------------

# 45. Architectural Invariants

These rules must not be violated without updating this document.

### Invariant 1

Calculation logic does not belong in React components.

### Invariant 2

Calculation engine does not depend on Next.js.

### Invariant 3

Calculation engine does not depend on Tailwind.

### Invariant 4

Analytics is never required for calculation.

### Invariant 5

Ads are never required for calculation.

### Invariant 6

Language selection does not alter mathematical rules.

### Invariant 7

Currency formatting does not alter calculations.

### Invariant 8

MVP does not require a database.

### Invariant 9

MVP does not require a separate backend.

### Invariant 10

No infrastructure is introduced without a requirement that justifies it.

------------------------------------------------------------------------

# 46. Evolution Roadmap

## v0.1.0

``` text
Next.js
React
TypeScript
Tailwind
Client-side calculation
i18n
SEO
Ads
Analytics
Static-first deployment
```

## v0.2.x

Potential:

``` text
Saved calculations
Local persistence
Export
Improved calculation models
```

## v0.3.x

Potential:

``` text
Accounts
History
Cloud persistence
```

Possible:

``` text
Next.js
   |
   v
API
   |
   v
Database
```

## v1.x

Potential:

``` text
External logistics APIs
Customs data
Advanced scenarios
Organizations
Subscriptions
Public API
```

Only introduce service separation when independent scaling, ownership or
operational boundaries justify it.

------------------------------------------------------------------------

# 47. Architecture Decision Matrix

  -----------------------------------------------------------------------------------
  Architecture         MVP Fit   Complexity   Performance       Future Decision
                                                                Growth 
  --------------- ------------ ------------ ------------- ------------ --------------
  Next.js modular    Excellent          Low     Excellent    Excellent **SELECTED**
  monolith                                                             

  Next.js +               Good       Medium          Good    Excellent Future
  Express API                                                          

  Full Clean            Medium         High          Good    Excellent Rejected for
  Architecture                                                         MVP

  Microservices           Poor    Very High      Variable    Excellent Rejected

  Monorepo                Poor       Medium       Neutral    Excellent Future

  SPA only              Medium          Low          Good         Good Rejected

  Backend-first           Poor         High      Variable    Excellent Rejected
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

# 48. Final Architecture Diagram

``` text
                         FREVITY
                            |
                    frevity.com
                            |
                         Next.js
                            |
             +--------------+--------------+
             |                             |
          Landing                      Calculator
             |                             |
       Server-first                  Client interaction
                                           |
                                      Validation
                                           |
                                      Domain Model
                                           |
                                    Calculation Engine
                                           |
                                      Result Model
                                           |
                     +---------------------+-------------------+
                     |                     |                   |
                    i18n               Formatters          Constants
                     |
                     v
                Presentation
                     |
             +-------+-------+
             |               |
          Analytics         Ads
```

------------------------------------------------------------------------

# 49. Final Architectural Statement

Frevity is intentionally **not over-engineered**.

Its architecture is based on:

``` text
2 pages
+
1 calculation domain
+
4 languages
+
global audience
+
no accounts
+
no persistence
+
no external API dependency
+
48-hour MVP
```

Therefore:

> **Frevity uses a Next.js modular monolith with a domain-centric
> calculation engine, static-first rendering, local interactive state,
> shared internationalization/formatting modules, and externalized
> concerns for analytics, SEO and advertising.**

The central architectural strategy is:

> **Simple infrastructure, disciplined domain logic, and clear
> boundaries for future evolution.**

------------------------------------------------------------------------

# 50. Architecture Change Protocol

Before violating an architectural invariant, answer:

1.  What requirement changed?
2.  Why is the current architecture insufficient?
3.  What business value does the change provide?
4.  What complexity does it introduce?
5.  Can the requirement be solved without changing architecture?
6.  Does it affect performance?
7.  Does it affect security?
8.  Does it affect deployment?
9.  Does it affect testing?
10. Does this document need updating?

Only then should the architecture be changed.

------------------------------------------------------------------------
