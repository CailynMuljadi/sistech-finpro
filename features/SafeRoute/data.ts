export interface RouteData {
  id: number;

  recommended: boolean;

  origin: string;

  destination: string;

  path: string;

  duration: string;

  distance: string;

  risk: 'Rendah' | 'Sedang' | 'Tinggi';

  safePoint: number;
}

export const routes: RouteData[] = [
  {
    id: 1,
    recommended: true,

    origin: 'Jl. Basuki Rahmat No.18, Surabaya',

    destination: 'Tunjungan Plaza',

    path:
      'Jl. Basuki Rahmat → Jl. Embong Malang',

    duration: '25 menit',

    distance: '4,2 KM',

    risk: 'Rendah',

    safePoint: 3,
  },

  {
    id: 2,
    recommended: false,

    origin: 'Jl. Basuki Rahmat No.18, Surabaya',

    destination: 'Tunjungan Plaza',

    path:
      'Jl. Kedungdoro → Jl. Blauran',

    duration: '28 menit',

    distance: '4,5 KM',

    risk: 'Sedang',

    safePoint: 2,
  },

  {
    id: 3,
    recommended: false,

    origin: 'Jl. Basuki Rahmat No.18, Surabaya',

    destination: 'Tunjungan Plaza',

    path:
      'Jl. Panglima Sudirman',

    duration: '30 menit',

    distance: '4,8 KM',

    risk: 'Rendah',

    safePoint: 1,
  },
];