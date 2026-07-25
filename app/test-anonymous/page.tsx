'use client';

import React from 'react';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

import { PanicExitButton } from '@/features/anonymous-reporting/components/PanicExitButton';
import { PrivacyDisclaimer } from '@/features/anonymous-reporting/components/PrivacyDisclaimer';
import { CategoryPicker } from '@/features/anonymous-reporting/components/CategoryPicker';
import { LocationPicker } from '@/features/anonymous-reporting/components/LocationPicker';
import { IncidentDetails } from '@/features/anonymous-reporting/components/IncidentDetails';
import { useAnonymousReport } from '@/features/anonymous-reporting/hooks/useAnonymousReport';

export default function AnonymousReportingPage() {
  const {
    formData,
    loadingLoc,
    submitting,
    status,
    updateFormField,
    resetForm,
    handleGetLocation,
    handleToggleFuzzy,
    handleSubmit
  } = useAnonymousReport();

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        
        {/* Header & Quick Exit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a' }}>
            <Shield size={22} color="#2563eb" /> Anonymous Report
          </h2>
          <PanicExitButton onExit={resetForm} />
        </div>

        {/* Security Banner */}
        <PrivacyDisclaimer />

        {/* Status Feedback */}
        {status === 'success' && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '0.6rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle size={16} /> Report submitted securely!
          </div>
        )}
        {status === 'error' && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.6rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={16} /> Submission failed. Please try again.
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          <CategoryPicker
            value={formData.category}
            onChange={(category) => updateFormField({ category })}
          />

          <LocationPicker
            latitude={formData.latitude}
            longitude={formData.longitude}
            locationName={formData.locationName}
            isFuzzy={formData.isFuzzy}
            loadingLoc={loadingLoc}
            onGetLocation={handleGetLocation}
            onToggleFuzzy={handleToggleFuzzy}
            onChange={(locData) => updateFormField(locData)}
          />

          <IncidentDetails
            timestamp={formData.timestamp}
            description={formData.description}
            onChange={(detData) => updateFormField(detData)}
          />

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '0.65rem',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1
            }}
          >
            {submitting ? 'Submitting Anonymously...' : 'Submit Report'}
          </button>
        </form>

      </div>
    </div>
  );
}