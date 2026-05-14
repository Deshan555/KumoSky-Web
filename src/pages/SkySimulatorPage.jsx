import React, { useState, useEffect, useRef } from 'react';
import { SkyBackground } from '../components/SkyBackground';
import { ControlPanel } from '../components/ControlPanel';

// Import audio assets
import morningAudio from '../assets/audio/morning.mp3';
import afternoonAudio from '../assets/audio/afternoon.mp3';
import eveningAudio from '../assets/audio/evening.mp3';
import nightAudio from '../assets/audio/night.mp3';
import owlAudio from '../assets/audio/owl-hooting.mp3';

// Import weather audio
import rainAudio from '../assets/images/weather/slowRain/audio.mp3';
import stormAudio from '../assets/images/weather/thunderStrome/audio.mp3';
import floodAudio from '../assets/images/weather/flooding/audio.mp3';
import thunderClapAudio from '../assets/audio/thunder-clap.mp3';

export default function SkySimulatorPage() {
  const [time, setTime] = useState(13.75); // Start at 13:45 like in reference
  const [timeDisplay, setTimeDisplay] = useState('13:45');
  const [region, setRegion] = useState('jp'); // 'jp' or 'lk'
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [weather, setWeather] = useState('clear'); // 'clear', 'rain', 'storm', 'flood'
  const [isThunderFlash, setIsThunderFlash] = useState(false);

  const audioRefs = useRef({
    morning: new Audio(morningAudio),
    afternoon: new Audio(afternoonAudio),
    evening: new Audio(eveningAudio),
    night: new Audio(nightAudio),
    owl: new Audio(owlAudio),
    rain: new Audio(rainAudio),
    storm: new Audio(stormAudio),
    flood: new Audio(floodAudio),
    thunderClap: new Audio(thunderClapAudio)
  });

  // Setup audio properties
  useEffect(() => {
    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      audio.loop = key !== 'thunderClap'; // Thunder clap should not loop
      audio.volume = 0;
    });
  }, []);

  // Determine sky phase based on time
  const getPhase = () => {
    if (time >= 0 && time < 4) return 'night';
    if (time >= 4 && time < 5) return 'earlyMorning';
    if (time >= 5 && time < 6.5) return 'dawn';
    if (time >= 6.5 && time < 9) return 'morning';
    if (time >= 9 && time < 12) return 'noon';
    if (time >= 12 && time < 16) return 'afternoon';
    if (time >= 16 && time < 17.5) return 'lateAfternoon';
    if (time >= 17.5 && time < 19) return 'sunset';
    if (time >= 19 && time < 20) return 'dusk';
    if (time >= 20 && time < 24) return 'night';
    return 'afternoon';
  };

  const phase = getPhase();

  // Update time display
  useEffect(() => {
    const hours = String(Math.floor(time)).padStart(2, '0');
    const minutes = String(Math.round((time % 1) * 60)).padStart(2, '0');
    setTimeDisplay(`${hours}:${minutes}`);
  }, [time]);

  // Audio Control Logic
  useEffect(() => {
    const sounds = audioRefs.current;
    
    // Map phase to audio key
    const getAudioKey = (p) => {
      if (['earlyMorning', 'dawn', 'morning'].includes(p)) return 'morning';
      if (['noon', 'afternoon', 'lateAfternoon'].includes(p)) return 'afternoon';
      if (['sunset', 'dusk'].includes(p)) return 'evening';
      return 'night';
    };

    const currentKey = getAudioKey(phase);

    if (isSoundEnabled) {
      // Fade in current ambient audio and fade out others
      Object.entries(sounds).forEach(([key, audio]) => {
        const isWeatherAudio = ['rain', 'storm', 'flood'].includes(key);
        const isCurrentWeather = key === weather;
        const isCurrentlyNeededAmbient = (key === currentKey) || (currentKey === 'night' && key === 'owl');

        // If any weather is active (not clear), ONLY play weather audio
        if (weather !== 'clear') {
          if (isCurrentWeather) {
            if (audio.paused) audio.play().catch(e => console.log("Audio play blocked", e));
            fadeVolume(audio, 0.6);
          } else {
            fadeVolume(audio, 0);
          }
          return;
        }

        // If clear, play ambient sounds
        if (isCurrentlyNeededAmbient) {
          if (audio.paused) audio.play().catch(e => console.log("Audio play blocked", e));
          fadeVolume(audio, 0.4);
        } else {
          fadeVolume(audio, 0);
        }
      });
    } else {
      // Fade out all
      Object.values(sounds).forEach(audio => fadeVolume(audio, 0));
    }
  }, [phase, isSoundEnabled, weather]);

  // Periodic/Randomized Thunder Clap Trigger
  useEffect(() => {
    let timeout;
    const thunderWeather = ['storm', 'flood'];
    
    if (isSoundEnabled && thunderWeather.includes(weather)) {
      const triggerThunder = () => {
        // Play sound
        const clap = audioRefs.current.thunderClap;
        clap.volume = 0.8;
        clap.currentTime = 0;
        clap.play().catch(e => console.log("Clap blocked", e));

        // Trigger visual flash
        setIsThunderFlash(true);
        setTimeout(() => setIsThunderFlash(false), 200);
        
        // Schedule next flash (Random between 3 and 10 seconds)
        const nextDelay = Math.random() * 7000 + 3000;
        timeout = setTimeout(triggerThunder, nextDelay);
      };
      
      // Start the cycle
      timeout = setTimeout(triggerThunder, 2000);
    } else {
      setIsThunderFlash(false);
    }
    
    return () => clearTimeout(timeout);
  }, [isSoundEnabled, weather]);

  const fadeVolume = (audio, targetVolume) => {
    const step = 0.05;
    const interval = 200;
    
    if (audio.fadeInterval) clearInterval(audio.fadeInterval);
    
    audio.fadeInterval = setInterval(() => {
      if (Math.abs(audio.volume - targetVolume) < step) {
        audio.volume = targetVolume;
        if (targetVolume === 0) audio.pause();
        clearInterval(audio.fadeInterval);
      } else {
        audio.volume += audio.volume < targetVolume ? step : -step;
      }
    }, interval);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Sky Background */}
      <SkyBackground 
        time={time} 
        phase={phase} 
        region={region} 
        weather={weather} 
        isThunderFlash={isThunderFlash} 
      />

      {/* Control Panel */}
      <ControlPanel 
        time={time} 
        timeDisplay={timeDisplay}
        onTimeChange={setTime}
        phase={phase}
        region={region}
        onRegionChange={setRegion}
        weather={weather}
        onWeatherChange={setWeather}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={() => setIsSoundEnabled(!isSoundEnabled)}
      />
    </div>
  );
}
