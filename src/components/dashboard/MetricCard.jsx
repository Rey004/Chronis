'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import GlowCard from '@/components/ui/GlowCard';

export default function MetricCard({ metric }) {
  const router = useRouter();
  const { id, name, value, change, confidence } = metric;

  const isPositive = change.startsWith('+');

  const handleClick = () => {
    router.push(`/insights?id=${id}`);
  };

  return (
    <GlowCard onClick={handleClick} className="h-full flex flex-col justify-between min-h-[150px] p-5">
      
      {/* Top Section: Title & Trend Pill */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-light text-[#ece8e2] leading-snug">
            {name}
          </h3>
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
            isPositive 
              ? 'text-emerald-400 bg-emerald-500/10' 
              : 'text-amber-400 bg-amber-500/10'
          }`}>
            {change}
          </span>
        </div>

        {/* Middle Section: Score value */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-serif font-light text-brand-text">{value}%</span>
          <span className="text-[9px] text-brand-muted uppercase tracking-wider font-mono">Score</span>
        </div>
      </div>

      {/* Bottom Section: Minimalist thin confidence bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-[9px] text-brand-muted font-mono mb-1.5 tracking-wider">
          <span>CONFIDENCE</span>
          <span>{confidence}%</span>
        </div>
        <div className="w-full h-[2px] bg-[rgba(255,255,255,0.03)] rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-violet transition-all duration-500" 
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
      
    </GlowCard>
  );
}
