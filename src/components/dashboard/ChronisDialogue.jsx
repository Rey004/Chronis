'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockDailyInsights } from '@/data/mockData';
import { Brain, Sparkles, MessageSquare, ChevronDown, Star } from 'lucide-react';

export default function ChronisDialogue() {
  const [selectedDay, setSelectedDay] = useState('today');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const insightData = mockDailyInsights[selectedDay] || mockDailyInsights['today'];
  const text = insightData.insight;

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText('');
    
    const words = text.split(' ');
    const timer = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => (prev ? prev + ' ' + words[index] : words[index]));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [text]);

  const formatInsightText = (inputText) => {
    if (!inputText) return '';
    
    const keywords = [
      { term: "focus depth", id: "focus-depth" },
      { term: "social energy", id: "social-energy" },
      { term: "decision confidence", id: "decision-confidence" },
      { term: "learning consistency", id: "learning-consistency" },
      { term: "emotional stability", id: "emotional-stability" }
    ];

    let parts = [inputText];
    
    keywords.forEach(({ term, id }) => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        
        const regex = new RegExp(`(${term})`, 'gi');
        const split = part.split(regex);
        
        split.forEach((subPart, i) => {
          if (regex.test(subPart)) {
            newParts.push(
              <Link 
                key={`${id}-${i}`} 
                href={`/insights?id=${id}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-purple/15 hover:bg-brand-purple/30 text-brand-lavender hover:text-white border border-brand-purple/20 hover:border-brand-purple/45 shadow-[0_2px_8px_rgba(124,58,237,0.08)] transition-all duration-300 mx-1 align-baseline group/link"
              >
                <span className="w-1 h-1 rounded-full bg-brand-violet group-hover/link:animate-ping" />
                <span>{subPart}</span>
              </Link>
            );
          } else {
            newParts.push(subPart);
          }
        });
      });
      parts = newParts;
    });
    
    return parts;
  };

  return (
    <div className="w-full bg-gradient-to-b from-[rgba(20,20,20,0.4)] to-[rgba(5,5,5,0.2)] border border-brand-border rounded-[28px] p-6 md:p-7 glass-panel relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      
      {/* CSS Keyframes for voice waveform scaling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes speechWave {
          0%, 100% { transform: scaleY(0.25); }
          50% { transform: scaleY(1.3); }
        }
        @keyframes ambientPulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.6; }
          50% { transform: scaleY(0.7); opacity: 0.9; }
        }
        .voice-bar-speaking {
          animation: speechWave 1.1s ease-in-out infinite;
          transform-origin: center;
        }
        .voice-bar-ambient {
          animation: ambientPulse 2s ease-in-out infinite;
          transform-origin: center;
        }
      `}} />

      {/* Decorative backlights for premium aesthetic */}
      <div className="absolute top-0 right-0 w-[200px] h-[150px] bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[150px] h-[100px] bg-[#06b6d4]/5 rounded-full blur-[60px] pointer-events-none z-0" />

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-5 mb-6 relative z-10">
        
        {/* Assistant identity info */}
        <div className="flex items-center gap-3">
          
          {/* Glowing Neural Ring Avatar */}
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-purple via-[#8b5cf6] to-brand-violet shadow-[0_4px_20px_rgba(124,58,237,0.35)]">
            <Brain size={18} className="text-white relative z-10" />
            <span className="absolute inset-0 rounded-2xl border border-white/20 animate-pulse pointer-events-none" />
            
            {/* Spinning/pulsing circular outer border ring */}
            <span className="absolute -inset-1 rounded-2xl border border-brand-purple/15 pointer-events-none animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg tracking-wide text-brand-text font-medium">Chronis</span>
              <div className="flex items-center gap-1 text-[9px] font-mono bg-[rgba(167,139,250,0.12)] text-brand-violet border border-brand-purple/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                <Sparkles size={8} className="animate-pulse" />
                <span>active</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-brand-muted tracking-wider">
              {insightData.date}
            </span>
          </div>

        </div>

        {/* Action Controls: Waveform & Selector */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          
          {/* Animated Glowing Voice Waveform */}
          <div className="flex items-center gap-1 h-5 px-3 py-1.5 rounded-full bg-white/[0.02] border border-[rgba(255,255,255,0.04)] shadow-inner">
            <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest mr-1.5">vocal wave</span>
            <div className="flex items-center gap-0.75 w-10 justify-between">
              {[
                { delay: '0.1s', speakingHeight: '1.2', ambientHeight: '0.5' },
                { delay: '0.3s', speakingHeight: '1.6', ambientHeight: '0.7' },
                { delay: '0.5s', speakingHeight: '1.0', ambientHeight: '0.4' },
                { delay: '0.2s', speakingHeight: '1.5', ambientHeight: '0.8' },
                { delay: '0.4s', speakingHeight: '0.8', ambientHeight: '0.3' },
              ].map((bar, i) => (
                <div
                  key={i}
                  className={`w-[2px] bg-gradient-to-t from-brand-purple to-cyan-400 rounded-full ${
                    isTyping ? 'voice-bar-speaking' : 'voice-bar-ambient'
                  }`}
                  style={{
                    animationDelay: bar.delay,
                    height: '10px',
                    transform: `scaleY(${isTyping ? bar.speakingHeight : bar.ambientHeight})`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Custom styled select */}
          <div className="relative">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="appearance-none bg-brand-bg-card/60 hover:bg-brand-bg-hover border border-brand-border hover:border-brand-border-light rounded-xl px-4 py-2 pr-9 text-xs font-mono tracking-wider text-brand-muted-light hover:text-brand-text transition-all duration-300 cursor-pointer focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20"
            >
              <option value="today">Today (June 9)</option>
              <option value="yesterday">Yesterday (June 8)</option>
              <option value="last-wednesday">Last Wednesday (June 3)</option>
            </select>
            <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
          </div>

        </div>

      </div>

      {/* Conversation Bubble Layout */}
      <div className="relative z-10 flex gap-4 md:gap-5 items-start">
        
        {/* Decorative Quote Bubble Accent */}
        <div className="flex-shrink-0 p-3 rounded-2xl bg-gradient-to-b from-brand-purple/10 to-transparent border border-brand-purple/15 text-brand-violet shadow-[0_4px_16px_rgba(124,58,237,0.05)] hidden sm:flex">
          <MessageSquare size={18} />
        </div>
        
        {/* Text Container with speech design */}
        <div className="flex-grow flex flex-col gap-3.5 bg-gradient-to-r from-[rgba(255,255,255,0.015)] to-transparent border-l-2 border-l-brand-purple/40 pl-4 py-1.5 pr-2">
          
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[#a78bfa] font-bold tracking-widest uppercase">
              {insightData.greeting}
            </span>
            <Star size={10} className="text-brand-violet animate-pulse fill-brand-violet/20" />
          </div>
          
          <div className="font-serif text-lg md:text-xl font-light leading-relaxed text-[#ece8e2]/95 min-h-[85px] tracking-wide">
            {formatInsightText(displayedText)}
            {isTyping && (
              <span className="inline-block w-2 h-4.5 ml-1.5 bg-gradient-to-b from-brand-violet to-brand-purple animate-pulse rounded-full align-middle shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
