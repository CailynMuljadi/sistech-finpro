import { AnonymousReportFormData, ReportPayload, ApiResponse } from '../types';

/**
 * Submits an anonymous report payload.
 */
export async function submitAnonymousReport(
  formData: AnonymousReportFormData
): Promise<ApiResponse<ReportPayload>> {
  if (!formData.category) {
    throw new Error('Category is required');
  }

  const payload: ReportPayload = {
    category: formData.category,
    description: formData.description.trim() || null,
    location_name: formData.locationName.trim() || null,
    latitude: parseFloat(formData.latitude),
    longitude: parseFloat(formData.longitude),
    incident_timestamp: new Date(formData.timestamp).toISOString(),
    submitted_at: new Date().toISOString()
  };

  // MOCK NETWORK LATENCY (1.2 sec)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  console.log('🚀 [TSX Mock Service] Submitted Payload:', payload);
  return { success: true, data: payload };

  /* 
  // REAL BACKEND ENDPOINT INTEGRATION:
  const response = await fetch('/api/reports/anonymous', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('Submission failed');
  return await response.json();
  */
}