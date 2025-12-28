'use client';
import { useEffect, useState } from 'react';
import { Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import get from 'lodash/get';

export default function WidgetCard({ widget }: { widget: any }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const removeWidget = useDashboardStore((state) => state.removeWidget);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(widget.apiUrl);
      if (!res.ok) throw new Error('API Error or Rate Limit exceeded');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Handles automatic data refresh with configurable intervals 
    const interval = setInterval(fetchData, widget.refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [widget.apiUrl, widget.refreshInterval]);

  return (
    <div className="p-4 rounded-xl border bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        {/* User-defined widget titles [cite: 101] */}
        <h3 className="font-bold text-gray-700 dark:text-white">{widget.name}</h3>
        <button onClick={() => removeWidget(widget.id)} className="text-red-500 hover:text-red-700 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Handling of loading and error states  */}
      {loading && !data ? (
        <div className="flex items-center gap-2 text-gray-500 animate-pulse">
          <RefreshCw size={14} className="animate-spin" /> Fetching real-time data...
        </div>
      ) : error ? (
        <div className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle size={14} /> {error}
        </div>
      ) : (
        <div className="space-y-2">
          {/* Dynamic Data Mapping: Displaying specific selected fields  */}
          {widget.selectedFields.map((path: string) => (
            <div key={path} className="flex justify-between border-b dark:border-slate-800 pb-1">
              <span className="text-xs text-gray-400 uppercase font-medium">{path.split('.').pop()}</span>
              <span className="font-mono text-green-600 dark:text-green-400 font-bold">
                {String(get(data, path) || 'N/A')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}