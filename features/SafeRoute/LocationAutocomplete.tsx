'use client';

import { useState, useEffect, useRef } from 'react';
import { searchSuggestions, PlaceSuggestion, LatLng } from '@/app/lib/mapApi';

interface Props {
  value: string;
  placeholder?: string;
  biasCoord?: LatLng;
  onChange: (value: string) => void;
  onSelectPlace: (place: PlaceSuggestion) => void;
}

export function LocationAutocomplete({
  value,
  placeholder,
  biasCoord,
  onChange,
  onSelectPlace,
}: Props) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleInputChange(text: string) {
    onChange(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const results = await searchSuggestions(text, biasCoord);
      setSuggestions(results);
      setShowDropdown(true);
      setLoading(false);
    }, 400);
  }

  function handleSelect(place: PlaceSuggestion) {
    onChange(place.label);
    onSelectPlace(place);
    setShowDropdown(false);
    setSuggestions([]);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        placeholder={placeholder}
        className="w-full rounded-lg border bg-[#fff6f6] px-4 py-3"
        autoComplete="off"
      />

      {showDropdown && (loading || suggestions.length > 0) && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-pink-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-400">Mencari lokasi...</div>
          )}
          {!loading &&
            suggestions.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-3 text-sm hover:bg-pink-50 border-b border-pink-100 last:border-b-0 transition"
              >
                {s.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}