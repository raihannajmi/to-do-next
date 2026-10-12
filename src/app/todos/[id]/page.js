import Link from "next/link";

export default async function TodoDetailPage({ params }) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Dynamic Route: /todos/[id]
        </span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Detail Tugas: <span className="font-mono text-slate-600 dark:text-slate-300">#{id}</span>
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Halaman ini menangkap nilai parameter URL secara dinamis di server Next.js.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Contoh Parameter URL Lainnya
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Klik tautan berikut untuk melihat rute dinamis mengekstrak parameter berbeda:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li>
              <Link href="/todos/1" className="font-medium text-slate-900 underline hover:text-slate-600 dark:text-slate-100">
                /todos/1
              </Link>
            </li>
            <li>
              <Link href="/todos/belajar-server-actions" className="font-medium text-slate-900 underline hover:text-slate-600 dark:text-slate-100">
                /todos/belajar-server-actions
              </Link>
            </li>
          </ul>
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
