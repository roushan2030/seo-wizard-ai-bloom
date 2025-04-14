
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Search,
  FileText,
  Settings,
  Users,
  FileCheck,
  Bell,
  LogOut,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarItem = ({ icon: Icon, label, to, active }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 rounded-lg px-3 py-2 text-base hover:bg-gray-100",
          active && "bg-seo-purple/10 text-seo-purple hover:bg-seo-purple/15"
        )}
      >
        <Icon className={cn("h-5 w-5", active ? "text-seo-purple" : "text-gray-500")} />
        {label}
      </Button>
    </Link>
  );
};

const DashboardLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: BarChart3, label: "Dashboard", to: "/dashboard" },
    { icon: Search, label: "Keyword Research", to: "/dashboard/keywords" },
    { icon: FileText, label: "Content Generation", to: "/dashboard/content" },
    { icon: FileCheck, label: "Content Optimization", to: "/dashboard/optimize" },
    { icon: Users, label: "Competitor Analysis", to: "/dashboard/competitors" },
    { icon: Settings, label: "Settings", to: "/dashboard/settings" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-gray-200 bg-white px-4 pb-4 md:flex"
        )}
      >
        <div className="py-6">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-seo-gradient">
              SEO.ai
            </span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1.5">
          {navItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </nav>
        <div className="border-t border-gray-200 pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 text-base">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://placehold.co/200x200/9b87f5/ffffff?text=JD" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">johndoe@example.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white p-4 flex flex-col">
            <div className="flex items-center justify-between py-6">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-seo-gradient">
                  SEO.ai
                </span>
              </Link>
              <Button variant="ghost" className="h-9 w-9 p-0" onClick={toggleSidebar}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-1.5">
              {navItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              ))}
            </nav>
            <div className="border-t border-gray-200 pt-4">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 text-base">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://placehold.co/200x200/9b87f5/ffffff?text=JD" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">johndoe@example.com</p>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col md:pl-64">
        {/* Header for mobile */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 md:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Button variant="ghost" className="h-9 w-9 p-0 mr-2" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-seo-gradient">
                  SEO.ai
                </span>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="https://placehold.co/200x200/9b87f5/ffffff?text=JD" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
