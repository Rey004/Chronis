'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Calendar } from 'lucide-react';
import TimelineItem from './TimelineItem';

export default function YearSection({ year, chapters }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Interactive Sticky Year Header */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sticky top-14 md:top-0 bg-brand-bg/85 backdrop-blur-md z-20 border-b border-brand-border pb-2.5 mb-2 flex items-center justify-between w-full text-left group cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#a78bfa] opacity-70 group-hover:text-brand-violet transition-colors" />
          <h2 className="font-serif text-2xl text-[#a78bfa] group-hover:text-brand-violet font-light tracking-wide transition-colors">
            {year}
          </h2>
          <span className="text-[10px] font-mono text-brand-muted uppercase pl-2 font-normal">
            ({chapters.length} chapters)
          </span>
        </div>
        
        {/* Toggle Icon */}
        <div className="text-brand-muted group-hover:text-brand-text transition-colors pr-1">
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Chapters list of this year */}
      {!isCollapsed && (
        <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-300">
          {chapters.map((chapter, index) => (
            <TimelineItem 
              key={chapter.id} 
              chapter={chapter} 
              isFirst={index === 0}
              isLast={index === chapters.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
