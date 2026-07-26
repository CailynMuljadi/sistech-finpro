import React from 'react';
import { MapPin, EyeOff } from 'lucide-react';

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  locationName: string;
  isFuzzy: boolean;
  loadingLoc: boolean;
  onGetLocation: () => void;
  onToggleFuzzy: (checked: boolean) => void;
  onChange: (fields: { latitude?: string; longitude?: string; locationName?: string }) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  latitude,
  longitude,
  locationName,
  isFuzzy,
  loadingLoc,
  onGetLocation,
  onToggleFuzzy,
  onChange
}) => (
  <div style={{ marginBottom: '0.85rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.4rem' }}>
      Location <span style={{ color: '#ef4444' }}>*</span>
    </label>

    <button
      type="button"
      onClick={onGetLocation}
      disabled={loadingLoc}
      style={{ width: '100%', padding: '0.45rem', backgroundColor: '#e2e8f0', color: '#1e293b', border: 'none', borderRadius: '6px', fontWeight: '500', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}
    >
      <MapPin size={14} />
      {loadingLoc ? 'Detecting GPS...' : 'Auto-Detect Current Location'}
    </button>

<button
  type="button"
  onClick={() => alert('Map Pin Picker Modal opened (Select location on map)')}
  style={{ width: '100%', padding: '0.45rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', marginTop: '0.3rem' }}
>
  🗺️ Select Location via Pin on Map
</button>

    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.4rem' }}>
      <input
        type="number"
        step="any"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => onChange({ latitude: e.target.value })}
        required
        style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
      />
      <input
        type="number"
        step="any"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => onChange({ longitude: e.target.value })}
        required
        style={{ flex: 1, padding: '0.45rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
      />
    </div>

    <input
      type="text"
      placeholder="Landmark or street name (Optional)"
      value={locationName}
      onChange={(e) => onChange({ locationName: e.target.value })}
      style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', boxSizing: 'border-box', marginBottom: '0.4rem' }}
    />

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      <input
        type="checkbox"
        id="fuzzyToggle"
        checked={isFuzzy}
        onChange={(e) => onToggleFuzzy(e.target.checked)}
      />
      <label htmlFor="fuzzyToggle" style={{ fontSize: '0.75rem', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
        <EyeOff size={12} /> Blur exact coordinates (~100m radius)
      </label>
    </div>
  </div>
);