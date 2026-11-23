import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-6 max-w-md mx-auto">
      <header className="pt-8">
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">
          SpazaFlow POS & Credit Book
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
          Ditch the paper notebook. Run your spaza in seconds.
        </h1>
        <p className="mt-3 text-base text-slate-600">
          Track counter sales, low-stock alerts, expiry dates, and customer tabs on The Book from any smartphone.
        </p>
      </header>

      <section className="space-y-3 my-8">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-900">10-Second Counter POS</h2>
          <p className="text-sm text-slate-600 mt-1">
            Tap items for Cash or Credit checkout with automatic stock deduction.
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-900">Digital Customer Credit Book</h2>
          <p className="text-sm text-slate-600 mt-1">
            Enforce customer credit limits, log partial repayments, and copy WhatsApp reminders.
          </p>
        </div>
      </section>

      <footer className="pb-6 space-y-3">
        <Link
          href="/pos"
          className="block w-full text-center py-3.5 px-4 rounded-xl bg-teal-700 text-white font-bold text-base shadow-sm"
        >
          Open Quick Counter POS
        </Link>
        <Link
          href="/login"
          className="block w-full text-center py-3.5 px-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base"
        >
          Owner / Staff Log In
        </Link>
      </footer>
    </main>
  );
}
