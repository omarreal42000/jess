import React, { useState, useEffect } from 'react';
import { Memory } from '../types/galaxy';
import { X, Upload, Check, Trash2, Image, Sparkles } from 'lucide-react';

interface MemoryEditorModalProps {
  isOpen: boolean;
  editingMemory: Memory | null;
  onClose: () => void;
  onSave: (memory: Memory) => void;
  onDelete?: (id: string) => void;
}

export const MemoryEditorModal: React.FC<MemoryEditorModalProps> = ({
  isOpen,
  editingMemory,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Partial<Memory>>({
    title: '',
    date: '',
    description: '',
    image: '',
    category: 'Momentos',
    x: 50,
    y: 50,
    notes: ''
  });

  useEffect(() => {
    if (editingMemory) {
      setFormData(editingMemory);
    } else {
      setFormData({
        id: `mem-${Date.now()}`,
        title: '',
        date: 'Constelación Nueva · Órbita 00',
        description: '',
        image: '/assets/aistudio/jess13_ad180d37.jpg',
        category: 'Momentos',
        x: Math.floor(Math.random() * 60 + 20),
        y: Math.floor(Math.random() * 60 + 20),
        notes: ''
      });
    }
  }, [editingMemory]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      if (typeof event.target?.result === 'string') {
        setFormData(prev => ({ ...prev, image: event.target?.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    onSave({
      id: formData.id || `mem-${Date.now()}`,
      title: formData.title,
      date: formData.date || 'Constelación Reciente',
      description: formData.description,
      image: formData.image || 'https://placehold.co/400x400/1e1b4b/c084fc?text=Foto',
      x: Number(formData.x) || 50,
      y: Number(formData.y) || 50,
      category: formData.category || 'Momentos',
      isCore: formData.isCore || false,
      notes: formData.notes || ''
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-white/20 p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-semibold text-white">
              {editingMemory ? 'Personalizar Recuerdo' : 'Agregar Nueva Estrella'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-mono text-purple-300 block mb-1">
              Título del recuerdo:
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej. Tarde de risas en el cine"
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Date / Coordinate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Coordenada o Fecha:
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                placeholder="Ej. 14 de Febrero o Sector Alfa"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Categoría:
              </label>
              <select
                value={formData.category}
                onChange={e =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Memory['category']
                  })
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                <option value="Llamadas">Llamadas</option>
                <option value="Risas">Risas</option>
                <option value="Aventuras">Aventuras</option>
                <option value="Momentos">Momentos</option>
                <option value="Eventos">Eventos</option>
                <option value="Logros">Logros</option>
                <option value="Especial">Especial</option>
                <option value="Cumpleaños">Cumpleaños</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-mono text-purple-300 block mb-1">
              Mensaje o descripción inolvidable:
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Escribe lo que este momento significa para ti y para ella..."
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-400 leading-relaxed"
            />
          </div>

          {/* Image URL & File Upload */}
          <div>
            <label className="text-xs font-mono text-purple-300 block mb-1">
              Imagen del Recuerdo:
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={formData.image}
                onChange={e =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Ruta local (/assets/aistudio/...) o URL web"
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-purple-400"
              />
              <label className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-200 flex items-center gap-1.5 cursor-pointer shrink-0">
                <Upload className="w-3.5 h-3.5" />
                <span>Subir archivo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Thumbnail Preview */}
            {formData.image && (
              <div className="flex items-center gap-3 p-2 rounded-xl bg-black/40 border border-white/10">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 border border-white/20 shrink-0">
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/100x100/1e1b4b/c084fc?text=Foto';
                    }}
                  />
                </div>
                <div className="text-xs text-slate-400">
                  <p className="text-slate-200 font-medium">Vista previa</p>
                  <p className="text-[11px] truncate max-w-xs">{formData.image}</p>
                </div>
              </div>
            )}
          </div>

          {/* Galaxy Coordinates (Position in space) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Posición Horizontal X ({formData.x}%):
              </label>
              <input
                type="range"
                min="8"
                max="92"
                value={formData.x}
                onChange={e =>
                  setFormData({ ...formData, x: Number(e.target.value) })
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-purple-300 block mb-1">
                Posición Vertical Y ({formData.y}%):
              </label>
              <input
                type="range"
                min="12"
                max="88"
                value={formData.y}
                onChange={e =>
                  setFormData({ ...formData, y: Number(e.target.value) })
                }
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {editingMemory && onDelete && !editingMemory.isCore ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(editingMemory.id);
                  onClose();
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar estrella</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-slate-300 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-xs font-medium text-white shadow-lg shadow-purple-900/40 flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Guardar Estrella</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
