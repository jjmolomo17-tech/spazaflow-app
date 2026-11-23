'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatZAR, getStockStatus, validateCartStock, validateCreditCheckout } from '@/lib/businessRules';
import { CartItem, Customer, Product } from '@/types/database';

export default function PosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  async function loadData() {
    const [{ data: prods }, { data: custs }] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('customers').select('*').order('full_name'),
    ]);
    if (prods) setProducts(prods);
    if (custs) setCustomers(custs);
  }

  useEffect(() => {
    loadData();
  }, []);

  function addToCart(product: Product) {
    if (product.stock_qty <= 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        if (existing.quantity + 1 > product.stock_qty) return prev;
        return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.product.selling_price * item.quantity, 0);

  async function completeSale(type: 'cash' | 'credit') {
    setMessage('');
    const stockCheck = validateCartStock(cart);
    if (!stockCheck.valid) {
      setMessage(stockCheck.error || 'Stock error');
      return;
    }

    const shopId = products[0]?.shop_id;
    if (!shopId) return;

    if (type === 'credit') {
      const customer = customers.find((c) => c.id === selectedCustomerId);
      if (!customer) {
        setMessage('Please select a customer on The Book first.');
        return;
      }
      const creditCheck = validateCreditCheckout(customer, cartTotal);
      if (!creditCheck.valid) {
        setMessage(creditCheck.error || 'Credit limit exceeded');
        return;
      }
      await supabase
        .from('customers')
        .update({ current_balance: Number(customer.current_balance) + cartTotal })
        .eq('id', customer.id);
    }

    for (const item of cart) {
      await supabase
        .from('products')
        .update({ stock_qty: item.product.stock_qty - item.quantity })
        .eq('id', item.product.id);
    }

    await supabase.from('transactions').insert({
      shop_id: shopId,
      customer_id: type === 'credit' ? selectedCustomerId : null,
      type,
      total_amount: cartTotal,
    });

    setCart([]);
    setMessage(`${type === 'cash' ? 'Cash' : 'Credit'} sale recorded (${formatZAR(cartTotal)})!`);
    loadData();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 max-w-2xl mx-auto space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Quick Counter POS</h1>
          <p className="text-sm text-slate-600">Tap products to add to counter sale</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-teal-700">Dashboard</Link>
      </header>

      {message && <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-sm font-medium">{message}</div>}

      <section className="grid grid-cols-2 gap-3">
        {products.map((p) => {
          const status = getStockStatus(p);
          return (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              disabled={status === 'out_of_stock'}
              className="p-4 bg-white rounded-2xl border border-slate-200 text-left hover:border-teal-600 disabled:opacity-40"
            >
              <p className="font-bold text-slate-900 text-sm">{p.name}</p>
              <p className="text-lg font-extrabold text-teal-700 mt-1">{formatZAR(Number(p.selling_price))}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                status === 'out_of_stock' ? 'bg-red-100 text-red-700' :
                status === 'low_stock' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {p.stock_qty} in stock
              </span>
            </button>
          );
        })}
      </section>

      <section className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Current Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h2>
          <span className="text-xl font-extrabold text-slate-900">{formatZAR(cartTotal)}</span>
        </div>

        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between text-sm text-slate-700">
            <span>{item.quantity}x {item.product.name}</span>
            <span>{formatZAR(item.quantity * Number(item.product.selling_price))}</span>
          </div>
        ))}

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Credit Customer (Optional — For The Book)</label>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-xl text-sm"
          >
            <option value="">-- Select customer for Credit sale --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name} (Owed: {formatZAR(Number(c.current_balance))} / Limit: {formatZAR(Number(c.credit_limit))})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => completeSale('cash')}
            disabled={cart.length === 0}
            className="py-3 rounded-xl bg-teal-700 text-white font-bold text-sm disabled:opacity-40"
          >
            Complete Cash Sale
          </button>
          <button
            onClick={() => completeSale('credit')}
            disabled={cart.length === 0}
            className="py-3 rounded-xl bg-amber-600 text-white font-bold text-sm disabled:opacity-40"
          >
            Put On The Book (Credit)
          </button>
        </div>
      </section>
    </main>
  );
}
