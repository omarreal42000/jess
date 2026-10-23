import React, { useState, useEffect } from 'react';
import { X, Check, Copy, Download, Save, Github, Sparkles, AlertCircle } from 'lucide-react';
import { Memory } from '../types/galaxy';
import { saveMemoriesToDisk, downloadInitialMemoriesFile, generateInitialMemoriesTs } from '../utils/syncMemories';

interface GithubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  memories: Memory[];
  letterData: any;
}

export const GithubSyncModal: React.FC<GithubSyncModalProps> = ({
  isOpen,
  onClose,
  memories,
  letterData
}) => {
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      // Auto-trigger save to disk when modal is opened
      handleSaveNow();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveNow = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    const ok = await saveMemoriesToDisk(memories, letterData);
    setIsSaving(false);
    setSaveStatus(ok ? 'success' : 'error');
  };

  const handleCopyCode = async () => {
    const code = generateInitialMemoriesTs(memories, letterData);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    downloadInitialMemoriesFile(memories, letterData);
  };

  const codePreview = generateInitialMemoriesTs(memories, letterData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-950/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Guardar Cambios para GitHub
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Guarda tus fotos, textos, estrellas y la carta directamente en el código fuente
            </p>
          </div>
        </div>

        {/* Status banner */}
        <div className="mb-4">
          {saveStatus === 'success' ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm">
              <Check className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>¡Guardado en el código con éxito!</strong> El archivo <code className="bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">src/data/initialMemories.ts</code> tiene tus {memories.length} estrellas y la carta listas para commit en GitHub.
              </span>
            </div>
          ) : saveStatus === 'error' ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                Puedes descargar el archivo o copiar el código abajo para pegarlo en <code className="bg-amber-900/60 px-1.5 py-0.5 rounded">src/data/initialMemories.ts</code>.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/70 border border-white/10 text-slate-300 text-xs sm:text-sm">
              <Save className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />
              <span>Sincronizando tus cambios con el código del proyecto...</span>
            </div>
          )}
        </div>

        {/* Summary of what is included */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block">Estrellas totales:</span>
            <span className="text-sm font-semibold text-white">{memories.length} recuerdos</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block">Estrella Central:</span>
            <span className="text-sm font-semibold text-pink-400">
              {memories.find(m => m.isCore)?.title || 'Incluida (Centro)'}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-slate-400 block">Carta dedicatoria:</span>
            <span className="text-sm font-semibold text-amber-300">Para {letterData.recipient || 'Jess'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={handleSaveNow}
            disabled={isSaving}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
            <span>{isSaving ? 'Guardando...' : 'Re-guardar en código'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm transition-all cursor-pointer shadow-lg hover:shadow-purple-500/20 active:scale-95"
            title="Descargar initialMemories.ts a tu computadora"
          >
            <Download className="w-4 h-4" />
            <span>Descargar archivo</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 font-medium text-xs sm:text-sm transition-all cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>

        {/* Code Preview */}
        <div className="flex-1 min-h-[160px] overflow-hidden rounded-2xl bg-black/60 border border-white/10 flex flex-col">
          <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>src/data/initialMemories.ts</span>
            <span className="text-[11px] text-slate-500">TypeScript</span>
          </div>
          <div className="p-3 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300">
            <pre className="whitespace-pre-wrap">{codePreview.slice(0, 1800)}
{codePreview.length > 1800 ? '\n... (resto del código listo)' : ''}</pre>
          </div>
        </div>

        {/* GitHub Instructions footer */}
        <div className="mt-4 pt-3 border-t border-white/10 text-slate-400 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Pasos en tu terminal: <code className="bg-white/10 px-1 py-0.5 rounded text-slate-200">git add . && git commit -m "Recuerdos de Jess" && git push</code></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs self-end cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
