import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className={`border-r bg-card transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card p-4 flex justify-end">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t py-4 px-6 text-sm text-muted-foreground text-center bg-card">
          Made with <span className="text-blue-500">💙</span> by Nishant Sura
        </footer>
      </div>
    </div>
  );
}
