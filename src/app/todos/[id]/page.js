import Link from "next/link";

export default async function TodoDetailPage({ params }) {
  // Di Next.js 15 & 16, params adalah Promise sehingga di-await
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl space-y-6 py-10 px-4">
      <div className="space-y-2">
        <span className="rounded-md bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700">
          Dynamic Route: /todos/[id]
        </span>
        <h1 className="text-3xl font-bold text-gray-900">
          Detail Tugas ID: <span className="text-purple-600">#{id}</span>
        </h1>
        <p className="text-gray-600">
          Halaman ini menangkap nilai URL dinamis melalui segmen{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-purple-600">
            [id]
          </code>
          .
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-xs space-y-3">
        <h2 className="font-semibold text-gray-800">Coba Ganti URL di Browser:</h2>
        <p className="text-sm text-gray-600">
          Ubah angka atau kata di akhir URL, misalnya:
        </p>
        <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
          <li>
            <Link href="/todos/belajar-next" className="hover:underline">
              /todos/belajar-next
            </Link>
          </li>
          <li>
            <Link href="/todos/buat-kopi" className="hover:underline">
              /todos/buat-kopi
            </Link>
          </li>
          <li>
            <Link href="/todos/99" className="hover:underline">
              /todos/99
            </Link>
          </li>
        </ul>
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
