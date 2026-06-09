'use client';
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Eye, EyeOff } from 'lucide-react';

const METRIC_STYLES = {
  'decision-confidence': { color: '#a78bfa', name: 'Decision Confidence' },
  'social-energy': { color: '#f43f5e', name: 'Social Energy' },
  'learning-consistency': { color: '#06b6d4', name: 'Learning Consistency' },
  'emotional-stability': { color: '#10b981', name: 'Emotional Stability' },
  'focus-depth': { color: '#ec4899', name: 'Focus Depth & Flow' }
};

export default function BehaviorChart({ metrics }) {
  const [mounted, setMounted] = useState(false);
  const [activeMetrics, setActiveMetrics] = useState({
    'decision-confidence': true,
    'social-energy': true,
    'learning-consistency': true,
    'emotional-stability': false,
    'focus-depth': false
  });

  useEffect(() => {
    setMounted(true);
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[rgba(11,11,11,0.92)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 shadow-xl backdrop-blur-md">
          <p className="text-xs font-mono text-brand-muted uppercase tracking-wider mb-2.5">{label}</p>
          <div className="flex flex-col gap-2">
            {payload.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-1.5 h-1.5 rounded-full" 
                    style={{ backgroundColor: entry.stroke }} 
                  />
                  <span className="text-xs text-brand-muted-light">{METRIC_STYLES[entry.name]?.name}</span>
                </div>
                <span className="text-xs font-semibold text-brand-text">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
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
            Trajectory
          </span>
          <h3 className="font-serif text-xl font-light text-brand-text mt-0.5">
            Behavioral Trends Over Time
          </h3>
        </div>
        
        {/* Metric selection pills */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((m) => {
            const isActive = activeMetrics[m.id];
            const color = METRIC_STYLES[m.id]?.color;
            return (
              <button
                key={m.id}
                onClick={() => toggleMetric(m.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border transition-all duration-300 ${
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
                <span className="font-medium">{METRIC_STYLES[m.id]?.name}</span>
                {isActive ? <Eye size={11} className="ml-0.5 opacity-60" /> : <EyeOff size={11} className="ml-0.5 opacity-30" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
            
            {metrics.map((m) => {
              if (!activeMetrics[m.id]) return null;
              return (
                <Line
                  key={m.id}
                  type="monotone"
                  dataKey={m.id}
                  name={m.id}
                  stroke={METRIC_STYLES[m.id]?.color}
                  strokeWidth={2}
                  dot={{ r: 1.5, strokeWidth: 0, fill: METRIC_STYLES[m.id]?.color }}
                  activeDot={{ r: 4.5, strokeWidth: 0, fill: METRIC_STYLES[m.id]?.color }}
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
