# Frevity — Trello Execution Plan

> **Project:** Frevity  
> **Product:** Landed Cost / Freight Reality Calculator  
> **MVP:** v0.1.0  
> **Execution window:** Saturday 29/08/2026 → Sunday 30/08/2026  
> **Package manager:** npm  
> **Frontend:** Next.js + React + TypeScript + Tailwind CSS  
> **Production target:** `frevity.com`

---

# 1. Document Purpose

This document is the operational baseline for the two Frevity MVP sprints already defined in Trello.

It exists to recover the project plan if implementation is interrupted, context is lost, or a technical decision needs to be checked against the original delivery objective.

The architecture itself is documented separately.

This document answers:

- What must be delivered?
- In which sprint?
- In what order?
- What does each Trello card mean?
- What are the dependencies?
- What are the acceptance criteria?
- What is the critical delivery path?
- What should happen if the schedule slips?

---

# 2. Sprint Structure

The project has **exactly two sprints**.

```text
SPRINT 01 — SÁBADO 29/08
Foundation + Product Core
        │
        ▼
SPRINT 02 — DOMINGO 30/08
UX + Globalization + SEO + QA + Production
```

No additional sprint is part of the current MVP plan.

---

# 3. Product Scope

## 3.1 MVP objective

Frevity is a global web calculator intended to help users estimate the real landed cost of freight/logistics operations.

The MVP consists of two primary pages:

```text
/
Landing Page

/calculator
Application Page
```

The initial platform supports:

- English;
- Spanish;
- Japanese;
- Portuguese.

Initial monetization:

```text
Free product
    ↓
Useful traffic
    ↓
Non-excessive advertising
```

Future subscriptions are deliberately outside the MVP.

---

# 4. SPRINT 01 — SÁBADO 29/08

## Sprint Objective

Establish the technical foundation and deliver the complete functional calculator core.

The end-of-day objective is:

> A user must be able to open the application, enter the relevant freight/cost information, execute the calculation and understand the result.

---

## Card 01 — Project Initialization

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** None

### Objective

Create and validate the base Next.js project.

### Tasks

- Initialize Next.js project.
- Configure TypeScript.
- Configure ESLint.
- Configure Tailwind CSS.
- Configure App Router.
- Configure npm.
- Generate and validate `package-lock.json`.
- Validate development server.
- Validate production build.

### Validation

```bash
npm install
npm run dev
npm run lint
npm run build
```

### Acceptance Criteria

- Application starts locally.
- `/` renders.
- TypeScript compiles.
- ESLint passes.
- Production build succeeds.
- No dependency installation errors remain.

---

## Card 02 — Application Architecture

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Project Initialization

### Objective

Implement the architectural structure defined in the Frevity architecture document.

### Tasks

- Establish application boundaries.
- Separate presentation from domain logic.
- Define calculator domain.
- Define calculation engine boundary.
- Define i18n boundary.
- Define formatting boundary.
- Define reusable UI boundary.
- Define Server/Client Component responsibilities.
- Avoid premature backend infrastructure.

### Acceptance Criteria

- Business rules are not embedded inside UI components.
- Calculation engine can operate independently from React.
- Architecture remains compatible with future backend/API extraction.
- Implementation matches the architecture reference.

---

## Card 03 — Git Workflow

**Priority:** High  
**Target:** 29/08  
**Dependency:** Project Initialization

### Objective

Establish a safe and reproducible Git workflow.

### Tasks

- Validate repository.
- Validate `.gitignore`.
- Ensure environment secrets are excluded.
- Ensure `package-lock.json` is tracked.
- Establish commit convention.
- Create initial baseline commit.

### Commit Convention

Commit messages must be written in English.

Example:

```text
chore: initialize Frevity project
```

### Acceptance Criteria

- Repository contains no secrets.
- Baseline commit exists.
- Working tree can be restored from Git.
- Development changes can be tracked independently.

---

## Card 04 — Frevity Design System

**Priority:** High  
**Target:** 29/08  
**Dependency:** Application Architecture

### Objective

Establish reusable visual foundations.

### Brand scale

Primary:

```text
#001265
#022EC2
#0447EB
#0A73FB
#1BC8FC
```

Neutrals:

```text
#FFFFFF
#F8FAFC
#E2E8F0
#64748B
#101D32
```

Gradient:

```text
#001265
→ #022EC2
→ #0447EB
→ #0A73FB
→ #1BC8FC
```

### Tasks

- Establish typography hierarchy.
- Establish spacing scale.
- Establish border/radius conventions.
- Establish buttons.
- Establish form controls.
- Establish cards.
- Establish states.
- Centralize brand tokens.

### Acceptance Criteria

- Components use consistent tokens.
- No arbitrary visual values are repeatedly introduced.
- Design system works across both MVP pages.

---

## Card 05 — Frevity Brand Assets

**Priority:** High  
**Target:** 29/08  
**Dependency:** Frevity Design System

### Objective

Prepare the visual assets required by the MVP.

### Tasks

- Logo.
- Favicon.
- App mark.
- Brand variants where required.
- Metadata/social image foundation if available.
- Organize assets under the appropriate public asset location.

### Acceptance Criteria

- Logo renders correctly.
- Favicon works.
- Assets are optimized for web use.
- No unnecessary high-resolution assets are shipped.

---

## Card 06 — Internationalization Core

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Application Architecture

### Objective

Create the i18n foundation for four supported languages.

### Locales

```text
en
es
ja
pt
```

### Tasks

- Define locale type.
- Define translation structure.
- Define fallback locale.
- Create initial dictionaries.
- Separate locale from currency.
- Keep calculation rules locale-independent.

### Acceptance Criteria

- All four locales are supported by the architecture.
- Missing translations have a safe fallback.
- Business calculations do not depend on translation strings.

---

## Card 07 — Global Formatting Layer

**Priority:** High  
**Target:** 29/08  
**Dependency:** Internationalization Core

### Objective

Centralize international number, currency and unit formatting.

### Responsibilities

- Number formatting.
- Currency formatting.
- Decimal precision.
- Weight formatting.
- Volume formatting.
- Percentage formatting.

### Architectural Rule

Formatting belongs outside the calculation engine.

```text
Domain Result
      ↓
Formatting Layer
      ↓
Localized UI
```

### Acceptance Criteria

- Formatting respects the active locale.
- Mathematical values remain raw and stable.
- UI does not implement formatting rules ad hoc.

---

## Card 08 — Calculation Domain Model

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Application Architecture

### Objective

Define strongly typed business entities for the calculator.

### Core concepts

```text
CalculationInput
CalculationResult
Cargo
Freight
Insurance
Customs
Handling
LocalTransport
OtherCosts
```

Cargo should support concepts such as:

```text
weight
volume
quantity
declaredValue
```

### Acceptance Criteria

- Domain types are independent from React.
- Domain types are independent from HTML form structure.
- Invalid states can be detected.
- Result structure is sufficient for detailed cost presentation.

---

## Card 09 — Landed Cost Engine

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Calculation Domain Model

### Objective

Implement the core landed-cost calculation.

### Responsibilities

Calculate the relevant cost components and produce a deterministic result.

Conceptually:

```text
Cargo Value
+ Freight
+ Insurance
+ Customs
+ Handling
+ Local Transport
+ Other Costs
= Landed Cost
```

Additional derived metrics may include:

```text
Cost per Kg
Cost per Unit
Logistics Percentage
```

### Architectural Rule

The engine must not import:

```text
React
Next.js UI
Tailwind
Analytics
Ads
Browser APIs
```

### Acceptance Criteria

- Same valid input produces the same result.
- Calculation is deterministic.
- Cost components are individually available.
- Total is mathematically consistent.
- Edge cases are handled.

---

## Card 10 — Reality Score Engine

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Landed Cost Engine

### Objective

Generate the Frevity Reality Score from the calculated logistics/cost information.

### Tasks

- Define score inputs.
- Define score range.
- Define score calculation.
- Define interpretation bands.
- Keep scoring deterministic.
- Separate score calculation from presentation.

### Important Rule

The Reality Score is an analytical indicator, not a guarantee of profitability or commercial success.

### Acceptance Criteria

- Score is deterministic.
- Score is bounded by its defined range.
- Same calculation produces the same score.
- Score explanation can be localized.
- UI does not contain the scoring algorithm.

---

## Card 11 — Unit Tests — Calculation Engine

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Landed Cost Engine + Reality Score Engine

### Objective

Protect the business-critical calculations.

### Test categories

- Freight.
- Insurance.
- Customs.
- Handling.
- Local transport.
- Other costs.
- Total landed cost.
- Cost per kg.
- Cost per unit.
- Logistics percentage.
- Reality Score.
- Zero values.
- Boundary values.
- Invalid input.
- Floating-point/rounding-sensitive cases.

### Acceptance Criteria

- Core calculation rules are automatically tested.
- Tests are deterministic.
- Tests do not depend on browser rendering.
- Failures clearly identify the business rule affected.

---

## Card 12 — Landing Page Structure

**Priority:** High  
**Target:** 29/08  
**Dependency:** Application Architecture

### Objective

Create the semantic structure of the public landing page.

### Sections

```text
Header
Hero
Problem / Value Proposition
How It Works
Calculator Benefits
Global Positioning
CTA
FAQ
Footer
```

### Acceptance Criteria

- Value proposition is immediately understandable.
- Primary CTA points to the application.
- Semantic HTML is used.
- Structure is ready for responsive implementation.

---

## Card 13 — Landing Responsive UI

**Priority:** High  
**Target:** 29/08  
**Dependency:** Landing Page Structure + Design System

### Objective

Make the landing usable across viewport sizes.

### Validate

```text
Mobile
Tablet
Desktop
```

### Acceptance Criteria

- No horizontal overflow.
- No clipped headings.
- No clipped images.
- CTA remains accessible.
- Navigation remains usable.
- Sections resize naturally.

---

## Card 14 — Application Page Shell

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Application Architecture + Design System

### Objective

Create the shell for the calculator application.

Route:

```text
/calculator
```

### Structure

```text
Application Header
Calculator Content
Result Area
Supporting Information
Footer / Navigation
```

### Acceptance Criteria

- Application route works.
- Layout is responsive.
- Calculator can be inserted without restructuring the page.
- Visual hierarchy clearly differs from the marketing landing page.

---

## Card 15 — Calculator Form

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Calculation Domain Model + Application Page Shell

### Objective

Create the user input interface.

### Responsibilities

- Collect cargo information.
- Collect freight information.
- Collect insurance.
- Collect customs.
- Collect handling.
- Collect local transport.
- Collect other applicable costs.
- Provide clear labels and units.

### Acceptance Criteria

- Form accepts valid values.
- Input states are controlled appropriately.
- Labels are understandable.
- Units are visible.
- Form is usable on mobile.
- No calculation logic is embedded in individual fields.

---

## Card 16 — Calculator ↔ Engine Integration

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Calculator Form + Landed Cost Engine

### Objective

Connect the presentation layer to the domain engine.

Flow:

```text
User Input
    ↓
Normalization
    ↓
Validation
    ↓
Calculation Domain
    ↓
Landed Cost Engine
    ↓
Reality Score Engine
    ↓
Result
    ↓
Formatting
    ↓
UI
```

### Acceptance Criteria

- Form data reaches the engine correctly.
- Engine result is displayed.
- Formatting is applied after calculation.
- UI does not duplicate business calculations.

---

## Card 17 — Result Experience

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** Calculator ↔ Engine Integration

### Objective

Make the result useful rather than merely technically correct.

### Display

```text
Total Landed Cost
Freight
Insurance
Customs
Handling
Local Transport
Other Costs
Cost per Kg
Cost per Unit
Logistics Percentage
Reality Score
```

### Acceptance Criteria

- Total is visually dominant.
- Cost breakdown is understandable.
- Reality Score has contextual explanation.
- User can calculate again.
- Result works with all supported locales.
- No intrusive advertisement interferes with the result.

---

## Card 18 — Saturday QA

**Priority:** Critical  
**Target:** 29/08  
**Dependency:** All functional Saturday cards

### Objective

Verify the complete Saturday milestone before moving into Sunday.

### Smoke flow

```text
Landing
 ↓
Calculator
 ↓
Input
 ↓
Calculation
 ↓
Result
 ↓
Recalculate
```

### Acceptance Criteria

- No critical runtime errors.
- Calculation produces expected values.
- Responsive layout remains usable.
- Lint passes.
- Build passes.
- Critical defects are documented before Sunday.

---

# 5. SPRINT 01 — EXIT CRITERIA

At the end of Saturday:

```text
[ ] Foundation works
[ ] Architecture is respected
[ ] Git workflow is operational
[ ] Design system exists
[ ] Brand assets exist
[ ] i18n core exists
[ ] Formatting layer exists
[ ] Domain model exists
[ ] Landed Cost Engine works
[ ] Reality Score Engine works
[ ] Calculation tests exist
[ ] Landing structure exists
[ ] Landing responsive UI exists
[ ] Application shell exists
[ ] Calculator form works
[ ] Calculator connects to engine
[ ] Results are displayed
[ ] Saturday QA passes
```

The most important Saturday outcome is:

> **The product's core business function works before visual and marketing refinements consume the remaining schedule.**

---

# 6. SPRINT 02 — DOMINGO 30/08

## Sprint Objective

Finish the global user experience, SEO, monetization/measurement foundation, quality assurance and production release.

The end-of-day objective is:

> **Frevity must be publicly accessible as a functional, responsive, multilingual production MVP.**

---

## Card 01 — UX Refinement

**Priority:** High  
**Target:** 30/08  
**Dependency:** Saturday QA

### Objective

Improve the experience without changing the established domain behavior.

### Tasks

- Refine hierarchy.
- Improve spacing.
- Improve input affordances.
- Improve result readability.
- Improve CTA clarity.
- Improve navigation.
- Remove unnecessary visual friction.

### Acceptance Criteria

- User understands the calculator flow without explanation.
- No regression in calculations.
- Mobile and desktop remain coherent.

---

## Card 02 — Validation & Error Handling

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Calculator Form + Engine Integration

### Objective

Make invalid states explicit and safe.

### Validate

- required fields;
- invalid numbers;
- negative values;
- impossible combinations;
- empty states;
- calculation failures.

### Acceptance Criteria

- Invalid input cannot silently produce misleading results.
- Errors are understandable.
- Errors are localized.
- Error handling does not expose implementation details.
- Domain validation remains independent of UI validation.

---

## Card 03 — Internationalization Completion

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Internationalization Core

### Objective

Complete user-facing translation coverage.

### Languages

```text
English
Spanish
Japanese
Portuguese
```

### Translate

- Landing content.
- Calculator labels.
- Validation messages.
- Result labels.
- Reality Score explanation.
- Navigation.
- SEO metadata where applicable.

### Acceptance Criteria

- No visible untranslated production strings in supported flows.
- Fallback remains safe.
- Japanese layout does not break.
- Long translated strings do not cause overflow.

---

## Card 04 — Language Selector

**Priority:** High  
**Target:** 30/08  
**Dependency:** Internationalization Completion

### Objective

Allow users to manually select the application language.

### Behavior

Initial locale can be inferred from browser language preferences.

Supported:

```text
en
es
ja
pt
```

Unsupported locales fall back safely.

### Important

GPS/location permission is not required to determine the interface language.

### Acceptance Criteria

- User can change language.
- Selection updates the interface.
- Calculator data is preserved where practical.
- Language change does not change calculation mathematics.

---

## Card 05 — SEO Foundation

**Priority:** High  
**Target:** 30/08  
**Dependency:** Landing Page + Internationalization

### Objective

Make Frevity discoverable through search engines.

### Tasks

- Page title.
- Meta description.
- Canonical configuration.
- Robots configuration.
- Sitemap.
- Open Graph foundation.
- Correct heading hierarchy.

### Target concepts

```text
landed cost calculator
freight cost calculator
import cost calculator
shipping cost estimator
logistics cost calculator
```

### Acceptance Criteria

- Metadata exists.
- Landing is crawlable.
- Canonical strategy is defined.
- No keyword stuffing.
- Metadata can support future multilingual SEO.

---

## Card 06 — Structured Data

**Priority:** High  
**Target:** 30/08  
**Dependency:** SEO Foundation

### Objective

Provide machine-readable context where appropriate.

### Tasks

- Evaluate appropriate Schema.org types.
- Implement valid structured data.
- Avoid fabricated reviews, ratings or unsupported claims.
- Validate JSON-LD syntax.

### Acceptance Criteria

- Structured data matches visible content.
- No misleading schema is introduced.
- Invalid JSON-LD does not reach production.

---

## Card 07 — Performance Optimization

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Functional MVP

### Objective

Keep Frevity fast enough for a global audience.

### Review

- JavaScript bundle.
- Client Components.
- Images.
- Fonts.
- Third-party scripts.
- Analytics.
- Ads.
- CSS.
- Unnecessary dependencies.
- Rendering strategy.

### Engineering goals

```text
LCP < 1.5s
INP < 200ms
CLS < 0.1
```

These are targets, not absolute guarantees.

### Acceptance Criteria

- No unnecessary client-side rendering.
- Landing remains lightweight.
- Calculator interaction remains responsive.
- Third-party scripts do not block the critical experience unnecessarily.

---

## Card 08 — Ads Integration

**Priority:** Medium  
**Target:** 30/08  
**Dependency:** Performance Optimization

### Objective

Introduce initial monetization without damaging usability.

### Rules

Ads must not:

- cover the calculator;
- cover the result;
- interrupt the main workflow;
- cause layout instability;
- dominate the landing page;
- create deceptive clicks.

### Acceptance Criteria

- Ad placement is isolated.
- Ads remain secondary to the product.
- Core calculator functionality works independently of advertising.

---

## Card 09 — Analytics

**Priority:** Medium  
**Target:** 30/08  
**Dependency:** UX Refinement

### Objective

Measure product usage for future business decisions.

### Initial events

```text
landing_view
calculator_open
calculation_started
calculation_completed
language_changed
```

### Acceptance Criteria

- Analytics is isolated from business logic.
- Calculator works if analytics fails.
- No unnecessary personal data is collected.
- Event naming remains consistent.

---

## Card 10 — Accessibility

**Priority:** High  
**Target:** 30/08  
**Dependency:** UX Refinement

### Validate

- semantic HTML;
- keyboard navigation;
- visible focus;
- labels;
- input descriptions;
- error messaging;
- button states;
- contrast;
- heading hierarchy;
- screen-reader-friendly structure.

### Acceptance Criteria

- Main calculator flow can be operated without a mouse.
- Form fields have accessible labels.
- Validation errors are understandable.
- No critical accessibility blocker remains.

---

## Card 11 — Cross-Browser QA

**Priority:** High  
**Target:** 30/08  
**Dependency:** UX Refinement + Accessibility

### Validate

At minimum:

```text
Chrome
Edge
Firefox
Safari / WebKit-equivalent environment where available
```

### Validate

- Landing.
- Calculator.
- Language selector.
- Forms.
- Results.
- Responsive behavior.
- Navigation.
- Visual rendering.

### Acceptance Criteria

- No browser-specific critical defect.
- Core calculation behavior is consistent.
- Layout remains usable.

---

## Card 12 — Production Build

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** QA + Performance

### Objective

Produce the final optimized application build.

### Required commands

```bash
npm install
npm run lint
npm run build
```

### Acceptance Criteria

- Build completes successfully.
- No critical warnings/errors remain.
- Production output represents the code intended for release.

---

## Card 13 — Production Environment

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Production Build

### Objective

Configure the production runtime.

### Tasks

- Environment variables.
- Production configuration.
- Secrets.
- Runtime configuration.
- Metadata environment values.
- Analytics configuration.
- Ads configuration.

### Acceptance Criteria

- Secrets are not committed.
- Production configuration is reproducible.
- Application works with production environment variables.

---

## Card 14 — Domain Configuration

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Production Environment

### Objective

Connect the global `.com` domain.

Target:

```text
frevity.com
```

### Tasks

- Configure domain.
- Configure DNS as required by hosting provider.
- Configure HTTPS.
- Configure canonical host.
- Validate redirects/host behavior.

### Acceptance Criteria

```text
https://frevity.com
```

loads successfully.

---

## Card 15 — Production Smoke Test

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Domain Configuration

### Objective

Verify the actual production environment rather than localhost.

### Critical flow

```text
frevity.com
    ↓
Landing
    ↓
CTA
    ↓
Calculator
    ↓
Language
    ↓
Input
    ↓
Calculate
    ↓
Result
```

### Validate

- English.
- Spanish.
- Japanese.
- Portuguese.
- Desktop.
- Mobile.
- Validation.
- Calculation.
- Results.
- SEO metadata.
- Ads.
- Analytics.
- Console/runtime errors.

### Acceptance Criteria

- No critical production defect.
- Core business flow works on the real domain.

---

## Card 16 — Final Security Review

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Production Environment

### Review

- Environment secrets.
- Exposed configuration.
- Unsafe client-side data.
- Dependency vulnerabilities.
- Form input handling.
- Third-party scripts.
- Security headers where applicable.
- Source-map/public exposure considerations.
- HTTPS.

### Acceptance Criteria

- No obvious critical security issue.
- No secrets exposed.
- No unnecessary sensitive information collected.
- Production uses HTTPS.

---

## Card 17 — Final Product Review

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Production Smoke Test + Final Security Review

### Objective

Perform the final product-level review.

### Review questions

```text
Can a new user understand Frevity?
Can the user reach the calculator?
Can the user complete a calculation?
Can the user understand the result?
Does the interface work in four languages?
Does the product work on mobile?
Is the product fast?
Are ads secondary?
Is the product credible?
Is there any critical blocker?
```

### Acceptance Criteria

The MVP is considered product-ready.

---

## Card 18 — Production Release

**Priority:** Critical  
**Target:** 30/08  
**Dependency:** Final Product Review

### Objective

Officially release Frevity v0.1.0.

### Tasks

- Confirm production state.
- Confirm Git state.
- Confirm release version.
- Create release tag.
- Record release.
- Confirm public URL.

### Version

```text
v0.1.0
```

### Suggested English release commit

```text
release: Frevity v0.1.0
```

### Acceptance Criteria

```text
https://frevity.com
```

is functional and represents the approved MVP.

---

# 7. SPRINT 02 — EXIT CRITERIA

```text
[ ] UX refined
[ ] Validation complete
[ ] Four languages complete
[ ] Language selector works
[ ] SEO foundation complete
[ ] Structured data validated
[ ] Performance reviewed
[ ] Ads integrated without harming UX
[ ] Analytics integrated
[ ] Accessibility reviewed
[ ] Cross-browser QA completed
[ ] Production build passes
[ ] Production environment configured
[ ] Domain configured
[ ] Production smoke test passes
[ ] Security review passes
[ ] Final product review passes
[ ] Production release completed
```

---

# 8. Critical Path

The highest-risk delivery path is:

```text
Project Initialization
        ↓
Application Architecture
        ↓
Calculation Domain Model
        ↓
Landed Cost Engine
        ↓
Reality Score Engine
        ↓
Calculator Form
        ↓
Calculator ↔ Engine Integration
        ↓
Result Experience
        ↓
Validation & Error Handling
        ↓
Production Build
        ↓
Production Environment
        ↓
Domain Configuration
        ↓
Production Smoke Test
        ↓
Final Product Review
        ↓
Production Release
```

This path must be protected from scope creep.

---

# 9. Parallelization Strategy

Some cards can progress independently once their dependencies are satisfied.

```text
                 ┌── Design System
                 │
Architecture ────┼── i18n Core
                 │
                 └── Domain Model
```

Later:

```text
Domain Model ──→ Landed Cost Engine ──→ Reality Score
                                      │
                                      └── Unit Tests
```

While:

```text
Architecture ──→ Landing Structure ──→ Landing Responsive UI
```

On Sunday:

```text
i18n ──→ Internationalization Completion ──→ Language Selector

SEO Foundation ──→ Structured Data

UX ──→ Accessibility ──→ Cross-Browser QA

Performance ──→ Ads Integration
```

This allows the weekend to be used efficiently without breaking architectural dependencies.

---

# 10. Risk Management

## Risk 01 — Scope Expansion

### Risk

New ideas appear during implementation and consume time.

### Impact

The core calculator or deployment may be delayed.

### Mitigation

Do not introduce during this MVP:

```text
Authentication
Database
Subscriptions
Payments
User accounts
Saved calculations
Public API
Admin dashboard
Mobile application
Microservices
Redis
PostgreSQL
Complex external integrations
```

Unless a requirement becomes critical to the MVP.

---

## Risk 02 — Calculation Complexity

### Risk

Business rules become more complicated than expected.

### Impact

Calculation errors can invalidate the product.

### Mitigation

Protect:

```text
Domain Model
    ↓
Calculation Engine
    ↓
Automated Tests
```

Do not solve business-rule complexity by moving logic into React components.

---

## Risk 03 — UI Consumes the Schedule

### Risk

Visual refinement takes longer than expected.

### Impact

Functional delivery and production release are threatened.

### Mitigation

Priority:

```text
Functional correctness
        >
Validation
        >
Production stability
        >
Performance
        >
UX refinement
        >
Cosmetic polish
```

---

## Risk 04 — Third-Party Scripts

### Risk

Ads and analytics negatively affect performance.

### Impact

Poor user experience, layout instability and slower loading.

### Mitigation

- Load non-critical scripts appropriately.
- Isolate third-party integrations.
- Never make the calculator depend on them.
- Remove or simplify anything that becomes a blocker.

---

## Risk 05 — Deployment / DNS Delay

### Risk

Domain or hosting configuration takes longer than expected.

### Impact

The product can be finished locally but not released.

### Mitigation

Do not leave deployment until the final minutes.

The production path should be validated as soon as the application is stable enough.

---

# 11. Delivery Delay Protocol

The two-day plan is intentionally aggressive.

If the project cannot finish every card by Sunday, the response must **not** be to leave the unfinished work undefined.

Instead:

```text
Identify unfinished cards
        ↓
Classify them
        ↓
Protect production-critical work
        ↓
Finish the MVP-critical items first
        ↓
Complete remaining cards immediately after the planned window
```

## Priority in case of delay

### Level P0 — Must finish

```text
Calculator functionality
Calculation engine
Validation
Results
Four-language critical flow
Production build
Production environment
Domain
Production smoke test
Security review
Production release
```

### Level P1 — Finish immediately after P0

```text
UX Refinement
Accessibility
Cross-Browser QA
SEO
Structured Data
Performance refinements
```

### Level P2 — Can be temporarily simplified

```text
Advanced analytics
Advanced ad optimization
Non-essential visual polish
```

---

# 12. Why Unfinished Work Must Be Completed Quickly

A delayed card is not automatically a failed project.

The dangerous situation is allowing a delayed card to become **open-ended technical debt**.

For Frevity, the cost of postponing unfinished MVP work increases quickly because the application is being released as a public global product.

An unfinished:

- validation layer can create incorrect user results;
- performance task can increase acquisition cost and reduce conversion;
- SEO task can delay organic discovery;
- accessibility task can exclude users;
- security task can expose the product to avoidable risk;
- deployment task prevents the product from generating real-world usage data;
- calculation task compromises the core value proposition.

Therefore:

> **Anything not completed by the end of Sunday must be explicitly recorded and completed as soon as possible, with P0 production and business-critical items taking precedence.**

The objective is not to extend the project indefinitely.

The objective is to **close the gap between planned delivery and actual production readiness as quickly as possible**.

---

# 13. Final Delivery Principle

The weekend is successful only when Frevity moves from:

```text
Code
```

to:

```text
Functional Product
```

and finally:

```text
Public Product
```

The final chain is:

```text
Development
    ↓
Validated Application
    ↓
Production Build
    ↓
Production Environment
    ↓
frevity.com
    ↓
Real Users
    ↓
Real Usage Data
    ↓
Future Product Decisions
```

The MVP does not need to contain every future feature.

It needs to prove that the central proposition works:

> **A user can use Frevity to estimate the real landed cost of a freight operation quickly and understand the result.**

---

# 14. Sprint Completion Summary

## Saturday 29/08

```text
FOUNDATION
+
DOMAIN
+
CALCULATOR
+
FIRST QA
```

## Sunday 30/08

```text
UX
+
GLOBALIZATION
+
SEO
+
MONETIZATION
+
ANALYTICS
+
QA
+
SECURITY
+
DEPLOYMENT
+
RELEASE
```

---

# 15. Release Target

```text
Product: Frevity
Version: v0.1.0
Domain: https://frevity.com

Sprint 01:
29/08/2026

Sprint 02:
30/08/2026
```

**End of operational baseline.**
