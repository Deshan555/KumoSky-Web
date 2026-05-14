import React from 'react';

export const ControlPanel = ({ 
  time, 
  timeDisplay, 
  onTimeChange, 
  phase, 
  region, 
  onRegionChange,
  weather,
  onWeatherChange,
  isSoundEnabled,
  onToggleSound
}) => {
  return (
    <>
      {/* Top Right: Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-4">
        {/* Weather Selector */}
        <div className="flex gap-2 p-1.5 glass-panel rounded-2xl border border-white/10">
          {[
            { id: 'clear', icon: 'fa-sun', color: 'text-yellow-400' },
            { id: 'rain', icon: 'fa-cloud-showers-heavy', color: 'text-blue-400' },
            { id: 'storm', icon: 'fa-bolt-lightning', color: 'text-purple-400' },
            { id: 'flood', icon: 'fa-water', color: 'text-cyan-400' }
          ].map((w) => (
            <button
              key={w.id}
              onClick={() => onWeatherChange(w.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                weather === w.id ? 'bg-white/10 shadow-lg scale-110' : 'opacity-40 hover:opacity-100'
              }`}
            >
              <i className={`fas ${w.icon} ${weather === w.id ? w.color : 'text-white'} text-lg`}></i>
            </button>
          ))}
        </div>

        {/* Sound Toggle */}
        <button 
          onClick={onToggleSound}
          className={`glass-panel w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 group relative ${isSoundEnabled ? 'border-blue-500/50' : 'border-white/10'}`}
        >
          <i className={`fas ${isSoundEnabled ? 'fa-volume-high text-blue-400' : 'fa-volume-xmark text-white/40'} text-xl mb-1 group-hover:scale-110 transition-transform`}></i>
          <span className="text-[8px] font-bold text-white/60 uppercase tracking-tighter">Sound</span>
          {isSoundEnabled && <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#1a1a1a] animate-pulse"></div>}
        </button>

        {/* Region Selector */}
        <button 
          onClick={() => onRegionChange(region === 'jp' ? 'lk' : 'jp')}
          className="glass-panel w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-90 group relative"
        >
          <i className={`fas ${region === 'jp' ? 'fa-location-dot text-red-400' : 'fa-location-dot text-orange-400'} text-xl mb-1 group-hover:scale-125 transition-transform`}></i>
          <span className="text-[9px] font-bold text-white/60 uppercase tracking-tighter">
            {region === 'jp' ? 'JP' : 'LK'}
          </span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a] animate-pulse"></div>
        </button>
      </div>

      {/* Bottom Center: Slider Control Panel (Only visible when clear) */}
      {weather === 'clear' && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl glass-panel px-8 py-5 rounded-[2rem] transition-all duration-500 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-sun text-yellow-400 animate-spin-slow"></i>
              <span className="text-white/90 text-xs font-bold uppercase tracking-[0.3em]">{phase} phase</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Local Time</span>
              <span className="text-white font-mono text-xl font-bold">{timeDisplay}</span>
            </div>
          </div>

          <div className="relative group px-2">
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={time}
              onChange={(e) => onTimeChange(parseFloat(e.target.value))}
              className="w-full cursor-pointer"
            />
            
            <div className="flex justify-between text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-4">
              <span className={time < 6 ? 'text-white/80' : ''}>Midnight</span>
              <span className={time >= 6 && time < 12 ? 'text-white/80' : ''}>Morning</span>
              <span className={time >= 12 && time < 18 ? 'text-white/80' : ''}>Noon</span>
              <span className={time >= 18 && time < 21 ? 'text-white/80' : ''}>Dusk</span>
              <span className={time >= 21 ? 'text-white/80' : ''}>Night</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
