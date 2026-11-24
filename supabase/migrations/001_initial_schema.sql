-- 001_initial_schema.sql
create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id),
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  shop_id uuid references public.shops(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('owner', 'staff')),
  created_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  name text not null,
  category text default 'General',
  cost_price numeric(10,2) not null default 0 check (cost_price >= 0),
  selling_price numeric(10,2) not null check (selling_price >= 0),
  stock_qty integer not null default 0 check (stock_qty >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  expiry_date date,
  created_at timestamptz default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  full_name text not null,
  phone text,
  credit_limit numeric(10,2) not null default 300.00 check (credit_limit >= 0),
  current_balance numeric(10,2) not null default 0.00 check (current_balance >= 0),
  created_at timestamptz default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid references public.shops(id) on delete cascade not null,
  cashier_id uuid references auth.users(id),
  customer_id uuid references public.customers(id),
  type text not null check (type in ('cash', 'credit', 'repayment')),
  total_amount numeric(10,2) not null check (total_amount > 0),
  created_at timestamptz default now()
);

-- Enable Row-Level Security (RLS)
alter table public.shops enable row level security;
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.transactions enable row level security;

-- Tenant-scoped policies
create policy "Read own shop" on public.shops for select using (true);
create policy "Manage own profile" on public.profiles for all using (auth.uid() = id);
create policy "Shop members manage products" on public.products for all
  using (shop_id in (select shop_id from public.profiles where id = auth.uid()));
create policy "Shop members manage customers" on public.customers for all
  using (shop_id in (select shop_id from public.profiles where id = auth.uid()));
create policy "Shop members manage transactions" on public.transactions for all
  using (shop_id in (select shop_id from public.profiles where id = auth.uid()));
