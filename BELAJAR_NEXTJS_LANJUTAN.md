# 🚀 Petualangan Lanjut: Tutorial Lengkap Aplikasi To-Do List (CRUD & Modal Terpadu)
> *Panduan belajar Next.js lanjutan dengan kode lengkap langkah demi langkah, dijelaskan secara detail dan super ramah seperti mengobrol dengan anak kelas 3 SD!*

---

## Daftar Isi Petualangan
1. [Cerita Konsep: Apa yang Sedang Kita Bangun?](#1-cerita-konsep-apa-yang-sedang-kita-bangun)
2. [Langkah 1: Membuat Modal Terpadu (src/components/TaskModal.js)](#2-langkah-1-membuat-modal-terpadu-srccomponentstaskmodaljs)
3. [Langkah 2: Membangun Otak Aplikasi To-Do (src/components/TodoApp.js)](#3-langkah-2-membangun-otak-aplikasi-to-do-srccomponentstodoappjs)
4. [Langkah 3: Menyajikan ke Halaman Utama (src/app/page.js)](#4-langkah-3-menyajikan-ke-halaman-utama-srcapppagejs)
5. [Langkah 4: Menata Gaya & Pengaman Dark Mode (src/app/globals.css)](#5-langkah-4-menata-gaya--pengaman-dark-mode-srcappglobalscss)
6. [Latihan Praktik: Uji Coba Semua Fitur di Browser](#6-latihan-praktik-uji-coba-semua-fitur-di-browser)

---

## 1. Cerita Konsep: Apa yang Sedang Kita Bangun?

Di bagian sebelumnya, kita sudah tahu dasar Next.js. Sekarang, kita menaikkan level kemampuan kita untuk membuat aplikasi pengelola tugas (*To-Do List*) yang benar-benar profesional, fungsional, dan rapi!

### 4 Jurus Utama (CRUD):
1. **C (Create - Membuat):** Menambah tugas baru lengkap dengan nama, catatan deskripsi, dan tingkat prioritas.
2. **R (Read - Membaca):** Melihat daftar tugas, memfilter tugas yang sedang aktif atau sudah selesai, dan membaca rincian lengkap tugas.
3. **U (Update - Mengubah):** Mencentang tugas yang sudah selesai, serta mengedit nama atau deskripsi tugas lewat jendela popup (*modal*).
4. **D (Delete - Menghapus):** Menghapus satu tugas dengan tombol silang, atau menghapus sekaligus semua tugas yang sudah selesai.

### Rahasia Robot 3 Kostum (Modal Terpadu):
Alih-alih membuat banyak form yang berbeda dan membingungkan, kita membuat **satu jendela popup pintar (`TaskModal.js`)** yang bisa berubah menjadi 3 bentuk:
* **Mode Create:** Formulir kosong siap diisi untuk tugas baru.
* **Mode Detail:** Meja pameran kaca untuk membaca rincian tugas tanpa sengaja terubah.
* **Mode Edit:** Meja kerja yang sudah terisi tulisan lama untuk diperbaiki.

---

## 2. Langkah 1: Membuat Modal Terpadu (`src/components/TaskModal.js`)

### Kenapa File Ini Dibuat?
File ini adalah jendela pop-up (*modal dialog*) yang melayang di tengah layar. Dia bertugas melayani tiga kebutuhan sekaligus: membuat tugas baru, mengedit tugas lama, dan memperlihatkan rincian detail tugas.

### Kode Lengkap `src/components/TaskModal.js`:

```javascript
"use client";

import { useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  mode = "create", // Pilihan mode: "create" | "edit" | "detail"
  task = null,
  onClose,
  onSave,
  onDelete,
  onSwitchToEdit,
}) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("biasa");
  const [completed, setCompleted] = useState(false);

  // Sinkronkan data form setiap kali tugas yang dipilih atau modenya berubah
  useEffect(() => {
    if (task && (mode === "edit" || mode === "detail")) {
      setText(task.text || "");
      setDescription(task.description || "");
      setPriority(task.priority || "biasa");
      setCompleted(Boolean(task.completed));
    } else {
      // Mode create: kembalikan form ke keadaan kosong
      setText("");
      setDescription("");
      setPriority("biasa");
      setCompleted(false);
    }
  }, [task, mode, isOpen]);

  // Satpam Keyboard: Tombol Escape di keyboard untuk menutup popup seketika
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Jika modal sedang ditutup, jangan gambar apa pun di layar
  if (!isOpen) return null;

  // Tangani saat tombol simpan ditekan
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (mode === "create") {
      onSave({
        id: "task-" + Date.now(),
        text: text.trim(),
        description: description.trim(),
        priority,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0],
      });
    } else if (mode === "edit" && task) {
      onSave({
        ...task,
        text: text.trim(),
        description: description.trim(),
        priority,
        completed,
      });
    }
    onClose();
  };

  // Tentukan judul jendela popup berdasarkan kostum mode yang aktif
  const getModalTitle = () => {
    if (mode === "create") return "Tambah Tugas Baru";
    if (mode === "edit") return "Edit Tugas";
    return "Detail Tugas";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Latar Belakang Gelap (Klik di sini untuk menutup popup) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Kotak Putih Utama Tempat Konten Berada */}
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-2.5 w-2.5 rounded-full ${
                mode === "create"
                  ? "bg-blue-500"
                  : mode === "edit"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
            <h2
              id="modal-title"
              className="text-lg font-bold text-slate-900 dark:text-slate-100"
            >
              {getModalTitle()}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {/* TAMPILAN KHUSUS MODE DETAIL */}
        {mode === "detail" && task ? (
          <div className="mt-5 space-y-5">
            {/* Nama Tugas */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Nama Tugas
              </span>
              <p className="mt-1 text-base font-bold text-slate-900 dark:text-slate-100">
                {task.text}
              </p>
            </div>

            {/* Deskripsi Catatan */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Deskripsi atau Catatan
              </span>
              <div className="mt-1.5 rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
                {task.description ? (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {task.description}
                  </p>
                ) : (
                  <p className="italic text-slate-400 dark:text-slate-500">
                    Tidak ada deskripsi tambahan.
                  </p>
                )}
              </div>
            </div>

            {/* Kotak Informasi Prioritas, Status, dan Tanggal */}
            <div className="grid grid-cols-3 gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 dark:border-slate-800/80 dark:bg-slate-950/40">
              <div>
                <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Prioritas
                </span>
                <span
                  className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                    task.priority === "penting"
                      ? "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300"
                      : "border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  {task.priority === "penting" ? "Penting" : "Biasa"}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Status
                </span>
                <span
                  className={`mt-1 inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${
                    task.completed
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "border border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                  }`}
                >
                  {task.completed ? "Selesai ✓" : "Belum Selesai"}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  Dibuat
                </span>
                <span className="mt-1 block font-mono text-xs text-slate-600 dark:text-slate-400">
                  {task.createdAt || "Hari ini"}
                </span>
              </div>
            </div>

            {/* Tombol Aksi Mode Detail */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  onDelete(task.id);
                  onClose();
                }}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 dark:text-rose-400 dark:hover:bg-rose-950/40"
              >
                Hapus Tugas Ini
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchToEdit(task)}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-98 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                >
                  Edit Tugas
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* TAMPILAN FORMULIR UNTUK MODE CREATE & EDIT */
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Input Nama Tugas */}
            <div>
              <label
                htmlFor="task-text-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Nama Tugas <span className="text-rose-500">*</span>
              </label>
              <input
                id="task-text-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tulis nama tugas..."
                required
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-400 dark:focus:bg-slate-950 dark:focus:ring-slate-400/20"
              />
            </div>

            {/* Textarea Deskripsi Catatan */}
            <div>
              <label
                htmlFor="task-desc-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
              >
                Deskripsi atau Catatan Tambahan
              </label>
              <textarea
                id="task-desc-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Rincian langkah, link referensi, atau catatan tugas ini..."
                className="mt-1.5 w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-400 dark:focus:bg-slate-950 dark:focus:ring-slate-400/20"
              />
            </div>

            {/* Pilihan Tingkat Prioritas dan Checkbox Selesai */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-priority-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                >
                  Tingkat Prioritas
                </label>
                <select
                  id="task-priority-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:focus:border-slate-400"
                >
                  <option value="biasa">Prioritas Biasa</option>
                  <option value="penting">Prioritas Penting</option>
                </select>
              </div>

              {mode === "edit" ? (
                <div className="flex flex-col justify-end">
                  <label className="flex h-10 cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-700 dark:text-slate-100"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Tandai Sudah Selesai
                    </span>
                  </label>
                </div>
              ) : (
                <div className="flex flex-col justify-end">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Tugas baru otomatis berstatus belum selesai.
                  </span>
                </div>
              )}
            </div>

            {/* Tombol Bawah Form */}
            <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!text.trim()}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 active:scale-98 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {mode === "create" ? "Buat Tugas" : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
```

### Bedah Kode Baris demi Baris:
* **Baris 1 (`"use client"`):** Memberitahu Next.js bahwa komponen ini butuh tombol klik dan interaksi pengguna di browser.
* **Baris 5-13 (`props: isOpen, mode, task, ...`):** Pintu masuk informasi dari luar. `isOpen` mengecek apakah jendela harus muncul, `mode` menentukan kostum apa yang dipakai (`create`, `edit`, atau `detail`).
* **Baris 14-17 (`useState`):** Kantong memori lokal untuk menampung ketikan nama tugas, deskripsi, prioritas, dan status centang.
* **Baris 20-33 (`useEffect` Sinkronisasi):** Setiap kali kamu membuka tugas lain, fungsi ini otomatis mengisi kotak input dengan data tugas yang baru dipilih.
* **Baris 36-44 (`useEffect` Satpam Escape):** Menempelkan pendengar tombol pada keyboard laptop. Begitu jari menekan `Escape`, fungsi `onClose()` dipanggil dan jendela tertutup seketika.
* **Baris 46 (`if (!isOpen) return null;`):** Jika modal ditutup, jangan gambar apa pun (hemat tenaga komputer).
* **Baris 48-71 (`handleSubmit`):** Saat tombol Simpan ditekan, fungsi ini mengemas data dan memberikannya ke fungsi `onSave`.

---

## 3. Langkah 2: Membangun Otak Aplikasi To-Do (`src/components/TodoApp.js`)

### Kenapa File Ini Dibuat?
File ini adalah meja kerja utama aplikasi. Di sinilah seluruh daftar tugas disimpan, disaring (*filter*), dimasukkan ke celengan *LocalStorage*, serta dihubungkan ke jendela modal popup.

### Kode Lengkap `src/components/TodoApp.js`:

```javascript
"use client";

import { useState, useEffect } from "react";
import TaskModal from "@/components/TaskModal";

// Data awal contoh agar web tidak langsung kosong melompong saat dibuka pertama kali
const INITIAL_TASKS = [
  {
    id: "task-1",
    text: "Memahami struktur folder App Router di Next.js",
    description: "Pelajari hubungan antara layout.js, page.js, dan folder dinamis.",
    completed: true,
    priority: "penting",
    createdAt: "2026-10-12",
  },
  {
    id: "task-2",
    text: "Memisahkan logika Server Component dan Client Component",
    description: "Ketahui kapan harus menggunakan directive 'use client' dan kapan cukup di server.",
    completed: true,
    priority: "biasa",
    createdAt: "2026-10-12",
  },
  {
    id: "task-3",
    text: "Menerapkan fitur CRUD lengkap dan popup modal seragam",
    description: "Gunakan form yang sama untuk Create, Edit, dan melihat Detail tugas.",
    completed: false,
    priority: "penting",
    createdAt: "2026-10-12",
  },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState("semua");
  const [isLoaded, setIsLoaded] = useState(false);

  // State untuk mengontrol jendela modal popup (Create, Edit, Detail)
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create", // "create" | "edit" | "detail"
    task: null,
  });

  // 1. Membaca Celengan LocalStorage saat browser pertama kali dibuka
  useEffect(() => {
    try {
      const saved = localStorage.getItem("to-do-next-tasks");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        }
      }
    } catch {
      // Jika terjadi kesalahan membaca, gunakan data contoh bawaan
    }
    setIsLoaded(true);
  }, []);

  // 2. Menyimpan ke Celengan LocalStorage setiap kali ada perubahan tugas
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("to-do-next-tasks", JSON.stringify(tasks));
      } catch {
        // Abaikan jika memori browser penuh
      }
    }
  }, [tasks, isLoaded]);

  // JURUS C (CREATE): Menambahkan tugas baru dari modal ke dalam daftar
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // JURUS U (UPDATE): Menyimpan perubahan dari modal edit ke dalam daftar
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // JURUS U (UPDATE CEPAT): Mencentang selesai dari kotak centang di kartu tugas
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // JURUS D (DELETE): Menghapus satu tugas berdasarkan ID-nya
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // JURUS D (DELETE MASSAL): Menghapus seluruh tugas yang sudah bertanda selesai
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // Hitung jumlah tugas aktif dan tugas selesai untuk angka status
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // JURUS R (READ & FILTER): Menyaring tugas sesuai tab yang dipilih
  const filteredTasks = tasks.filter((task) => {
    if (filter === "aktif") return !task.completed;
    if (filter === "selesai") return task.completed;
    return true;
  });

  // Fungsi-fungsi pembuka modal dengan kostum yang tepat
  const openCreateModal = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      task: null,
    });
  };

  const openDetailModal = (task) => {
    setModalState({
      isOpen: true,
      mode: "detail",
      task,
    });
  };

  const openEditModal = (task) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      task,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="space-y-6">
      {/* KARTU ATAS: Tombol Utama Buat Tugas Baru */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Daftar Aktivitas
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeCount === 0 && tasks.length > 0
              ? "Semua aktivitas beres! Tekan tombol untuk menambah lagi."
              : `Ada ${activeCount} aktivitas yang menunggu diselesaikan.`}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-slate-800 active:scale-98 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <span className="text-base leading-none">+</span> Tambah Tugas Baru
        </button>
      </div>

      {/* BILAH FILTER & TOMBOL PEMBERSIH */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        {/* Tab Filter: Semua, Aktif, Selesai */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setFilter("semua")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-100 ${
              filter === "semua"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            Semua ({tasks.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("aktif")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-100 ${
              filter === "aktif"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            Aktif ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("selesai")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-100 ${
              filter === "selesai"
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            }`}
          >
            Selesai ({completedCount})
          </button>
        </div>

        {/* Tombol Hapus Yang Sudah Selesai */}
        {completedCount > 0 && (
          <button
            type="button"
            onClick={clearCompleted}
            className="text-left text-xs font-medium text-rose-600 transition hover:text-rose-700 hover:underline sm:text-right dark:text-rose-400"
          >
            Hapus yang selesai ({completedCount})
          </button>
        )}
      </div>

      {/* DAFTAR TUGAS DI LAYAR */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {filter === "aktif"
                ? "Tidak ada tugas yang tertunda."
                : filter === "selesai"
                ? "Belum ada tugas yang selesai."
                : "Belum ada tugas. Tekan tombol '+ Tambah Tugas Baru' di atas."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-start justify-between gap-3 rounded-xl border p-4 transition dark:bg-slate-900 ${
                task.completed
                  ? "border-slate-200/60 bg-slate-50/70 text-slate-400 dark:border-slate-800/60 dark:bg-slate-900/40"
                  : "border-slate-200 bg-white text-slate-800 shadow-xs hover:border-slate-300 dark:border-slate-800 dark:text-slate-100"
              }`}
            >
              {/* Kotak Centang Selesai */}
              <input
                type="checkbox"
                id={task.id}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-slate-700 dark:text-slate-100"
              />

              {/* Teks Tugas (Bisa Diklik untuk Membuka Mode Detail) */}
              <div
                onClick={() => openDetailModal(task)}
                className="min-w-0 flex-1 cursor-pointer space-y-1"
                title="Klik untuk melihat detail tugas"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-sm select-none ${
                      task.completed
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : "font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400"
                    }`}
                  >
                    {task.text}
                  </span>

                  {task.priority === "penting" && (
                    <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300">
                      Penting
                    </span>
                  )}
                </div>

                {/* Potongan Deskripsi Singkat */}
                {task.description && (
                  <p
                    className={`line-clamp-2 text-xs leading-relaxed ${
                      task.completed
                        ? "line-through text-slate-400 dark:text-slate-600"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {task.description}
                  </p>
                )}
              </div>

              {/* Tombol Aksi Samping (Detail, Edit, Hapus) */}
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => openDetailModal(task)}
                  aria-label={`Lihat detail tugas: ${task.text}`}
                  className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                  Detail
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(task)}
                  aria-label={`Edit tugas: ${task.text}`}
                  className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Hapus tugas: ${task.text}`}
                  className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 dark:hover:bg-slate-800 dark:hover:text-rose-400"
                >
                  <span className="text-xs font-semibold px-1">✕</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FOOTER RINGKASAN BAWAH */}
      <footer className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>
          {activeCount === 0 && tasks.length > 0
            ? "Semua tugas selesai, kerja bagus!"
            : `${activeCount} dari ${tasks.length} tugas aktif`}
        </span>
        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-600">
          Data tersimpan di browser
        </span>
      </footer>

      {/* MEMASANG JENDELA MODAL TERPADU KE LAYAR */}
      <TaskModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        task={modalState.task}
        onClose={closeModal}
        onSave={(data) => {
          if (modalState.mode === "create") {
            handleCreateTask(data);
          } else {
            handleUpdateTask(data);
          }
        }}
        onDelete={deleteTask}
        onSwitchToEdit={(task) => {
          setModalState({
            isOpen: true,
            mode: "edit",
            task,
          });
        }}
      />
    </div>
  );
}
```

### Bedah Kode Baris demi Baris:
* **Baris 39-43 (`modalState`):** Wadah ajaib yang mencatat 3 hal: apakah popup sedang terbuka (`isOpen`), apa kostum yang sedang dipakai (`mode`), dan tugas nomor berapa yang sedang dikerjakan (`task`).
* **Baris 46-59 (`useEffect` Buka Celengan):** Begitu browser terbuka, fungsi ini mengambil data yang dulu pernah kita simpan di celengan `localStorage`.
* **Baris 62-70 (`useEffect` Simpan Celengan):** Begitu daftar `tasks` berubah (ada yang ditambah, diedit, atau dihapus), fungsi ini otomatis menyimpannya ke celengan tanpa perlu tombol "Save" terpisah.
* **Baris 114-140 (`openCreateModal`, `openDetailModal`, dll):** Kancing pengendali yang bertugas menyuruh modal terbuka dalam mode yang kita inginkan.
* **Baris 333-353 (`<TaskModal ... />`):** Memasang robot modal ke halaman dan menyambungkan kabel fungsinya (`onSave`, `onDelete`, dan `onClose`).

---

## 4. Langkah 3: Menyajikan ke Halaman Utama (`src/app/page.js`)

### Kenapa File Ini Dibuat?
File ini adalah gerbang depan website kamu (*Server Component*). Dia bertugas memberikan judul halaman untuk tab browser dan menyajikan komponen `TodoApp` ke pengunjung.

### Kode Lengkap `src/app/page.js`:

```javascript
import TodoApp from "@/components/TodoApp";

export const metadata = {
  title: "Daftar Tugas | To-Do Next",
  description: "Aplikasi pencatatan dan pengelolaan tugas harian yang fokus dan efisien.",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header Halaman */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">
          Daftar Tugas Harian
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Catat prioritas harianmu dan selesaikan satu per satu dengan tenang.
        </p>
      </div>

      {/* Memanggil Komponen Utama To-Do */}
      <TodoApp />
    </main>
  );
}
```

### Bedah Kode:
* Karena file ini tidak memiliki tulisan `"use client"`, file ini otomatis menjadi **Server Component**.
* Dia dieksekusi di server Next.js dengan sangat cepat dan langsung mengirimkan struktur HTML yang ramah mesin pencari Google (*SEO Friendly*).

---

## 5. Langkah 4: Menata Gaya & Pengaman Dark Mode (`src/app/globals.css`)

### Kenapa File Ini Diatur Ulang?
File ini mengatur warna tema seluruh website. Kita memasang aturan agar saat laptopmu beralih ke mode malam (*Dark Mode*), warna latarnya menjadi hitam elegan dan tulisanmu tetap putih bersinar.

### Kode Lengkap `src/app/globals.css`:

```css
@import "tailwindcss";

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #090d16;
    --foreground: #f1f5f9;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Cerita Pengaman Warna:
Tadi sempat ada masalah kecil di mana teks input berwarna putih tertutup latar belakang yang ikut-ikutan putih saat diklik (*focus*).
Sekarang masalah itu sudah beres total karena di [src/components/TaskModal.js](file:///Users/najmiraihan/Kuliah/to-do-next/src/components/TaskModal.js) kita sudah mengunci aturan:
```html
dark:bg-slate-950 dark:text-slate-100 dark:focus:bg-slate-950
```
Artinya: *"Wahai komputer, saat mode gelap aktif dan kotak input diklik, latarnya HARUS TETAP HITAM GELAP dan tulisannya HARUS TETAP PUTIH TERANG!"*.

---

## 6. Latihan Praktik: Uji Coba Semua Fitur di Browser

Buka browsermu di `http://localhost:3000` dan coba 4 petualangan ini:

1. **Uji Coba CREATE:** Tekan tombol `+ Tambah Tugas Baru`. Tulis nama tugas dan sedikit cerita di deskripsi. Tekan *Buat Tugas*. Lihat tugas barumu muncul di urutan paling atas!
2. **Uji Coba READ & DETAIL:** Klik pada teks nama tugas barumu. Modal akan terbuka dalam **Mode Detail**. Kamu bisa membaca cerita deskripsimu dengan nyaman!
3. **Uji Coba UPDATE:** Tekan tombol *Edit Tugas* dari dalam modal detail (atau tombol *Edit* di samping kartu). Ubah judulnya, lalu tekan *Simpan Perubahan*.
4. **Uji Coba ESCAPE:** Buka modal apa saja, lalu tekan tombol `Esc` di ujung kiri atas keyboard laptopmu. Popup akan langsung menutup seketika!
5. **Uji Coba CELENGAN:** Tekan tombol refresh browser (F5 atau `Cmd + R`). Semua tugas yang kamu buat tetap tersimpan utuh di layarmu!
