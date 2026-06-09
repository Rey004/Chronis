'use client';
import React, { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize stars
    const stars = [];
    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 0.9 + 0.15, // Star radius
        vx: (Math.random() - 0.5) * 0.05, // Slight horizontal drift
        vy: (Math.random() - 0.5) * 0.05, // Slight vertical drift
        alpha: Math.random() * 0.38 + 0.08, // Initial transparency
        fadeDirection: Math.random() > 0.5 ? 0.0025 : -0.0025 // Twinkle rate
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += s.fadeDirection;

        // Twinkle bounds
        if (s.alpha <= 0.05 || s.alpha >= 0.48) {
          s.fadeDirection *= -1;
        }

        // Screen wrap
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        // Using the warm brand text color (#ece8e2) for the stars
        ctx.fillStyle = `rgba(236, 232, 226, ${s.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
}
