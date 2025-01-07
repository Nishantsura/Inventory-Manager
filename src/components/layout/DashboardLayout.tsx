import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <div
        className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Bookstore Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome back, Admin
            </span>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <footer className="border-t py-4 px-6 text-sm text-muted-foreground text-center bg-white">
          Made with <span className="text-emerald-500">💚</span> by Nishant Sura
        </footer>
      </div>
    </div>
  );
}
