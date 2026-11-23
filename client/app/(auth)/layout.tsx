import { Header } from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-1 items-center flex-col bg-gray-100">
      <Header />
      <div className="flex w-full h-full justify-center items-center mt-10">
        {children}
      </div>
    </div>
  );
}
