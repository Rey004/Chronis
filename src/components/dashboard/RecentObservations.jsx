'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Lightbulb, Clock } from 'lucide-react';
import { mockEvidence } from '@/data/mockData';

export default function RecentObservations() {
  const router = useRouter();

  // Filter for weekly reviews/syntheses and sort chronologically (newest first)
  const observations = mockEvidence
    .filter(e => e.type === 'reflection')
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="w-full bg-[rgba(11,11,11,0.35)] border border-brand-border rounded-[22px] p-6 glass-panel flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
            Notes
          </span>
          <h3 className="font-serif text-xl font-light text-brand-text mt-0.5">
            Recent Observations
          </h3>
        </div>
        <button 
          onClick={() => router.push('/insights')}
          className="flex items-center gap-1 text-[11px] text-brand-violet hover:text-brand-lavender font-medium transition-colors group"
        >
          <span>See details</span>
          <ArrowUpRight size={13} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Timeline Feed Container */}
      <div className="relative flex-grow pl-6 border-l border-brand-border flex flex-col gap-6">
        {observations.map((obs, idx) => {
          const isLatest = idx === 0;
          return (
            <div key={obs.id} className="relative group">
              {/* Bullet circle indicator */}
              <div className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                isLatest 
                  ? 'bg-brand-violet border-brand-purple shadow-[0_0_8px_rgba(167,139,250,0.8)] scale-110' 
                  : 'bg-brand-bg border-brand-border group-hover:border-brand-violet'
              }`} />

              <div className="flex flex-col gap-1.5">
                {/* Meta details */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted">
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{obs.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-brand-violet font-semibold uppercase tracking-wider">
                    <Lightbulb size={10} />
                    <span>{obs.title}</span>
                  </div>
                  {isLatest && (
                    <span className="ml-auto text-[8px] bg-brand-purple/20 text-[#c4b5fd] border border-brand-lavender/10 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                      Latest
                    </span>
                  )}
                </div>

                {/* Content */}
                <p className="text-[13px] leading-relaxed text-brand-muted-light font-light group-hover:text-brand-text transition-colors duration-200">
                  {obs.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
