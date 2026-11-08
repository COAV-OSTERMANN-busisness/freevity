<div align="center">

<img src="https://firebasestorage.googleapis.com/v0/b/freevity-2a20f.firebasestorage.app/o/Logo%2Flogo-icon.png?alt=media&token=681ff8bd-428e-41e3-9475-caadd3a1a3d0" alt="Frevity Logo Icon" width="120">

<br>

<img src="https://firebasestorage.googleapis.com/v0/b/freevity-2a20f.firebasestorage.app/o/Logo%2Ftextual-logo.png?alt=media&token=d805e598-7e04-4899-a6d5-dd6bc327561d" alt="Frevity" width="260">

</div>

# Frevity

Frevity is a web application project whose MVP combines a public landing
surface with a dedicated calculator application surface.

## Project Objective

The MVP establishes the foundation for Frevity and prioritizes:

-   a coherent application architecture;
-   a stable project structure;
-   a clear Git workflow;
-   a consistent product foundation;
-   a calculator application surface;
-   internationalization and global formatting;
-   validation and error handling;
-   SEO and accessibility fundamentals;
-   production readiness.

Planning and architecture decisions are documented separately from
implementation.

## Architecture

The approved architecture is:

> **Modular Monolith Frontend Architecture with Domain-Centric Layering
> and Static-First Hybrid Rendering.**

The MVP is a single Next.js application with two primary product
surfaces:

-   `/` --- Landing Page
-   `/calculator` --- Application Page

There is no requirement at the MVP stage for a separate backend,
database, Redis layer, authentication service, or microservice
architecture.

### Architectural Principles

1.  **Single application boundary** --- the MVP remains inside one
    Next.js application.
2.  **Domain-oriented organization** --- responsibilities are separated
    by product/domain concerns.
3.  **Separation of responsibilities** --- presentation, application
    behavior, calculation logic, formatting, validation, and shared
    concerns remain distinguishable.
4.  **Static-first rendering** --- public and mostly static content
    should use static/server rendering where appropriate.
5.  **Client-side behavior only where required** --- interactive
    behavior should be client-side only when necessary.
6.  **No premature infrastructure** --- additional services are
    introduced only when concrete requirements justify them.

## Technology Foundation

The web application uses:

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS
-   PostCSS
-   ESLint
-   Node.js tooling

Exact dependency versions are defined in `web/package.json`.

## Repository Structure

``` text
frevity/
├── arqc/
│   ├── Frevity-Application-Architecture.md
│   └── Frevity-Trello-Plan-2-Sprints.md
│
└── web/
    ├── app/
    ├── public/
    ├── .gitignore
    ├── AGENTS.md
    ├── CLAUDE.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── README.md
    └── tsconfig.json
```

### `arqc/`

Project-level architecture and planning documentation.

### `web/`

The Next.js web application. Implementation work belongs here.

## Product Surfaces

### Landing Page

``` text
/
```

The public-facing product surface and entry point into the application
experience.

### Calculator Application

``` text
/calculator
```

The main interactive application surface of the MVP.

## Calculation Domain

The calculator follows the conceptual flow:

``` text
User Input
    ↓
Validation
    ↓
Calculation Domain
    ↓
Result
    ↓
Formatting / Presentation
```

Calculation logic must remain independent from visual components and
should be deterministic and independently testable.

## Internationalization

Internationalization is part of the MVP scope and includes:

-   language selection;
-   translated interface content;
-   locale-aware formatting;
-   numerical formatting;
-   other global formatting requirements where applicable.

Changing presentation locale must not alter calculation semantics.

## Validation and Error Handling

The application distinguishes between:

-   invalid user input;
-   incomplete input;
-   domain-invalid values;
-   calculation failures;
-   presentation and formatting concerns.

Validation and error handling must provide clear user feedback without
coupling the calculation domain to UI-specific behavior.

## Rendering Strategy

Frevity follows a **static-first hybrid rendering strategy**:

-   content without runtime interaction should prefer static/server
    rendering;
-   interactive calculator behavior should use client-side capabilities
    only where necessary;
-   rendering decisions should follow the responsibility of each
    surface.

## Deployment and Domain Management

Frevity separates application deployment from domain registration and DNS
management.

The current production infrastructure responsibilities are:

| Responsibility | Provider |
| --- | --- |
| Application hosting and deployment | Netlify |
| Domain registrar | Cloudflare |
| Authoritative DNS management | Cloudflare |
| Production domain | `freevity.app` |

### Netlify

Netlify is responsible for hosting and deploying the Frevity web
application.

The production deployment is connected to the project repository and
serves the Next.js application.

Application deployment configuration, build execution, deployment status,
and production hosting are managed through Netlify.

### Cloudflare

Cloudflare is responsible for the registration and authoritative DNS
management of the production domain:

```text
freevity.app

## Git Workflow

``` text
main
development
feature/*
fix/*
```

-   `main` --- stable project state.
-   `development` --- integration branch for ongoing development.
-   `feature/*` --- new functionality.
-   `fix/*` --- corrections and bug fixes.

## Documentation

### Application Architecture

`arqc/Frevity-Application-Architecture.md`

Defines the approved architecture, boundaries, responsibilities,
structural decisions, and architectural rationale.

### Trello Planning

`arqc/Frevity-Trello-Plan-2-Sprints.md`

Contains the planning established for the two defined development
sprints.

Planning documentation does **not** represent completed implementation.

## Planning vs. Operationalization

Frevity explicitly separates these concepts.

### Planning

Defines what should be built, why it exists, architectural decisions,
task scope, expected deliverables, dependencies, and sequencing.

### Operationalization

Executes the plan through source changes, dependency installation,
implementation, configuration, testing, validation, defect correction,
and release preparation.

A planned item must never be represented as implemented merely because
it has been documented.

## Quality Direction

The project prioritizes:

-   architectural consistency;
-   maintainability;
-   deterministic calculation behavior;
-   separation of concerns;
-   responsive user experience;
-   accessibility;
-   SEO fundamentals;
-   internationalization;
-   validation;
-   cross-browser compatibility;
-   production readiness.

## MVP Scope

The MVP planning covers the foundation required to move Frevity from
project initialization toward a production-ready web application.

The work is organized into the **two defined development sprints**.

The authoritative task breakdown is:

``` text
arqc/Frevity-Trello-Plan-2-Sprints.md
```

## Architectural Evolution

The current architecture is intentionally appropriate for the MVP and is
not a permanent restriction.

If future requirements create meaningful needs for persistent data,
authentication, external APIs, background processing, independent
scaling, caching, complex integrations, or independently deployed
applications, the architecture may evolve.

Such evolution must be driven by concrete requirements rather than
premature infrastructure.

## Project Rule

When an implementation decision conflicts with the approved
architecture, consult the architecture documentation before proceeding.

If a real requirement demonstrates that an architectural decision must
change, review and update the architecture deliberately rather than
silently bypassing it.

This keeps the repository, implementation, and planning aligned.

------------------------------------------------------------------------

&reg;2026 Frevity have all rights.
