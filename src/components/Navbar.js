"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Daftar Tugas" },
    { href: "/about", label: "Tentang Aplikasi" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 text-slate-900 transition hover:opacity-85 dark:text-slate-100"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
            ✓
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-none tracking-tight">To-Do Next</span>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Pengelola Tugas</span>
          </div>
        </Link>

        <nav aria-label="Navigasi Utama" className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:focus-visible:ring-slate-100 ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-semibold dark:bg-slate-800 dark:text-slate-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
