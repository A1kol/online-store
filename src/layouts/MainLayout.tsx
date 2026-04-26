import type { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-gray-100">
      <Navbar />
      <main className="flex-1">{children}</main>

      <footer className="border-t border-gray-800 bg-gray-950 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} AutoElite — Car Online Store. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}
