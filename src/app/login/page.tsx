'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('owner@spazaflow.co.za');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (!authError && data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile?.role === 'staff') {
          router.push('/pos');
        } else {
          router.push('/dashboard');
        }
        return;
      }

      // Demo account fallback if Supabase Auth is unreachable or demo user isn't seeded
      if (email === 'owner@spazaflow.co.za' && password === 'Password123!') {
        router.push('/dashboard');
        return;
      }
      if (email === 'staff@spazaflow.co.za' && password === 'Password123!') {
        router.push('/pos');
        return;
      }

      setError(authError?.message || 'Invalid login credentials.');
    } catch {
      if (email === 'owner@spazaflow.co.za' && password === 'Password123!') {
        router.push('/dashboard');
        return;
      }
      if (email === 'staff@spazaflow.co.za' && password === 'Password123!') {
        router.push('/pos');
        return;
      }
      setError('Unable to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-900">SpazaFlow Log In</h1>
        <p className="text-sm text-slate-600">Sign in as Owner or Counter Cashier.</p>

        {error && <p className="p-3 text-sm rounded-lg bg-red-50 text-red-700">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-700 text-white font-bold hover:bg-teal-800 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Log In'}
        </button>

        <div className="pt-2 border-t border-slate-100 flex gap-2">
          <button
            type="button"
            onClick={() => { setEmail('owner@spazaflow.co.za'); setPassword('Password123!'); }}
            className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
          >
            Fill Owner Demo
          </button>
          <button
            type="button"
            onClick={() => { setEmail('staff@spazaflow.co.za'); setPassword('Password123!'); }}
            className="flex-1 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
          >
            Fill Staff Demo
          </button>
        </div>
      </form>
    </main>
  );
}
