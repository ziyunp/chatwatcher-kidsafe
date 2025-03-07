
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Shield, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNav from "./SideNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 mr-4">
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <SideNav />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex items-center gap-1.5">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">ChatWatcher</h1>
            <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded font-medium">KidSafe</span>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button className="ml-2" size="sm">
              Add Alert Rule
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
