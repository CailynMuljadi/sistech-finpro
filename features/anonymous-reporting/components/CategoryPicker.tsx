import React from 'react';
import { IncidentCategory, CategoryOption } from '../types';

const CATEGORIES: CategoryOption[] = [
  { id: 'catcalling', label: 'Catcalling / Verbal Comments' },
  { id: 'following', label: 'Being Followed / Stalked' },
  { id: 'verbal_harassment', label: 'Harassment or Threats' },
  { id: 'physical_contact', label: 'Unwanted Physical Contact' },
  { id: 'poor_lighting', label: 'Poor Lighting / Unsafe Area' },
  { id: 'other', label: 'Other Incident' }
];

interface CategoryPickerProps {
  value: IncidentCategory | '';
  onChange: (category: IncidentCategory) => void;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ value, onChange }) => (
  <div style={{ marginBottom: '0.85rem' }}>
    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 'bold', color: '#334155', marginBottom: '0.2rem' }}>
      Incident Category <span style={{ color: '#ef4444' }}>*</span>
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as IncidentCategory)}
      required
      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', color: '#0f172a', backgroundColor:'#ffffff' }}
    >
      <option value="">-- Select category --</option>
      {CATEGORIES.map((cat) => (
        <option key={cat.id} value={cat.id}>{cat.label}</option>
      ))}
    </select>
  </div>
);