export interface LatLng {
  lat: number;
  lon: number;
}

export async function geocode(query: string, biasCoord?: LatLng): Promise<LatLng | null> {
  let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

  // Bias pencarian ke area sekitar biasCoord (radius ~50km), biar "velodrome"
  // dicari di dekat lokasi user, bukan di seluruh dunia
  if (biasCoord) {
    const delta = 0.5;
    const viewbox = `${biasCoord.lon - delta},${biasCoord.lat + delta},${biasCoord.lon + delta},${biasCoord.lat - delta}`;
    url += `&viewbox=${viewbox}&bounded=1`;
  }

  const res = await fetch(url, { headers: { 'User-Agent': 'SafeStep-App' } });
  const data: { lat: string; lon: string }[] = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// Reverse geocoding: ubah koordinat jadi nama alamat, buat ditampilkan di field "Lokasi Asal"
export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'SafeStep-App' } });
  const data: { display_name?: string } = await res.json();
  return data.display_name || null;
}

// Ambil lokasi asli pengguna dari browser (GPS/network location)
export function getCurrentLocation(): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Browser tidak mendukung geolocation.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(new Error('Gagal mengambil lokasi: ' + err.message)),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
}

export interface RouteResult {
  coords: [number, number][];
  distanceKm: number;
  durationMin: number;
}

export interface RouteResult {
  coords: [number, number][];
  distanceKm: number;
  durationMin: number;
  pathLabel: string; // nama jalan-jalan yang dilewati,
}

export async function getRoute(origin: LatLng, dest: LatLng): Promise<RouteResult | null> {
  const url = `https://router.project-osrm.org/route/v1/foot/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=full&geometries=geojson&steps=true`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.routes?.length) return null;

  const route = data.routes[0];
  const coords: [number, number][] = route.geometry.coordinates.map(
    (pair: [number, number]) => [pair[1], pair[0]]
  );


  // Ambil nama jalan dari tiap step, buang yang kosong/duplikat berurutan
  const streetNames: string[] = [];
  for (const leg of route.legs || []) {
    for (const step of leg.steps || []) {
      const name = step.name?.trim();
      if (name && streetNames[streetNames.length - 1] !== name) {
        streetNames.push(name);
      }
    }
  }

  // Batasi maksimal 4 nama jalan biar nggak kepanjangan di UI
  const pathLabel =
    streetNames.length > 0
      ? streetNames.slice(0, 4).join(' → ')
      : 'Rute melalui jalan utama';

  return {
    coords,
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
    pathLabel,
  };
}

export async function getRouteAlternatives(
  origin: LatLng,
  dest: LatLng,
  maxAlternatives = 3
): Promise<RouteResult[]> {
  const url = `https://router.project-osrm.org/route/v1/foot/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=full&geometries=geojson&steps=true&alternatives=true`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.routes?.length) return [];

  return data.routes.slice(0, maxAlternatives).map((route: {
    geometry: { coordinates: [number, number][] };
    legs?: { steps?: { name?: string }[] }[];
    distance: number;
    duration: number;
  }) => {
    const coords: [number, number][] = route.geometry.coordinates.map(
      (pair: [number, number]) => [pair[1], pair[0]]
    );

    const streetNames: string[] = [];
    for (const leg of route.legs || []) {
      for (const step of leg.steps || []) {
        const name = step.name?.trim();
        if (name && streetNames[streetNames.length - 1] !== name) {
          streetNames.push(name);
        }
      }
    }

    const pathLabel =
      streetNames.length > 0
        ? streetNames.slice(0, 4).join(' → ')
        : 'Rute melalui jalan utama';

    return {
      coords,
      distanceKm: route.distance / 1000,
      durationMin: route.duration / 60,
      pathLabel,
    };
  });
}


export interface PlaceSuggestion {
  label: string;
  lat: number;
  lon: number;
}

export async function searchSuggestions(
  query: string,
  biasCoord?: LatLng
): Promise<PlaceSuggestion[]> {
  if (query.trim().length < 3) return [];

  let url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=id`;

  if (biasCoord) {
    const delta = 0.8;
    const viewbox = `${biasCoord.lon - delta},${biasCoord.lat + delta},${biasCoord.lon + delta},${biasCoord.lat - delta}`;
    url += `&viewbox=${viewbox}&bounded=1`;
  }

  const res = await fetch(url, { headers: { 'User-Agent': 'SafeStep-App' } });
  const data: { display_name: string; lat: string; lon: string }[] = await res.json();

  return data.map((d) => ({
    label: d.display_name,
    lat: parseFloat(d.lat),
    lon: parseFloat(d.lon),
  }));
}