# Frevity — Business Rules

## 1. Purpose

This document records the business decisions that define the initial monetary and geographic scope of Frevity's freight calculations.

It is the reference for future implementation, architecture, validation, and product decisions. Changes to these rules must be deliberate and reflected in this document.

## 2. MVP Business Scope

Frevity will not attempt to support every country or every currency in the initial version.

The MVP deliberately restricts **national freight calculations** to supported countries whose national currency belongs to this initial set:

- **BRL** — Brazilian Real
- **EUR** — Euro
- **USD** — United States Dollar
- **JPY** — Japanese Yen

This restriction reduces financial, regulatory, currency, and implementation complexity during the initial product phase.

## 3. National Freight

A national freight operation occurs when origin and destination belong to the same country.

Examples:

```text
Brazil → Brazil
Portugal → Portugal
United States → United States
Japan → Japan
```

The currency is determined by the **country of the national operation**, not by continent.

For the MVP:

| Currency | Code | Role |
|---|---|---|
| Brazilian Real | BRL | National freight |
| Euro | EUR | National freight |
| United States Dollar | USD | National freight |
| Japanese Yen | JPY | National freight |

Countries must be explicitly included in Frevity's supported-country configuration. Geographic region alone does not make a country eligible.

### Brazil

Brazil is supported for national freight using **BRL**.

Other South American countries are not automatically supported.

### Euro countries

Frevity may support countries that use the Euro as their national currency. Being located in Europe alone does not make a country eligible; the country must be explicitly configured as supported.

### United States Dollar

USD is supported for national freight in countries explicitly configured by Frevity as national USD markets.

The MVP does not assume that an entire continent automatically uses USD.

### Japan

Japan is supported for national freight using **JPY**.

Other Asian countries are not automatically supported.

## 4. Unsupported National Markets

A country outside the Frevity supported-country configuration does **not** receive a national freight calculation in the MVP.

The system must not:

- invent a national currency;
- silently convert the operation to another currency;
- pretend that the country is supported;
- treat the country as supported solely because it belongs to a supported continent or region.

Instead, the product should clearly communicate that **national freight is not yet available for that country**.

Where appropriate, the user may be offered the international freight flow.

Example:

```text
Argentina → Argentina

National freight
→ Not currently supported
→ Offer international freight flow
```

The international flow is an alternative product capability, not a reclassification of the original national operation.

## 5. International Freight

An international freight operation involves different countries.

Examples:

```text
Brazil → United States
Portugal → Japan
Japan → Germany
United States → Brazil
```

### MVP currency rule

```text
International calculation currency = USD
International presentation currency = USD
```

This applies regardless of the user's locale or the countries involved.

The use of USD for international freight is a **Frevity business rule for the MVP**, not a universal rule of international commerce.

## 6. Country, Locale, and Currency

These concepts must remain separate.

### Country

Determines whether a national operation is supported and, when supported, which national currency applies.

```text
country
    ↓
supported national market
    ↓
national currency
```

### Locale

Locale primarily determines:

- language;
- number formatting;
- date formatting;
- monetary presentation conventions;
- regional defaults/preferences.

Locale must **not** be the authoritative source for the currency of an operation.

Language alone is insufficient to determine currency because the same language can be used in countries with different currencies.

### Currency

Currency is a business/domain property of the calculation. It must not be inferred solely from UI language.

## 7. Domain Currency Separation

The architecture should preserve the distinction between:

```text
sourceCurrency
calculationCurrency
displayCurrency
```

These may coincide in a simple national operation but remain conceptually separate for future expansion.

Brazil national example:

```text
sourceCurrency      = BRL
calculationCurrency = BRL
displayCurrency     = BRL
```

Portugal national example:

```text
sourceCurrency      = EUR
calculationCurrency = EUR
displayCurrency     = EUR
```

International MVP example:

```text
calculationCurrency = USD
displayCurrency     = USD
```

The exact source-currency behavior for individual international charges may be expanded when multi-currency input is introduced.

## 8. Product Behavior

### Supported national country

Show:

```text
National Freight
```

and use the country's configured national currency.

### Unsupported national country

Show a clear unsupported-state message and, where applicable, offer:

```text
International Freight
```

The application must not expose unsupported national calculations as valid calculations.

## 9. Architecture Rules

Business rules must not be hard-coded into React components or presentation logic.

Supported-country and currency policy should live in a domain/configuration layer that can be extended.

The calculation engine should consume already-resolved domain inputs rather than deciding geographic policy itself.

Conceptually:

```text
Origin + Destination
        ↓
Operation Classification
        ↓
Country Support Policy
        ↓
Currency Resolution
        ↓
Calculation Input
        ↓
Landed Cost Engine
```

This allows new countries and currencies to be added without rewriting core calculation formulas.

## 10. Expansion Strategy

The MVP intentionally supports a limited market.

Future countries may be added incrementally.

Example:

```text
Current:
BR → BRL
Supported Euro countries → EUR
US-supported market → USD
JP → JPY
```

Adding a country must be an explicit product/business decision, not an automatic consequence of geography.

## 11. Non-Goals for the MVP

The following are outside the current scope:

- supporting every world currency;
- automatic foreign-exchange conversion for national freight;
- building a complete FX engine;
- inferring currency only from locale;
- supporting every European country;
- supporting every country in the Americas;
- supporting every Asian country;
- creating country-specific tax engines;
- treating unsupported national markets as supported through currency conversion.

## 12. Decision Summary

For the current Frevity MVP:

1. **National freight is country-based.**
2. **National currency is determined by the supported country.**
3. **The initial supported currency set is BRL, EUR, USD, and JPY.**
4. **Brazil uses BRL for national freight.**
5. **Supported Euro countries use EUR for national freight.**
6. **The United States and other explicitly configured USD national markets use USD.**
7. **Japan uses JPY for national freight.**
8. **Countries outside the supported national configuration do not receive national freight calculations.**
9. **Unsupported national markets may be directed to the international freight flow.**
10. **International freight uses USD for calculation and presentation in the MVP.**
11. **Locale controls language and regional presentation, not authoritative operation currency.**
12. **Country/currency policy remains separate from the calculation engine and UI.**

## 13. Change Management

Whenever the team changes:

- supported countries;
- national currencies;
- international currency policy;
- locale/currency behavior;
- unsupported-country behavior;

this document must be updated before or together with the corresponding implementation.

This file is the business reference for these decisions until a newer approved version replaces it.
