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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
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
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Bookstore</h2>
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
