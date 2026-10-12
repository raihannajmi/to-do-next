import Link from "next/link";

export const metadata = {
  title: "Tentang Aplikasi | To-Do Next",
  description: "Arsitektur dan penjelasan teknis aplikasi To-Do Next.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Tentang Aplikasi To-Do Next
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Dibangun sebagai wadah belajar memahami arsitektur Next.js secara mendalam dan terstruktur.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Arsitektur yang Digunakan
          </h2>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <p>
              • <strong className="text-slate-800 dark:text-slate-200">Next.js 16 App Router:</strong> Menggunakan struktur folder di dalam <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">src/app</code> untuk menentukan halaman dan URL secara otomatis.
            </p>
            <p>
              • <strong className="text-slate-800 dark:text-slate-200">Server Component:</strong> Komponen halaman (<code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">page.js</code>) dan tata letak (<code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">layout.js</code>) dirender pertama kali di server untuk kecepatan muat awal.
            </p>
            <p>
              • <strong className="text-slate-800 dark:text-slate-200">Client Component:</strong> Komponen <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">TodoApp.js</code> menggunakan directive <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs text-slate-800 dark:bg-slate-800 dark:text-slate-200">"use client"</code> untuk menangani interaksi pengguna seperti penambahan tugas, filter, dan penyimpanan data lokal.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Langkah Pembelajaran Selanjutnya
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-slate-400">
            Setelah menguasai Client Component dan tata letak dasar, kita akan melangkah ke materi lanjutan: Server Actions (mutasi data langsung di server), integrasi database SQLite atau PostgreSQL, Route Handlers (API), dan otentikasi.
          </p>
        </section>

        <div>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-slate-900 hover:underline dark:text-slate-100"
          >
            ← Kembali ke Daftar Tugas
          </Link>
        </div>
      </div>
    </main>
  );
}
