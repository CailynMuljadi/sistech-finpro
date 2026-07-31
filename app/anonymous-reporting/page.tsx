'use client';

import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { PrivacyDisclaimer } from '@/features/anonymous-reporting/components/PrivacyDisclaimer';
import { CategoryPicker } from '@/features/anonymous-reporting/components/CategoryPicker';
import { LocationPicker } from '@/features/anonymous-reporting/components/LocationPicker';
import { LocationModal } from '@/features/anonymous-reporting/components/LocationModal';
import { IncidentDetails } from '@/features/anonymous-reporting/components/IncidentDetails';
import { useAnonymousReport } from '@/features/anonymous-reporting/hooks/useAnonymousReport';

export default function AnonymousReportingPage() {
  const router = useRouter();
  const {
    formData,
    loadingLoc,
    submitting,
    status,
    updateFormField,
    handleGetLocation,
    handleToggleFuzzy,
    handleSubmit
  } = useAnonymousReport();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e);
    // Automatically redirect to the dedicated success page
    router.push('/anonymous-reporting/success');
  };

  return (
    <div
      style={{
        backgroundColor: '#ffeff7',
        minHeight: '100vh',
        padding: '3rem 1.5rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(23, 39, 77, 0.08)',
          padding: '2.5rem',
          boxSizing: 'border-box'
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ffeff7', paddingBottom: '1rem' }}>
          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#17274d',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            <Shield size={28} color="#ce0088" /> Anonymous Reporting
          </h1>
        </div>

        {/* Security Banner */}
        <PrivacyDisclaimer />

        {/* Error Message */}
        {status === 'error' && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <AlertCircle size={18} /> Submission failed. Please try again.
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleFormSubmit}>
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
            onOpenModal={() => setIsModalOpen(true)}
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
              padding: '1.1rem',
              backgroundColor: '#17274d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '1rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1,
              marginTop: '1.5rem'
            }}
          >
            {submitting ? 'Sending Report...' : 'Kirim'}
          </button>
        </form>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLocationName={formData.locationName}
        onSelectLocation={(selectedAddress) => {
          updateFormField({ locationName: selectedAddress });
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}