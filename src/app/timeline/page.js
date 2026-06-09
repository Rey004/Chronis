'use client';
import React, { useState } from 'react';
import { mockTimelineChapters, mockWeeklyTimelineChapters, mockQuarterlyTimelineChapters } from '@/data/mockData';
import TimelineChaptersList from '@/components/timeline/TimelineChaptersList';
import YearSection from '@/components/timeline/YearSection';
import { History } from 'lucide-react';

export default function TimelinePage() {
  const [filter, setFilter] = useState('monthly');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const chapters = filter === 'weekly' 
    ? mockWeeklyTimelineChapters 
    : filter === 'quarterly' 
      ? mockQuarterlyTimelineChapters 
      : mockTimelineChapters;

  // Group chapters by year
  const chaptersByYear = chapters.reduce((acc, ch) => {
    const y = ch.year || 2026;
    if (!acc[y]) acc[y] = [];
    acc[y].push(ch);
    return acc;
  }, {});

  // Get sorted list of years
  const years = Object.keys(chaptersByYear).sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Premium Editorial Header */}
      <section className="border-b border-[rgba(255,255,255,0.05)] pb-8 mb-2">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
          <History size={12} className="animate-pulse" />
          <span>Life Chapters</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl font-light leading-[1.15] text-[#ece8e2]">
              Your <span className="text-[rgba(236,232,226,0.62)] italic font-light">Timeline</span>
            </h1>
            <p className="text-sm md:text-[15px] font-light text-brand-muted-light mt-3 max-w-2xl leading-relaxed">
              Read through your life chapters below. See how your daily habits and choices changed over time.
            </p>
          </div>
          
          {/* Glass segment tab switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[rgba(255,255,255,0.02)] border border-brand-border rounded-xl w-fit flex-shrink-0">
            {[
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'quarterly', label: 'Quarterly' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleFilterChange(tab.id)}
                className={`px-3.5 py-2 text-[10.5px] font-mono tracking-wider uppercase rounded-lg transition-all duration-300 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-brand-purple/20 text-[#ece8e2] border border-brand-purple/35 shadow-[0_0_12px_rgba(124,58,237,0.15)] font-semibold'
                    : 'text-brand-muted hover:text-[#ece8e2] border border-transparent hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left Sticky Chapters List navigation */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-none">
          <TimelineChaptersList chapters={chapters} />
        </aside>

        {/* Right Flowing Timeline items grouped inside YearSections */}
        <section className="lg:col-span-8 flex flex-col gap-10">
          {years.map((year) => (
            <YearSection 
              key={year} 
              year={year} 
              chapters={chaptersByYear[year]} 
            />
          ))}
        </section>

      </div>
    </div>
  );
}
