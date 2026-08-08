'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import LocationPermissionModal from '@/components/LocationPermissionModal';

import { SafeRouteHeader } from '@/features/SafeRoute/SafeRouteHeader';
import { RouteSearchCard } from '@/features/SafeRoute/RouteSearchCard';
import { RouteResultList } from '@/features/SafeRoute/RouteResultList';
import { RouteDetail } from '@/features/SafeRoute/RouteDetail';
import { JourneyStarted } from '@/features/SafeRoute/JourneyStarted';

import { routes as dummyRoutes, RouteData } from '@/features/SafeRoute/data';
import { getRiskScoreBatch, mapRiskLevel, BatchResultItem } from '@/app/lib/riskApi';
import {
  getRouteAlternatives,
  getCurrentLocation,
  reverseGeocode,
  LatLng,
  PlaceSuggestion,
} from '@/app/lib/mapApi';

type Step = 'search' | 'result' | 'detail' | 'journey';

export default function SafeRoutePage() {
  const [showLocationModal, setShowLocationModal] = useState(true);
  const [step, setStep] = useState<Step>('search');

  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const [travelMode, setTravelMode] = useState<'now' | 'schedule'>('now');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  const [routes, setRoutes] = useState<RouteData[]>(dummyRoutes);
  const [loadingRoutes, setLoadingRoutes] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const [originCoord, setOriginCoord] = useState<[number, number] | undefined>();
  const [destCoord, setDestCoord] = useState<[number, number] | undefined>();
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  // Koordinat yang siap dipakai buat search (dari GPS atau dari dropdown pilihan)
  const [originPoint, setOriginPoint] = useState<LatLng | null>(null);
  const [destPoint, setDestPoint] = useState<LatLng | null>(null);

  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  async function requestCurrentLocation() {
    try {
      const coord = await getCurrentLocation();
      setCurrentLocation(coord);
      setOriginPoint(coord);
      setLocationError(null);

      const address = await reverseGeocode(coord.lat, coord.lon);
      if (address) setOrigin(address);
    } catch (err) {
      setLocationError(err instanceof Error ? err.message : 'Gagal mengambil lokasi.');
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function initLocation() {
      try {
        const coord = await getCurrentLocation();
        if (cancelled) return;

        setCurrentLocation(coord);
        setOriginPoint(coord);
        setLocationError(null);

        const address = await reverseGeocode(coord.lat, coord.lon);
        if (!cancelled && address) setOrigin(address);
      } catch (err) {
        if (!cancelled) {
          setLocationError(err instanceof Error ? err.message : 'Gagal mengambil lokasi.');
        }
      }
    }

    initLocation();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleOriginSelect(place: PlaceSuggestion) {
    setOrigin(place.label);
    setOriginPoint({ lat: place.lat, lon: place.lon });
  }

  function handleDestinationSelect(place: PlaceSuggestion) {
    setDestination(place.label);
    setDestPoint({ lat: place.lat, lon: place.lon });
  }

  const handleSearch = async () => {
    if (!destPoint) {
      alert('Silakan pilih tujuan dari daftar saran yang muncul.');
      return;
    }
    if (!originPoint) {
      alert('Lokasi asal belum ditemukan. Aktifkan izin lokasi atau pilih dari daftar saran.');
      return;
    }

    setLoadingRoutes(true);
    setRouteError(null);

    try {
      const alternatives = await getRouteAlternatives(originPoint, destPoint, 3);
      if (!alternatives.length) throw new Error('Rute tidak ditemukan untuk lokasi ini.');

      setOriginCoord([originPoint.lat, originPoint.lon]);
      setDestCoord([destPoint.lat, destPoint.lon]);

      const datetime =
        travelMode === 'schedule' && date && time
          ? `${date}T${time}:00`
          : new Date().toISOString().slice(0, 19);

      // Hitung risk score tiap rute alternatif secara paralel
      const routesWithRisk = await Promise.all(
        alternatives.map(async (alt) => {
          const MAX_BATCH_POINTS = 200;
          const step = Math.max(1, Math.ceil(alt.coords.length / MAX_BATCH_POINTS));
          const sampledPoints = alt.coords.filter((_, i) => i % step === 0);

          const riskBatch = await getRiskScoreBatch(
            sampledPoints.map(([lat, lon]) => ({ lat, lon, datetime }))
          );

          const validResults = riskBatch.results.filter(
            (r: BatchResultItem) => r.status !== 'error'
          );
          const avgRisk =
            validResults.reduce((sum: number, r: BatchResultItem) => sum + (r.risk_score || 0), 0) /
            (validResults.length || 1);

          return { alt, avgRisk };
        })
      );

      // Urutkan dari risiko terendah -> tertinggi
      routesWithRisk.sort((a, b) => a.avgRisk - b.avgRisk);

      const updatedRoutes: RouteData[] = routesWithRisk.map(({ alt, avgRisk }, i) => ({
        id: i + 1,
        recommended: i === 0,
        origin,
        destination,
        path: alt.pathLabel,
        distance: `${alt.distanceKm.toFixed(1)} KM`,
        duration: `${Math.round(alt.durationMin)} menit`,
        risk: mapRiskLevel(
          avgRisk >= 75 ? 'Critical' : avgRisk >= 50 ? 'High' : avgRisk >= 25 ? 'Medium' : 'Low'
        ),
        safePoint: dummyRoutes[i]?.safePoint ?? 1,
      }));

      // Rute paling direkomendasikan (index 0) yang dipakai buat preview peta
      setRouteCoords(routesWithRisk[0].alt.coords);

      setRoutes(updatedRoutes);
      setStep('result');
    } catch (err) {
      setRouteError(err instanceof Error ? err.message : 'Gagal mengambil data rute');
    } finally {
      setLoadingRoutes(false);
    }
  };

  const handleSelectRoute = (route: RouteData) => {
    setSelectedRoute(route);
    setStep('detail');
  };

  const handleStartJourney = () => setStep('journey');

  const handleFinishJourney = () => {
    setSelectedRoute(null);
    setDestination('');
    setDestPoint(null);
    setDate('');
    setTime('');
    setTravelMode('now');
    setOriginCoord(undefined);
    setDestCoord(undefined);
    setRouteCoords([]);
    setStep('search');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-[#ffeff7]">
        <LocationPermissionModal
          isOpen={showLocationModal}
          onAllow={() => {
            setShowLocationModal(false);
            requestCurrentLocation();
          }}
          onSkip={() => setShowLocationModal(false)}
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          {(step === 'search' || step === 'result') && (
            <div className="space-y-8">
              <SafeRouteHeader />

              {locationError && (
                <p className="text-sm text-orange-500">
                  {locationError} — pilih lokasi asal dari daftar saran secara manual.
                </p>
              )}

              <RouteSearchCard
                origin={origin}
                destination={destination}
                travelMode={travelMode}
                date={date}
                time={time}
                currentLocation={currentLocation}
                onOriginChange={setOrigin}
                onOriginSelect={handleOriginSelect}
                onDestinationChange={setDestination}
                onDestinationSelect={handleDestinationSelect}
                onUseCurrentLocation={requestCurrentLocation}
                onTravelModeChange={setTravelMode}
                onDateChange={setDate}
                onTimeChange={setTime}
                onSearch={handleSearch}
              />

              {loadingRoutes && <p className="text-sm text-gray-500">Menghitung rute teraman...</p>}
              {routeError && <p className="text-sm text-red-500">{routeError}</p>}

              {step === 'result' && !loadingRoutes && (
                <>
                  {routes.length === 1 && (
                    <p className="text-sm text-gray-500 mb-2">
                      Saat ini hanya ditemukan 1 rute yang tervalidasi untuk lokasi ini.
                    </p>
                  )}
                  <RouteResultList routes={routes} onSelect={handleSelectRoute} />
                </>
              )}
            </div>
          )}

          {step === 'detail' && selectedRoute && (
            <RouteDetail
              route={selectedRoute}
              originCoord={originCoord}
              destCoord={destCoord}
              routeCoords={routeCoords}
              onBack={() => setStep('result')}
              onStart={handleStartJourney}
            />
          )}

          {step === 'journey' && selectedRoute && (
            <JourneyStarted
              route={selectedRoute}
              origin={origin}
              destination={destination}
              originCoord={originCoord}
              destCoord={destCoord}
              routeCoords={routeCoords}
              onFinish={handleFinishJourney}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}