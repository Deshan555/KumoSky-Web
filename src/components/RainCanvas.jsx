import React, { useEffect, useRef } from 'react';

export const RainCanvas = ({ weather }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const raindrops = [];
    const dropCount = weather === 'rain' ? 150 : 400;

    class Raindrop {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 15 + 10;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.thickness = Math.random() * 1 + 0.5;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.length);
        ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    for (let i = 0; i < dropCount; i++) {
      raindrops.push(new Raindrop());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raindrops.forEach(drop => {
        drop.update();
        drop.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weather]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-5"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};
