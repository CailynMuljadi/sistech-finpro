import React from 'react';
import { Lock } from 'lucide-react';

export const PrivacyDisclaimer: React.FC = () => (
  <div
    style={{
      backgroundColor: '#ffeff7',
      border: '1px solid #ffeff7',
      borderRadius: '8px',
      padding: '0.85rem 1rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem'
    }}
  >
    <Lock size={18} color="#ce0088" style={{ flexShrink: 0 }} />
    <span style={{ fontSize: '0.85rem', color: '#17274d' }}>
      <strong>Identitas kamu akan tetap anonim dan tidak disimpan:</strong> No user accounts, IP logs, or personal metadata captured.
    </span>
  </div>
);