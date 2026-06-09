'use client';
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function TimelineChaptersList({ chapters }) {
  const [activeChapter, setActiveChapter] = useState('');
  const [collapsedYears, setCollapsedYears] = useState({});

  useEffect(() => {
    if (chapters.length > 0) {
      setActiveChapter(chapters[0].id);
    }
  }, [chapters]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveChapter(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = chapters[0]?.id || '';
      const offsetThreshold = 180;

      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetThreshold) {
            currentActive = ch.id;
          }
        }
      }
      setActiveChapter(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const toggleYear = (year) => {
    setCollapsedYears((prev) => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

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
    <div className="flex flex-col gap-2.5">
      
      {/* Chapter Sidebar Header */}
      <div className="px-1 py-2 border-b border-brand-border mb-3">
        <span className="text-[10px] font-mono tracking-[0.2em] text-brand-muted uppercase">
          Chapters
        </span>
        <h3 className="font-serif text-xl text-brand-text font-light mt-0.5">
          Life Narrative Eras
        </h3>
      </div>

      {/* Nested Years & Months List */}
      <div className="flex flex-col gap-5">
        {years.map((year) => {
          const isYearCollapsed = !!collapsedYears[year];
          return (
            <div key={year} className="flex flex-col gap-3">
              {/* Parent Year Label Toggle */}
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex items-center justify-between text-left text-sm font-mono tracking-[0.2em] text-[#a78bfa] hover:text-brand-violet uppercase font-bold pl-2 cursor-pointer select-none group"
              >
                <span>{year}</span>
                <div className="text-brand-muted group-hover:text-brand-text transition-colors">
                  {isYearCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>
              
              {/* Nested Months Menu */}
              {!isYearCollapsed && (
                <div className="flex flex-col gap-2 border-l border-brand-border/60 pl-3 ml-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  {chaptersByYear[year].map((ch) => {
                    const isActive = ch.id === activeChapter;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => handleScrollTo(ch.id)}
                        className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-300 flex flex-col gap-1 relative group cursor-pointer ${
                          isActive
                            ? 'bg-[rgba(124,58,237,0.06)] border-[rgba(167,139,250,0.18)] text-brand-text shadow-[0_0_12px_rgba(124,58,237,0.03)]'
                            : 'bg-transparent border-transparent text-brand-muted hover:text-brand-text hover:bg-white/5'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-[-13px] top-3.5 bottom-3.5 w-0.5 bg-[#a78bfa] rounded-full shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
                        )}
                        
                        <span className="text-[10px] font-mono text-brand-muted uppercase leading-none tracking-wider">
                          {ch.month}
                        </span>
                        
                        <span className="font-serif text-sm font-light mt-1.5 tracking-wide truncate">
                          {ch.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
