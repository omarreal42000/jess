import React, { useState } from 'react';
import { Memory } from '../types/galaxy';
import { cosmicAudio } from '../utils/audio';

interface CelestialNodeProps {
  memory: Memory;
  index: number;
  isActive: boolean;
  isFocusedInTour?: boolean;
  onSelect: (memory: Memory) => void;
}

export const CelestialNode: React.FC<CelestialNodeProps> = ({
  memory,
  index,
  isActive,
  isFocusedInTour,
  onSelect
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Category specific starlight glow color gradients
  const getCategoryTheme = () => {
    switch (memory.category) {
      case 'Cumpleaños':
        return {
          glow: 'rgba(251, 191, 36, 0.95)',
          color1: '#fef08a',
          color2: '#f59e0b',
          accent: '#ec4899',
          border: 'border-amber-300/60'
        };
      case 'Logros':
        return {
          glow: 'rgba(168, 85, 247, 0.9)',
          color1: '#f3e8ff',
          color2: '#a855f7',
          accent: '#6366f1',
          border: 'border-purple-300/50'
        };
      case 'Eventos':
        return {
          glow: 'rgba(236, 72, 153, 0.9)',
          color1: '#fce7f3',
          color2: '#ec4899',
          accent: '#8b5cf6',
          border: 'border-pink-300/50'
        };
      case 'Llamadas':
        return {
          glow: 'rgba(56, 189, 248, 0.9)',
          color1: '#e0f2fe',
          color2: '#38bdf8',
          accent: '#818cf8',
          border: 'border-sky-300/50'
        };
      case 'Risas':
        return {
          glow: 'rgba(52, 211, 153, 0.9)',
          color1: '#d1fae5',
          color2: '#34d399',
          accent: '#38bdf8',
          border: 'border-emerald-300/50'
        };
      default:
        return {
          glow: 'rgba(192, 132, 252, 0.9)',
          color1: '#ffffff',
          color2: '#c084fc',
          accent: '#38bdf8',
          border: 'border-purple-300/50'
        };
    }
  };

  const theme = getCategoryTheme();
  const isCore = memory.isCore;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    cosmicAudio.playStarChime(isCore ? 1.25 : 1.0);
    onSelect(memory);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cosmicAudio.playStarChime(0.85);
  };

  return (
    <div
      className={`absolute transition-transform duration-500 ease-out select-none cursor-pointer ${
        isCore ? 'z-40' : 'z-20'
      }`}
      style={{
        left: `${memory.x}%`,
        top: `${memory.y}%`,
        transform: `translate(-50%, -50%) scale(${
          isFocusedInTour ? 1.55 : isHovered ? (isCore ? 1.35 : 1.4) : 1
        })`
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Recuerdo estelar: ${memory.title}`}
    >
      {/* Outer Astral Halo Glow */}
      <div
        className={`absolute inset-0 -m-4 rounded-full pointer-events-none transition-opacity duration-500 ${
          isHovered || isFocusedInTour || isActive
            ? 'opacity-100 scale-125'
            : isCore
            ? 'opacity-85 animate-pulse'
            : 'opacity-40 animate-pulse'
        }`}
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, rgba(0,0,0,0) 70%)`,
          filter: `blur(${isCore ? '16px' : '8px'})`
        }}
      />

      {/* Orbiting Celestial Ring (Slow rotation) */}
      <div
        className={`absolute rounded-full border border-dashed pointer-events-none animate-spin ${
          isCore ? 'border-amber-300/60 w-16 h-16 -inset-4.5' : '-inset-2.5 border-white/20'
        }`}
        style={{ animationDuration: isCore ? '12s' : '18s' }}
      />

      {/* Radiant Star Vector Component */}
      <div
        className={`relative flex items-center justify-center transition-all duration-300 ${
          isCore ? 'w-11 h-11' : 'w-7 h-7'
        }`}
        style={{
          filter: `drop-shadow(0 0 ${isCore ? '18px' : '8px'} ${theme.glow})`
        }}
      >
        <svg
          viewBox="0 0 40 40"
          className={`w-full h-full transition-transform duration-700 ${
            isHovered ? 'rotate-90 scale-110' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`starGrad-${memory.id}`}
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={theme.color1} />
              <stop offset="0.5" stopColor={theme.color2} />
              <stop offset="1" stopColor={theme.accent} />
            </linearGradient>
            <radialGradient
              id={`coreGrad-${memory.id}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop stopColor="#ffffff" stopOpacity="1" />
              <stop stopColor={theme.color1} stopOpacity="0.8" />
              <stop stopColor={theme.color2} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 8-pointed Celestial Astral Diamond Flare */}
          <path
            d="M20 1L23.5 14L37 15.5L25.5 22L29.5 36L20 27L10.5 36L14.5 22L3 15.5L16.5 14L20 1Z"
            fill={`url(#starGrad-${memory.id})`}
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth="0.8"
          />

          {/* Central Bright Diamond Core */}
          <circle cx="20" cy="20" r="5" fill={`url(#coreGrad-${memory.id})`} />
          <circle cx="20" cy="20" r="2.2" fill="#ffffff" />
        </svg>

        {/* Orbiting Starlight Satellite Dot */}
        <span
          className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-white shadow-sm pointer-events-none"
          style={{
            boxShadow: `0 0 6px ${theme.glow}`
          }}
        />
      </div>

      {/* Holographic Starlight Hover Card / Preview Tooltip */}
      {isHovered && (
        <div
          className="absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full mb-2 pointer-events-none z-50 transition-all duration-200 animate-in fade-in zoom-in-95"
          style={{ width: '190px' }}
        >
          <div className="relative p-2 rounded-2xl bg-slate-950/95 border border-white/20 backdrop-blur-xl shadow-2xl shadow-purple-950/70 overflow-hidden">
            <div className="relative flex items-center gap-2.5">
              {/* Photo Thumbnail */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/25 bg-black/60 shadow-md">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-contain bg-black"
                  referrerPolicy="no-referrer"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/100x100/1e1b4b/c084fc?text=Foto';
                  }}
                />
              </div>

              {/* Title only */}
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-xs font-medium text-white truncate leading-snug">
                  {memory.title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
