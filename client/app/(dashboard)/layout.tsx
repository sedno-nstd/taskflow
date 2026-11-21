import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 mt-4">
        <Sidebar />
        <main className="m-4 flex-1 rounded-2xl border border-stone-200/10 bg-white p-6 shadow-sm">
          {children}
        </main>
      </div>
    </div>
  );
}
