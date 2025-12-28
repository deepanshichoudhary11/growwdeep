import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Widget {
  id: string;
  name: string;
  apiUrl: string;
  refreshInterval: number;
  displayMode: 'Card' | 'Table';
  selectedFields: string[]; // Supports Dynamic Data Mapping 
}

interface DashboardState {
  widgets: Widget[];
  addWidget: (widget: Widget) => void;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: [],
      addWidget: (widget) => set((state) => ({ widgets: [...state.widgets, widget] })),
      removeWidget: (id) => set((state) => ({ widgets: state.widgets.filter(w => w.id !== id) })),
      updateWidget: (id, updates) => set((state) => ({
        widgets: state.widgets.map(w => w.id === id ? { ...w, ...updates } : w)
      })),
    }),
    { name: 'growwdeep-storage' }
  )
);