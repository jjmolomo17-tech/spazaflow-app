# Product Requirements Document (PRD) — SpazaFlow

## Document Details

| Field | Answer |
| :--- | :--- |
| **Product name** | SpazaFlow |
| **Author(s)** | Joy Molomo |
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


US1 (F1): Owner Sign-Up & Workspace Creation

• T-US1-1: Given I am on S2 Sign Up, when I enter my shop name, email, and valid password (8+ chars, 1 number) and tap Create Shop, then my Owner account and shop record are created and I land on S4 Owner Dashboard.
• T-US1-2 (unhappy): Given the password is under 8 characters or missing a number, then inline validation displays "Password must be at least 8 characters and include a number."

US2 (F1): Role-Based Login Redirect

• T-US2-1: Given I log in on S3 as Owner, then I am routed to S4 Owner Dashboard with full profit and inventory controls.
• T-US2-2: Given I log in on S3 as Staff, then I am routed directly to S5 Quick Counter POS, and profit/cost fields are hidden.

US3 (F2): Owner Dashboard Snapshot

• T-US3-1: Given sales and credit tabs exist today, when I open S4, then I see accurate totals for Today's Cash, Credit Issued Today, Total Owed on The Book, and clickable counts for Low Stock and Expiring Soon items.

US4 (F3): Fast Cash Sale Checkout

• T-US4-1: Given I tap 2 loaves of Bread (R18.00 each, stock 10) on S5 and tap Complete Cash Sale, then a R36.00 cash sale is saved, bread stock updates to 8, and a green toast "Sale recorded — R36.00" appears.
• T-US4-2 (unhappy): Given Bread has 0 stock, when I tap Bread on S5, then it is disabled with an "Out of Stock" badge (BR2).

US5 (F3): Customer Credit ("On The Book") Checkout

• T-US5-1: Given customer Sipho Dlamini has a R500 credit limit and R100 current balance, when I ring up a R50 cart on S5, select Credit (The Book) -> Sipho Dlamini, and confirm, then stock deducts and Sipho's balance becomes R150.
• T-US5-2 (unhappy): Given Sipho's balance is R480 (R500 limit) and the cart is R50, when I select Sipho for Credit, then checkout is blocked with "Exceeds Sipho's R500 credit limit (R20 remaining)" (BR3).

US6 (F4): Add & Edit Inventory Item

• T-US6-1: Given I am logged in as Owner on S7 Add Product, when I enter Name (Clover Full Cream Milk 2L), Cost (R24.00), Selling Price (R32.00), Stock (12), and Expiry Date (3 days from today), then the product appears in S6 with an amber "Expiring Soon" badge (BR5).

US7 (F4): Staff Inventory Restriction

• T-US7-1 (unhappy): Given I am logged in as Staff, when I open S6 Inventory List, then I see selling prices and stock counts, while Cost Price, Add Product, Edit, and Delete buttons are hidden and blocked by RLS (BR7).

US8 (F5): Create Customer Credit Profile

• T-US8-1: Given I am on S8 Customer Credit Ledger, when I tap + New Customer, enter Name (Nomsa Khumalo), Phone (072 555 0194), and Credit Limit (R300), and save, then Nomsa appears on The Book with R0.00 owed.

US9 (F5): Record Repayment & WhatsApp Reminder

• T-US9-1: Given Nomsa Khumalo owes R150.00 on S9 Customer Detail, when I open M2 Record Repayment, enter R100.00, and confirm, then her balance updates to R50.00 and a repayment entry is added to her history (BR6).
• T-US9-2: When I tap Copy WhatsApp Reminder on S9, then a formatted message ("Hi Nomsa, friendly reminder from Thabo's Spaza: your current balance on The Book is R50.00.") is copied to the clipboard.

US10 (F6): Daily Transactions & Cash-Up Log

• T-US10-1: Given I open S10 Transactions, when I filter by Today, then I see all Cash sales, Credit sales, and Repayments in reverse-chronological order with payment badges.

7. User Flows and Navigation Map


Flow 1: Counter Sale (Cash or Credit)

1. User opens S5 Quick Counter POS (default landing screen for Staff; 1-tap tab for Owner).
2. Taps product tiles (or searches by name) to add items to the bottom cart bar.
3. Taps Checkout -> chooses Cash or Credit (The Book).
4. If Credit, selects customer from searchable list (displays remaining credit limit).
5. Taps Confirm Sale -> atomic RPC deducts stock, logs transaction, updates customer balance, and shows confirmation toast.

Flow 2: Credit Customer Repayment

1. User opens S8 The Book (Customers) -> taps customer row -> S9 Customer Detail.
2. Taps Record Payment -> opens M2 Repayment Modal.
3. Enters amount paid -> taps Save Payment -> balance updates immediately.

Navigation Structure

• Bottom Tab Bar (Mobile) / Left Sidebar (Desktop):
	1. Dashboard (S4 — Owner only)
	2. POS / Sell (S5 — Owner & Staff)
	3. Stock (S6 — Owner & Staff)
	4. The Book (S8 — Owner & Staff)
	5. Sales Log (S10 — Owner & Staff)

8. Screen Inventory


ID	Screen Name	Type	Role Access	Purpose	Stories
S1	Welcome / Landing	Full screen	Public	Value pitch, "Create Shop Account" and "Log In" CTAs	US1, US2
S2	Owner Sign Up	Full screen	Public	Register new shop workspace and Owner credentials	US1
S3	Log In	Full screen	Public	Email/password login for Owner and Staff	US2
S4	Owner Dashboard	Tab screen	Owner only	Daily KPIs (Cash, Credit, Total Owed, Profit) + Low-Stock/Expiry alert cards	US3
S5	Quick Counter POS	Tab screen	Owner, Staff	Product grid, search bar, live cart drawer, Cash vs. Credit checkout	US4, US5
S6	Inventory List	Tab screen	Owner, Staff	Searchable stock table/cards with Low-Stock and Expiry status badges	US6, US7
S7	Add / Edit Product	Full screen	Owner only	Form for name, category, cost price, selling price, qty, threshold, expiry	US6
S8	Customer Credit Book	Tab screen	Owner, Staff	List of credit customers, balances, credit limits, and "+ New Customer" CTA	US8
S9	Customer Tab Detail	Full screen	Owner, Staff	Customer balance card, WhatsApp reminder copy button, credit/repayment ledger	US9
S10	Transactions / Cash-Up	Tab screen	Owner, Staff	Filterable daily log of Cash sales, Credit sales, and Repayments	US10
M1	Delete Product Confirm	Modal	Owner only	Confirm permanent removal of an inventory SKU	US6
M2	Record Repayment	Modal	Owner, Staff	Input Rand amount repaid by customer and update balance	US9
M3	Add Credit Customer	Modal	Owner, Staff	Quick-create customer profile with name, phone, and credit limit	US8


9. Design Direction


Item	Choice
Look & Feel	High-contrast, clean, utilitarian retail UI built for bright shop lighting and fast thumb taps
Primary Colour	Deep Emerald #0F766E (primary actions, active tabs, positive cash indicators; 4.5:1+ contrast)
Accent / Credit Colour	Warm Amber #D97706 (credit tabs, low-stock & expiring-soon warnings)
Background / Surface	Off-White #F8FAFC background / Pure White #FFFFFF cards / Slate #0F172A primary text
Semantic Status	Success #15803D · Warning #B45309 · Danger / Out of Stock / Expired #B91C1C
Typography	Inter (Headings 20px Bold; KPI numbers 24px ExtraBold tabular-nums; Body 14px–16px Regular)
Touch Targets	Minimum 48px height for all product tiles, checkout buttons, and form inputs
Design Exports	Stored in docs/designs/ (spazaflow_design_system.md and screen PNGs)


10. Data Model (Supabase PostgreSQL)


Tables & Fields

1. shops
	• id (UUID, PK, default gen_random_uuid())
	• name (Text, required — e.g., "Thabo's Spaza")
	• owner_id (UUID, FK -> auth.users.id, required)
	• created_at (Timestamptz, default now())
2. profiles
	• id (UUID, PK, FK -> auth.users.id)
	• shop_id (UUID, FK -> shops.id, required)
	• full_name (Text, required)
	• role (Text, check in ('owner', 'staff'), required)
	• created_at (Timestamptz, default now())
3. products
	• id (UUID, PK, default gen_random_uuid())
	• shop_id (UUID, FK -> shops.id, required)
	• name (Text, required)
	• category (Text, default 'General')
	• cost_price (Numeric(10,2), required, >= 0 — restricted to owner role)
	• selling_price (Numeric(10,2), required, >= 0)
	• stock_qty (Integer, required, default 0, >= 0)
	• low_stock_threshold (Integer, required, default 5, >= 0)
	• expiry_date (Date, nullable)
	• created_at (Timestamptz, default now())
4. customers
	• id (UUID, PK, default gen_random_uuid())
	• shop_id (UUID, FK -> shops.id, required)
	• full_name (Text, required)
	• phone (Text, nullable)
	• credit_limit (Numeric(10,2), required, default 300.00, >= 0)
	• current_balance (Numeric(10,2), required, default 0.00, >= 0)
	• created_at (Timestamptz, default now())
5. transactions
	• id (UUID, PK, default gen_random_uuid())
	• shop_id (UUID, FK -> shops.id, required)
	• cashier_id (UUID, FK -> profiles.id, required)
	• customer_id (UUID, FK -> customers.id, nullable — required when type = 'credit')
	• type (Text, check in ('cash', 'credit', 'repayment'), required)
	• total_amount (Numeric(10,2), required, > 0)
	• total_profit (Numeric(10,2), default 0 — visible to owner only)
	• created_at (Timestamptz, default now())
6. transaction_items
	• id (UUID, PK, default gen_random_uuid())
	• transaction_id (UUID, FK -> transactions.id ON DELETE CASCADE)
	• product_id (UUID, FK -> products.id)
	• quantity (Integer, required, > 0)
	• unit_price (Numeric(10,2), required)
	• unit_cost (Numeric(10,2), required)

Seed Data (South African Spaza Demo Dataset)

• Shop: Khayelitsha Corner Spaza (owner@spazaflow.co.za & staff@spazaflow.co.za)
• Products (8 SKUs): Albany White Bread (R18.00, qty 14), Clover Full Cream Milk 2L (R32.00, qty 4 — Low Stock), White Star Maize Meal 5kg (R68.00, qty 9), Coca-Cola 2L (R25.00, qty 18), Koo Baked Beans 410g (R16.50, qty 22), Sunlight Laundry Bar (R14.00, qty 3 — Low Stock), Polony Roll 500g (R22.00, qty 6, expires in 3 days — Expiring Soon), Vodacom R12 Airtime (R12.00, qty 50).
• Customers (3 Accounts): Sipho Dlamini (Limit R500, Owed R145.00), Nomsa Khumalo (Limit R300, Owed R68.00), Bongani Sithole (Limit R200, Owed R0.00).

11. Tech Stack & Architecture


Layer	Technology	Rationale
Frontend	Next.js 14 (App Router) + React + TypeScript	Fast server/client rendering, strict type safety for currency & stock math
Styling	Tailwind CSS + Lucide Icons	Lightweight utility CSS bundle (<50 KB) ideal for low-data mobile networks
Backend & Auth	Supabase (PostgreSQL + Auth + RLS)	Built-in role-based Row-Level Security and atomic SQL RPC functions
Testing	Vitest / Jest + React Testing Library	Unit & integration tests for stock deduction, credit limits, and RLS rules
CI/CD & Hosting	GitHub Actions + Vercel	Automated lint/test/build checks on every PR with instant Vercel preview URLs


Security & POPIA Compliance

• Row-Level Security (RLS): Enabled on all 6 tables; users can only read/write rows matching their shop_id.
• Atomic RPCs: process_sale and record_repayment execute as SECURITY DEFINER PostgreSQL functions with explicit role and balance checks to prevent race conditions or negative stock.
• POPIA Data Minimization: Customer profiles store only name, optional phone number, and shop credit balance—no ID numbers or sensitive personal data collected.

12. Quality, Error Handling, and Edge Cases


Situation	Exact User Message	App Behavior
Insufficient stock during checkout	"Only [X] units of [Product] left in stock."	Blocks sale; keeps cart intact so cashier can adjust quantity
Credit limit exceeded	"Exceeds [Customer]'s R[Limit] credit limit (R[Remaining] available)."	Blocks credit sale; offers one-tap switch to Cash
Repayment exceeds balance	"Repayment cannot exceed current balance of R[Balance]."	Prevents overpayment entry
Offline / network drop	"No internet connection. Check your data and try again."	Disables checkout submit button until connection resumes
Unauthorized Staff access	"Owner permission required for this action."	Redirects Staff to /pos if accessing /dashboard or /inventory/new


13. Traceability Matrix & Sign-Off


Feature	User Stories	Screens	Business Rules
F1 Auth & Roles	US1, US2	S1, S2, S3	BR7
F2 Owner Dashboard	US3	S4	BR4, BR5, BR7
F3 Quick Counter POS	US4, US5	S5	BR2, BR3
F4 Inventory Manager	US6, US7	S6, S7, M1	BR1, BR4, BR5, BR7
F5 Customer Credit Ledger	US8, US9	S8, S9, M2, M3	BR3, BR6, BR7
F6 Daily Sales & Cash-Up	US10	S10	BR7


