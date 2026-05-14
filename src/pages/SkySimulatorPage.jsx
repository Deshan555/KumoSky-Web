import React, { useState, useEffect } from 'react';
import { SkyBackground } from '../components/SkyBackground';
import { ControlPanel } from '../components/ControlPanel';
import { Header } from '../components/Header';

export default function SkySimulatorPage() {
  const [time, setTime] = useState(13.75); // Start at 13:45 like in reference
  const [timeDisplay, setTimeDisplay] = useState('13:45');

  // Determine sky phase based on time
  const getPhase = () => {
    if (time >= 0 && time < 4) return 'night';
    if (time >= 4 && time < 5) return 'earlyMorning';
    if (time >= 5 && time < 6.5) return 'dawn';
    if (time >= 6.5 && time < 9) return 'morning';
    if (time >= 9 && time < 12) return 'afternoon';
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

  // Optional: Auto-advance time (uncomment to enable)
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(prev => (prev + 0.016666 > 24) ? 0 : prev + 0.016666);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Sky Background */}
      <SkyBackground time={time} phase={phase} />

      {/* Header */}
      <Header />

      {/* Control Panel */}
      <ControlPanel 
        time={time} 
        timeDisplay={timeDisplay}
        onTimeChange={setTime}
        phase={phase}
      />
    </div>
  );
}
