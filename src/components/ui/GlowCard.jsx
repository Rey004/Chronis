'use client';
import React, { useRef, useState } from 'react';

export default function GlowCard({ children, className = '', onClick, active = false }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--gx', `${x}px`);
    cardRef.current.style.setProperty('--gy', `${y}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--gx', '-320px');
    cardRef.current.style.setProperty('--gy', '-320px');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden bg-gradient-to-b from-[rgba(255,255,255,0.024)] to-[rgba(255,255,255,0.012)] border rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-[2px] cursor-pointer before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-[rgba(167,139,250,0.25)] before:to-transparent ${
        active 
          ? 'border-[rgba(167,139,250,0.4)] shadow-[0_0_24px_rgba(124,58,237,0.15)] bg-[rgba(255,255,255,0.038)]' 
          : 'border-[rgba(255,255,255,0.07)] hover:border-[rgba(167,139,250,0.15)] hover:bg-[rgba(255,255,255,0.016)]'
      } ${className}`}
    >
      {/* Outer Border Glow Ring */}
      <div
        className="absolute inset-[-1px] rounded-[20px] p-[1px] pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered || active ? 1 : 0,
          background: 'radial-gradient(circle 160px at var(--gx, -320px) var(--gy, -320px), rgba(167,139,250,0.5) 0%, rgba(124,58,237,0.2) 42%, transparent 70%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      {/* Card Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
