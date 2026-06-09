'use client';
import React from 'react';
import { mockMetrics } from '@/data/mockData';
import MetricCard from '@/components/dashboard/MetricCard';
import BehaviorChart from '@/components/dashboard/BehaviorChart';
import ContributionsChart from '@/components/dashboard/ContributionsChart';
import RecentObservations from '@/components/dashboard/RecentObservations';
import { Brain, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const metrics = mockMetrics;

  return (
    <div className="flex flex-col gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Premium Welcome Header */}
      <section className="border-b border-[rgba(255,255,255,0.05)] pb-8 mb-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#a78bfa] uppercase mb-3">
            <Brain size={12} className="animate-pulse" />
            <span>Overview</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light leading-[1.15] text-[#ece8e2]">
            Welcome, <span className="text-[rgba(236,232,226,0.62)] italic font-light">Revanshu</span>
          </h1>
          <p className="text-sm md:text-[15px] font-light text-brand-muted-light mt-3 max-w-2xl leading-relaxed">
            Chronis collects notes and meetings from your memory locket to show your daily habits and progress.
          </p>
        </div>
      </section>

      {/* Behavioral Trend Cards Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg tracking-wider text-brand-text font-light flex items-center gap-2">
            <Sparkles size={14} className="text-brand-violet" />
            <span>Your Habits</span>
          </h2>
          <span className="text-[10px] font-mono text-brand-muted tracking-wider uppercase">
            Click a score to see details
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="h-full">
              <MetricCard metric={metric} />
            </div>
          ))}
        </div>
      </section>

      {/* Graphical Insights & Logs Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 6-Week Timeseries Trend Chart */}
        <div className="lg:col-span-2">
          <BehaviorChart metrics={metrics} />
        </div>

        {/* Right Column: Mini Data Contributions Analysis */}
        <div className="lg:col-span-1">
          <ContributionsChart />
        </div>
      </section>

      {/* Recent Syntheses and Timeline Bulletins */}
      <section className="grid grid-cols-1 gap-6">
        <RecentObservations />
      </section>
      
    </div>
  );
}
