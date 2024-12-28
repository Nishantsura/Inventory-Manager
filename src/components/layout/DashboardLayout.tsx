import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
