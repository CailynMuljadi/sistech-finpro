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
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        border: 'none',
        padding: '0.4rem 0.65rem',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.2rem'
      }}
    >
      <X size={14} /> Quick Exit
    </button>
  );
};