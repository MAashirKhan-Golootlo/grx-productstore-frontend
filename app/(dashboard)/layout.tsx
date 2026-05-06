import { Sidebar } from "@/components/layout/Sidebar";
import { RequireAuth } from "@/features/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </RequireAuth>
  );
}
