import React, { Suspense } from 'react';
import InsightsExplorerContent from '@/components/insights/InsightsExplorerContent';
import { Compass } from 'lucide-react';

export const metadata = {
  title: "Insight Explorer — Chronis",
  description: "Check the notes and logs behind your behavioral scores.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Premium Editorial Header */}
      <section className="border-b border-[rgba(255,255,255,0.05)] pb-8 mb-2">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          <Compass size={12} className="animate-pulse" />
          <span>Evidence Check</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-light leading-[1.15] text-[#ece8e2]">
          Insight <span className="text-[rgba(236,232,226,0.62)] italic font-light">Explorer</span>
        </h1>
        <p className="text-sm md:text-[15px] font-light text-brand-muted-light mt-3 max-w-2xl leading-relaxed">
          Choose a score below to see the facts, reasoning, and raw diary entries behind it.
        </p>
      </section>

      {/* Suspense Wrapper to parse search queries safely at build/run time */}
      <Suspense fallback={
        <div className="h-[450px] w-full flex flex-col items-center justify-center border border-brand-border bg-brand-bg-card/10 rounded-2xl gap-3">
          <div className="w-6 h-6 rounded-full border border-brand-violet border-t-transparent animate-spin" />
          <span className="text-xs text-brand-muted font-mono uppercase tracking-wider">Syncing memory archives...</span>
        </div>
      }>
        <InsightsExplorerContent />
      </Suspense>
      
    </div>
  );
}
