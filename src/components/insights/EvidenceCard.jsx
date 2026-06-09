'use client';
import React, { useState } from 'react';
import { BookOpen, Mic, Calendar, Lightbulb, Play, Pause, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react';

export default function EvidenceCard({ evidence }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { type, title, date, content, metadata } = evidence;

  const getSourceIcon = () => {
    switch (type) {
      case 'journal':
        return <BookOpen size={16} className="text-[#a78bfa]" />;
      case 'voice-note':
        return <Mic size={16} className="text-pink-400" />;
      case 'calendar':
        return <Calendar size={16} className="text-cyan-400" />;
      case 'reflection':
        return <Lightbulb size={16} className="text-emerald-400" />;
      default:
        return <BookOpen size={16} className="text-brand-muted" />;
    }
  };

  const getSourceLabel = () => {
    switch (type) {
      case 'journal': return 'Journal Entry';
      case 'voice-note': return 'Voice Memo';
      case 'calendar': return 'Calendar Sync';
      case 'reflection': return 'Weekly Synthesis';
      default: return 'Source Log';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'journal': return 'hover:border-brand-purple/40';
      case 'voice-note': return 'hover:border-pink-500/30';
      case 'calendar': return 'hover:border-cyan-500/30';
      case 'reflection': return 'hover:border-emerald-500/30';
      default: return 'hover:border-brand-border-light';
    }
  };

  return (
    <div className={`p-4 rounded-xl border border-brand-border bg-brand-bg-card/30 backdrop-blur-sm transition-all duration-300 flex flex-col ${
      isExpanded ? 'gap-4' : 'gap-0'
    } ${getBorderColor()}`}>
      
      {/* Evidence Card Header (Always Visible, Click to Toggle) */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between gap-4 cursor-pointer select-none ${
          isExpanded ? 'border-b border-brand-border pb-3' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-white/5 flex items-center justify-center">
            {getSourceIcon()}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-brand-muted leading-none uppercase tracking-wider">
              {getSourceLabel()}
            </span>
            <h4 className="text-xs font-semibold text-brand-text mt-0.5">{title}</h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[9px] font-mono text-brand-muted bg-white/5 px-2.5 py-0.5 rounded-full">
            <Clock size={10} />
            <span>{date}</span>
          </div>
          <div className="text-brand-muted hover:text-brand-text transition-colors">
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
        </div>
      </div>

      {/* Expanded Content Block */}
      {isExpanded && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {type === 'voice-note' ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2.5 border border-brand-border">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Stop click from collapsing the card
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-2 rounded-full bg-brand-purple hover:bg-brand-violet text-white transition-colors duration-200 cursor-pointer"
                  aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                >
                  {isPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" className="translate-x-[0.5px]" />}
                </button>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden relative">
                    {/* Simulated play state */}
                    <div 
                      className={`h-full bg-gradient-to-r from-brand-purple to-pink-500 rounded-full ${
                        isPlaying ? 'w-[75%] transition-all duration-[5000ms] ease-linear' : 'w-0'
                      }`} 
                    />
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-brand-muted mt-1.5 font-mono leading-none">
                    <span>{isPlaying ? '0:34' : '0:00'}</span>
                    <span>{metadata.split('·')[1] || '1:00'}</span>
                  </div>
                </div>
              </div>
              
              <blockquote className="text-xs leading-relaxed text-brand-muted-light font-light italic pl-3 border-l-2 border-pink-500/30">
                {content}
              </blockquote>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-brand-muted-light font-light whitespace-pre-wrap">
              {content}
            </p>
          )}

          {/* Footer Metadata */}
          <div className="flex items-center gap-1.5 text-[10px] text-brand-muted font-mono leading-none">
            {type === 'calendar' && (
              <div className="flex items-center gap-1.5 mr-2">
                <Users size={11} className="text-cyan-400" />
                <span>{metadata.split('·')[1] || 'Sync'}</span>
              </div>
            )}
            <span className="opacity-80">{metadata}</span>
          </div>
        </div>
      )}

    </div>
  );
}
