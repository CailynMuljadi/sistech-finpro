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
  onChange,
}) => (
  <div style={{ marginBottom: '1.5rem', width: '100%' }}>
    <style>{`
      .location-top-row {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
        margin-bottom: 0.5rem;
      }
      .location-btn-group {
        display: flex;
        gap: 0.5rem;
        width: 100%;
      }
      .location-input-wrapper {
        position: relative;
        width: 100%;
      }
      
      /* Desktop Layout (640px and wider) */
      @media (min-width: 640px) {
        .location-top-row {
          flex-direction: row;
          margin-bottom: 0.75rem;
        }
        .location-input-wrapper {
          flex: 1;
        }
        .location-btn-group {
          width: auto;
        }
      }
    `}</style>

    <label
      style={{
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '700',
        color: '#17274d',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem',
      }}
    >
      Lokasi Kejadian
    </label>

    {/* TOP ROW: Input + Buttons (Stacked 2 rows on mobile, 1 row on desktop) */}
    <div className="location-top-row">
      {/* Mobile Row 1 / Desktop Left Item: Location Name Input */}
      <div className="location-input-wrapper">
        <MapPin
          size={18}
          color="#ce0088"
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          type="text"
          placeholder="Jl. Sudirman No. 12, Jakarta Pusat"
          value={locationName}
          onChange={(e) => onChange({ locationName: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem 0.75rem 0.75rem 2.4rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            color: '#17274d',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Mobile Row 2 / Desktop Right Item: Action Buttons */}
      <div className="location-btn-group">
        <button
          type="button"
          onClick={onGetLocation}
          disabled={loadingLoc}
          style={{
            flex: 1,
            padding: '0.65rem 0.85rem',
            backgroundColor: '#ffeff7',
            color: '#ce0088',
            border: '1px solid #ce0088',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.8rem',
            cursor: loadingLoc ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
          }}
        >
          <Navigation size={14} style={{ flexShrink: 0 }} />
          <span>{loadingLoc ? 'Detecting...' : 'Deteksi Auto'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenModal}
          style={{
            flex: 1,
            padding: '0.65rem 0.85rem',
            backgroundColor: '#17274d',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
          }}
        >
          <Edit3 size={14} style={{ flexShrink: 0 }} />
          <span>Ubah Manual</span>
        </button>
      </div>
    </div>

    {/* Mobile Row 3 / Desktop Bottom Row: Latitude & Longitude Inputs */}
    <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginBottom: '0.75rem' }}>
      <input
        type="number"
        step="any"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => onChange({ latitude: e.target.value })}
        style={{
          flex: 1,
          padding: '0.5rem 0.6rem',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '0.8rem',
          boxSizing: 'border-box',
          minWidth: 0,
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
          padding: '0.5rem 0.6rem',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '0.8rem',
          boxSizing: 'border-box',
          minWidth: 0,
        }}
      />
    </div>

    {/* Checkbox Row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="checkbox"
        id="fuzzyToggle"
        checked={isFuzzy}
        onChange={(e) => onToggleFuzzy(e.target.checked)}
        style={{ accentColor: '#ce0088', cursor: 'pointer' }}
      />
      <label
        htmlFor="fuzzyToggle"
        style={{
          fontSize: '0.75rem',
          color: '#17274d',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <EyeOff size={14} color="#ce0088" /> Blur exact coordinates (~100m radius)
      </label>
    </div>
  </div>
);