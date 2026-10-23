import React from 'react';
import { Memory } from '../types/galaxy';

interface ConstellationLinesProps {
  memories: Memory[];
  visible: boolean;
}

export const ConstellationLines: React.FC<ConstellationLinesProps> = ({
  memories,
  visible
}) => {
  if (!visible || memories.length < 2) return null;

  // Find core star (Birthday star)
  const coreStar = memories.find(m => m.isCore) || memories[memories.length - 1];

  // We connect memories chronologically / sequentially in an astrological constellation chain,
  // plus radiating light rays to the core central star
  const lines: Array<{ x1: number; y1: number; x2: number; y2: number; isCoreRay?: boolean }> = [];

  for (let i = 0; i < memories.length - 1; i++) {
    // Sequential constellation path
    lines.push({
      x1: memories[i].x,
      y1: memories[i].y,
      x2: memories[i + 1].x,
      y2: memories[i + 1].y
    });

    // Sub-clusters connecting to core every few stars to form a web
    if (i % 3 === 0 && memories[i].id !== coreStar.id) {
      lines.push({
        x1: memories[i].x,
        y1: memories[i].y,
        x2: coreStar.x,
        y2: coreStar.y,
        isCoreRay: true
      });
    }
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-700 ease-in-out"
      style={{ opacity: visible ? 0.85 : 0 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="coreRayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.35" />
        </linearGradient>

        <filter id="glowEffect">
          <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {lines.map((line, idx) => (
        <line
          key={`constellation-${idx}`}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke={line.isCoreRay ? 'url(#coreRayGrad)' : 'url(#constellationGrad)'}
          strokeWidth={line.isCoreRay ? '0.12' : '0.22'}
          strokeDasharray={line.isCoreRay ? '0.8, 1.2' : undefined}
          filter="url(#glowEffect)"
        />
      ))}
    </svg>
  );
};
