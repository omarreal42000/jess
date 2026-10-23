import React, { useEffect, useState } from 'react';
import { Memory } from '../types/galaxy';
import { AVAILABLE_PHOTOS } from '../data/initialMemories';
import { cosmicAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Check,
  Upload,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface MemoryModalProps {
  memory: Memory | null;
  memories: Memory[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onUpdateMemory: (updated: Memory) => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  memory,
  memories,
  onClose,
  onNavigate,
  onUpdateMemory
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');

  // Sync edit state whenever the active memory changes
  useEffect(() => {
    if (memory) {
      setEditTitle(memory.title);
      setEditDescription(memory.description);
      setEditImage(memory.image);
      setIsEditing(false);
    }
  }, [memory]);

  useEffect(() => {
    if (!memory) return;

    if (memory.isCore || memory.category === 'Cumpleaños') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#c084fc', '#38bdf8', '#ffffff']
        });
      } catch {
        // ignore
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditing) return; // don't hijack keyboard while typing
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, isEditing, onClose, onNavigate]);

  if (!memory) return null;

  const handleSave = () => {
    onUpdateMemory({
      ...memory,
      title: editTitle.trim() || memory.title,
      description: editDescription.trim() || memory.description,
      image: editImage || memory.image
    });
    setIsEditing(false);
    cosmicAudio.playStarChime(1.1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      if (typeof ev.target?.result === 'string') {
        setEditImage(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl transition-all duration-300 animate-in fade-in select-none"
      onClick={onClose}
    >
      {/* Postal Container */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-white/15 p-4 sm:p-7 shadow-2xl shadow-purple-950/70 text-slate-100 flex flex-col items-center gap-4"
        onClick={e => e.stopPropagation()}
        style={{
          boxShadow: '0 20px 50px -10px rgba(112, 26, 117, 0.4), 0 0 30px rgba(56, 189, 248, 0.1)'
        }}
      >
        {/* Top Controls (Edit toggle & Close) */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              title="Editar título, texto y foto de este momento"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-200 border border-white/15 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-purple-300" />
              <span>Editar</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-3.5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Guardar</span>
            </button>
          )}

          <button
            onClick={onClose}
            title="Cerrar (Esc)"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 border border-white/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* --- VIEW MODE --- */}
        {!isEditing ? (
          <>
            {/* Complete, Unclipped Image Container */}
            <div className="relative w-full flex items-center justify-center rounded-2xl bg-black/70 border border-white/10 overflow-hidden min-h-[260px] max-h-[60vh] p-2">
              <img
                src={memory.image}
                alt={memory.title}
                referrerPolicy="no-referrer"
                className="w-auto h-auto max-w-full max-h-[56vh] object-contain rounded-xl transition-transform duration-300"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://placehold.co/600x600/0f172a/c084fc?text=Recuerdo';
                }}
              />

              {/* Navigation Overlay Arrows */}
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-md"
                title="Recuerdo anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg backdrop-blur-md"
                title="Siguiente recuerdo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pure Postal Message */}
            <div className="w-full text-center space-y-2.5 px-2 sm:px-6 max-w-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {memory.title}
              </h2>

              <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed whitespace-pre-line">
                {memory.description}
              </p>
            </div>

            {/* Bottom navigation links */}
            <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
              <button
                onClick={() => onNavigate('prev')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => setIsEditing(true)}
                className="hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1 text-purple-400/90"
              >
                <Edit3 className="w-3 h-3" />
                <span>Editar este recuerdo</span>
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onNavigate('next')}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          /* --- INLINE EDIT MODE --- */
          <div className="w-full space-y-4 pt-4 select-text">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">
                Personalizar este momento para Jess
              </h3>
            </div>

            {/* Title Input */}
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Título del recuerdo:
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Ej. Tarde de risas en el parque..."
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-400 font-medium"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Mensaje o anécdota real de la foto:
              </label>
              <textarea
                rows={4}
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                placeholder="Escribe lo que realmente pasó ese día o tu dedicatoria para ella..."
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-400 leading-relaxed font-sans"
              />
            </div>

            {/* Image Selector Grid from uploaded photos */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-purple-300 block">
                  Selecciona la foto correcta de tus imágenes:
                </label>
                <label className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-slate-200 border border-white/15 flex items-center gap-1 cursor-pointer">
                  <Upload className="w-3 h-3" />
                  <span>Subir otra foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo selector gallery grid */}
              <div className="flex items-center gap-2.5 overflow-x-auto p-2 bg-black/50 border border-white/10 rounded-2xl max-w-full">
                {AVAILABLE_PHOTOS.map((photoPath, idx) => {
                  const isSelected = editImage === photoPath;
                  return (
                    <button
                      key={`photo-${idx}`}
                      type="button"
                      onClick={() => setEditImage(photoPath)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-slate-900 ${
                        isSelected
                          ? 'border-purple-400 ring-2 ring-purple-400/50 scale-105'
                          : 'border-white/15 opacity-70 hover:opacity-100 hover:border-white/40'
                      }`}
                    >
                      <img
                        src={photoPath}
                        alt={`Opción ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Current chosen image preview */}
              <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-black border border-white/20 shrink-0">
                  <img
                    src={editImage}
                    alt="Seleccionada"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-medium text-white">Foto seleccionada</p>
                  <p className="text-[11px] text-slate-400">
                    Se mostrará completa sin recortar en la postal
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-xs font-medium text-white shadow-lg shadow-purple-900/50 flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar cambios</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
