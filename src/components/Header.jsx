import React from 'react';

export const Header = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-8 text-white pointer-events-none">
      <div className="max-w-3xl">
        {/* Main Title - Japanese */}
        <h1 className="text-5xl font-bold mb-2" style={{textShadow: '3px 3px 12px rgba(0,0,0,0.4)'}}>
          空をシミュレートする
        </h1>
        
        {/* Subtitle - Korean */}
        <p className="text-lg mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.4)'}}>
          하늘을 시뮬레이션하다
        </p>

        {/* Instructions */}
        <div className="text-sm leading-relaxed max-w-md" style={{textShadow: '1px 1px 6px rgba(0,0,0,0.4)'}}>
          <p className="mb-2 font-medium">時間をスライドして、空の変化を体験しましょう。</p>
          <p className="text-gray-100">시간을 슬라이드하며 하늘의 변화를 관찰하세요.</p>
        </div>
      </div>
    </div>
  );
};
