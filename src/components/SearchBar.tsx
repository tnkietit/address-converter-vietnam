import { useState, useEffect, useRef } from 'react';
import type { Province } from '../types/address';
import { AddressMapper } from '../utils/addressMapper';

interface SearchBarProps {
  mapper: AddressMapper;
  isOldAddress: boolean;
  onSelect: (province: Province) => void;
  placeholder?: string;
}

export function SearchBar({ mapper, isOldAddress, onSelect, placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Province[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const results = mapper.searchProvinces(query, isOldAddress);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, mapper, isOldAddress]);

  const handleSelect = (province: Province) => {
    setQuery(province.name);
    setShowSuggestions(false);
    onSelect(province);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder={placeholder || 'Tìm kiếm...'}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((province) => (
            <button
              key={province.id}
              onClick={() => handleSelect(province)}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="font-medium text-gray-800">{province.name}</div>
              <div className="text-sm text-gray-500">Mã: {province.code}</div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-gray-500">
          Không tìm thấy kết quả
        </div>
      )}
    </div>
  );
}
