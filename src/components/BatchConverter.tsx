import { useState } from 'react';
import { parseCSV, CSVRow } from "../utils/csvParser";

import type { ConversionResult } from '../types/address';
import { AddressMapper } from '../utils/addressMapper';
import { CSVParser, type CSVRow } from '../utils/csvParser';
import { ResultCard } from './ResultCard';

interface BatchConverterProps {
  mapper: AddressMapper;
}

export function BatchConverter({ mapper }: BatchConverterProps) {
  const [direction, setDirection] = useState<'old-to-new' | 'new-to-old'>('old-to-new');
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ConversionResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleConvert = () => {
    if (!inputText.trim()) return;

    setProcessing(true);
    
    try {
      const rows = CSVParser.parseCSV(inputText);
      const conversionResults: ConversionResult[] = [];

      for (const row of rows) {
        if (direction === 'old-to-new') {
          const result = mapper.convertOldToNew(row.provinceId);
          if (result) conversionResults.push(result);
        } else {
          const resultList = mapper.convertNewToOld(row.provinceId);
          conversionResults.push(...resultList);
        }
      }

      setResults(conversionResults);
    } catch (error) {
      alert('Lỗi khi xử lý dữ liệu. Vui lòng kiểm tra định dạng.');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (results.length === 0) return;

    const csvContent = CSVParser.resultsToCSV(results, direction);
    const filename = `chuyen-doi-${direction}-${new Date().getTime()}.csv`;
    CSVParser.downloadCSV(csvContent, filename);
  };

  const handleReset = () => {
    setInputText('');
    setResults([]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chuyển đổi Hàng loạt
          </h1>
          <p className="text-gray-600">
            Upload CSV hoặc paste nhiều địa chỉ cùng lúc
          </p>
        </div>

        {/* Direction Toggle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => setDirection(direction === 'old-to-new' ? 'new-to-old' : 'old-to-new')}
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

        {/* Input Area */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nhập dữ liệu (CSV format: Mã Tỉnh, Tên Tỉnh)
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="01, Hà Nội\n79, TP. Hồ Chí Minh\n..."
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleConvert}
            disabled={!inputText.trim() || processing}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {processing ? 'Đang xử lý...' : 'Chuyển đổi'}
          </button>
          
          {results.length > 0 && (
            <>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                ⬇️ Tải CSV
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Làm mới
              </button>
            </>
          )}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Kết quả ({results.length} bản ghi)
              </h2>
            </div>
            
            <div className="max-h-[600px] overflow-y-auto space-y-4">
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  result={result}
                  direction={direction}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
