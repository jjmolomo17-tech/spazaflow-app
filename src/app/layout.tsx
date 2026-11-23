import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SpazaFlow — POS & Customer Credit Book',
  description: 'Mobile-first stock and customer credit tracker for South African spaza shops.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
