import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import "./globals.css";
import AppLayout from '@/components/layout/AppLayout';
import Starfield from '@/components/layout/Starfield';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: "Chronis Insight Explorer — Behavioral Intelligence Platform",
  description: "A secure, private behavioral intelligence platform designed to map personal growth, life trends, and decision context over time.",
  keywords: ["Chronis", "behavioral intelligence", "self-reflection", "personal growth", "narrative timeline", "voice notes tracking"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="bg-brand-bg text-brand-text min-h-full font-sans flex flex-col md:flex-row relative">
        {/* Slow drift starfield animation */}
        <Starfield />

        {/* Client Layout coordination wrapper (Sidebar + Workspace container) */}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

