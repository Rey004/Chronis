'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Insight Explorer', path: '/insights', icon: Sparkles },
    { name: 'Life Chapters', path: '/timeline', icon: BookOpen }
  ];

  // Find active index to calculate sliding line position
  const activeIndex = Math.max(0, navItems.findIndex(item => pathname === item.path));

  return (
    <>
      {/* Mobile & Tablet Simple Top Header (Logo left, Profile right) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[rgba(5,5,5,0.7)] border-b border-[rgba(255,255,255,0.05)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
          <span className="font-serif text-base tracking-[0.2em] text-[#ece8e2] font-light">CHRONIS</span>
        </Link>
        
        {/* Mobile Profile Circle */}
        <div className="w-7 h-7 rounded-full border border-brand-border bg-white/5 flex items-center justify-center text-[10px] font-mono font-semibold text-brand-muted-light cursor-pointer select-none">
          RP
        </div>
      </header>

      {/* Mobile & Tablet Floating Bottom Navbar (Minimal Pill Bar with Sliding Line & Tooltips) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-[rgba(10,10,10,0.75)] border border-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.5)] px-4 py-2 flex items-center gap-4 justify-center">
        
        {/* Sliding Active Line */}
        <div 
          className="absolute bottom-1 left-[28px] w-6 h-[2px] rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.8)] transition-transform duration-300 ease-out z-0"
          style={{ transform: `translateX(${activeIndex * 64}px)` }} // 64px = button width (48px) + gap (16px)
        />

        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              title={item.name}
              className="group/tooltip w-12 h-10 flex items-center justify-center rounded-full transition-all duration-200 z-10 relative"
            >
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${
                  isActive ? 'text-[#a78bfa]' : 'text-[rgba(236,232,226,0.42)] group-hover/tooltip:text-brand-text'
                }`}
              />
              
              {/* Premium Hover Tooltip */}
              <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-[rgba(15,15,15,0.92)] border border-brand-border text-[9px] font-mono tracking-wider text-[#ece8e2] px-2.5 py-1 rounded-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg backdrop-blur-md z-50 uppercase">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Desktop Collapsible Sidebar */}
      <aside 
        className={`hidden md:flex fixed top-0 left-0 bottom-0 z-40 flex-col bg-[rgba(7,7,7,0.45)] border-r border-[rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-300 ${
          isCollapsed ? 'w-20 px-3 py-6 items-center' : 'w-64 p-6'
        }`}
      >
        {/* Floating Border Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-8 -right-3 w-6 h-6 rounded-full border border-brand-border bg-brand-bg-card hover:bg-brand-bg-hover hover:border-brand-purple flex items-center justify-center text-brand-muted hover:text-brand-text transition-all duration-300 z-50 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </button>

        {/* Brand Logo */}
        <div className={`mb-10 flex flex-col gap-1 mt-2 w-full ${isCollapsed ? 'items-center' : ''}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa] shadow-[0_0_10px_rgba(167,139,250,0.8)] flex-shrink-0" />
            <span 
              className={`font-serif text-xl tracking-[0.25em] text-[#ece8e2] font-light transition-all duration-300 ${
                isCollapsed ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'w-auto opacity-100'
              }`}
            >
              CHRONIS
            </span>
          </Link>
          <span 
            className={`text-[9px] font-mono tracking-[0.3em] text-[rgba(236,232,226,0.38)] uppercase pl-4 transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0 overflow-hidden pointer-events-none pl-0' : 'opacity-100'
            }`}
          >
            Insight
          </span>
        </div>

        {/* Navigation Routes */}
        <nav className="flex flex-col gap-1.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                title={isCollapsed ? item.name : undefined}
                className={`group relative flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 w-full ${
                  isCollapsed ? 'justify-center p-2.5' : 'gap-3.5'
                } ${
                  isActive 
                    ? 'bg-white/[0.04] text-[#ece8e2]' 
                    : 'bg-transparent text-[rgba(236,232,226,0.45)] hover:text-[#ece8e2] hover:bg-white/[0.02]'
                }`}
              >
                <Icon 
                  size={16} 
                  className={`transition-colors duration-200 flex-shrink-0 ${
                    isActive ? 'text-[#a78bfa]' : 'group-hover:text-[rgba(236,232,226,0.8)]'
                  }`} 
                />
                
                <span 
                  className={`font-sans text-[10px] tracking-widest font-medium uppercase whitespace-nowrap transition-all duration-200 ${
                    isCollapsed ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'w-auto opacity-100'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile/Account Section (Bottom segment, sticks above footer) */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-4 mt-auto mb-4 w-full">
          <div 
            className={`flex items-center gap-3 w-full ${isCollapsed ? 'justify-center' : ''}`}
            title="Revanshu Pusadkar (revanshu@chronis.in)"
          >
            {/* Avatar Circle */}
            <div className="w-8 h-8 rounded-full border border-brand-border bg-white/5 flex items-center justify-center flex-shrink-0 text-brand-muted text-xs font-mono font-semibold">
              RP
            </div>
            
            {/* User Details (hidden when collapsed) */}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 transition-all duration-300">
                <span className="text-xs font-semibold text-brand-text truncate leading-none">Revanshu Pusadkar</span>
                <span className="text-[10px] text-brand-muted truncate mt-1 leading-none">revanshu@chronis.in</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer/System Status */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.05)] w-full">
          <div className={`flex flex-col gap-2 w-full ${isCollapsed ? 'items-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span 
                className={`text-[9px] font-mono tracking-[0.15em] text-[rgba(236,232,226,0.48)] uppercase transition-all duration-300 ${
                  isCollapsed ? 'w-0 opacity-0 overflow-hidden pointer-events-none' : 'w-auto opacity-100'
                }`}
              >
                Locket Synced
              </span>
            </div>
            <p 
              className={`text-[10px] text-[rgba(236,232,226,0.3)] font-light leading-relaxed transition-all duration-300 ${
                isCollapsed ? 'w-0 opacity-0 overflow-hidden pointer-events-none h-0 mt-0' : 'opacity-100'
              }`}
            >
              Secured with client encryption.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
