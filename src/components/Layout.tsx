
import { ReactNode } from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {!isMobile && (
          <aside className="w-[240px] flex-shrink-0 border-r bg-sidebar">
            <SideNav />
          </aside>
        )}
        <main className="flex-1 py-6">
          <div className="container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
