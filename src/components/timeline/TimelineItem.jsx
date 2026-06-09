'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CalendarRange, Sparkles, BookOpen, ChevronDown, ChevronUp, ChevronRight, Milestone } from 'lucide-react';
import EvidenceCard from '@/components/insights/EvidenceCard';
import { getEvidenceById, getMetricById } from '@/data/mockData';

export default function TimelineItem({ chapter, isFirst, isLast }) {
  const [isContentCollapsed, setIsContentCollapsed] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const { id, title, period, summary, milestones, insights, evidence } = chapter;

  // Resolve insights and evidence
  const resolvedInsights = insights.map(getMetricById).filter(Boolean);
  const resolvedEvidence = evidence.map(getEvidenceById).filter(Boolean);

  return (
    <div id={id} className="relative pl-8 md:pl-12 pb-10 last:pb-4 scroll-mt-24 group">
      
      {/* Central Timeline Vertical Axis Line (continuous, no spaces) */}
      <div 
        className={`absolute left-[3px] md:left-[5px] w-[2px] z-0 ${
          isFirst ? 'top-8' : 'top-0'
        } ${
          isLast 
            ? 'bottom-auto h-8 bg-gradient-to-b from-brand-border to-transparent' 
            : 'bottom-0 bg-brand-border'
        }`}
      />
      
      {/* Main Chapter Node Dot */}
      <div className="absolute left-[-4px] md:left-[-2px] top-8 w-4.5 h-4.5 rounded-full border border-brand-purple bg-[#050505] flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.7)] z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
      </div>

      {/* Chapter Details Container Card */}
      <div className="bg-[rgba(11,11,11,0.22)] border border-brand-border rounded-[22px] p-6 hover:border-brand-border-light hover:bg-[rgba(11,11,11,0.32)] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.12)] flex flex-col gap-5">
        
        {/* Chapter Header (Always visible, click to toggle collapse) */}
        <div 
          onClick={() => setIsContentCollapsed(!isContentCollapsed)}
          className="flex items-center justify-between gap-4 cursor-pointer select-none"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[10px] font-mono text-brand-violet tracking-wider uppercase font-semibold">
              <CalendarRange size={11} />
              <span>{period}</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-light text-brand-text mt-0.5 tracking-wide">
              {title}
            </h3>
          </div>

          <div className="text-brand-muted hover:text-brand-text transition-colors">
            {isContentCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>

        {/* Collapsible Content */}
        {!isContentCollapsed && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            
            {/* Chapter Narrative Summary */}
            <p className="text-sm font-light text-brand-muted-heavy leading-relaxed">
              {summary}
            </p>

            {/* Turning Points & Milestones Section */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-mono tracking-[0.2em] text-brand-muted uppercase flex items-center gap-1.5">
                <Milestone size={11} className="text-brand-purple" />
                <span>Milestones</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {milestones.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-brand-border bg-brand-bg-card/20 hover:border-brand-border-light transition-all duration-300">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono text-brand-muted">{m.date}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                    </div>
                    <h5 className="text-xs font-semibold text-brand-text mt-2">{m.title}</h5>
                    <p className="text-[11.5px] leading-relaxed text-brand-muted-light font-light mt-1">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral Shifts / Related Insights */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-[10px] font-mono tracking-[0.2em] text-brand-muted uppercase flex items-center gap-1.5">
                <Sparkles size={11} className="text-brand-violet" />
                <span>Linked Scores</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {resolvedInsights.map((ins) => (
                  <Link
                    key={ins.id}
                    href={`/insights?id=${ins.id}`}
                    onClick={(e) => e.stopPropagation()} // prevent clicking links from toggling collapse!
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-bg-card/30 hover:bg-brand-purple/15 hover:border-brand-purple/40 text-xs text-brand-muted-light hover:text-[#ece8e2] transition-all duration-300"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand-violet" />
                    <span className="font-medium">{ins.name}</span>
                    <span className="font-mono text-[10px] text-brand-violet">({ins.value}%)</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Collapsible Period Evidence Section */}
            <div className="border-t border-[rgba(255,255,255,0.04)] pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent clicking from toggling chapter collapse
                  setShowEvidence(!showEvidence);
                }}
                className="flex items-center gap-2 text-[10px] font-mono tracking-[0.15em] text-brand-muted hover:text-brand-text transition-colors uppercase"
              >
                <BookOpen size={11} />
                <span>{showEvidence ? 'Hide Logs' : `Show logs (${resolvedEvidence.length})`}</span>
                {showEvidence ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>

              {showEvidence && (
                <div className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  {resolvedEvidence.map((ev) => (
                    <EvidenceCard key={ev.id} evidence={ev} />
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
