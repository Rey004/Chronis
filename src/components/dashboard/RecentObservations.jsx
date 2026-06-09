'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Lightbulb } from 'lucide-react';
import { mockEvidence } from '@/data/mockData';

export default function RecentObservations() {
  const router = useRouter();

  // Filter for weekly reviews/syntheses and get the latest one
  const reflections = mockEvidence
    .filter(e => e.type === 'reflection')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const latestObservation = reflections[0];

  if (!latestObservation) return null;

  return (
    <div className="w-full bg-[rgba(11,11,11,0.35)] border border-brand-border rounded-[22px] p-6 glass-panel flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
            AI Spotlight
          </span>
          <span className="text-[8px] bg-brand-purple/10 text-brand-lavender border border-brand-purple/20 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
            Latest Synthesis
          </span>
        </div>
        <button 
          onClick={() => router.push('/insights')}
          className="flex items-center gap-1 text-[11px] text-brand-violet hover:text-brand-lavender font-medium transition-colors group"
        >
          <span>See all details</span>
          <ArrowUpRight size={13} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Spotlight Content Area */}
      <div className="flex items-start gap-5 py-1">
        {/* Soft glowing icon badge */}
        <div className="p-3 rounded-2xl bg-brand-purple/[0.03] border border-brand-purple/10 text-[#a78bfa] flex-shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.05)]">
          <Lightbulb size={18} className="animate-pulse" />
        </div>
        
        {/* Quote and Metadata */}
        <div className="flex flex-col gap-3">
          <p className="font-serif text-lg md:text-xl font-light italic leading-relaxed text-[#ece8e2]">
            &ldquo;{latestObservation.content}&rdquo;
          </p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted">
            <span>Generated on {latestObservation.date}</span>
            <span>•</span>
            <span>Aggregated from your weekly memory locket</span>
          </div>
        </div>
      </div>
    </div>
  );
}
