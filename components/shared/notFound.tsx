'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export function NotFoundAim() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for floating effect
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      life: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        opacity: Math.random() * 0.5 + 0.2,
        life: 1,
      });
    }

    let animationFrame = 0;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.002;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Wrap around
        particle.x = (particle.x + canvas.width) % canvas.width;
        particle.y = (particle.y + canvas.height) % canvas.height;

        // Draw particle
        ctx.fillStyle = `rgba(96, 165, 250, ${particle.opacity * particle.life})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Regenerate dead particles
        if (particle.life <= 0) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            opacity: Math.random() * 0.5 + 0.2,
            life: 1,
          };
        }
      });

      // Draw connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - distance / 150) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Animated 404 */}
        <div className="mb-8 text-center">
          <div className="text-9xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 mb-2 animate-pulse select-none">
            404
          </div>
        </div>

        {/* Message */}
        <div className="text-center max-w-md mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Lost in <span className="text-blue-400">Space</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            The page you&apos;re looking for has drifted into the cosmos. Let&apos;s get you back on course.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/50"
          >
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Go Back
          </button>
        </div>

        {/* Floating navigation markers */}
        <div aria-hidden="true" className="absolute top-20 right-10 h-16 w-16 rounded-full border border-blue-300/20 bg-blue-300/5 animate-bounce" />
        <div aria-hidden="true" className="absolute bottom-20 left-10 h-10 w-10 rotate-45 border border-cyan-300/30 animate-pulse" style={{ animationDuration: '3s' }} />
        <div aria-hidden="true" className="absolute top-1/3 left-1/4 h-3 w-3 rounded-full bg-blue-300/60" style={{ animation: 'float 6s infinite ease-in-out' }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
