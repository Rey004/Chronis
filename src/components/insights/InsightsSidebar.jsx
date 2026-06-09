'use client';
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function InsightsSidebar({ metrics, selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-1 md:gap-3">
      {/* Sidebar title - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:block px-1 py-2 border-b border-brand-border mb-2">
        <span className="text-[10px] font-mono tracking-[0.2em] text-brand-muted uppercase">
          Scores
        </span>
        <h3 className="font-serif text-lg text-brand-text font-light mt-0.5">
          Indicators
        </h3>
      </div>

      {/* Pill Swiper for Mobile, Vertical Menu for Desktop */}
      <div className="flex flex-nowrap md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-3.5 md:pb-0 pt-2 md:pt-0 -mx-4 px-4 md:mx-0 md:px-0 border-b border-brand-border md:border-0 sticky top-[56px] md:static bg-brand-bg/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none z-30 scrollbar-none snap-x">
        {metrics.map((metric) => {
          const isActive = metric.id === selectedId;
          const isPositive = metric.change.startsWith('+');
          
          return (
            <button
              key={metric.id}
              onClick={() => onSelect(metric.id)}
              className={`transition-all duration-300 flex items-center justify-between cursor-pointer flex-shrink-0 px-4 py-2 rounded-full border text-xs whitespace-nowrap snap-align-center gap-2 md:w-full md:text-left md:p-4 md:rounded-xl md:gap-4 md:whitespace-normal ${
                isActive
                  ? 'bg-[rgba(124,58,237,0.08)] border-[rgba(167,139,250,0.22)] text-brand-text shadow-[0_0_16px_rgba(124,58,237,0.04)]'
                  : 'bg-brand-bg-card/20 border-brand-border text-brand-muted-light hover:text-brand-text hover:bg-white/5 hover:border-brand-border-light'
              }`}
            >
              {/* Mobile Pill Layout */}
              <div className="flex items-center gap-2 md:hidden">
                <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#a78bfa]' : 'bg-brand-muted/40'}`} />
                <span className="font-serif text-xs font-light">{metric.name}</span>
                <span className="font-mono text-[9px] text-brand-muted">({metric.value}%)</span>
              </div>

              {/* Desktop Full Layout */}
              <div className="hidden md:flex md:flex-col md:gap-1 md:pr-4 md:flex-1">
                <span className="text-[10.5px] font-mono tracking-wider text-brand-muted leading-none uppercase">
                  {metric.id.replace('-', ' ')}
                </span>
                <span className="font-serif text-base font-light tracking-wide mt-0.5">
                  {metric.name}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-[9px] font-mono text-brand-muted">
                    <ShieldCheck size={10} className={isActive ? "text-[#a78bfa]" : "opacity-60"} />
                    <span>{metric.confidence}% conf</span>
                  </div>
                  <span className="text-[9px] text-brand-muted font-mono">•</span>
                  <span className={`text-[9px] font-mono font-semibold ${isPositive ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>

              {/* Desktop Side Info */}
              <div className="hidden md:flex md:items-center md:gap-3">
                <span className="font-serif text-lg font-light text-brand-text">
                  {metric.value}%
                </span>
                <ArrowRight 
                  size={14} 
                  className={`transition-all duration-300 ${
                    isActive 
                      ? 'text-[#a78bfa] translate-x-0.5' 
                      : 'text-brand-muted opacity-40 group-hover:opacity-100 group-hover:text-brand-violet group-hover:translate-x-0.5'
                  }`} 
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
