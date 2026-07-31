import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface IncidentDetailsProps {
  timestamp: string;
  description: string;
  onChange: (fields: { timestamp?: string; description?: string; evidenceFile?: File | null }) => void;
}

export const IncidentDetails: React.FC<IncidentDetailsProps> = ({
  timestamp,
  description,
  onChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
          Waktu Kejadian
        </label>
        <input
          type="datetime-local"
          value={timestamp}
          onChange={(e) => onChange({ timestamp: e.target.value })}
          required
          style={{
            maxWidth: '360px',
            width: '100%',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.9rem',
            color: '#17274d',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box'
          }}
        />
      </div>

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
          Deskripsi
        </label>
        <textarea
          rows={4}
          placeholder="Tuliskan detail kejadian tanpa menyertakan nama pribadi..."
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            fontSize: '0.9rem',
            color: '#17274d',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <label
            style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#17274d',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Bukti
          </label>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#ffeff7', color: '#ce0088', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
            OPTIONAL
          </span>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#fafafa',
            cursor: 'pointer',
            transition: 'border-color 0.2s ease'
          }}
        >
          <Upload size={28} color="#ce0088" style={{ marginBottom: '0.5rem' }} />
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#17274d', fontWeight: '500' }}>
            Upload Photo or Video
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              onChange({ evidenceFile: file });
            }}
          />
        </div>
      </div>
    </>
  );
};