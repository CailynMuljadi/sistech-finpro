import React from 'react';

interface IncidentDetailsProps {
  timestamp: string;
  description: string;
  evidenceFile?: File | null;
  onChange: (fields: { timestamp?: string; description?: string; evidenceFile?: File | null; }) => void;
}

export const IncidentDetails: React.FC<IncidentDetailsProps> = ({
  timestamp,
  description,
  onChange
}) => (
  <>
    <div style={{ marginBottom: '0.85rem' }}>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.2rem' }}>
        Incident Time <span style={{ color: '#ef4444' }}>*</span>
      </label>
      <input
        type="datetime-local"
        value={timestamp}
        onChange={(e) => onChange({ timestamp: e.target.value })}
        required
        style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', boxSizing: 'border-box' }}
      />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.2rem' }}>
        Details (Optional)
      </label>
      <textarea
        rows={2}
        placeholder="Describe situation without personal names..."
        value={description}
        onChange={(e) => onChange({ description: e.target.value })}
        style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem', boxSizing: 'border-box' }}
      />
    </div>

<div style={{ marginBottom: '0.85rem' }}>
  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.2rem' }}>
    Upload Evidence (Optional Photo/Video)
  </label>
  <input
    type="file"
    accept="image/*,video/*"
    onChange={(e) => {
      const file = e.target.files?.[0] || null;
      onChange({ evidenceFile: file });
    }}
    style={{ fontSize: '0.8rem', color: '#0f172a' }}
  />
</div>
  </>
);