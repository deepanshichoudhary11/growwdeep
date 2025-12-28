'use client';
import { useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { v4 as uuidv4 } from 'uuid';

export default function AddWidgetModal({ onClose }: { onClose: () => void }) {
  const addWidget = useDashboardStore((state) => state.addWidget);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://api.coinbase.com/v2/exchange-rates?currency=BTC');

  const submit = (e: React.FormEvent) => {
  e.preventDefault();
  addWidget({
    id: uuidv4(),
    name: name || 'New Widget',
    apiUrl: url,
    refreshInterval: parseInt(interval),
    selectedFields: fields.split(',').map(f => f.trim()),
    displayMode: 'card' // Add this line to fix the Type Error
  });
  onClose();
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-96 border border-gray-700">
        <h2 className="text-white text-xl mb-4 font-bold">Add Finance Widget [cite: 38]</h2>
        <form onSubmit={submit} className="space-y-4">
          <input 
            className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
            placeholder="Widget Name (e.g. Bitcoin) [cite: 39]" 
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded"
            placeholder="API URL [cite: 43]" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 text-gray-400">Cancel [cite: 51]</button>
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded">Add [cite: 52]</button>
          </div>
        </form>
      </div>
    </div>
  );
}