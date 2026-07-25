import React from 'react';
import { Lock } from 'lucide-react';

export const PrivacyDisclaimer: React.FC = () => (
  <div
    style={{
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '0.65rem 0.85rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}
  >
    <Lock size={16} color="#2563eb" style={{ flexShrink: 0 }} />
    <span style={{ fontSize: '0.78rem', color: '#475569' }}>
      <strong>100% Anonymous:</strong> No user accounts, IP logs, or personal metadata captured.
    </span>
  </div>
);