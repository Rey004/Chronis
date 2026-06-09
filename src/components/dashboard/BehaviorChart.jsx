'use client';
// Opt out of React Compiler optimization to prevent element type and key conflicts in Recharts
"use no memo";
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { Eye, EyeOff } from 'lucide-react';

const METRIC_STYLES = {
  'decision-confidence': { color: '#a78bfa', name: 'Decision Confidence' },
  'social-energy': { color: '#f43f5e', name: 'Social Energy' },
  'learning-consistency': { color: '#06b6d4', name: 'Learning Consistency' },
  'emotional-stability': { color: '#10b981', name: 'Emotional Stability' },
  'focus-depth': { color: '#ec4899', name: 'Focus Depth & Flow' }
};

// Custom Tooltip component defined OUTSIDE the parent render to prevent recreation flicker
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Sort payload by value descending so the highest scores are at the top
    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
    return (
      <div className="bg-[rgba(11,11,11,0.92)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 shadow-xl backdrop-blur-md min-w-[210px]">
        <p className="text-xs font-mono text-brand-muted uppercase tracking-wider mb-2.5">{label}</p>
        <div className="flex flex-col gap-2">
          {sortedPayload.map((entry) => {
            const metricKey = entry.dataKey || entry.name;
            const style = METRIC_STYLES[metricKey] || { color: '#a78bfa', name: metricKey };
            const displayName = style.name;
            const strokeColor = entry.stroke || style.color;
            const isOptimal = entry.value >= 75;
            return (
              <div key={metricKey} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: strokeColor }} 
                  />
                  <span className="text-xs text-brand-muted-light">{displayName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#ece8e2]">{entry.value}%</span>
                  <span className={`text-[8px] font-mono px-1 py-0.5 rounded uppercase tracking-wider ${
                    isOptimal 
                      ? 'text-emerald-400 bg-emerald-500/10' 
                      : 'text-amber-400 bg-amber-500/10'
                  }`}>
                    {isOptimal ? 'Opt' : 'Neu'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function BehaviorChart({ metrics = [] }) {
  const [mounted, setMounted] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState({
    'decision-confidence': true,
    'social-energy': true,
    'learning-consistency': true,
    'emotional-stability': false,
    'focus-depth': false
  });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Format timeseries data for Recharts (merge separate trends into weekly objects)
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  const weekLabels = {
    W1: 'Week 1',
    W2: 'Week 2',
    W3: 'Week 3',
    W4: 'Week 4',
    W5: 'Week 5',
    W6: 'Week 6'
  };

  const chartData = weeks.map((w) => {
    const row = { name: weekLabels[w] };
    metrics.forEach((m) => {
      const point = m.trend.find((t) => t.date === w);
      if (point) row[m.id] = point.value;
    });
    return row;
  });

  const toggleMetric = (id) => {
    setActiveMetrics((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (!mounted) {
    return (
      <div className="h-[360px] w-full flex items-center justify-center bg-brand-bg-card border border-brand-border rounded-2xl">
        <span className="text-sm text-brand-muted font-light animate-pulse">Initializing visualization engine...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-[rgba(11,11,11,0.35)] border border-brand-border rounded-[22px] p-6 glass-panel flex flex-col justify-between">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#a78bfa] uppercase">
            Progress
          </span>
          <h3 className="font-serif text-xl font-light text-brand-text mt-0.5">
            Your Scores Over Time
          </h3>
          <p className="text-[11px] text-brand-muted font-light mt-1.5 max-w-sm leading-relaxed">
            Hover to inspect scores. Click the pill toggles to isolate or overlay specific habits.
          </p>
        </div>
        
        {/* Metric selection pills */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((m) => {
            const isActive = activeMetrics[m.id];
            const style = METRIC_STYLES[m.id] || { color: '#a78bfa', name: m.name || m.id };
            const color = style.color;
            const name = style.name;
            return (
              <button
                key={m.id}
                onClick={() => toggleMetric(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-all duration-300 outline-none focus:outline-none ${
                  isActive 
                    ? 'text-brand-text bg-white/5' 
                    : 'text-brand-muted border-transparent hover:text-brand-muted-light'
                }`}
                style={{ 
                  borderColor: isActive ? `${color}40` : 'transparent',
                  boxShadow: isActive ? `0 0 12px ${color}12` : 'none'
                }}
              >
                <div 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300`} 
                  style={{ 
                    backgroundColor: color,
                    opacity: isActive ? 1 : 0.3,
                    boxShadow: isActive ? `0 0 8px ${color}` : 'none'
                  }}
                />
                <span className="font-medium">{name}</span>
                {isActive ? <Eye size={11} className="ml-0.5 opacity-60" /> : <EyeOff size={11} className="ml-0.5 opacity-30" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full pr-2">
        <ResponsiveContainer width="100%" height="100%" style={{ outline: 'none' }}>
          <LineChart 
            data={chartData} 
            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
            style={{ outline: 'none' }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tickMargin={12} 
            />
            <YAxis 
              domain={[40, 100]} 
              axisLine={false} 
              tickLine={false} 
              tickMargin={12}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.05)', strokeWidth: 1 }} />
            <ReferenceLine 
              y={75} 
              stroke="rgba(255, 255, 255, 0.08)" 
              strokeDasharray="4 4" 
              label={{ 
                value: 'Optimal Threshold (75%)', 
                fill: 'rgba(236, 232, 226, 0.25)', 
                fontSize: 8, 
                position: 'top',
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }} 
            />
            
            {/* Explicitly pre-filter active lines to avoid Recharts null iteration errors */}
            {metrics
              .filter((m) => activeMetrics[m.id])
              .map((m) => {
                const style = METRIC_STYLES[m.id] || { color: '#a78bfa' };
                return (
                  <Line
                    key={m.id}
                    type="monotone"
                    dataKey={m.id}
                    name={m.id}
                    stroke={style.color}
                    strokeWidth={2}
                    dot={{ r: 1.5, strokeWidth: 0, fill: style.color }}
                    activeDot={{ r: 4.5, strokeWidth: 0, fill: style.color }}
                    animationDuration={800}
                  />
                );
              })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
