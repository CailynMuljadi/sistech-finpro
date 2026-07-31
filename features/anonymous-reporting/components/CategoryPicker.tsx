import React from 'react';
import { IncidentCategory, CategoryOption } from '../types';

const CATEGORIES: CategoryOption[] = [
  { id: 'catcalling', label: 'Catcalling' },
  { id: 'following', label: 'Diikuti' },
  { id: 'physical_contact', label: 'Kontak Fisik' },
  { id: 'verbal_harassment', label: 'Pelecehan / Ancaman' },
  { id: 'poor_lighting', label: 'Area Minim Penerangan' },
  { id: 'other', label: 'Lainnya' }
];

interface CategoryPickerProps {
  value: IncidentCategory | '';
  onChange: (category: IncidentCategory) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ value, onChange }) => (
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
      Incident Category
    </label>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {CATEGORIES.map((cat) => {
        const isSelected = value === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id as IncidentCategory)}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '6px',
              border: isSelected ? '2px solid #ce0088' : '1px solid #cbd5e1',
              backgroundColor: isSelected ? '#ffeff7' : '#ffffff',
              color: isSelected ? '#ce0088' : '#17274d',
              fontWeight: isSelected ? '600' : '400',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  </div>
);