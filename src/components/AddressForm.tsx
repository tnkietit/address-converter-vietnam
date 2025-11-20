import { useState } from 'react';
import type { Province, ConversionResult } from '../types/address';
import { SearchBar } from './SearchBar';
import { ResultCard } from './ResultCard';
import { AddressMapper } from '../utils/addressMapper';

interface AddressFormProps {
  mapper: AddressMapper;
  onConvert?: (result: ConversionResult | ConversionResult[]) => void;
}

export function AddressForm({ mapper, onConvert }: AddressFormProps) {
  const [direction, setDirection] = useState<'old-to-new' | 'new-to-old'>('old-to-new');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [results, setResults] = useState<ConversionResult[]>([]);

  const handleSearch = (province: Province) => {
    setSelectedProvince(province);
    
    if (direction === 'old-to-new') {
      const result = mapper.convertOldToNew(province.id);
      if (result) {
        setResults([result]);
        onConvert?.(result);
      }
    } else {
      const resultList = mapper.convertNewToOld(province.id);
      setResults(resultList);
      onConvert?.(resultList);
    }
  };

  const handleReset = () => {
    setSelectedProvince(null);
    setResults([]);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'old-to-new' ? 'new-to-old' : 'old-to-new');
    handleReset();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Địa chỉ Hành chính Việt Nam
          </h1>
          <p className="text-gray-600">
            Chuyển đổi theo quy hoạch sắp xếp đơn vị hành chính
          </p>
        </div>

        {/* Direction Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={toggleDirection}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="font-medium">
              {direction === 'old-to-new' ? 'Cũ → Mới' : 'Mới → Cũ'}
            </span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {direction === 'old-to-new' ? 'Tìm tỉnh/thành cũ' : 'Tìm tỉnh/thành mới'}
          </label>
          <SearchBar
            mapper={mapper}
            isOldAddress={direction === 'old-to-new'}
            onSelect={handleSearch}
            placeholder="Nhập tên hoặc mã tễnh/thành phố..."
          />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Kết quả chuyển đổi
              </h2>
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Tìm kiếm mới
              </button>
            </div>
            
            {results.map((result, index) => (
              <ResultCard
                key={index}
                result={result}
                direction={direction}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {selectedProvince && results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Không tìm thấy kết quả chuyển đổi
          </div>
        )}
      </div>
    </div>
  );
}
