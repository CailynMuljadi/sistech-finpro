'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export type TripStatus = 'active' | 'grace' | 'alerted' | 'confirmed';

export interface Trip {
  status: TripStatus;
  duration: number; // menit, dipilih saat mulai
  destination: string;
  startTime: number; // epoch ms
  endTime: number; // epoch ms, bergeser saat extend
  confirmedAt: number | null;
  alertedAt: number | null;
}

const STORAGE_KEY = 'trusted_circle_trip';
const STORAGE_KEY_COUNT = 'trusted_circle_trip_count';
const GRACE_PERIOD_SECONDS = 5 * 60;

function loadTrip(): Trip | null {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

function loadCompletedCount(): number {
  if (typeof window === 'undefined') return 0;
  const saved = localStorage.getItem(STORAGE_KEY_COUNT);
  return saved ? parseInt(saved, 10) || 0 : 0;
}

function saveTrip(trip: Trip | null) {
  if (typeof window === 'undefined') return;
  if (trip) localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
  else localStorage.removeItem(STORAGE_KEY);
}

function saveCompletedCount(count: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_COUNT, count.toString());
}

export function formatClock(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}

export function formatWIB(ts: number) {
  return (
    new Date(ts).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) + ' WIB'
  );
}

export function useTripTimer() {
  const [trip, setTrip] = useState<Trip | null>(loadTrip);
  const [now, setNow] = useState(() => Date.now());
  const [completedTripsCount, setCompletedTripsCount] = useState<number>(loadCompletedCount);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // auto transisi active, grace, alerted berdasarkan waktu
  useEffect(() => {
    if (!trip || trip.status === 'confirmed' || trip.status === 'alerted') return;
    const remaining = Math.floor((trip.endTime - now) / 1000);

    let nextStatus: TripStatus | null = null;
    if (remaining <= 0) {
      nextStatus = 'alerted';
    } else if (remaining <= GRACE_PERIOD_SECONDS && trip.status === 'active') {
      nextStatus = 'grace';
    }

    if (nextStatus && nextStatus !== trip.status) {
      const id = setTimeout(() => {
        const updated: Trip = {
          ...trip,
          status: nextStatus!,
          alertedAt: nextStatus === 'alerted' ? Date.now() : trip.alertedAt,
        };
        setTrip(updated);
        saveTrip(updated);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [now, trip]);

  const startTrip = useCallback((durationMinutes: number, destination: string) => {
    const start = Date.now();
    const newTrip: Trip = {
      status: 'active',
      duration: durationMinutes,
      destination,
      startTime: start,
      endTime: start + durationMinutes * 60 * 1000,
      confirmedAt: null,
      alertedAt: null,
    };
    setTrip(newTrip);
    saveTrip(newTrip);
  }, []);

  const extendTime = useCallback((minutes: number) => {
    setTrip((prev) => {
      if (!prev || prev.status === 'alerted' || prev.status === 'confirmed') return prev;
      const updated: Trip = { ...prev, endTime: prev.endTime + minutes * 60 * 1000, status: 'active' };
      saveTrip(updated);
      return updated;
    });
  }, []);

  const confirmSafe = useCallback(() => {
    setTrip((prev) => {
      if (!prev) return prev;
      const updated: Trip = { ...prev, status: 'confirmed', confirmedAt: Date.now() };
      saveTrip(updated);
      if (prev.status !== 'confirmed') {
        setCompletedTripsCount((c) => {
          const next = c + 1;
          saveCompletedCount(next);
          return next;
        });
      }

      return updated;
    });
  }, []);

  const resetTrip = useCallback(() => {
    setTrip(null);
    saveTrip(null);
  }, []);

  const remainingSeconds = trip ? Math.max(0, Math.floor((trip.endTime - now) / 1000)) : 0;

  return {
    trip,
    remainingSeconds,
    remainingLabel: formatClock(remainingSeconds),
    startTrip,
    extendTime,
    confirmSafe,
    resetTrip,
    completedTripsCount, 
  };
}