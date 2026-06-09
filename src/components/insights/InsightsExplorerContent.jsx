'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockMetrics } from '@/data/mockData';
import InsightsSidebar from './InsightsSidebar';
import InsightDetail from './InsightDetail';

export default function InsightsExplorerContent() {
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState('decision-confidence');

  useEffect(() => {
    const queryId = searchParams.get('id');
    if (queryId && mockMetrics.some((m) => m.id === queryId)) {
      setSelectedId(queryId);
    }
  }, [searchParams]);

  const handleSelect = (id) => {
    setSelectedId(id);
    // Update the URL without trigger layout re-renders
    const url = new URL(window.location);
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);

    // Smooth scroll to details top on mobile viewports
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const el = document.getElementById('insight-detail-top');
        if (el) {
          const yOffset = -120; // Clears both the top header and the sticky pill row
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const selectedMetric = mockMetrics.find((m) => m.id === selectedId) || mockMetrics[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
      {/* Left Column: Metric Navigation Index */}
      <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
        <InsightsSidebar 
          metrics={mockMetrics} 
          selectedId={selectedId} 
          onSelect={handleSelect} 
        />
      </aside>

      {/* Right Column: Complete Insight Breakdown */}
      <section className="lg:col-span-8 bg-[rgba(11,11,11,0.25)] border border-brand-border rounded-[24px] p-6 md:p-8 glass-panel min-h-[500px]">
        <InsightDetail metric={selectedMetric} />
      </section>
    </div>
  );
}
