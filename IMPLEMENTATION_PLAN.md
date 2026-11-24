# Implementation Plan — SpazaFlow

## 1. Architecture & Repository Structure

```text
spazaflow-app/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Lint, TypeScript check, and unit tests on PR
├── docs/
│   ├── PRD.md                     # Complete Product Requirements Document
│   └── designs/                   # Stitch design system & exported screen PNGs
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql # Tables, constraints, and indexes
│   │   ├── 002_rls_policies.sql   # Owner vs. Staff Row-Level Security
│   │   └── 003_rpc_functions.sql  # Atomic process_sale & record_repayment RPCs
│   └── seed.sql                   # South African spaza demo shop, SKUs, and customers
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Responsive mobile bottom-nav / desktop sidebar shell
│   │   ├── page.tsx               # S1 Welcome / Landing screen
│   │   ├── login/page.tsx         # S3 Log In screen
│   │   ├── signup/page.tsx        # S2 Owner Sign Up screen
│   │   ├── dashboard/page.tsx     # S4 Owner Dashboard (KPIs & alerts)
│   │   ├── pos/page.tsx           # S5 Quick Counter POS Checkout
│   │   ├── inventory/
│   │   │   ├── page.tsx           # S6 Inventory List
│   │   │   └── new/page.tsx       # S7 Add / Edit Product (Owner only)
│   │   ├── customers/
│   │   │   ├── page.tsx           # S8 Customer Credit Book
│   │   │   └── [id]/page.tsx      # S9 Customer Tab Detail & WhatsApp reminder
│   │   └── transactions/page.tsx  # S10 Daily Transactions & Cash-Up Log
│   ├── components/
│   │   ├── Navbar.tsx             # Role-aware navigation bar
│   │   ├── ProductTile.tsx        # POS tap tile with stock/expiry badge
│   │   ├── CartDrawer.tsx         # Sticky mobile cart & Cash/Credit checkout modal
│   │   └── RepaymentModal.tsx     # M2 Customer repayment modal
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser Supabase client
│   │   │   └── server.ts          # Server Supabase client
│   │   └── businessRules.ts       # Pure functions for BR1–BR6 validation & formatting
│   └── types/
│       └── database.ts            # TypeScript interfaces for all 6 tables
├── tests/
│   └── businessRules.test.ts      # Unit tests for stock deduction, credit limit, and badges
├── Business.md                    # Comprehensive business case
├── IMPLEMENTATION_PLAN.md         # This phased technical roadmap
└── README.md                      # Setup guide, live links, and test logins
```

---

## 2. Database & Backend Specifications (Supabase)

### 2.1 Core Tables & Constraints
- **`shops` & `profiles`:** Links every authenticated user to a `shop_id` and assigns `role IN ('owner', 'staff')`.
- **`products`:** Enforces `CHECK (stock_qty >= 0)` and `CHECK (selling_price >= 0)` at the database level so stock can never go negative even under concurrent counter checkouts.
- **`customers`:** Enforces `CHECK (current_balance >= 0)` and `CHECK (credit_limit >= 0)`.
- **`transactions` & `transaction_items`:** Stores immutable audit records for every `cash`, `credit`, and `repayment` event.

### 2.2 Atomic PostgreSQL RPC Functions
1. **`process_sale(p_shop_id, p_cashier_id, p_type, p_customer_id, p_items)`**
   - Locks target `products` rows (`FOR UPDATE`) to prevent race conditions.
   - Verifies `stock_qty >= item.quantity` for every line item (BR2); raises exception if insufficient.
   - If `p_type = 'credit'`, locks `customers` row and verifies `(current_balance + cart_total) <= credit_limit` (BR3); raises exception if exceeded.
   - Inserts `transactions` + `transaction_items`, decrements `products.stock_qty`, and increments `customers.current_balance` (if credit) atomically.
2. **`record_repayment(p_shop_id, p_cashier_id, p_customer_id, p_amount)`**
   - Verifies `p_amount > 0` and `p_amount <= current_balance` (BR6).
   - Decrements `customers.current_balance` and inserts a `repayment` row in `transactions`.

### 2.3 Row-Level Security (RLS) Matrix
- **Tenant Isolation:** Every table enforces `shop_id = (SELECT shop_id FROM profiles WHERE id = auth.uid())`.
- **Owner-Only Mutations:** `INSERT`, `UPDATE`, and `DELETE` on `products` require `role = 'owner'`.
- **Staff Restrictions:** `staff` users can `SELECT` products/customers/transactions and invoke `process_sale` / `record_repayment`, while UI and API views strip `cost_price` and `total_profit` for non-owners (BR7).

---

## 3. Phased Execution Roadmap

### Phase 1: Project Scaffold, CI & Supabase Schema (Issues #1–#2)
- Initialize Next.js 14 + TypeScript + Tailwind CSS + Lucide Icons.
- Configure `.github/workflows/ci.yml` to run `npm run lint`, `npx tsc --noEmit`, and `npm test` on every PR.
- Write `001_initial_schema.sql`, `002_rls_policies.sql`, `003_rpc_functions.sql`, and `seed.sql`.
- **Deliverable:** Clean build pipeline and reproducible database migrations in `supabase/`.

### Phase 2: Authentication & Role-Based Routing (Issue #3)
- Build `S1 Welcome`, `S2 Owner Sign Up` (creates `shops` + `profiles` owner record), and `S3 Log In`.
- Implement Next.js middleware / auth guard routing `owner` -> `/dashboard` and `staff` -> `/pos`, blocking `staff` from `/dashboard` and `/inventory/new`.
- **Deliverable:** Working login with demo Owner and Staff accounts.

### Phase 3: Inventory Manager & Status Badges (Issue #4)
- Implement pure badge helpers in `src/lib/businessRules.ts` (`getStockStatus`, `getExpiryStatus`, `hasMarginWarning`).
- Build `S6 Inventory List` (search, category filter, Low-Stock/Expiry badges) and `S7 Add/Edit Product` (Owner only).
- **Deliverable:** Full CRUD for inventory items with automated BR1, BR4, and BR5 indicators.

### Phase 4: Quick Counter POS & Atomic Checkout (Issue #5)
- Build `S5 Quick Counter POS` with large 48px+ tap-to-add product tiles, instant search, and slide-up `CartDrawer`.
- Connect checkout button to `process_sale` RPC supporting both **Cash** and **Credit (The Book)** with inline credit-limit validation (BR2, BR3).
- **Deliverable:** End-to-end counter checkout that updates stock and customer balances in real time.

### Phase 5: Customer Credit Ledger ("The Book") & Owner Dashboard (Issues #6–#7)
- Build `S8 Customer Credit Book`, `M3 Add Customer Modal`, `S9 Customer Detail` (with one-tap WhatsApp balance reminder copy), and `M2 Record Repayment Modal` (BR6).
- Build `S4 Owner Dashboard` KPI cards (Today's Cash, Credit Issued, Total Owed on Book, Net Profit) and clickable Low-Stock / Expiring Soon alert lists.
- Build `S10 Transactions / Cash-Up` log with date and payment-type filters.
- **Deliverable:** Complete feature set matching all 10 user stories (`US1–US10`).

### Phase 6: Automated Testing, Deployment & Final Polish (Issue #8)
- Run full Vitest suite covering `BR1–BR6` edge cases (zero stock, credit limit boundary, repayment overflow, expiry countdown).
- Deploy production build to Vercel with environment variables configured and verify live demo flow on mobile viewport (`360 × 800 px`).
- **Deliverable:** Live Vercel URL in `README.md` and all acceptance tests green.

---

## 4. Verification & Testing Checklist

- [ ] **T1 (Auth):** Owner logs in -> lands on `/dashboard`; Staff logs in -> lands on `/pos` and cannot open `/dashboard`.
- [ ] **T2 (POS Cash):** Selling 2 units of Bread (`R18`) records `R36` cash sale and reduces stock by 2.
- [ ] **T3 (POS Stock Guard):** Items at `0` stock cannot be added to cart.
- [ ] **T4 (Credit Limit Guard):** Credit sale exceeding `credit_limit - current_balance` is blocked with clear warning.
- [ ] **T5 (Repayment):** Recording `R100` repayment on a `R150` balance updates customer balance to `R50`.
- [ ] **T6 (Alerts):** Product with `stock_qty <= 5` shows amber Low Stock badge; product expiring within 7 days shows Expiring Soon badge.
- [ ] **T7 (CI):** All GitHub Actions checks (`lint`, `typecheck`, `test`) pass on `main`.
