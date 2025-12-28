'use client';
import { useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { v4 as uuidv4 } from 'uuid';

export default function AddWidgetModal({ onClose }: { onClose: () => void }) {
  const addWidget = useDashboardStore((state) => state.addWidget);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
  const [refreshInterval, setRefreshInterval] = useState('60');
  const [fields, setFields] = useState('data.rates.USD');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addWidget({
      id: uuidv4(),
      name: name || 'New Widget',
      apiUrl: url,
      refreshInterval: parseInt(refreshInterval),
      selectedFields: fields.split(',').map((f) => f.trim()),
      displayMode: 'card',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-slate-800">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Widget</h2>
        <form onSubmit={submit} className="space-y-4">
          <input 
            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
            placeholder="Widget Name" value={name} onChange={(e) => setName(e.target.value)} 
          />
          <input 
            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
            placeholder="API URL" value={url} onChange={(e) => setUrl(e.target.value)} 
          />
          <input 
            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
            placeholder="Refresh (seconds)" type="number" value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)} 
          />
          <input 
            className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" 
            placeholder="Fields (comma separated)" value={fields} onChange={(e) => setFields(e.target.value)} 
          />
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded-lg">Cancel</button>
            <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-bold">Add Widget</button>
          </div>
        </form>
      </div>
    </div>
  );
}