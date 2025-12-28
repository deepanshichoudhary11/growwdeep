'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Plus } from 'lucide-react';
import { useDashboardStore } from '../store/useDashboardStore';
import ThemeToggle from '../components/ui/ThemeToggle';
import AddWidgetModal from '../components/Modals/AddWidgetModal';

// Disabling SSR for the grid fixes the infinite loading
const WidgetGrid = dynamic(() => Promise.resolve(({ widgets }: any) => {
  const WidgetCard = require('../components/Widgets/WidgetCard').default;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((w: any) => <WidgetCard key={w.id} widget={w} />)}
    </div>
  );
}), { ssr: false });

export default function Home() {
  const { widgets } = useDashboardStore();
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white dark:bg-black" />;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black p-6 md:p-10 transition-colors">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-gray-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Groww Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-all"
            >
              + Add Widget
            </button>
          </div>
        </header>

        {widgets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-slate-800 rounded-3xl">
            <p className="text-gray-400">Your dashboard is empty. [cite: 93]</p>
          </div>
        ) : (
          <WidgetGrid widgets={widgets} />
        )}
      </div>
      {showModal && <AddWidgetModal onClose={() => setShowModal(false)} />}
    </main>
  );
}