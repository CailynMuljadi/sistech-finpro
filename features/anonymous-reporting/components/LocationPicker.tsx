import React from 'react';
import { MapPin, EyeOff, Navigation, Edit3 } from 'lucide-react';

interface LocationPickerProps {
  latitude: string;
  longitude: string;
  locationName: string;
  isFuzzy: boolean;
  loadingLoc: boolean;
  onGetLocation: () => void;
  onOpenModal: () => void;
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
  onOpenModal,
  onToggleFuzzy,
  onChange
}) => (
  <div style={{ marginBottom: '2rem' }}>
    <label
      style={{
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '700',
        color: '#17274d',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem'
      }}
    >
      Lokasi Kejadian
    </label>

    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <MapPin
          size={18}
          color="#ce0088"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Jl. Sudirman No. 12, Jakarta Pusat"
          value={locationName}
          onChange={(e) => onChange({ locationName: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem 0.75rem 0.75rem 2.4rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.9rem',
            color: '#17274d',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Auto Detect Button */}
      <button
        type="button"
        onClick={onGetLocation}
        disabled={loadingLoc}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#ffeff7',
          color: '#ce0088',
          border: '1px solid #ce0088',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '0.85rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <Navigation size={14} />
        {loadingLoc ? 'Detecting...' : 'Deteksi Auto'}
      </button>

      {/* Manual Button */}
      <button
        type="button"
        onClick={onOpenModal}
        style={{
          padding: '0.75rem 1rem',
          backgroundColor: '#17274d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '0.85rem',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <Edit3 size={14} />
        Ubah Manual
      </button>
    </div>

    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
      <input
        type="number"
        step="any"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => onChange({ latitude: e.target.value })}
        style={{
          flex: 1,
          padding: '0.6rem',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          fontSize: '0.85rem',
          boxSizing: 'border-box'
        }}
      />
      <input
        type="number"
        step="any"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => onChange({ longitude: e.target.value })}
        style={{
          flex: 1,
          padding: '0.6rem',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          fontSize: '0.85rem',
          boxSizing: 'border-box'
        }}
      />
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="checkbox"
        id="fuzzyToggle"
        checked={isFuzzy}
        onChange={(e) => onToggleFuzzy(e.target.checked)}
        style={{ accentColor: '#ce0088' }}
      />
      <label
        htmlFor="fuzzyToggle"
        style={{ fontSize: '0.8rem', color: '#17274d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
      >
        <EyeOff size={14} color="#ce0088" /> Blur exact coordinates (~100m radius)
      </label>
    </div>
  </div>
);