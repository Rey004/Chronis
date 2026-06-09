'use client';
import React from 'react';
import { Calendar } from 'lucide-react';
import TimelineItem from './TimelineItem';

export default function YearSection({ year, chapters }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Static Sticky Year Header */}
      <div className="sticky top-14 md:top-0 bg-brand-bg/85 backdrop-blur-md z-20 border-b border-brand-border pb-2.5 mb-2 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-[#a78bfa] opacity-70" />
          <h2 className="font-serif text-2xl text-[#a78bfa] font-light tracking-wide">
            {year}
          </h2>
          <span className="text-[10px] font-mono text-brand-muted uppercase pl-2 font-normal">
            ({chapters.length} chapters)
          </span>
        </div>
      </div>

      {/* Chapters list of this year (always visible) */}
      <div className="flex flex-col">
        {chapters.map((chapter, index) => (
          <TimelineItem 
            key={chapter.id} 
            chapter={chapter} 
            isFirst={index === 0}
            isLast={index === chapters.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
