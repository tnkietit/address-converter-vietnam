import { useState } from 'react';
import { AddressForm } from '../components/AddressForm';
import { BatchConverter } from '../components/BatchConverter';
import { HistoryList } from '../components/HistoryList';
import { useAddressMapping } from '../hooks/useAddressMapping';
import { saveToHistory } from '../components/HistoryList';
import type { ConversionResult } from '../types/address';

type TabType = 'single' | 'batch' | 'history';

export default function HomePage() {
  const { mapper, loading, error } = useAddressMapping();
  const [activeTab, setActiveTab] = useState<TabType>('single');

  const handleConvert = (result: ConversionResult | ConversionResult[], direction: 'old-to-new' | 'new-to-old') => {
    if (Array.isArray(result)) {
      result.forEach(r => saveToHistory(r, direction));
    } else {
      saveToHistory(result, direction);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !mapper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Lỗi tải dữ liệu</h2>
            <p className="text-gray-600 mb-4">{error || 'Không thể tải dữ liệu địa chỉ'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🇻🇳 Chuyển đổi Địa chỉ Việt Nam
        </h1>
        <p className="text-gray-600">
          Công cụ chuyển đổi địa chỉ hành chính theo quy hoạch mới
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('single')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'single'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔍 Tra cứu đơn
          </button>
          <button
            onClick={() => setActiveTab('batch')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'batch'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📄 Hàng loạt
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📜 Lịch sử
          </button>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'single' && (
          <AddressForm 
            mapper={mapper} 
            onConvert={(result) => {
              const direction = 'old-to-new';
              handleConvert(result, direction);
            }}
          />
        )}
        {activeTab === 'batch' && <BatchConverter mapper={mapper} />}
        {activeTab === 'history' && <HistoryList />}
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-600 text-sm">
        <p>© 2025 - Dữ liệu mang tính tham khảo, cần đối chiếu văn bản pháp lý chính thức</p>
      </footer>
    </div>
  );
}
