"use client";

import { useState, useEffect } from "react";
import TaskModal from "@/components/TaskModal";

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

  // State untuk mengontrol Modal Terpadu (Create, Edit, Detail)
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create", // "create" | "edit" | "detail"
    task: null,
  });

  // Muat data dari localStorage saat browser siap
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
      // Abaikan error parsing, gunakan fallback data awal
    }
    setIsLoaded(true);
  }, []);

  // Simpan ke localStorage setiap kali tasks berubah
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("to-do-next-tasks", JSON.stringify(tasks));
      } catch {
        // Abaikan jika quota storage penuh
      }
    }
  }, [tasks, isLoaded]);

  // C - CREATE: Tambah tugas baru dari modal
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // U - UPDATE: Simpan perubahan rincian dari modal
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // U - UPDATE: Toggle status centang cepat dari kartu
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // D - DELETE: Hapus tugas tunggal
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // D - DELETE: Bersihkan semua tugas yang selesai
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  // R - READ: Filter daftar tugas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "aktif") return !task.completed;
    if (filter === "selesai") return task.completed;
    return true;
  });

  // Handler untuk membuka modal
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
      {/* Tombol Utama Tambah Tugas (C - CREATE) */}
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

      {/* Kontrol Filter & Aksi Massal */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        {/* Tab Filter (R - READ) */}
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

        {/* Hapus yang selesai (D - DELETE) */}
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

      {/* Daftar Tugas (List Items) */}
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
              {/* Checkbox status */}
              <input
                type="checkbox"
                id={task.id}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900/20 dark:border-slate-700 dark:text-slate-100"
              />

              {/* Area Teks yang Bisa Diklik untuk Membuka DETAIL */}
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

                {/* Deskripsi ringkas */}
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

              {/* Tombol Aksi Kanan (Detail, Edit, Hapus) */}
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

      {/* Ringkasan Bawah */}
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

      {/* MODAL TERPADU: Melayani Create, Edit, dan Detail */}
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
