# Product Requirements Document (PRD) — SpazaFlow

## Document Details

| Field | Answer |
| :--- | :--- |
| **Product name** | SpazaFlow |
| **Author(s)** | Mahlape Joy Molomo |
| **Course code and cohort** | Melsoft Academy — Software Development Cohort (Nov 2026) |
| **Link to original app idea** | `Business.md` in repository root |
| **GitHub repository** | `https://github.com` |
| **Version** | v1.0 |
| **Status** | Approved |

### Change Log

| Version | Date | Section(s) Changed | What Changed |
| :--- | :--- | :--- | :--- |
| v1.0 | 23 Nov 2026 | All (1–13) | Expanded full PRD with business rules, acceptance criteria, data model, and traceability matrix |

---

## 1. Product Overview

### 1.1 Product Name
SpazaFlow

### 1.2 One-Line Pitch
SpazaFlow helps South African spaza shop owners track inventory, expiry dates, and customer credit tabs in seconds without paper notebooks.

### 1.3 Problem Statement
Over 80% of independent spaza shops and tuckshops in South Africa manage daily stock and customer credit ("on the book") in paper notebooks. Notebooks get lost, torn, or miscalculated—leading to frequent stockouts of high-demand staples (bread, milk, maize meal, airtime), unrecorded shrinkage, expired goods sitting on shelves, and thousands of Rands in uncollected customer credit every month.

### 1.4 Solution
- **10-Second Counter Checkout:** Tap items to record cash or credit sales with automatic stock deduction.
- **Digital Credit Book ("The Book"):** Track customer balances, enforce credit limits, log partial or full repayments, and generate one-tap WhatsApp balance reminders.
- **Inventory & Expiry Alerts:** Add stock with cost price, selling price, quantity, and expiry date, with automated low-stock and near-expiry badges.
- **Role-Based Staff Access:** Cashiers ring up sales and check stock counts, while only the Owner can edit cost prices, view net profit margins, or write off debts.

### 1.5 Platform
Mobile-first Progressive Web Application (PWA) built with Next.js/React and Tailwind CSS, optimized for budget Android devices (360 × 800 px) and desktop browsers on low mobile data.

### 1.6 Vision
To become the simplest, most reliable digital operating system for informal township retailers across South Africa, turning paper notebooks into real-time profit visibility.

### 1.7 Key Terms

| Term | Exact Meaning in This App |
| :--- | :--- |
| **SKU / Product** | One sellable retail item with a name, category, cost price, selling price, stock quantity, and optional expiry date. |
| **Counter Sale** | A transaction of 1 or more products paid via Cash or added to a Customer Tab, automatically deducting stock (BR2). |
| **The Book (Credit Ledger)** | The digital ledger tracking money owed by approved regular customers (BR3). |
| **Credit Tab** | An individual customer's running balance of unpaid credit purchases minus repayments. |
| **Low-Stock Threshold** | The minimum unit count (default: 5 units) below which a product triggers an amber "Low Stock" badge (BR4). |
| **Expiry Warning** | An automated alert triggered when a perishable item is within 7 days of its expiry date (BR5). |
| **Cash-Up Summary** | The daily end-of-shift breakdown of total cash collected, credit issued, repayments received, and net profit. |

---

## 2. Users, Personas, and Roles

### 2.1 Primary User
Independent spaza shop and tuckshop owners aged 25–55 in South Africa operating on Android smartphones with prepaid mobile data (tech comfort: Low to Medium).

### 2.2 Secondary User
Shop cashiers / family assistants working the counter during busy trading hours.

### 2.3 Personas

| Field | Persona 1 (Owner) | Persona 2 (Cashier / Staff) |
| :--- | :--- | :--- |
| **Name and age** | Thabo Mokoena, 42 | Lerato Ndlovu, 23 |
| **Role** | Shop Owner (Admin) | Counter Cashier (Staff) |
| **Situation** | Runs a busy spaza shop in Soweto with 350+ products and 60 regular credit customers | Works afternoon and weekend counter shifts while studying part-time |
| **Device & connectivity** | Budget Android smartphone, prepaid mobile data | Entry-level Android smartphone, shop Wi-Fi / mobile data |
| **Tech comfort** | Medium (uses WhatsApp, Capitec app, Facebook) | High (uses social media and mobile web apps daily) |
| **Goal** | Stop losing money to expired stock, cashier errors, and forgotten customer tabs | Ring up queues fast and check item prices without calling the owner |
| **Frustrations today** | Paper credit book is messy; never knows exact daily profit or what needs restocking | Hard to find prices quickly; handwritten tabs cause arguments with customers |
| **Quote** | *"I need to know who owes me money and what stock is finishing before I go to the wholesaler."* | *"When the shop is full, I just want to tap items and finish the sale fast."* |

### 2.4 Roles and Permissions

| Role | How Someone Gets This Role | Can Do | Cannot Do |
| :--- | :--- | :--- | :--- |
| **Owner (Admin)** | Signs up and creates a new shop workspace | Full access: add/edit/delete products, view cost prices & net profit, ring up sales, create/manage credit customers, record repayments, write off bad debt, invite/deactivate staff | — |
| **Staff (Cashier)** | Invited by Owner via staff credentials | View selling prices & stock counts, process Cash and Credit sales, view customer credit balances, record customer repayments | View cost prices or net profit margins, delete products, edit stock counts manually, write off customer debt, manage staff |

---

## 3. Goals, Success Metrics, and Non-Goals

| # | Goal | Metric | Target | How Checked |
| :--- | :--- | :--- | :--- | :--- |
| **G1** | Fast counter checkout | Average time to log a 3-item sale | Under 15 seconds | Timed usability test with 5 users |
| **G2** | Reduce stock waste & stockouts | % of active shops setting expiry dates & low-stock alerts on perishable items | 80% within 7 days | `products` table query (`expiry_date IS NOT NULL`) |
| **G3** | Accurate credit recovery | % of credit transactions linked to a valid customer profile with zero negative balance bugs | 100% | Automated database constraint & integration tests |

### Non-Goals (Out of Scope for v1)
- **No barcode scanner hardware integration:** v1 uses fast tap-to-add tiles and instant search (camera scanning is v2).
- **No online payment gateway / card machine sync:** v1 records Cash and Store Credit only.
- **No multi-branch warehouse transfers:** v1 supports one shop per Owner account.
- **No supplier e-commerce ordering:** v1 generates a restock list; owners still purchase at wholesalers offline.

---

## 4. Features, Business Rules, and Notifications

### 4.1 Features

| ID | Feature Name | What the User Can Do | Priority | Goal | Stories | Screens |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **F1** | Auth & Role Access | Sign up as Owner, log in as Owner or Staff, log out, enforce RLS permissions | Must | G1, G3 | US1, US2 | S1, S2, S3 |
| **F2** | Owner Dashboard | View today's cash sales, credit issued, total owed on The Book, low-stock & expiry alerts | Must | G2, G3 | US3 | S4 |
| **F3** | Quick Counter POS | Search/tap products, build cart, select Cash or Credit customer, complete sale | Must | G1 | US4, US5 | S5 |
| **F4** | Inventory Manager | Add/edit/delete products, set cost/selling price, stock count, low-stock threshold, expiry date | Must | G2 | US6, US7 | S6, S7, M1 |
| **F5** | Customer Credit Ledger | Create customer profiles, set credit limit, view tab history, log repayments, copy WhatsApp reminder | Must | G3 | US8, US9 | S8, S9, M2 |
| **F6** | Daily Sales & Cash-Up | Filter transactions by date/type (Cash vs. Credit), view daily profit (Owner only) | Should | G3 | US10 | S10 |

### 4.2 Business Rules

| ID | Rule | Used By |
| :--- | :--- | :--- |
| **BR1** | **Selling Price Margin Warning:** Selling price must be `>= 0`. If `selling_price < cost_price`, display an amber warning *"Selling below cost price"* before saving. | F4, S7 |
| **BR2** | **Atomic Stock Deduction:** Completing a sale immediately deducts `quantity` from `products.stock_qty` inside a single database transaction. Stock cannot drop below `0` (sale is blocked if requested qty exceeds available stock). | F3, S5 |
| **BR3** | **Credit Limit Enforcement:** A Credit sale can only proceed if `(customer.current_balance + cart_total) <= customer.credit_limit`. If exceeded, block the credit checkout and prompt for Cash or partial Cash payment. | F3, F5, S5 |
| **BR4** | **Low-Stock Alert:** Any product where `stock_qty <= low_stock_threshold` (default `5`) displays an amber **"Low Stock"** badge (`0` displays red **"Out of Stock"**). | F2, F4, S4, S6 |
| **BR5** | **Expiry Alert:** Any product with an `expiry_date` within `<= 7 days` of today displays an amber **"Expiring Soon"** badge; past today displays red **"Expired"**. | F2, F4, S4, S6 |
| **BR6** | **Repayment Validation:** A customer repayment amount must be `> R0.00` and `<= customer.current_balance`. Recording a repayment reduces `current_balance` and logs a `repayment` ledger entry. | F5, S9, M2 |
| **BR7** | **Staff Privacy & Deletion Lock:** Users with role `staff` cannot query `cost_price`, cannot view net profit totals, and cannot delete products or customers (enforced via Supabase RLS). | F1, F2, F4, F5 |

---

## 5. Accounts and Sign-In

| Decision | Answer |
| :--- | :--- |
| **Sign-up methods** | Email + password via Supabase Auth |
| **Who may sign up** | Shop Owners creating a shop workspace (18+); Staff accounts are provisioned under the Owner's `shop_id` |
| **Password rules** | Minimum 8 characters, at least 1 number |
| **Session persistence** | Persistent session token (30 days) for fast counter re-entry; manual Log Out clears local session |
| **Test accounts** | Owner: `owner@spazaflow.co.za` / `Password123!` · Staff: `staff@spazaflow.co.za` / `Password123!` |

---

## 6. User Stories & Acceptance Criteria

