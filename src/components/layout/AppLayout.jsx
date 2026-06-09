'use client';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Sync state with localStorage if client-side is initialized
  useEffect(() => {
    const saved = localStorage.getItem('chronis-sidebar-collapsed');
    if (saved) {
      setIsCollapsed(saved === 'true');
    }
  }, []);

  const handleToggleCollapse = (collapsedState) => {
    setIsCollapsed(collapsedState);
    localStorage.setItem('chronis-sidebar-collapsed', String(collapsedState));
  };

  return (
    <>
      {/* Collapsible Sidebar & Floating Bottom Navbar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={handleToggleCollapse} />

      {/* Main Content Area - shifts padding dynamically */}
      <main 
        className={`flex-grow flex flex-col min-h-screen relative z-10 pt-16 pb-24 md:pb-0 md:pt-0 transition-all duration-300 ${
          isCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-10 flex-grow flex flex-col">
          {children}
        </div>
      </main>
    </>
  );
}
