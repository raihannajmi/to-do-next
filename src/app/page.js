import Link from "next/link";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 py-10 px-4">
      {/* Bagian Header / Intro */}
      <section className="space-y-3">
        <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          Server Component (Default)
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Selamat Datang di Next.js! 👋
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Halaman ini (<code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm font-mono text-gray-800">src/app/page.js</code>) 
          dirender langsung di server sebelum dikirimkan ke browsermu dalam bentuk HTML utuh.
        </p>
      </section>

      {/* Bagian Demonstrasi Client Component */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-800">
          1. Demonstrasi Client Component
        </h2>
        <p className="text-sm text-gray-600">
          Komponen di bawah ini menggunakan directive{" "}
          <code className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">"use client"</code>{" "}
          dan hook <code className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">useState</code> untuk membuat interaksi tombol:
        </p>
        <Counter />
      </section>

      {/* Bagian Navigasi & Dynamic Route */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">
          2. Uji Coba Navigasi Antar Halaman
        </h2>
        <p className="text-sm text-gray-600">
          Next.js menggunakan komponen <code className="font-mono text-xs bg-gray-200 px-1 py-0.5 rounded">&lt;Link&gt;</code>{" "}
          agar perpindahan rute berlangsung instan tanpa reload halaman:
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/about"
            className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-blue-500 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
              Halaman Tentang Kami →
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Static Route: <code className="font-mono">src/app/about/page.js</code>
            </p>
          </Link>

          <Link
            href="/todos/belajar-next"
            className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-purple-500 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
              Detail Todo (Dinamis) →
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Dynamic Route: <code className="font-mono">src/app/todos/[id]/page.js</code>
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
