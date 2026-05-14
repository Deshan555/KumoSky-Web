import React from 'react';

export const SkyBackground = ({ time, phase }) => {
  const getGradient = () => {
    const gradients = {
      night: 'from-indigo-950 via-blue-950 to-slate-950',
      earlyMorning: 'from-purple-900 via-blue-700 to-orange-300',
      dawn: 'from-orange-400 via-pink-300 to-blue-300',
      morning: 'from-blue-400 via-cyan-200 to-amber-200',
      afternoon: 'from-cyan-300 via-blue-200 to-blue-100',
      lateAfternoon: 'from-blue-300 via-amber-200 to-orange-300',
      sunset: 'from-orange-500 via-pink-400 to-purple-500',
      dusk: 'from-purple-600 via-indigo-700 to-blue-800',
    };
    return gradients[phase] || gradients.afternoon;
  };

  return (
    <div className={`absolute inset-0 sky-transition bg-gradient-to-b ${getGradient()}`}>
      {/* Mountain silhouettes */}
      <div className="absolute bottom-0 w-full h-2/5 opacity-40">
        {/* Left mountain */}
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-t from-slate-800 to-transparent" />
        
        {/* Center mountain with Tokyo Tower */}
        <div className="absolute bottom-0 left-1/4 w-1/2 h-full bg-gradient-to-t from-slate-700 to-transparent flex items-end justify-center pb-8">
          <svg width="80" height="200" viewBox="0 0 80 200" className="drop-shadow-2xl">
            {/* Tokyo Tower */}
            <defs>
              <linearGradient id="towerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 0.8}} />
                <stop offset="100%" style={{stopColor: '#f97316', stopOpacity: 0.6}} />
              </linearGradient>
            </defs>
            <rect x="35" y="0" width="10" height="200" fill="url(#towerGradient)" />
            {/* Tower top antenna */}
            <polygon points="40,0 30,-10 50,-10" fill="#f97316" opacity="0.8" />
          </svg>
        </div>

        {/* Right mountain with temple */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full flex items-end justify-center pb-12">
          <svg width="120" height="160" viewBox="0 0 120 160" className="drop-shadow-2xl">
            {/* Temple - Pagoda style */}
            <defs>
              <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#7c2d12', stopOpacity: 0.9}} />
                <stop offset="100%" style={{stopColor: '#431407', stopOpacity: 0.8}} />
              </linearGradient>
            </defs>
            
            {/* Main column */}
            <rect x="50" y="90" width="20" height="70" fill="#5a4a42" opacity="0.9" />
            
            {/* Bottom roof */}
            <path d="M30,90 L60,60 L90,90 Z" fill="url(#roofGradient)" />
            <ellipse cx="60" cy="90" rx="30" ry="8" fill="#3d2817" opacity="0.7" />
            
            {/* Middle roof */}
            <path d="M40,60 L60,35 L80,60 Z" fill="url(#roofGradient)" />
            <ellipse cx="60" cy="60" rx="20" ry="6" fill="#3d2817" opacity="0.7" />
            
            {/* Top roof */}
            <path d="M45,35 L60,15 L75,35 Z" fill="url(#roofGradient)" />
            <ellipse cx="60" cy="35" rx="15" ry="5" fill="#3d2817" opacity="0.7" />
            
            {/* Spire */}
            <rect x="57" y="0" width="6" height="15" fill="#fbbf24" opacity="0.7" />
          </svg>
        </div>

        {/* City skyline */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent opacity-50" />
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cloud 1 - top left */}
        <div className="absolute top-12 left-8 opacity-70 animate-drift" style={{animationDuration: '25s', animationDelay: '0s'}}>
          <svg width="200" height="80" viewBox="0 0 200 80" className="drop-shadow-lg">
            <ellipse cx="40" cy="40" rx="35" ry="30" fill="white" opacity="0.7" />
            <ellipse cx="80" cy="30" rx="45" ry="35" fill="white" opacity="0.75" />
            <ellipse cx="130" cy="35" rx="40" ry="32" fill="white" opacity="0.7" />
            <ellipse cx="170" cy="40" rx="35" ry="28" fill="white" opacity="0.65" />
          </svg>
        </div>

        {/* Cloud 2 - top right */}
        <div className="absolute top-32 right-12 opacity-60 animate-drift" style={{animationDuration: '30s', animationDelay: '-5s'}}>
          <svg width="220" height="70" viewBox="0 0 220 70" className="drop-shadow-lg">
            <ellipse cx="50" cy="35" rx="40" ry="28" fill="white" opacity="0.6" />
            <ellipse cx="100" cy="25" rx="50" ry="32" fill="white" opacity="0.65" />
            <ellipse cx="160" cy="30" rx="45" ry="30" fill="white" opacity="0.6" />
          </svg>
        </div>

        {/* Cloud 3 - middle left */}
        <div className="absolute top-1/3 left-1/4 opacity-50 animate-drift" style={{animationDuration: '35s', animationDelay: '-10s'}}>
          <svg width="180" height="60" viewBox="0 0 180 60" className="drop-shadow-lg">
            <ellipse cx="40" cy="30" rx="35" ry="25" fill="white" opacity="0.5" />
            <ellipse cx="90" cy="20" rx="45" ry="28" fill="white" opacity="0.55" />
            <ellipse cx="140" cy="25" rx="40" ry="26" fill="white" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Sun */}
      <div className={`sky-transition absolute transition-opacity duration-1000 ${
        (time >= 5 && time < 18) ? 'opacity-100' : 'opacity-0'
      }`} style={{
        top: `${Math.max(10, 60 - Math.abs(time - 12) * 3)}%`,
        left: `${20 + (time - 5) * 3}%`,
      }}>
        <svg width="140" height="140" viewBox="0 0 140 140" className="drop-shadow-2xl">
          <circle cx="70" cy="70" r="65" fill="#fbbf24" opacity="0.95" />
          <circle cx="70" cy="70" r="65" fill="none" stroke="#f97316" strokeWidth="8" opacity="0.4" />
        </svg>
      </div>

      {/* Moon */}
      <div className={`sky-transition absolute transition-opacity duration-1000 ${
        (time < 5 || time >= 20) ? 'opacity-100' : 'opacity-0'
      }`} style={{
        top: '15%',
        right: '12%',
      }}>
        <svg width="110" height="110" viewBox="0 0 110 110" className="drop-shadow-lg">
          <circle cx="55" cy="55" r="50" fill="#f3f4f6" opacity="0.95" />
          <circle cx="60" cy="50" r="50" fill="rgba(15, 23, 42, 0.3)" opacity="0.5" />
        </svg>
      </div>

      {/* Stars */}
      <div className={`sky-transition transition-opacity duration-1000 ${
        (time < 4 || time >= 21) ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-16 left-1/4 text-3xl animate-twinkle" style={{animationDuration: '3s'}}>✨</div>
        <div className="absolute top-24 right-1/3 text-2xl animate-twinkle" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>✨</div>
        <div className="absolute top-1/2 left-1/6 text-2xl animate-twinkle" style={{animationDuration: '4s', animationDelay: '1s'}}>✨</div>
        <div className="absolute top-1/3 right-1/6 text-xl animate-twinkle" style={{animationDuration: '3.2s', animationDelay: '1.5s'}}>✨</div>
        <div className="absolute bottom-1/3 left-1/3 text-2xl animate-twinkle" style={{animationDuration: '3.8s', animationDelay: '2s'}}>✨</div>
      </div>
    </div>
  );
};
