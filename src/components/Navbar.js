import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white px-8 py-4 shadow-xs">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-gray-800">
          To-Do Next 📝
        </Link>
        <div className="flex gap-4 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About
          </Link>
          <Link href="/todos/1" className="text-gray-600 hover:text-blue-600">
            Todo #1
          </Link>
        </div>
      </div>
    </nav>
  );
}
