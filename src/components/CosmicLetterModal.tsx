import React, { useState } from 'react';
import { X, Sparkles, Edit3, Check, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cosmicAudio } from '../utils/audio';

interface CosmicLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  letterData: {
    recipient: string;
    title: string;
    subtitle: string;
    content: string;
  };
  onSaveLetter: (data: {
    recipient: string;
    title: string;
    subtitle: string;
    content: string;
  }) => void;
  onResetLetter: () => void;
}

export const CosmicLetterModal: React.FC<CosmicLetterModalProps> = ({
  isOpen,
  onClose,
  letterData,
  onSaveLetter,
  onResetLetter
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(letterData);

  React.useEffect(() => {
    setFormData(letterData);
  }, [letterData]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveLetter(formData);
    setIsEditing(false);
    cosmicAudio.playStarChime(1.2);
  };

  const handleBurst = () => {
    cosmicAudio.playStarChime(1.3);
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#c084fc', '#38bdf8', '#fbbf24', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-purple-500/30 p-6 sm:p-10 shadow-2xl shadow-purple-950/90 text-slate-100 flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{
          boxShadow: '0 0 50px rgba(168, 85, 247, 0.25), inset 0 0 30px rgba(124, 58, 237, 0.1)'
        }}
      >
        {/* Top Controls */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
              Mensaje Cósmico Dedicado
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-200 border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Carta</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar Cambios</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Letter Body */}
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Destinatario:
              </label>
              <input
                type="text"
                value={formData.recipient}
                onChange={e =>
                  setFormData({ ...formData, recipient: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Título de la Dedicatoria:
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Contenido del Mensaje / Carta:
              </label>
              <textarea
                rows={12}
                value={formData.content}
                onChange={e =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm leading-relaxed focus:outline-none focus:border-purple-400 font-sans"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  onResetLetter();
                  setIsEditing(false);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar original</span>
              </button>

              <div className="flex gap-2">
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
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs text-white font-medium cursor-pointer"
                >
                  Guardar Carta
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative space-y-6">
            {/* Celestial header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-400/25 text-purple-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Para: {letterData.recipient}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {letterData.title}
              </h2>
              <p className="text-xs font-mono text-slate-400 tracking-wider">
                {letterData.subtitle}
              </p>
            </div>

            {/* Glowing Parchment Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 text-slate-200 leading-relaxed font-light text-sm sm:text-base whitespace-pre-line space-y-4">
              {letterData.content}
            </div>

            {/* Bottom Signature & Sparkle */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleBurst}
                className="px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-300 text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-pink-400" />
                <span>Enviar destello de amor</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white text-xs font-medium cursor-pointer shadow-lg shadow-purple-900/40"
              >
                Volver al Cosmos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
