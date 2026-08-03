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
    <div className="min-h-screen bg-[#ffeff7] px-3 sm:px-6 py-6 sm:py-12 font-sans overflow-x-hidden text-[#17274d]">
      <div className="max-w-[1100px] mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-10 box-border overflow-x-hidden">
        
        {/* Header Section */}
        <div className="mb-6 border-b border-[#ffeff7] pb-4">
          <h1 className="text-xl sm:text-3xl font-bold text-[#17274d] m-0 flex items-center gap-2.5">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-[#ce0088] shrink-0" /> 
            <span>Anonymous Reporting</span>
          </h1>
        </div>

        {/* Security Banner */}
        <PrivacyDisclaimer />

        {/* Error Message */}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl mb-6 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> 
            <span>Submission failed. Please try again.</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleFormSubmit} className="space-y-6">
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
            className={`
              w-full py-4 px-6 bg-[#17274d] text-white border-none rounded-xl 
              font-bold text-sm tracking-wider uppercase transition mt-6
              ${submitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:bg-[#17274d]/90'}
            `}
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