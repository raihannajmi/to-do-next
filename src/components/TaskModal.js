"use client";

import { useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  mode = "create", // "create" | "edit" | "detail"
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

  // Sinkronkan data form setiap kali task atau mode berubah
  useEffect(() => {
    if (task && (mode === "edit" || mode === "detail")) {
      setText(task.text || "");
      setDescription(task.description || "");
      setPriority(task.priority || "biasa");
      setCompleted(Boolean(task.completed));
    } else {
      // Mode create: reset form ke nilai awal
      setText("");
      setDescription("");
      setPriority("biasa");
      setCompleted(false);
    }
  }, [task, mode, isOpen]);

  // Dukungan tombol Escape keyboard untuk menutup modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Konten Modal Dialog */}
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

        {/* Tampilan Khusus MODE DETAIL */}
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

            {/* Deskripsi */}
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

            {/* Metadata (Prioritas, Status, Tanggal) */}
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
          /* Tampilan Form untuk MODE CREATE & MODE EDIT */
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

            {/* Textarea Deskripsi */}
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

            {/* Pilihan Prioritas dan Status */}
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

            {/* Tombol Aksi Bawah */}
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
