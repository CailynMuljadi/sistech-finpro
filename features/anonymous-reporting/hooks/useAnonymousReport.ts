'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { AnonymousReportFormData } from '../types';
import { submitAnonymousReport } from '../services/reportApi';

const INITIAL_STATE: AnonymousReportFormData = {
  category: '',
  latitude: '',
  longitude: '',
  locationName: '',
  isFuzzy: true,
  timestamp: new Date().toISOString().slice(0, 16),
  description: '',
  evidenceFile: null, // <-- Optional property initialized to null
};

export function useAnonymousReport() {
  const [formData, setFormData] = useState<AnonymousReportFormData>(INITIAL_STATE);
  const [loadingLoc, setLoadingLoc] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const formatCoord = (val: string | number, fuzzy: boolean): string => {
    if (!val) return '';
    return fuzzy ? Number(val).toFixed(3) : Number(val).toFixed(6);
  };

  const updateFormField = (fields: Partial<AnonymousReportFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetForm = () => {
    setFormData({
      ...INITIAL_STATE,
      timestamp: new Date().toISOString().slice(0, 16)
    });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: formatCoord(pos.coords.latitude, prev.isFuzzy),
          longitude: formatCoord(pos.coords.longitude, prev.isFuzzy)
        }));
        setLoadingLoc(false);
      },
      () => {
        alert('Could not detect location. Please type manually.');
        setLoadingLoc(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleToggleFuzzy = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isFuzzy: checked,
      latitude: formatCoord(prev.latitude, checked),
      longitude: formatCoord(prev.longitude, checked)
    }));
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await submitAnonymousReport(formData);
      setStatus('success');
      resetForm();
    } catch (err) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    loadingLoc,
    submitting,
    status,
    updateFormField,
    resetForm,
    handleGetLocation,
    handleToggleFuzzy,
    handleSubmit
  };
}