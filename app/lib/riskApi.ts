const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface RiskScoreResponse {
  risk_score: number;
  level: "Low" | "Medium" | "High" | "Critical";
  model_version: string;
  last_updated: string;
  risk_score_raw: number;
  cell_id: string;
  feature_source: {
    crime_count: "exact" | "cell_hour" | "cell_mean" | "global";
    crime_count_value: number;
    cell_known: boolean;
    in_coverage_area: boolean;
  };
  warnings: string[];
}

export interface BatchResultItem {
  status: string;
  index: number;
  risk_score?: number;
  level?: string;
  error?: string;
  detail?: string;
}

export interface BatchResponse {
  count: number;
  succeeded: number;
  failed: number;
  model_version: string;
  latency_ms: number;
  results: BatchResultItem[];
}

export async function getRiskScore(
  lat: number,
  lon: number,
  datetime: string
): Promise<RiskScoreResponse> {
  const url = `${API_URL}/risk-score?lat=${lat}&lon=${lon}&datetime=${encodeURIComponent(datetime)}`;
  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Gagal ambil risk score");
  }
  return res.json();
}

export interface BatchPoint {
  lat: number;
  lon: number;
  datetime: string;
}

export async function getRiskScoreBatch(points: BatchPoint[]): Promise<BatchResponse> {
  const res = await fetch(`${API_URL}/risk-score/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: points }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || `Gagal ambil risk score batch (status ${res.status})`);
  }
  return res.json();
}

export function mapRiskLevel(level: RiskScoreResponse["level"]): "Rendah" | "Sedang" | "Tinggi" {
  if (level === "Low") return "Rendah";
  if (level === "Medium") return "Sedang";
  return "Tinggi"; // High & Critical dianggap Tinggi di UI ini
}