// src/layouts/MainLayout.tsx
import type { ReactNode } from "react"; 
import { cn } from "../../src/components/lib/utils";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b shadow-sm px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">OrthophonList</h1>
          <nav className="space-x-4 text-sm">
            <a href="/" className="hover:underline text-gray-700">Accueil</a>
            <a href="/tests" className="hover:underline text-gray-700">Tous les tests</a>
            <a href="#" className="hover:underline text-gray-700">À propos</a>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto">
          © {new Date().getFullYear()} OrthophonList — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}