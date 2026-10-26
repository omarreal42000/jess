import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GalaxyCanvas } from './components/GalaxyCanvas';
import { CelestialNode } from './components/CelestialNode';
import { ConstellationLines } from './components/ConstellationLines';
import { MemoryModal } from './components/MemoryModal';
import { CosmicLetterModal } from './components/CosmicLetterModal';
import { MemoryEditorModal } from './components/MemoryEditorModal';
import { MemoryOrganizerModal } from './components/MemoryOrganizerModal';
import { CosmicControls } from './components/CosmicControls';
import { GithubSyncModal } from './components/GithubSyncModal';
import { INITIAL_MEMORIES, INITIAL_DEDICATION_LETTER } from './data/initialMemories';
import { Memory, CategoryFilter } from './types/galaxy';
import { cosmicAudio } from './utils/audio';
import { saveMemoriesToDisk } from './utils/syncMemories';

const CENTER_STAR: Memory = {
  id: 'mem-18',
  title: '¡Feliz Cumpleaños, Jess!',
  date: 'Estrella Central',
  description: 'El legendario pastel de Barbie y la sonrisa más hermosa para celebrar tu vida. ¡Feliz Cumpleaños!',
  image: '/assets/aistudio/imagen_2026-10-23_000802387_c51f9a34.png',
  x: 50,
  y: 50,
  category: 'Cumpleaños',
  isCore: true,
  notes: 'La estrella más brillante de toda la galaxia. ¡Feliz día!'
};

function loadSavedMemories(): Memory[] {
  // Purge legacy storage keys so older sessions never overwrite canonical code
  const legacyKeys = [
    'jess_galaxy_memories_v6',
    'jess_galaxy_memories_v5',
    'jess_galaxy_memories_v4',
    'jess_galaxy_memories_v3',
    'jess_galaxy_memories_v2',
    'jess_galaxy_memories',
    'galaxy_memories',
    'jess_memories',
    'memories',
    'memories_data'
  ];
  for (const k of legacyKeys) {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  }

  try {
    const saved = localStorage.getItem('jess_galaxy_memories_v7');
    if (saved) {
      const parsed: Memory[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback to initial
  }
  return INITIAL_MEMORIES;
}

function loadSavedLetter(): typeof INITIAL_DEDICATION_LETTER {
  const legacyKeys = [
    'jess_galaxy_letter_v6',
    'jess_galaxy_letter_v5',
    'jess_galaxy_letter_v4',
    'jess_galaxy_letter_v3',
    'jess_galaxy_letter_v2',
    'jess_galaxy_letter',
    'galaxy_letter',
    'jess_letter',
    'letter_data'
  ];
  for (const k of legacyKeys) {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  }

  try {
    const saved = localStorage.getItem('jess_galaxy_letter_v7');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {
    // fallback to initial
  }
  return INITIAL_DEDICATION_LETTER;
}

export default function App() {
  // Memories state with robust multi-key persistence
  const [memories, setMemories] = useState<Memory[]>(loadSavedMemories);

  // Dedication letter state
  const [letterData, setLetterData] = useState(loadSavedLetter);

  // Sync notification toast
  const [syncToast, setSyncToast] = useState<string | null>(null);

  // UI States
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');
  const [showConstellations, setShowConstellations] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const [tourIndex, setTourIndex] = useState<number>(-1);

  const tourTimerRef = useRef<number | null>(null);

  // Auto-sync on mount and whenever memories change
  useEffect(() => {
    try {
      localStorage.setItem('jess_galaxy_memories_v7', JSON.stringify(memories));
      saveMemoriesToDisk(memories, letterData)
        .then(ok => {
          if (ok) {
            setSyncToast('Guardado en código para GitHub');
            setTimeout(() => setSyncToast(null), 3500);
          }
        })
        .catch(() => {});
    } catch {
      // ignore
    }
  }, [memories, letterData]);

  // Save letter to localStorage
  const handleSaveLetter = (data: typeof INITIAL_DEDICATION_LETTER) => {
    setLetterData(data);
    try {
      localStorage.setItem('jess_galaxy_letter_v7', JSON.stringify(data));
    } catch {
      // ignore
    }
  };

  const handleResetLetter = () => {
    setLetterData(INITIAL_DEDICATION_LETTER);
    try {
      localStorage.setItem(
        'jess_galaxy_letter_v7',
        JSON.stringify(INITIAL_DEDICATION_LETTER)
      );
    } catch {
      // ignore
    }
  };

  const handleResetAllData = () => {
    if (
      window.confirm(
        '¿Deseas restaurar todas las estrellas y fotos a la configuración original de la galaxia?'
      )
    ) {
      setMemories(INITIAL_MEMORIES);
      setLetterData(INITIAL_DEDICATION_LETTER);
      localStorage.removeItem('jess_galaxy_memories_v7');
      localStorage.removeItem('jess_galaxy_letter_v7');
      saveMemoriesToDisk(INITIAL_MEMORIES, INITIAL_DEDICATION_LETTER).catch(() => {});
      cosmicAudio.playStarChime(1.1);
    }
  };

  // Toggle ambient music
  const handleToggleMusic = () => {
    const status = cosmicAudio.toggleMusic();
    setIsMusicPlaying(status);
  };

  // Filter memories by category
  const filteredMemories = memories.filter(m => {
    if (selectedCategory === 'Todas') return true;
    return m.category === selectedCategory;
  });

  // Modal navigation (Previous / Next)
  const handleNavigateModal = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedMemory) return;
      const currentIndex = memories.findIndex(m => m.id === selectedMemory.id);
      if (currentIndex === -1) return;

      let nextIndex =
        direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      if (nextIndex >= memories.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = memories.length - 1;

      setSelectedMemory(memories[nextIndex]);
      cosmicAudio.playStarChime(memories[nextIndex].isCore ? 1.25 : 1.0);
    },
    [memories, selectedMemory]
  );

  // Update a single memory
  const handleUpdateMemory = (updated: Memory) => {
    setMemories(prev =>
      prev.map(m => (m.id === updated.id ? updated : m))
    );
    if (selectedMemory && selectedMemory.id === updated.id) {
      setSelectedMemory(updated);
    }
  };

  // Save from editor modal (Add or Update)
  const handleSaveFromEditor = (savedMemory: Memory) => {
    setMemories(prev => {
      const exists = prev.some(m => m.id === savedMemory.id);
      if (exists) {
        return prev.map(m => (m.id === savedMemory.id ? savedMemory : m));
      } else {
        return [...prev, savedMemory];
      }
    });
    if (selectedMemory && selectedMemory.id === savedMemory.id) {
      setSelectedMemory(savedMemory);
    }
  };

  // Delete a memory
  const handleDeleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    if (selectedMemory?.id === id) {
      setSelectedMemory(null);
    }
  };

  // Open editor for a memory
  const handleOpenEditor = (memory: Memory) => {
    setEditingMemory(memory);
    setIsEditorOpen(true);
  };

  const handleOpenNewMemory = () => {
    setEditingMemory(null);
    setIsEditorOpen(true);
  };

  // Tour Mode (Automatic Cosmic Journey)
  const handleToggleTour = () => {
    if (isTourPlaying) {
      setIsTourPlaying(false);
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    } else {
      setIsTourPlaying(true);
      // Auto start ambient music if not already playing
      if (!isMusicPlaying) {
        cosmicAudio.startMusic();
        setIsMusicPlaying(true);
      }
      setTourIndex(0);
      setSelectedMemory(memories[0]);
      cosmicAudio.playStarChime(1.0);
    }
  };

  useEffect(() => {
    if (isTourPlaying) {
      tourTimerRef.current = window.setInterval(() => {
        setTourIndex(prev => {
          const next = prev + 1;
          if (next >= memories.length) {
            setIsTourPlaying(false);
            if (tourTimerRef.current) clearInterval(tourTimerRef.current);
            return -1;
          }
          setSelectedMemory(memories[next]);
          cosmicAudio.playStarChime(memories[next].isCore ? 1.25 : 1.0);
          return next;
        });
      }, 5500);
    } else {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    }

    return () => {
      if (tourTimerRef.current) clearInterval(tourTimerRef.current);
    };
  }, [isTourPlaying, memories]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#01020a] select-none text-slate-100 font-sans">
      {/* 1. Dynamic Galaxy Background Canvas */}
      <GalaxyCanvas interactive={true} />

      {/* 2. Constellation Connecting Lines */}
      <ConstellationLines
        memories={filteredMemories}
        visible={showConstellations}
      />

      {/* 3. Celestial Star Nodes Container */}
      <div className="absolute inset-0 pointer-events-auto">
        {filteredMemories.map((memory, index) => (
          <CelestialNode
            key={memory.id}
            memory={memory}
            index={index}
            isActive={selectedMemory?.id === memory.id}
            isFocusedInTour={isTourPlaying && memories[tourIndex]?.id === memory.id}
            onSelect={mem => {
              if (isTourPlaying) setIsTourPlaying(false);
              setSelectedMemory(mem);
            }}
          />
        ))}
      </div>

      {/* 4. Top Minimal Header */}
      <CosmicControls
        isTourPlaying={isTourPlaying}
        onToggleTour={handleToggleTour}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenLetter={() => setIsLetterOpen(true)}
        onOpenOrganizer={() => setIsOrganizerOpen(true)}
        onOpenSaveToGithub={() => setIsGithubModalOpen(true)}
      />

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-medium shadow-lg backdrop-blur-md flex items-center gap-2 animate-fadeIn pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{syncToast}</span>
        </div>
      )}

      {/* 5. Memory Presentation Modal (Postal Completa con Modo Edición) */}
      <MemoryModal
        memory={selectedMemory}
        memories={memories}
        onClose={() => {
          setSelectedMemory(null);
          if (isTourPlaying) setIsTourPlaying(false);
        }}
        onNavigate={handleNavigateModal}
        onUpdateMemory={handleUpdateMemory}
      />

      {/* 6. Heartfelt Dedicated Cosmic Letter Modal */}
      <CosmicLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        letterData={letterData}
        onSaveLetter={handleSaveLetter}
        onResetLetter={handleResetLetter}
      />

      {/* 7. Memory & Photo Customizer Modal */}
      <MemoryEditorModal
        isOpen={isEditorOpen}
        editingMemory={editingMemory}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveFromEditor}
        onDelete={handleDeleteMemory}
      />

      {/* 8. Visual Memory Organizer (Ver y editar todas las 18 estrellas) */}
      <MemoryOrganizerModal
        isOpen={isOrganizerOpen}
        onClose={() => setIsOrganizerOpen(false)}
        memories={memories}
        onSelectToEdit={mem => {
          setSelectedMemory(mem);
        }}
      />

      {/* 9. GitHub Sync & Code Export Modal */}
      <GithubSyncModal
        isOpen={isGithubModalOpen}
        onClose={() => setIsGithubModalOpen(false)}
        memories={memories}
        letterData={letterData}
      />
    </div>
  );
}
