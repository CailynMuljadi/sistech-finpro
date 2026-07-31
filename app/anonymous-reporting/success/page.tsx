'use client';

import React from 'react';
import { Check, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ReportingSuccessPage() {
  const router = useRouter();

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
          padding: '3rem 2.5rem',
          textAlign: 'center'
        }}
      >
        {/* Success Icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: '2px solid #17274d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}
        >
          <Check size={36} color="#17274d" />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#17274d', margin: '0 0 0.75rem' }}>
          Laporan Berhasil Dikirim
        </h1>

        {/* Status Pill */}
        <div style={{ display: 'inline-block', marginBottom: '2.5rem' }}>
          <span
            style={{
              border: '1px solid #cbd5e1',
              padding: '0.35rem 1rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.05em',
              color: '#64748b',
              textTransform: 'uppercase'
            }}
          >
            • PENDING REVIEW
          </span>
        </div>

        {/* Thank You Box */}
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#17274d', margin: '0 0 0.5rem', fontWeight: '700' }}>
            Terima kasih telah melaporkan insiden
          </h3>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
            Laporan Anda berhasil kami terima dan saat ini sedang menunggu proses peninjauan oleh tim kami sebelum digunakan untuk meningkatkan keamanan komunitas.
          </p>
        </div>

        {/* Privacy Note */}
        <div
          style={{
            backgroundColor: '#ffeff7',
            border: '1px dashed #ce0088',
            borderRadius: '8px',
            padding: '1rem',
            textAlign: 'left',
            marginBottom: '2rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }}
        >
          <Info size={18} color="#ce0088" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.8rem', color: '#17274d', lineHeight: '1.4' }}>
            <strong>PRIVASI ANDA TETAP AMAN</strong>
            <br />
            • IDENTITAS ANDA TIDAK DISIMPAN • LAPORAN DIKIRIM SECARA ANONIM • INFORMASI HANYA DIGUNAKAN UNTUK PROSES VERIFIKASI
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
          {/* 👇 Updated to redirect to dashboard */}
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#17274d',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            KEMBALI KE BERANDA
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/anonymous-reporting')}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#ffffff',
              color: '#17274d',
              border: '1px solid #17274d',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            BUAT LAPORAN BARU
          </button>
        </div>

        {/* Next Steps */}
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '1.5rem',
            textAlign: 'left',
            backgroundColor: '#fafafa'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Info size={14} /> APA YANG TERJADI SELANJUTNYA?
          </div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#17274d', fontSize: '0.85rem', lineHeight: '1.8' }}>
            <li>Laporan Anda akan ditinjau oleh admin.</li>
            <li>Jika valid, laporan akan digunakan untuk memperbarui data keamanan komunitas.</li>
            <li>Terima kasih telah membantu menciptakan lingkungan yang lebih aman.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}