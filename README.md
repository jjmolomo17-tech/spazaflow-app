# 🏪 SpazaFlow

**A fast, mobile-first Point-of-Sale (POS) and inventory management web application built for independent spaza shops.**

🔗 **Live Demo:** [https://spazaflow-app.vercel.app](https://spazaflow-app.vercel.app)  
🎨 **UI/UX Designs:** [View Stitch Design System](./docs/designs/spazaflow_design_system.md)

---

## 📖 Overview

Independent spaza shops are vital to local township economies, yet many still rely on manual pen-and-paper bookkeeping—leading to unexpected stockouts, untracked sales, and lost revenue. **SpazaFlow** replaces manual tracking with a clean, real-time digital dashboard and quick-checkout POS tailored for daily shop operations.

---

## ✨ Core Features

* **🔐 Secure Authentication:** Shop owners sign up and log in securely via Supabase Auth, with Row-Level Security (RLS) keeping each shop's inventory and sales data private.
* **📦 Real-Time Inventory Management (`/dashboard`):** View current stock levels, track low-stock items, add new products, and update quantities with instant database persistence.
* **⚡ Quick POS Checkout (`/pos`):** Ring up customer purchases in seconds, automatically calculate order totals, and deduct sold quantities from live inventory.
* **🧪 Automated Business Logic Testing:** Core cart calculations, stock deduction rules, and edge cases are verified with automated unit tests (`Vitest`).

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
* **Backend & Database:** Supabase (PostgreSQL, Auth, Row-Level Security)
* **Testing:** Vitest
* **Design:** Google Stitch
* **Deployment & CI:** Vercel & GitHub Actions

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/jjmolomo17-tech/spazaflow-app.git
cd spazaflow-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server & tests
```bash
npm run dev
npm test
```

---

## 📂 Project Structure

```text
├── docs/
│   ├── designs/          # Exported Stitch UI screens & design system
│   └── PRD.md            # Product Requirements Document
├── src/
│   ├── app/
│   │   ├── dashboard/    # Inventory management dashboard
│   │   ├── login/        # Authentication screens
│   │   └── pos/          # Quick Point-of-Sale checkout
│   ├── lib/              # Supabase client & core business rules
│   └── types/            # TypeScript database interfaces
├── supabase/
│   └── migrations/       # Initial PostgreSQL schema & RLS policies
└── tests/                # Vitest unit tests
```

---

## 🔮 Future Improvements

* **Offline-First Sync:** Queue POS sales locally during load-shedding or network drops and auto-sync once reconnected.
* **Customer Credit ("Book") Ledger:** Digital tracking for trusted community customers buying on credit.
* **WhatsApp Restock Alerts:** Automated daily low-stock summaries sent straight to the shop owner's phone.
