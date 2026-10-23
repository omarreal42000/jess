export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  x: number; // percentage 5 - 95
  y: number; // percentage 10 - 90
  category: 'Llamadas' | 'Risas' | 'Aventuras' | 'Momentos' | 'Eventos' | 'Logros' | 'Especial' | 'Cumpleaños';
  isCore?: boolean;
  notes?: string;
  isFavorite?: boolean;
}

export type CategoryFilter = 'Todas' | 'Llamadas' | 'Risas' | 'Aventuras' | 'Eventos' | 'Logros' | 'Especial';
