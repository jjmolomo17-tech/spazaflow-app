'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatZAR, getExpiryStatus, getStockStatus } from '@/lib/businessRules';
import { Customer, Product } from '@/types/database';

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [todayCash, setTodayCash] = useState(0);
  const [todayCredit, setTodayCredit] = useState(0);

  useEffect(() => {
    async function load() {
      const [{ data: prods }, { data: custs }, { data: txns }] = await Promise.all([
        supabase.from('products').select('*').order('name'),
        supabase.from('customers').select('*').order('current_balance', { ascending: false }),
        supabase.from('transactions').select('*'),
      ]);
      if (prods) setProducts(prods);
      if (custs) setCustomers(custs);
      if (txns) {
        setTodayCash(txns.filter((t) => t.type === 'cash').reduce((s, t) => s + Number(t.total_amount), 0));
        setTodayCredit(txns.filter((t) => t.type === 'credit').reduce((s, t) => s + Number(t.total_amount), 0));
      }
    }
    load();
  }, []);

  const totalOwed = customers.reduce((s, c) => s + Number(c.current_balance), 0);
  const lowStockItems = products.filter((p) => getStockStatus(p) !== 'in_stock');
  const expiringItems = products.filter((p) => ['expired', 'expiring_soon'].includes(getExpiryStatus(p.expiry_date)));

  return (
    <main className="min-h-screen bg-slate-50 p-5 max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Owner Dashboard</h1>
          <p className="text-sm text-slate-600">Khayelitsha Corner Spaza</p>
        </div>
        <Link href="/pos" className="px-4 py-2.5 rounded-xl bg-teal-700 text-white font-bold text-sm">
          Open Counter POS
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Cash Sales</p>
          <p className="text-2xl font-extrabold text-teal-700 mt-1">{formatZAR(todayCash)}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase">Credit Issued</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">{formatZAR(todayCredit)}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 col-span-2">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Owed on The Book</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{formatZAR(totalOwed)}</p>
        </div>
      </section>

      <section className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Stock & Expiry Alerts ({lowStockItems.length + expiringItems.length})</h2>
          <Link href="/pos" className="text-xs font-semibold text-teal-700">Go to POS →</Link>
        </div>
        {lowStockItems.map((p) => (
          <div key={p.id} className="flex items-center justify-between py-2 border-t border-slate-100 text-sm">
            <span>{p.name}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              {p.stock_qty} left (Low Stock)
            </span>
          </div>
        ))}
        {expiringItems.map((p) => (
          <div key={`exp-${p.id}`} className="flex items-center justify-between py-2 border-t border-slate-100 text-sm">
            <span>{p.name}</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
              Expires {p.expiry_date}
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}
