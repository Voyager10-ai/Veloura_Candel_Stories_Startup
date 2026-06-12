import { useEffect, useRef } from 'react';
import './ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDir: number;
  color: string;
  life: number;
  maxLife: number;
}

/**
 * ParticleBackground — Floating glowing particles inspired by candle embers
 * 
 * Canvas-based particle system with warm gold/green tones.
 * Particles drift upward slowly, pulsating in opacity like tiny flames.
 * Performance-optimized with requestAnimationFrame and canvas.
 */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particles: Particle[] = [];

    const colors = [
      'rgba(201, 168, 106,',  // Antique Gold
      'rgba(232, 211, 169,',  // Champagne Gold
      'rgba(217, 142, 50,',   // Soft Amber
      'rgba(248, 244, 238,',  // Warm Ivory
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      const maxLife = 300 + Math.random() * 400;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.25,
        size: 1.5 + Math.random() * 2.5,
        opacity: Math.random() * 0.4,
        opacityDir: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife,
      };
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 60);
      particles = Array.from({ length: count }, createParticle);
    };

    const drawParticle = (p: Particle) => {
      if (!ctx) return;

      // Pulsating opacity
      p.opacity += p.opacityDir * 0.003;
      if (p.opacity >= 0.5) p.opacityDir = -1;
      if (p.opacity <= 0.05) p.opacityDir = 1;

      const alpha = Math.max(0, p.opacity);

      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (alpha * 0.15) + ')';
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + alpha + ')';
      ctx.fill();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Wrap around
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        // Reset if life exceeded
        if (p.life > p.maxLife) {
          Object.assign(p, createParticle());
          p.y = canvas.height + 10;
        }

        drawParticle(p);
      });

      animFrameId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
