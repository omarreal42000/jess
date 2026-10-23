import React, { useEffect, useRef } from 'react';

interface GalaxyCanvasProps {
  interactive?: boolean;
}

interface StarParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  hasSpike?: boolean;
}

interface SpiralParticle {
  armIndex: number;
  distance: number;
  angle: number;
  size: number;
  color: string;
  speed: number;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

export const GalaxyCanvas: React.FC<GalaxyCanvasProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color palettes for stars and nebulae
    const starColors = [
      '#ffffff',
      '#f0f9ff',
      '#e0e7ff',
      '#bae6fd',
      '#fbcfe8',
      '#fef08a'
    ];

    const spiralColors = [
      'rgba(255, 255, 255, 0.85)',
      'rgba(192, 132, 252, 0.8)',
      'rgba(56, 189, 248, 0.85)',
      'rgba(244, 114, 182, 0.75)',
      'rgba(129, 140, 248, 0.8)'
    ];

    // Background Stars (Layered field)
    let stars: StarParticle[] = [];
    const starCount = Math.min(Math.floor((width * height) / 1800), 750);

    for (let i = 0; i < starCount; i++) {
      const z = Math.random() * 0.8 + 0.2;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        size: (Math.random() * 1.5 + 0.4) * z,
        baseAlpha: Math.random() * 0.6 + 0.3,
        alpha: 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        hasSpike: Math.random() < 0.035
      });
    }

    // Spiral Galaxy Particles
    const spiralArms = 3;
    const spiralParticlesCount = Math.min(Math.floor((width * height) / 1200), 1200);
    const spiralParticles: SpiralParticle[] = [];

    const maxRadius = Math.min(width, height) * 0.45;
    for (let i = 0; i < spiralParticlesCount; i++) {
      const armIndex = i % spiralArms;
      // Distribution denser towards the center
      const r = Math.pow(Math.random(), 2) * maxRadius;
      const armOffset = (armIndex * 2 * Math.PI) / spiralArms;
      // Logarithmic spiral angle with random scatter
      const angle = armOffset + r * 0.006 + (Math.random() - 0.5) * 0.6;
      spiralParticles.push({
        armIndex,
        distance: r,
        angle,
        size: Math.random() * 1.6 + 0.4,
        color: spiralColors[Math.floor(Math.random() * spiralColors.length)],
        speed: (Math.random() * 0.0003 + 0.0002) * (1 / (1 + r * 0.002)),
        alpha: Math.random() * 0.7 + 0.25
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = 0;

    const createShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4; // diagonal ~45 deg
      const startX = Math.random() * width * 1.2 - width * 0.1;
      const startY = Math.random() * height * 0.5;
      shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 12 + 10,
        angle,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 35,
        color: Math.random() > 0.4 ? '#ffffff' : '#93c5fd'
      });
    };

    // Parallax mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseRef.current.targetX = (e.clientX - cx) * 0.04;
      mouseRef.current.targetY = (e.clientY - cy) * 0.04;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Main animation loop
    let galaxyRotation = 0;

    const render = (timestamp: number) => {
      // Smooth lerp mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const px = mouseRef.current.x;
      const py = mouseRef.current.y;

      const centerX = width * 0.5 + px * 0.5;
      const centerY = height * 0.5 + py * 0.5;

      // 1. Deep Space Void Background
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        100,
        centerX,
        centerY,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#0c0724');
      bgGrad.addColorStop(0.35, '#070518');
      bgGrad.addColorStop(0.7, '#03030d');
      bgGrad.addColorStop(1, '#010106');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Gas Nebula Clouds (Breathing & Floating)
      const t = timestamp * 0.0004;

      // Nebula 1: Deep Ultraviolet / Purple
      const neb1Grad = ctx.createRadialGradient(
        centerX + Math.sin(t * 1.1) * 60,
        centerY + Math.cos(t * 0.9) * 40,
        50,
        centerX,
        centerY,
        Math.min(width, height) * 0.65
      );
      neb1Grad.addColorStop(0, 'rgba(124, 58, 237, 0.22)');
      neb1Grad.addColorStop(0.4, 'rgba(91, 33, 182, 0.12)');
      neb1Grad.addColorStop(0.8, 'rgba(67, 56, 202, 0.04)');
      neb1Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb1Grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.65, 0, Math.PI * 2);
      ctx.fill();

      // Nebula 2: Cosmic Magenta / Rose Dust
      const neb2X = centerX + Math.cos(t * 0.7) * 160 + width * 0.12;
      const neb2Y = centerY + Math.sin(t * 0.8) * 100 - height * 0.1;
      const neb2Grad = ctx.createRadialGradient(neb2X, neb2Y, 20, neb2X, neb2Y, 380);
      neb2Grad.addColorStop(0, 'rgba(236, 72, 153, 0.18)');
      neb2Grad.addColorStop(0.5, 'rgba(192, 38, 211, 0.08)');
      neb2Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb2Grad;
      ctx.beginPath();
      ctx.arc(neb2X, neb2Y, 380, 0, Math.PI * 2);
      ctx.fill();

      // Nebula 3: Electric Cyan Stardust
      const neb3X = centerX - Math.sin(t * 0.6) * 180 - width * 0.14;
      const neb3Y = centerY + Math.cos(t * 0.75) * 120 + height * 0.12;
      const neb3Grad = ctx.createRadialGradient(neb3X, neb3Y, 20, neb3X, neb3Y, 420);
      neb3Grad.addColorStop(0, 'rgba(56, 189, 248, 0.16)');
      neb3Grad.addColorStop(0.5, 'rgba(14, 116, 144, 0.07)');
      neb3Grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = neb3Grad;
      ctx.beginPath();
      ctx.arc(neb3X, neb3Y, 420, 0, Math.PI * 2);
      ctx.fill();

      // 3. Background Twinkling Stars (with Parallax & Diffraction Spikes)
      const sec = timestamp * 0.001;
      stars.forEach(s => {
        s.alpha =
          s.baseAlpha + Math.sin(sec * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.35;
        if (s.alpha < 0.1) s.alpha = 0.1;
        if (s.alpha > 1) s.alpha = 1;

        const starDrawX = s.x + px * s.z;
        const starDrawY = s.y + py * s.z;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(starDrawX, starDrawY, s.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point cross diffraction spike for high-luminosity stars
        if (s.hasSpike && s.alpha > 0.65) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(starDrawX - 8, starDrawY);
          ctx.lineTo(starDrawX + 8, starDrawY);
          ctx.moveTo(starDrawX, starDrawY - 8);
          ctx.lineTo(starDrawX, starDrawY + 8);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      // 4. Spiral Galaxy Particles (Rotating cosmic spiral)
      galaxyRotation += 0.0006;
      spiralParticles.forEach(p => {
        p.angle += p.speed;
        const curAngle = p.angle + galaxyRotation;
        const x = centerX + Math.cos(curAngle) * p.distance * 1.35;
        const y = centerY + Math.sin(curAngle) * p.distance * 0.75; // slight orbital tilt

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 5. Supermassive Luminous Galaxy Core (Center glow)
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        4,
        centerX,
        centerY,
        140
      );
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      coreGrad.addColorStop(0.15, 'rgba(254, 243, 199, 0.25)');
      coreGrad.addColorStop(0.35, 'rgba(192, 132, 252, 0.18)');
      coreGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.08)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.fill();

      // Core Starlight diffraction spikes
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(galaxyRotation * 0.5);
      const coreSpikeGrad = ctx.createLinearGradient(-120, 0, 120, 0);
      coreSpikeGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      coreSpikeGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
      coreSpikeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.strokeStyle = coreSpikeGrad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-130, 0);
      ctx.lineTo(130, 0);
      ctx.moveTo(0, -130);
      ctx.lineTo(0, 130);
      ctx.stroke();
      ctx.restore();

      // 6. Shooting Stars / Comets update & draw
      if (timestamp - lastShootingStarTime > 4500 && Math.random() < 0.03) {
        createShootingStar();
        lastShootingStarTime = timestamp;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const meteor = shootingStars[i];
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.life++;

        const progress = meteor.life / meteor.maxLife;
        meteor.opacity = 1 - progress;

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        const meteorGrad = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          tailX,
          tailY
        );
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        meteorGrad.addColorStop(
          0.3,
          meteor.color === '#ffffff'
            ? `rgba(254, 215, 170, ${meteor.opacity * 0.8})`
            : `rgba(96, 165, 250, ${meteor.opacity * 0.8})`
        );
        meteorGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Glowing head
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
        ctx.fill();

        if (meteor.life >= meteor.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
    />
  );
};
