'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const FuturisticLanding = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeParticle, setActiveParticle] = useState(0);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    setIsLoaded(true);
    initializeParticles();
    animateParticles();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const initializeParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particlesRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
    }));
  };

  const animateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        const distance = Math.sqrt(
          Math.pow(mousePos.x - particle.x, 2) + Math.pow(mousePos.y - particle.y, 2)
        );
        
        if (distance < 100) {
          particle.size = Math.min(particle.size * 1.02, 8);
          particle.opacity = Math.min(particle.opacity * 1.05, 1);
        } else {
          particle.size = Math.max(particle.size * 0.98, 1);
          particle.opacity = Math.max(particle.opacity * 0.95, 0.1);
        }
        
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        // Connect nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dist = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2)
          );
          if (dist < 150) {
            ctx.save();
            ctx.globalAlpha = (150 - dist) / 150 * 0.2;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-mono">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)' }}
      />
      
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, 
              rgba(59, 130, 246, 0.15) 0%, 
              rgba(147, 51, 234, 0.1) 25%, 
              rgba(236, 72, 153, 0.05) 50%, 
              transparent 70%)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-pink-900/10" />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${i % 4} opacity-20`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            <div className={`w-${4 + (i % 3) * 2} h-${4 + (i % 3) * 2} border-2 border-cyan-400 rotate-45 shadow-lg shadow-cyan-400/50`} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-40 bg-black/40 backdrop-blur-2xl border-b border-cyan-500/20">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-4xl font-black tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-pulse">
              NEXUS
            </span>
            <span className="text-white/80 ml-1">STORE</span>
          </div>
          <div className="flex gap-8 text-lg font-medium">
            {['PRODUCTS', 'TECH', 'FUTURE'].map((item) => (
              <button
                key={item}
                className="text-cyan-300 hover:text-white transition-all duration-300 relative group"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-30 flex flex-col items-center justify-center min-h-[80vh] px-6 sm:px-12 lg:px-24">
        <div className={`text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Holographic Title */}
          <div className="relative mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-4 leading-none tracking-tight">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                  EXPERIENCE
                </span>
                <div className="absolute inset-0 text-cyan-400 animate-ping opacity-20">
                  EXPERIENCE
                </div>
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">THE</span>
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 animate-gradient-x">
                  IMPOSSIBLE
                </span>
                <div className="absolute inset-0 text-pink-400 animate-pulse opacity-30">
                  IMPOSSIBLE
                </div>
              </span>
            </h1>
            
            {/* Glitch effect overlay */}
            <div className="absolute inset-0 text-6xl sm:text-7xl lg:text-8xl font-black opacity-20 animate-glitch">
              <span className="text-red-500">EXPERIENCE</span><br />
              <span className="text-green-500">THE</span><br />
              <span className="text-blue-500">IMPOSSIBLE</span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Step into a dimension where commerce transcends reality. 
            <span className="text-cyan-400 font-medium"> Neural interfaces</span>, 
            <span className="text-purple-400 font-medium"> quantum transactions</span>, and 
            <span className="text-pink-400 font-medium"> impossible experiences</span> await.
          </p>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-12 py-4 rounded-none relative overflow-hidden transition-all duration-300 transform hover:scale-105 border-2 border-cyan-400/50 hover:border-cyan-300"
              onMouseEnter={() => setActiveParticle(1)}
            >
              <span className="relative z-10 text-lg tracking-wide">NEURAL LOGIN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="absolute inset-0 border border-cyan-400 animate-pulse opacity-0 group-hover:opacity-100" />
            </Button>
            
            <Button 
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-12 py-4 rounded-none relative overflow-hidden transition-all duration-300 transform hover:scale-105 border-2 border-purple-400/50 hover:border-purple-300"
              onMouseEnter={() => setActiveParticle(2)}
            >
              <span className="relative z-10 text-lg tracking-wide">QUANTUM REGISTER</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
              <div className="absolute inset-0 border border-purple-400 animate-pulse opacity-0 group-hover:opacity-100" />
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'AI PREDICTION', desc: 'Neural networks predict your desires before you know them', icon: '🧠' },
              { title: 'QUANTUM SPEED', desc: 'Transactions at the speed of thought through quantum tunnels', icon: '⚡' },
              { title: 'HOLOGRAPHIC UI', desc: 'Interact with products in impossible dimensions', icon: '🌀' }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-black/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                <h3 className="text-cyan-400 font-bold text-lg mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-40 mt-auto py-6 text-gray-500 text-center bg-black/60 backdrop-blur-xl border-t border-cyan-500/20">
        <div className="container mx-auto px-6">
          © 2025 <span className="text-cyan-400 font-bold">NEXUS STORE</span> • Beyond Reality Commerce • 
          <span className="text-purple-400"> Quantum Division</span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, 2px); }
          20% { transform: translate(2px, -2px); }
          30% { transform: translate(-2px, -2px); }
          40% { transform: translate(2px, 2px); }
          50% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, -2px); }
          70% { transform: translate(-2px, -2px); }
          80% { transform: translate(2px, 2px); }
          90% { transform: translate(-2px, 2px); }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(270deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(360deg); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-glitch {
          animation: glitch 2s linear infinite;
        }
        
        .animate-float-0 { animation: float-0 6s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 9s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default FuturisticLanding;