import React, { useState, useEffect } from 'react';

export const SkyBackground = ({ time, phase, region, weather, isThunderFlash }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [weatherImageUrl, setWeatherImageUrl] = useState(null);

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

  const getGradient = () => {
    // If weather is active, use a neutral dark backdrop
    if (weather !== 'clear') return 'from-slate-900 to-black';

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
      
      {/* Dynamic Background Image (Only visible when clear) */}
      {imageUrl && weather === 'clear' && (
        <div 
          className="absolute inset-0 z-0 opacity-100 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Weather Background Image (Only visible when not clear) */}
      {weatherImageUrl && weather !== 'clear' && (
        <div 
          className="absolute inset-0 z-10 opacity-100 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${weatherImageUrl})` }}
        />
      )}

      {/* Weather Visual Effects Layers */}
      <div className={`fog-overlay ${['rain', 'storm', 'flood'].includes(weather) ? 'weather-active' : ''}`} />
      
      {/* Rain Effect (Falling) */}
      {['rain', 'storm', 'flood'].includes(weather) && (
        <div className="rain-overlay z-20">
          {[...Array(weather === 'rain' ? 60 : 120)].map((_, i) => (
            <div 
              key={i} 
              className="rain-drop" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 0.2 + 0.4}s`,
                opacity: Math.random() * 0.4 + 0.2
              }} 
            />
          ))}
        </div>
      )}

      {/* Screen Droplets Effect (Water on lens) */}
      {['rain', 'storm', 'flood'].includes(weather) && (
        <div className="screen-droplets-container">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className={`screen-droplet ${Math.random() > 0.8 ? 'dripping' : ''}`}
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 4}px`,
                opacity: Math.random() * 0.5 + 0.1,
                animationDelay: `${Math.random() * 5}s`
              }} 
            />
          ))}
        </div>
      )}

      <div className={`thunder-overlay z-30 transition-opacity duration-75 ${isThunderFlash ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
