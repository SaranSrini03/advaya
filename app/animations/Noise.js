"use client"
import { useRef, useEffect } from 'react';

const Noise = ({
  patternSize = 128,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 6,
  patternAlpha = 10,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = grainRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animationFrameId = 0;

    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);

      // Reset transform each resize to avoid cumulative scaling work.
      ctx.setTransform(patternScaleX, 0, 0, patternScaleY, 0, 0);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const loop = () => {
      if (!document.hidden && frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return <canvas className="absolute inset-0 w-full h-full pointer-events-none" ref={grainRef} />;
};

export default Noise;
