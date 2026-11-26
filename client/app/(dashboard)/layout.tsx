import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Suspense fallback={<div className="h-20 w-full" />}>
        <Header />
      </Suspense>

      <div className="flex flex-1 mt-4">
        <Suspense fallback={<aside className="w-56 shrink-0" />}>
          <Sidebar />
        </Suspense>

        <main className="m-4 flex-1 rounded-2xl border border-stone-200/10 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
