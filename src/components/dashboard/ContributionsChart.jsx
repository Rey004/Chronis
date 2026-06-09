'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Mic, Calendar, Lightbulb } from 'lucide-react';
import { mockEvidence } from '@/data/mockData';

const SOURCE_CONFIG = {
  journal: { color: '#a78bfa', name: 'Journals', icon: BookOpen, desc: 'Diary logs' },
  'voice-note': { color: '#f43f5e', name: 'Voice', icon: Mic, desc: 'Audio notes' },
  calendar: { color: '#06b6d4', name: 'Calendar', icon: Calendar, desc: 'Synced events' },
  reflection: { color: '#10b981', name: 'Reviews', icon: Lightbulb, desc: 'Syntheses' }
};

export default function ContributionsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Compute counts from mockEvidence
  const typeCounts = mockEvidence.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const logItems = Object.keys(SOURCE_CONFIG).map((type) => ({
    type: type,
    name: SOURCE_CONFIG[type].name,
    count: typeCounts[type] || 0,
    color: SOURCE_CONFIG[type].color,
    desc: SOURCE_CONFIG[type].desc
  }));

  if (!mounted) {
    return (
      <div className="h-full min-h-[360px] w-full flex items-center justify-center bg-brand-bg-card border border-brand-border rounded-[22px]">
        <span className="text-sm text-brand-muted font-light animate-pulse">Calculating data logs...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgba(11,11,11,0.35)] border border-brand-border rounded-[22px] p-6 glass-panel flex flex-col justify-between h-full min-h-[360px]">
      <div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
          Data
        </span>
        <h3 className="font-serif text-xl font-light text-brand-text mt-0.5">
          Data Logs
        </h3>
        <p className="text-[11px] text-brand-muted font-light mt-1.5 leading-relaxed">
          The volume of inputs synced from your memory locket. More data increases score confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 flex-grow items-center">
        {logItems.map((item) => {
          const Icon = SOURCE_CONFIG[item.type].icon;
          
          // SVG circular progress calculations
          const radius = 15;
          const circumference = 2 * Math.PI * radius;
          // Normalization: map count (e.g. 0 to 6) to percentage. Max logged items is 6.
          const maxVal = 6;
          const fillRatio = Math.min(item.count / maxVal, 1);
          const strokeDashoffset = circumference * (1 - fillRatio);

          return (
            <div 
              key={item.type} 
              className="relative overflow-hidden bg-[rgba(255,255,255,0.015)] border border-[rgba(255,255,255,0.05)] rounded-[18px] p-4 hover:border-[rgba(167,139,250,0.15)] hover:bg-[rgba(255,255,255,0.025)] transition-all duration-300 flex items-center justify-between group cursor-pointer"
            >
              {/* Left text column */}
              <div className="flex flex-col gap-1 pr-1.5">
                <div className="flex items-center gap-1.5 text-brand-muted-light group-hover:text-brand-text transition-colors">
                  <Icon size={12} style={{ color: item.color }} />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
                <span className="text-[9px] text-brand-muted font-light leading-none">
                  {item.desc}
                </span>
              </div>

              {/* Right gauge indicator */}
              <div className="relative flex items-center justify-center w-9 h-9 flex-shrink-0">
                <svg className="w-9 h-9 transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    className="stroke-white/[0.03]"
                    strokeWidth="2.5"
                    fill="transparent"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    className="transition-all duration-1000 ease-out"
                    stroke={item.color}
                    strokeWidth="2.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[11px] font-serif font-light text-brand-text">
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
