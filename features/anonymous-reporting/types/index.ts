export type IncidentCategory = 
  | 'catcalling'
  | 'following'
  | 'verbal_harassment'
  | 'physical_contact'
  | 'poor_lighting'
  | 'other';

export interface CategoryOption {
  id: IncidentCategory;
  label: string;
}

export interface AnonymousReportFormData {
  category: IncidentCategory | '';
  latitude: string;
  longitude: string;
  locationName: string;
  isFuzzy: boolean;
  timestamp: string;
  description: string;
}

export interface ReportPayload {
  category: IncidentCategory;
  description: string | null;
  location_name: string | null;
  latitude: number;
  longitude: number;
  incident_timestamp: string;
  submitted_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}