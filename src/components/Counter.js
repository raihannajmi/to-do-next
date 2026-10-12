"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500">
          Client Component ("use client")
        </span>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          Interaktif
        </span>
      </div>
      <p className="text-xl font-bold text-gray-800">
        Jumlah Klik: <span className="text-blue-600">{count}</span>
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          Tambah (+1)
        </button>
        <button
          onClick={() => setCount(0)}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-300 active:scale-95"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
