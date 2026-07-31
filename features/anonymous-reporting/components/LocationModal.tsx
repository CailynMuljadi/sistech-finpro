import React, { useState } from 'react';
import { MapPin, AlertTriangle, Plus, Minus } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocationName: string;
  onSelectLocation: (address: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocationName,
  onSelectLocation
}) => {
  const [selectedAddress, setSelectedAddress] = useState(
    currentLocationName || 'Jl. Sudirman No. 12, Jakarta Pusat'
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 39, 77, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '700px',
          width: '100%',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#17274d', margin: '0 0 1.25rem' }}>
          Pilih Lokasi Secara Manual
        </h2>

        {/* Warning Callout Box */}
        <div
          style={{
            border: '1px dashed #cbd5e1',
            borderRadius: '6px',
            padding: '0.75rem 1rem',
            backgroundColor: '#ffeff7',
            color: '#17274d',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}
        >
          <AlertTriangle size={16} color="#ce0088" />
          <span>Kami tidak dapat mendeteksi lokasi Anda. Silakan pilih lokasi kejadian secara manual</span>
        </div>

        {/* Interactive Map Visual */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#17274d', textTransform: 'uppercase' }}>
              Lokasi Kejadian
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Gunakan Kontrol Peta
            </span>
          </div>

          <div
            style={{
              position: 'relative',
              height: '260px',
              backgroundColor: '#ffeff7',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Grid background */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(#17274d 0.75px, transparent 0.75px)',
                backgroundSize: '16px 16px',
                opacity: 0.15
              }}
            />

            {/* Map Zoom Controls */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '4px'
              }}
            >
              <button type="button" style={{ border: 'none', background: 'none', padding: '6px', cursor: 'pointer' }}>
                <Plus size={14} color="#17274d" />
              </button>
              <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />
              <button type="button" style={{ border: 'none', background: 'none', padding: '6px', cursor: 'pointer' }}>
                <Minus size={14} color="#17274d" />
              </button>
            </div>

            {/* Center Pin */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <MapPin size={32} color="#ce0088" fill="#ffeff7" />
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ce0088',
                  borderRadius: '50%',
                  marginTop: '-4px'
                }}
              />
            </div>

            {/* Drag Hint Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.7rem',
                color: '#64748b',
                fontWeight: '600',
                letterSpacing: '0.04em'
              }}
            >
              • GESER PIN UNTUK MENYESUAIKAN LOKASI
            </div>
          </div>
        </div>

        {/* Location Address Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#17274d', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Lokasi Terpilih
          </label>
          <div style={{ position: 'relative' }}>
            <MapPin size={16} color="#ce0088" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.65rem 0.65rem 2.2rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                color: '#17274d',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Modal Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => onSelectLocation(selectedAddress)}
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: '#17274d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            PILIH LOKASI INI
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              padding: '0.9rem',
              backgroundColor: '#ffeff7',
              color: '#17274d',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            BATAL
          </button>
        </div>
      </div>
    </div>
  );
};