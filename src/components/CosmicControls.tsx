import React from 'react';
import {
  Music,
  VolumeX,
  Play,
  Pause,
  Heart,
  Save
} from 'lucide-react';

interface CosmicControlsProps {
  isTourPlaying: boolean;
  onToggleTour: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenLetter: () => void;
  onOpenOrganizer: () => void;
  onOpenSaveToGithub: () => void;
}

export const CosmicControls: React.FC<CosmicControlsProps> = ({
  isTourPlaying,
  onToggleTour,
  isMusicPlaying,
  onToggleMusic,
  onOpenLetter,
  onOpenOrganizer,
  onOpenSaveToGithub
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 sm:px-6 py-3 select-none pointer-events-none">
      {/* Brand: Pure, warm dedication */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6] animate-pulse" />
        <span className="text-sm sm:text-base font-semibold tracking-tight text-white/95">
          Para Jess ✨
        </span>
      </div>

      {/* Discrete, Clean Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        {/* Ambient music toggle */}
        <button
          onClick={onToggleMusic}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer backdrop-blur-md border ${
            isMusicPlaying
              ? 'bg-purple-900/40 text-purple-200 border-purple-400/40 shadow-sm'
              : 'bg-black/40 text-slate-400 border-white/10 hover:text-white hover:bg-black/60'
          }`}
          title={isMusicPlaying ? 'Silenciar música' : 'Reproducir música relajante'}
        >
          {isMusicPlaying ? (
            <>
              <Music className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span className="hidden md:inline">Música</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Música</span>
            </>
          )}
        </button>

        {/* Organizer / Edit Memories button */}
        <button
          onClick={onOpenOrganizer}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 text-xs font-medium transition-all cursor-pointer backdrop-blur-md"
          title="Ver y editar lo que dice cada estrella y foto"
        >
          <span>Editar recuerdos</span>
        </button>

        {/* Dedicated letter modal */}
        <button
          onClick={onOpenLetter}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-200 border border-pink-400/30 text-xs font-medium transition-all cursor-pointer backdrop-blur-md"
        >
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span className="hidden sm:inline">Carta</span>
        </button>

        {/* Save to GitHub / Codebase */}
        <button
          onClick={onOpenSaveToGithub}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-xs font-semibold transition-all cursor-pointer backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:scale-105 active:scale-95"
          title="Guardar de forma permanente en el código para GitHub"
        >
          <Save className="w-3.5 h-3.5 text-emerald-400" />
          <span>Guardar en GitHub</span>
        </button>

        {/* Tour / Slideshow mode */}
        <button
          onClick={onToggleTour}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer backdrop-blur-md shadow-lg ${
            isTourPlaying
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold animate-pulse'
              : 'bg-purple-600/80 hover:bg-purple-500 text-white border border-purple-400/40'
          }`}
        >
          {isTourPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Recorrido</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
