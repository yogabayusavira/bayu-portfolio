import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  // Normalized shape coordinates (0 to 1 relative to hand bounding box)
  sx: number;
  sy: number;
  
  // Current screen position
  x: number;
  y: number;
  
  // Velocity for spring physics
  vx: number;
  vy: number;
  
  // Target position
  tx: number;
  ty: number;
  
  // Visual attributes
  radius: number;
  alpha: number;
  isLeft: boolean;
}

export default function HandParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Store mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 }); // rx, ry are raw mouse coordinates for hover repel
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isDestroyed = false;

    // Load hand assets
    const imgLeft = new Image();
    imgLeft.src = '/images/hand_left.webp';

    const imgRight = new Image();
    imgRight.src = '/images/hand_right.webp';

    let leftLoaded = false;
    let rightLoaded = false;

    const onImageLoad = () => {
      if (imgLeft.complete) leftLoaded = true;
      if (imgRight.complete) rightLoaded = true;

      if (leftLoaded && rightLoaded && !isDestroyed) {
        initParticles();
      }
    };

    imgLeft.onload = onImageLoad;
    imgRight.onload = onImageLoad;

    // Helper to sample coordinates from image
    const sampleImage = (img: HTMLImageElement, isLeft: boolean): { sx: number; sy: number }[] => {
      const sampleWidth = 150;
      const sampleHeight = 200;
      
      const offscreen = document.createElement('canvas');
      offscreen.width = sampleWidth;
      offscreen.height = sampleHeight;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return [];

      offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      
      try {
        const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight);
        const data = imgData.data;
        const sampledPoints: { sx: number; sy: number }[] = [];

        const isMobile = window.innerWidth < 768;
        const step = isMobile ? 3 : 2;

        // Sample pixels with higher transparency threshold
        for (let y = 0; y < sampleHeight; y += step) {
          for (let x = 0; x < sampleWidth; x += step) {
            const idx = (y * sampleWidth + x) * 4;
            const alpha = data[idx + 3];
            if (alpha > 80) { // Slightly lower alpha threshold to capture outline details better
              sampledPoints.push({
                sx: x / sampleWidth,
                sy: y / sampleHeight
              });
            }
          }
        }
        return sampledPoints;
      } catch (e) {
        console.warn('Canvas pixel read block (CORS/Fallback)', e);
        return [];
      }
    };

    const initParticles = () => {
      const leftPoints = sampleImage(imgLeft, true);
      const rightPoints = sampleImage(imgRight, false);

      particles = [];
      const isMobile = window.innerWidth < 768;
      
      const baseRadius = isMobile ? 0.6 : 0.8;
      const rangeRadius = isMobile ? 1.2 : 1.6;
      const baseAlpha = isMobile ? 0.15 : 0.30;
      const rangeAlpha = isMobile ? 0.45 : 0.50;

      // Left hand particles
      leftPoints.forEach((pt) => {
        particles.push({
          sx: pt.sx,
          sy: pt.sy,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          tx: 0,
          ty: 0,
          radius: Math.random() * rangeRadius + baseRadius,
          alpha: Math.random() * rangeAlpha + baseAlpha,
          isLeft: true
        });
      });

      // Right hand particles
      rightPoints.forEach((pt) => {
        particles.push({
          sx: pt.sx,
          sy: pt.sy,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          tx: 0,
          ty: 0,
          radius: Math.random() * rangeRadius + baseRadius,
          alpha: Math.random() * rangeAlpha + baseAlpha,
          isLeft: false
        });
      });
    };

    let wasMobile = window.innerWidth < 768;

    // Handle resizing & responsive positioning
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
      
      const isMobile = window.innerWidth < 768;
      if (isMobile !== wasMobile) {
        wasMobile = isMobile;
        if (imgLeft.complete && imgRight.complete) {
          initParticles();
        }
      } else if (particles.length === 0 && imgLeft.complete && imgRight.complete) {
        initParticles();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      
      // Normalized coordinates from -1 to 1
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;

      mouseRef.current = {
        x: normX,
        y: normY,
        rx: rawX,
        ry: rawY
      };
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      // Drift back to center slowly
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Click/Touch pulse for interactive tap effect
    const clickPulse = { x: 0, y: 0, intensity: 0 };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      clickPulse.x = clickX;
      clickPulse.y = clickY;
      clickPulse.intensity = 1.0;
    };

    const handleCanvasTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.touches[0].clientX - rect.left;
        const clickY = e.touches[0].clientY - rect.top;
        
        clickPulse.x = clickX;
        clickPulse.y = clickY;
        clickPulse.intensity = 1.0;
      }
    };

    window.addEventListener('click', handleCanvasClick);
    window.addEventListener('touchstart', handleCanvasTouch, { passive: true });

    // Physics Engine settings
    const stiffness = 0.05;
    const damping = 0.82;
    const repelRadius = 80;
    const repelForce = 1.2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (clickPulse.intensity > 0) {
        clickPulse.intensity -= 0.04; // Decays in ~400ms (25 frames)
      }

      const m = mouseRef.current;
      const isLargeScreen = canvas.width >= 1024;
      const isMediumScreen = canvas.width >= 768 && canvas.width < 1024;
      const isMobile = canvas.width < 768; // Derive here so it's always in scope

      // Layout specifications for the hands based on screen size
      let leftHandW = canvas.width * 0.50;
      let leftHandH = leftHandW * (1024 / 770);
      let leftHandX = -canvas.width * 0.05;
      let leftHandY = canvas.height * 0.15;

      let rightHandW = canvas.width * 0.50;
      let rightHandH = rightHandW * (1024 / 766);
      let rightHandX = canvas.width * 0.55;
      let rightHandY = canvas.height * 0.15;

      if (isLargeScreen) {
        leftHandW = canvas.width * 0.44;
        leftHandH = leftHandW * (1024 / 770);
        leftHandX = -canvas.width * 0.02;
        leftHandY = -canvas.height * 0.02;

        rightHandW = canvas.width * 0.44;
        rightHandH = rightHandW * (1024 / 766);
        rightHandX = canvas.width * 0.58;
        rightHandY = -canvas.height * 0.02;
      } else if (isMediumScreen) {
        leftHandW = canvas.width * 0.50;
        leftHandH = leftHandW * (1024 / 770);
        leftHandX = -canvas.width * 0.06;
        leftHandY = canvas.height * 0.10;

        rightHandW = canvas.width * 0.50;
        rightHandH = rightHandW * (1024 / 766);
        rightHandX = canvas.width * 0.56;
        rightHandY = canvas.height * 0.10;
      }

      particles.forEach((p) => {
        // 1. Calculate static layout target coordinates
        let baseTx = 0;
        let baseTy = 0;

        if (p.isLeft) {
          baseTx = leftHandX + p.sx * leftHandW;
          baseTy = leftHandY + p.sy * leftHandH;
        } else {
          baseTx = rightHandX + p.sx * rightHandW;
          baseTy = rightHandY + p.sy * rightHandH;
        }

        // 2. Parallax mouse offset (left & right go opposite horizontally, creating depth)
        const parallaxX = p.isLeft ? m.x * 22 : m.x * -22;
        const parallaxY = m.y * 12;

        let finalTx = baseTx + parallaxX;
        let finalTy = baseTy + parallaxY;

        // 3. Proximity Mouse Repel Effect
        if (isHoveredRef.current) {
          const dx = p.x - m.rx;
          const dy = p.y - m.ry;
          const dist = Math.hypot(dx, dy);

          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius;
            const angle = Math.atan2(dy, dx);
            // Displace target slightly away from cursor
            finalTx += Math.cos(angle) * force * repelRadius * repelForce;
            finalTy += Math.sin(angle) * force * repelRadius * repelForce;
          }
        }

        // 3.5. Click/Touch Shockwave Repel Effect
        if (clickPulse.intensity > 0) {
          const dx = p.x - clickPulse.x;
          const dy = p.y - clickPulse.y;
          const dist = Math.hypot(dx, dy);
          const clickRepelRadius = isMobile ? 100 : 140;

          if (dist < clickRepelRadius) {
            const force = ((clickRepelRadius - dist) / clickRepelRadius) * clickPulse.intensity * 1.2;
            const angle = Math.atan2(dy, dx);
            finalTx += Math.cos(angle) * force * clickRepelRadius * 0.6;
            finalTy += Math.sin(angle) * force * clickRepelRadius * 0.6;
          }
        }

        // 4. Update Particle Physics (Spring Easing)
        const ax = (finalTx - p.x) * stiffness;
        const ay = (finalTy - p.y) * stiffness;

        p.vx += ax;
        p.vy += ay;
        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        // 5. Draw Particle (charcoal gray shade matching branding theme)
        ctx.fillStyle = `rgba(26, 26, 26, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw faint connections between extremely close particles for constellation feel
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.06)';
      ctx.lineWidth = 0.5;
      const connLimit = 16;
      
      // Limit searches to maintain performance (skip rendering lines if high particle count)
      if (particles.length > 0 && particles.length < 6000) {
        for (let i = 0; i < particles.length; i += 8) {
          const p1 = particles[i];
          for (let j = i + 8; j < particles.length; j += 16) {
            const p2 = particles[j];
            if (p1.isLeft === p2.isLeft) { // only connect within the same hand
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = dx * dx + dy * dy;
              if (dist < connLimit * connLimit) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('touchstart', handleCanvasTouch);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
