---
name: "SpazaFlow Design System"
description: "High-contrast, mobile-first retail and financial utility design system for South African spaza shops and tuckshops."
---

## Overview

SpazaFlow is a trustworthy, high-contrast retail and cashbook utility built for independent spaza shop owners and cashiers operating on budget Android smartphones in bright counter environments. The visual style pairs crisp white surface cards (`#FFFFFF`) on a soft warm grey canvas (`#F8FAFC`) with subtle `1px` borders (`#E2E8F0`), anchored by Emerald Green (`#15803D`) for primary counter actions and positive cash metrics, and Deep Slate (`#0F172A`) for headers and active navigation.

Every interactive control is sized for rapid, error-free counter use (`48px` minimum touch targets), with `tabular-nums` alignment on all South African Rand (`R 0.00`) currency figures and unmistakable semantic color coding for low stock, expiring perishables, and customer credit balances.

## Colors

The palette uses **Emerald Green** (`#15803D`) as the primary brand and action color to convey financial trust and cash growth, paired with **Deep Slate** (`#0F172A`) for strong typographic hierarchy and navigation anchors. Semantic status colors are reserved strictly for operational states: **Crimson Red** (`#DC2626`) for customer debt and expired stock, **Amber** (`#B45309` / `#FEF3C7`) for low-stock warnings, and **Emerald** (`#15803D` / `#DCFCE7`) for paid/in-stock states.

- **Primary:** Emerald Green (`#15803D`) for primary CTAs (`Complete Sale`, `Create Shop`, `Record Payment`) and active cash indicators.
- **Secondary:** Deep Slate (`#0F172A`) for headers, active navigation states, and high-contrast ink.
- **Surfaces:** Soft Warm Grey (`#F8FAFC`) page background with crisp White (`#FFFFFF`) cards and `#E2E8F0` hairline borders.
- **Semantic Status:** Strictly reserved for debt/expiry (`error`), low-stock (`warning`), and paid/healthy (`success`).

```yaml
colors:
  light:
    primary: "#15803D"
    on-primary: "#FFFFFF"
    primary-container: "#DCFCE7"
    on-primary-container: "#14532D"
    secondary: "#0F172A"
    on-secondary: "#FFFFFF"
    secondary-container: "#E2E8F0"
    on-secondary-container: "#0F172A"
    tertiary: "#1E293B"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#F1F5F9"
    on-tertiary-container: "#0F172A"
    background: "#F8FAFC"
    on-background: "#0F172A"
    surface: "#F8FAFC"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#F8FAFC"
    surface-container: "#F1F5F9"
    surface-container-high: "#E2E8F0"
    surface-container-highest: "#CBD5E1"
    on-surface: "#0F172A"
    on-surface-variant: "#475569"
    outline: "#94A3B8"
    outline-variant: "#E2E8F0"
    error: "#DC2626"
    on-error: "#FFFFFF"
    error-container: "#FEE2E2"
    on-error-container: "#991B1B"
    warning: "#B45309"
    on-warning: "#FFFFFF"
    warning-container: "#FEF3C7"
    on-warning-container: "#92400E"
    success: "#15803D"
    on-success: "#FFFFFF"
    success-container: "#DCFCE7"
    on-success-container: "#14532D"
```

## Typography

SpazaFlow uses **Inter** across all display, headline, body, and label roles for crisp legibility on 360px Android screens, paired with **JetBrains Mono** for receipt codes or reference IDs when needed. All South African Rand currency values (`R 1,420.00`), stock counts, and dates must apply `tabular-nums` so columns and totals align cleanly.

```yaml
typography:
  headline-lg:
    fontFamily: "Inter"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
    letterSpacing: -0.25px
  headline-lg-mobile:
    fontFamily: "Inter"
    fontSize: 22px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: "Inter"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 28px
    letterSpacing: -0.2px
  headline-sm:
    fontFamily: "Inter"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: -0.1px
  title-md:
    fontFamily: "Inter"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0px
  body-md:
    fontFamily: "Inter"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Inter"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Inter"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0px
  label-md:
    fontFamily: "Inter"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
    letterSpacing: 0.1px
  label-sm:
    fontFamily: "Inter"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.2px
```

## Layout & Spacing

The layout uses a **Fluid Grid** on mobile viewports (`360px–390px` width, `16px` page padding, `12px` card gutters) with a persistent 5-tab bottom navigation bar (`Dashboard`, `Inventory`, `Checkout`, `Credit Book`, `Shop`), scaling cleanly to a **Fixed-Max-Width Grid** (`1200px` max width) with a persistent left sidebar on desktop (`1280px`). Spacing follows a strict `4px` / `8px` grid so cards, KPI tiles, and form rows align predictably.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 12px
  gutter-lg: 16px
  gutter-xl: 24px
  section: 24px
  page-margin: 16px
```

## Elevation & Depth

SpazaFlow uses **Low-Contrast Outlines** rather than heavy drop shadows. White cards (`#FFFFFF`) sit on the `#F8FAFC` background separated by crisp `1px` `#E2E8F0` borders, keeping visual noise low under bright store lighting and ensuring fast rendering on budget devices. Sticky bottom checkout bars and modals use a subtle `1px` top border and minimal elevation shadow to separate from scrolling content.

## Shapes

Interactive buttons and inputs use a `10px` border radius (`DEFAULT`) with a minimum `48px` height for reliable one-handed counter tapping. Cards and sheets use a `12px` radius (`md`), while status badges and filter chips use `full` (`9999px`) pill geometry.

```yaml
rounded:
  sm: 6px
  DEFAULT: 10px
  md: 12px
  lg: 16px
  full: 9999px
```

## Motion & Micro-interaction

Motion is immediate and functional. Tap feedback on POS product tiles and primary buttons lands in `100ms` so rapid multi-item checkout feels instantaneous. Drawers and modals enter in `200ms` with ease-out deceleration. Nothing animates decoratively or loops.

```yaml
motion:
  state-change:
    duration: 100ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 200ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-exit:
    duration: 150ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Direct, practical, and encouraging—written for busy township shopkeepers, never corporate jargon.
- **Capitalisation:** Sentence case for headings, labels, and alerts; Title Case for navigation tabs and primary action buttons (`Complete Sale`, `Record Payment`, `Add Product`).
- **Terminology:** Always use **Credit Tab** or **The Book** (never "Accounts Receivable"), **Cashier / Staff** (never "Sub-user"), and **Restock** (never "Replenish").
- **Numbers & Currency:** Always format South African Rand as `R 1,420.00` (with space after `R`, comma thousands separator, two decimals, and `tabular-nums`).
- **Empty & Error States:** Actionable and plain-spoken, e.g. `"Your shelf is empty. Add your first product."` or `"Payment cannot exceed balance owed (R 50.00)."`

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html`: `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html`: `input-field-text`, `input-field-icon`
