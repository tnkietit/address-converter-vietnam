import type { ConversionResult } from '../types/address';

interface ResultCardProps {
  result: ConversionResult;
  direction: 'old-to-new' | 'new-to-old';
}

export function ResultCard({ result, direction }: ResultCardProps) {
  const isChange = !result.note.includes('Không có thay đổi');

  return (
    <div className={`border-2 rounded-lg p-6 ${
      isChange ? 'border-orange-300 bg-orange-50' : 'border-green-300 bg-green-50'
    }`}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Old Address */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-600">
            📅 Địa chỉ cũ (Trước 12/6/2025)
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-lg font-semibold text-gray-800">
              {result.oldAddress.name}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Mã: {result.oldAddress.code}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>

        {/* New Address */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-600">
            🆕 Địa chỉ mới (Từ 12/6/2025)
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-lg font-semibold text-gray-800">
              {result.newAddress.name}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Mã: {result.newAddress.code}
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      {result.note && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 mt-0.5">ℹ️</span>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Ghi chú:</span> {result.note}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
