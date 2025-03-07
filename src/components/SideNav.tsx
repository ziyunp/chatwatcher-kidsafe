
import { HomeIcon, ShieldAlert, UserRound, Settings, Cog, BarChart, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const navLinks = [
    { title: "Dashboard", href: "/", icon: HomeIcon },
    { title: "Alerts", href: "/alerts", icon: ShieldAlert },
    { title: "Children", href: "/children", icon: UserRound },
    { title: "Analytics", href: "/analytics", icon: BarChart },
    { title: "Alert Rules", href: "/rules", icon: Bell },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full py-4">
      <div className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                )
              }
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center gap-3 rounded-md bg-sidebar-accent/50 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <span className="text-xs font-medium text-primary-foreground">KS</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">KidSafe Monitor</span>
            <span className="text-xs text-sidebar-foreground/70">Trial • 12 days left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
