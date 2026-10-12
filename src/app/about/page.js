import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 py-10 px-4">
      <div className="space-y-2">
        <span className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
          Static Route: /about
        </span>
        <h1 className="text-3xl font-bold text-gray-900">
          Tentang Proyek Ini 📖
        </h1>
        <p className="text-gray-600">
          Halaman ini dibuat hanya dengan menambahkan folder{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-purple-600">
            src/app/about/page.js
          </code>
          .
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <h2 className="font-semibold text-gray-800">Kenapa URL ini bekerja?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Di Next.js App Router, setiap folder yang memiliki file bernama{" "}
          <code className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">page.js</code>{" "}
          secara otomatis menjadi halaman publik yang dapat diakses melalui browser.
        </p>
      </div>

      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
