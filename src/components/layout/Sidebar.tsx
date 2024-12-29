import {
  LayoutGrid,
  Library,
  LineChart,
  Package,
  Store,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    {
      title: "Dashboard",
      icon: LayoutGrid,
      href: "/",
    },
    {
      title: "Inventory",
      icon: Package,
      href: "/inventory",
    },
    {
      title: "Stores",
      icon: Store,
      href: "/stores",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      href: "/orders",
    },
    {
      title: "Analytics",
      icon: LineChart,
      href: "/analytics",
    },
    {
      title: "Reports",
      icon: FileText,
      href: "/reports",
    },
    {
      title: "Catalog",
      icon: Library,
      href: "/catalog",
    },
    {
      title: "Users",
      icon: Users,
      href: "/users",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className={cn("pb-12 min-h-screen relative", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2 px-4">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold tracking-tight">
                Bookstore
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onToggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent",
                    isCollapsed && "justify-center px-2",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
