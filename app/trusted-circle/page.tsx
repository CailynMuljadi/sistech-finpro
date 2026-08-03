import Footer from "@/components/Footer";

import {
  Users,
  ShieldCheck,
  BellRing,
} from "lucide-react";

export default function TrustedCirclePage() {
  return (
    <>
      

      <main className="min-h-screen bg-gradient-to-br from-[#FFF8FC] via-[#FFF2F8] to-[#FFEAF4]">

        {/* HERO */}
        <section className="max-w-7xl mx-auto px-6 pt-16">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-[#ce0088]">
              Trusted Circle
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-primary">
              Tetap Terhubung Dengan
              <br />
              Orang Yang Kamu Percaya.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Trusted Circle membantu orang terdekat mengetahui bahwa kamu sedang
              melakukan perjalanan. Jika kamu lupa melakukan check-in,
              SafeStep akan mengirimkan notifikasi secara otomatis.
            </p>

            <button className="mt-8 rounded-xl bg-primary px-7 py-3 font-semibold text-white transition hover:opacity-90">
              Tambah Trusted Contact
            </button>

          </div>

        </section>

        {/* SUMMARY */}

        <section className="max-w-7xl mx-auto px-6 py-12">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">

              <Users className="text-[#ce0088]" />

              <p className="mt-4 text-sm text-slate-500">
                Trusted Contact
              </p>

              <h2 className="mt-2 text-3xl font-bold text-primary">
                2
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Kontak aktif siap digunakan.
              </p>

            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">

              <ShieldCheck className="text-[#ce0088]" />

              <p className="mt-4 text-sm text-slate-500">
                Status
              </p>

              <h2 className="mt-2 text-xl font-bold text-primary">
                Belum Ada Perjalanan
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Mulai perjalanan untuk mengaktifkan Check-in Timer.
              </p>

            </div>

            <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">

              <BellRing className="text-[#ce0088]" />

              <p className="mt-4 text-sm text-slate-500">
                Notifikasi
              </p>

              <h2 className="mt-2 text-xl font-bold text-primary">
                Siap Digunakan
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Alert akan dikirim ke Trusted Contact bila diperlukan.
              </p>

            </div>

          </div>

        </section>

        {/* PLACEHOLDER */}

        <section className="max-w-7xl mx-auto px-6 pb-20">

          <div className="rounded-3xl border border-pink-100 bg-white p-14 shadow-sm text-center">

            <h2 className="text-3xl font-bold text-primary">
              Trusted Contact
            </h2>

            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Pada tahap berikutnya halaman ini akan berisi daftar Trusted
              Contact, pengaturan perjalanan, serta Check-in Timer.
            </p>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}