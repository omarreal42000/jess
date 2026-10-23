import React from 'react';
import { Memory } from '../types/galaxy';
import { X, Edit3, Sparkles } from 'lucide-react';

interface MemoryOrganizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: Memory[];
  onSelectToEdit: (memory: Memory) => void;
}

export const MemoryOrganizerModal: React.FC<MemoryOrganizerModalProps> = ({
  isOpen,
  onClose,
  memories,
  onSelectToEdit
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl transition-all duration-300 animate-in fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-white/20 p-5 sm:p-8 shadow-2xl text-slate-100 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-semibold text-white">
              Organizador de Recuerdos ({memories.length} estrellas)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-4">
          Haz clic en cualquier recuerdo para cambiar su foto, ponerle el título real y escribirle el mensaje auténtico que deseas para ella.
        </p>

        {/* Grid of All Memories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 overflow-y-auto pr-1">
          {memories.map((mem, index) => (
            <div
              key={mem.id}
              onClick={() => {
                onSelectToEdit(mem);
                onClose();
              }}
              className="group relative p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer flex flex-col gap-2.5"
            >
              {/* Photo Thumbnail */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/70 border border-white/10 flex items-center justify-center">
                <img
                  src={mem.image}
                  alt={mem.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-mono text-purple-300 border border-white/10">
                  Estrella {index + 1}
                </span>
              </div>

              {/* Title & Preview */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                  {mem.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {mem.description}
                </p>
              </div>

              {/* Edit Button */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-purple-300">
                <span className="flex items-center gap-1 group-hover:underline">
                  <Edit3 className="w-3 h-3" /> Editar texto y foto
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
