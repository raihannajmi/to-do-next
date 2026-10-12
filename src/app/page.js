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

      {/* Komponen Utama To-Do */}
      <TodoApp />
    </main>
  );
}
