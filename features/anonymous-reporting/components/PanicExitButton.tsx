import React from 'react';
import { X } from 'lucide-react';

interface PanicExitButtonProps {
  onExit?: () => void;
}

export const PanicExitButton: React.FC<PanicExitButtonProps> = ({ onExit }) => {
  const handlePanic = () => {
    if (onExit) onExit();
    window.location.href = 'https://www.google.com';
  };

  return (
    <button
      type="button"
      onClick={handlePanic}
      style={{
        backgroundColor: '#ce0088',
        color: '#ffffff',
        border: 'none',
        padding: '0.5rem 0.9rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.8rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        transition: 'opacity 0.2s ease'
      }}
    >
      <X size={16} /> Quick Exit
    </button>
  );
};