import React, { useState, useEffect, useMemo } from 'react';
import { RainCanvas } from './RainCanvas';

export const SkyBackground = ({ time, phase, region, weather, isThunderFlash }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [weatherImageUrl, setWeatherImageUrl] = useState(null);
  const [flashType, setFlashType] = useState('flash-1');

  useEffect(() => {
    // Dynamically load the image based on phase and region
    const loadBackgroundImage = async () => {
      try {
        const url = new URL(`../assets/images/${phase}/${region}.png`, import.meta.url).href;
        setImageUrl(url);
        
        if (weather !== 'clear') {
          const weatherPathMap = {
            rain: 'slowRain',
            storm: 'thunderStrome',
            flood: 'flooding'
          };
          const weatherUrl = new URL(`../assets/images/weather/${weatherPathMap[weather]}/${region}.png`, import.meta.url).href;
          setWeatherImageUrl(weatherUrl);
        } else {
          setWeatherImageUrl(null);
        }
      } catch (err) {
        console.error("Failed to load background image", err);
      }
    };
    loadBackgroundImage();
  }, [phase, region, weather]);

  // Randomize flash type when thunder triggers
  useEffect(() => {
    if (isThunderFlash) {
      setFlashType(Math.random() > 0.5 ? 'flash-1' : 'flash-2');
    }
  }, [isThunderFlash]);

  const getGradient = () => {
    if (weather !== 'clear') return 'from-slate-950 via-slate-900 to-black';

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

  // Generate stable random droplets
  const droplets = useMemo(() => {
    return [...Array(weather === 'clear' ? 0 : weather === 'rain' ? 60 : 120)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4, // Smaller base size
      delay: `${Math.random() * 20}s`, // Longer stagger range
      duration: `${Math.random() * 10 + 10}s`, // Varied lifespan
      type: Math.random() > 0.8 ? 'dripping' : Math.random() > 0.4 ? 'small' : 'merged',
      scale: 0.3 + Math.random() * 0.7 // Smaller scale
    }));
  }, [weather]);

  return (
    <div className={`absolute inset-0 sky-transition bg-gradient-to-b ${getGradient()} ${isThunderFlash ? 'animate-shake' : ''}`}>
      
      {/* Background Images */}
      {imageUrl && weather === 'clear' && (
        <div 
          className="absolute inset-0 z-0 opacity-100 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {weatherImageUrl && weather !== 'clear' && (
        <div 
          className="absolute inset-0 z-0 opacity-100 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${weatherImageUrl})` }}
        />
      )}

      {/* Fog Layer */}
      <div className={`fog-layer ${['storm', 'flood'].includes(weather) ? 'visible' : ''}`} />

      {/* Falling Rain (Canvas) */}
      {['rain', 'storm', 'flood'].includes(weather) && (
        <RainCanvas weather={weather} />
      )}

      {/* Screen Droplets */}
      {['rain', 'storm', 'flood'].includes(weather) && (
        <div className="droplets-layer">
          {droplets.map((drop) => (
            <div 
              key={drop.id} 
              className={`screen-droplet ${drop.type}`}
              style={{ 
                left: drop.left, 
                top: drop.top,
                width: `${drop.size}px`,
                height: `${drop.size * 1.2}px`,
                animationDelay: drop.delay,
                animationDuration: drop.duration,
                transform: `scale(${drop.scale})`
              }} 
            />
          ))}
          <div className={`water-film ${weather !== 'clear' ? 'visible' : ''}`} />
        </div>
      )}

      {/* Thunder Flash */}
      <div className={`thunder-overlay ${isThunderFlash ? flashType : ''}`} />
    </div>
  );
};
