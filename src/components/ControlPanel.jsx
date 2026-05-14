import React from 'react';

export const ControlPanel = ({ time, timeDisplay, onTimeChange, phase }) => {
  const previewCards = [
    { 
      id: 1,
      label: '早朝',
      labelKr: '이른아침',
      time: 5,
      gradient: 'from-purple-400 to-orange-400',
      icon: '🌙'
    },
    { 
      id: 2,
      label: '朝',
      labelKr: '아침',
      time: 7.25,
      gradient: 'from-orange-400 to-yellow-300',
      icon: '🌅'
    },
    { 
      id: 3,
      label: '昼',
      labelKr: '낮',
      time: 12,
      gradient: 'from-blue-400 to-cyan-200',
      icon: '☀️'
    },
    { 
      id: 4,
      label: '夕方',
      labelKr: '저녁',
      time: 17.75,
      gradient: 'from-orange-400 to-purple-500',
      icon: '🌅'
    },
    { 
      id: 5,
      label: '夜',
      labelKr: '밤',
      time: 20.5,
      gradient: 'from-indigo-600 to-slate-800',
      icon: '🌙'
    },
    { 
      id: 6,
      label: '深夜',
      labelKr: '자정',
      time: 23.25,
      gradient: 'from-slate-900 to-indigo-900',
      icon: '⭐'
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
      <div className="control-panel px-8 py-8 mx-auto max-w-6xl">
        {/* Date and Time Display */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Left: Current Time */}
          <div>
            <div className="text-sm font-semibold text-gray-600 mb-2">現在時刻</div>
            <div className="text-5xl font-bold text-blue-600 font-mono tracking-tight">
              {timeDisplay}
            </div>
          </div>

          {/* Center: Empty */}
          <div className="flex items-center justify-center">
            <div className="h-12 w-px bg-gray-300 opacity-50"></div>
          </div>

          {/* Right: Real Time Button */}
          <div className="flex items-end justify-end">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              <span>▶</span>
              <span className="text-sm">リアルタイム</span>
            </button>
          </div>
        </div>

        {/* Time Slider */}
        <div className="mb-6">
          <input
            type="range"
            min="0"
            max="24"
            step="0.1"
            value={time}
            onChange={(e) => onTimeChange(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full cursor-pointer"
            style={{
              background: 'linear-gradient(to right, #991b1b 0%, #dc2626 8%, #f97316 20%, #fbbf24 40%, #60a5fa 60%, #818cf8 80%, #312e81 100%)',
            }}
          />
          <div className="flex justify-between text-xs font-semibold text-gray-700 mt-2 px-1">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Preview Time Cards */}
        <div className="grid grid-cols-6 gap-3">
          {previewCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onTimeChange(card.time)}
              className="group relative rounded-2xl overflow-hidden transform transition-all hover:scale-105 active:scale-95 focus:outline-none"
            >
              <div className={`relative h-24 bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow`}>
                <span className="text-3xl drop-shadow-lg">{card.icon}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-2 py-2 text-center">
                <p className="text-white font-semibold text-xs">{card.label}</p>
                <p className="text-gray-200 text-xs">{card.time.toFixed(2).replace('.', ':')}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Recommended Times */}
        <div className="mt-6 text-left">
          <p className="text-xs font-semibold text-gray-600 mb-2">おすすめの時間</p>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>✨</span>
            <span>Golden hour: 05:30 - 08:00, 17:00 - 20:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
