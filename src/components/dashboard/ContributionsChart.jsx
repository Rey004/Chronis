'use client';
// Opt out of React Compiler optimization to prevent element type and key conflicts in Recharts
"use no memo";
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { BookOpen, Mic, Calendar, Lightbulb } from 'lucide-react';
import { mockEvidence } from '@/data/mockData';

const SOURCE_CONFIG = {
  journal: { color: '#7c3aed', name: 'Journal Logs', icon: BookOpen },
  'voice-note': { color: '#a78bfa', name: 'Voice Memos', icon: Mic },
  calendar: { color: '#c4b5fd', name: 'Calendar Syncs', icon: Calendar },
  reflection: { color: '#10b981', name: 'Weekly Notes', icon: Lightbulb }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[rgba(11,11,11,0.92)] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-brand-text mb-1">{data.name}</p>
        <p className="text-xs text-brand-muted">
          <span className="font-semibold text-brand-violet">{data.count}</span> logs used to calculate scores
        </p>
      </div>
    );
  }
  return null;
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

  const chartData = Object.keys(SOURCE_CONFIG).map((type) => ({
    type: type,
    name: SOURCE_CONFIG[type].name,
    count: typeCounts[type] || 0,
    color: SOURCE_CONFIG[type].color
  }));



  if (!mounted) {
    return (
      <div className="h-[220px] w-full flex items-center justify-center bg-brand-bg-card border border-brand-border rounded-2xl">
        <span className="text-sm text-brand-muted font-light animate-pulse">Calculating data logs...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgba(11,11,11,0.35)] border border-brand-border rounded-[22px] p-6 glass-panel flex flex-col justify-between h-full">
      <div>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
          Data
        </span>
        <h3 className="font-serif text-xl font-light text-brand-text mt-0.5 mb-6">
          Data Logs
        </h3>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 flex-grow">
        {/* Recharts BarChart */}
        <div className="h-[140px] w-full md:w-[60%] pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 0, right: 10, left: -25, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis 
                dataKey="type" 
                type="category" 
                axisLine={false} 
                tickLine={false}
                tick={false} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar 
                dataKey="count" 
                radius={[0, 4, 4, 0]}
                barSize={12}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Info Panels */}
        <div className="w-full md:w-[40%] flex flex-col gap-3">
          {chartData.map((item) => {
            const Icon = SOURCE_CONFIG[item.type].icon;
            return (
              <div key={item.type} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-muted-light">
                  <div 
                    className="p-1 rounded-md bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]"
                    style={{ color: item.color }}
                  >
                    <Icon size={12} />
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-brand-text">{item.count}</span>
                  <span className="text-[10px] text-brand-muted font-light">logs</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
