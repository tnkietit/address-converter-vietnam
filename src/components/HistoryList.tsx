import { useEffect, useState } from 'react';
import type { ConversionResult } from '../types/address';
import { ResultCard } from './ResultCard';

interface HistoryItem {
  id: string;
  timestamp: number;
  direction: 'old-to-new' | 'new-to-old';
  result: ConversionResult;
}

const STORAGE_KEY = 'address-conversion-history';
const MAX_HISTORY = 50;

export function HistoryList() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'old-to-new' | 'new-to-old'>('all');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const items = JSON.parse(stored) as HistoryItem[];
        setHistory(items);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const clearHistory = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
    }
  };

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setHistory(updated);
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.direction === filter);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Lịch sử tra cứu
            </h1>
            <p className="text-gray-600">
              {history.length} lần tra cứu gần đây
            </p>
          </div>
          
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Xóa tất cả
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        {history.length > 0 && (
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter('old-to-new')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'old-to-new'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cũ → Mới
            </button>
            <button
              onClick={() => setFilter('new-to-old')}
              className={`px-4 py-2 font-medium transition-colors ${
                filter === 'new-to-old'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mới → Cũ
            </button>
          </div>
        )}

        {/* History Items */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -right-2 -top-2 z-10">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    title="Xóa"
                  >
                    ×
                  </button>
                </div>
                
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-2">
                    {new Date(item.timestamp).toLocaleString('vi-VN')}
                  </div>
                  <ResultCard
                    result={item.result}
                    direction={item.direction}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {history.length === 0 
              ? 'Chưa có lịch sử tra cứu' 
              : 'Không có kết quả phù hợp'}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to save to history
export function saveToHistory(result: ConversionResult, direction: 'old-to-new' | 'new-to-old') {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const history: HistoryItem[] = stored ? JSON.parse(stored) : [];
    
    const newItem: HistoryItem = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      direction,
      result,
    };

    const updated = [newItem, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving to history:', error);
  }
}
