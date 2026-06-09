'use client';
import React from 'react';
import { ShieldAlert, Lightbulb, Clock, Network, CheckCircle2 } from 'lucide-react';
import EvidenceCard from './EvidenceCard';
import { getEvidenceById } from '@/data/mockData';

export default function InsightDetail({ metric }) {
  if (!metric) {
    return (
      <div className="h-full flex items-center justify-center border border-brand-border bg-brand-bg-card/10 rounded-2xl p-10">
        <span className="text-sm text-brand-muted font-light animate-pulse">Select an indicator to see details...</span>
      </div>
    );
  }

  const { id, name, value, confidence, observation, reasoning, uncertainty, history, sources } = metric;

  // Resolve raw evidence data from database keys
  const resolvedEvidence = sources.map(getEvidenceById).filter(Boolean);

  return (
    <div id="insight-detail-top" className="flex flex-col gap-8 md:gap-10 animate-in fade-in duration-500">
      
      {/* Detail Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-brand-border pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
            Details
          </span>
          <h2 className="font-serif text-3xl font-light text-brand-text mt-1">
            {name}
          </h2>
        </div>
        
        {/* Core Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-brand-muted uppercase leading-none">Score</span>
            <span className="text-3xl font-serif font-light text-brand-text mt-1">{value}%</span>
          </div>
          <div className="w-[1px] h-8 bg-brand-border" />
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-[#a78bfa] uppercase leading-none">Confidence</span>
            <span className="text-3xl font-serif font-light text-[#a78bfa] mt-1">{confidence}%</span>
          </div>
        </div>
      </section>

      {/* AI Behavioral Observation (Big blockquote statement) */}
      <section className="p-6 rounded-[22px] border border-brand-border bg-gradient-to-br from-brand-purple/5 to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Lightbulb size={120} />
        </div>
        <div className="relative z-10">
          <span className="text-[9px] font-mono tracking-widest text-[#a78bfa] uppercase font-semibold">
            AI Observation
          </span>
          <blockquote className="font-serif text-lg md:text-xl font-light italic text-[#ece8e2]/90 leading-relaxed mt-3 pl-4 border-l border-brand-purple/40">
            "{observation}"
          </blockquote>
        </div>
      </section>

      {/* Layout Grid: Reasoning Pipeline & Historical Context */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Transparent Reasoning Card */}
        <div className="p-6 rounded-2xl border border-brand-border bg-brand-bg-card/25 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Network size={15} className="text-brand-violet" />
              <h3 className="font-serif text-lg font-light text-brand-text">
                Reasoning
              </h3>
            </div>
            
            <p className="text-[12.5px] leading-relaxed text-brand-muted font-light mb-4">
              We found these links in your daily data:
            </p>

            <div className="flex flex-col gap-3.5">
              {reasoning.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className="text-[#a78bfa] mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-brand-muted-light leading-relaxed font-light">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History & Uncertainty Container */}
        <div className="flex flex-col gap-6">
          
          {/* History Card */}
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-bg-card/25 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={14} className="text-cyan-400" />
              <h3 className="font-serif text-lg font-light text-brand-text">
                History
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-brand-muted-light font-light">
              {history}
            </p>
          </div>

          {/* Uncertainty & Limitations Card */}
          <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert size={14} className="text-amber-400" />
              <h3 className="font-serif text-lg font-light text-brand-text">
                Missing Data
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-amber-100/70 font-light">
              {uncertainty} We show this so you know where data is missing.
            </p>
          </div>

        </div>
      </section>

      {/* Supporting Evidence Feed (Why do we think this is true?) */}
      <section className="flex flex-col gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-brand-muted uppercase">
            Logs
          </span>
          <h3 className="font-serif text-xl font-light text-brand-text mt-0.5">
            Supporting Logs
          </h3>
          <p className="text-xs text-brand-muted font-light mt-1.5">
            The actual notes and meetings that show this pattern.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {resolvedEvidence.map((ev) => (
            <EvidenceCard key={ev.id} evidence={ev} />
          ))}
        </div>
      </section>

    </div>
  );
}
