import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import AppSidebar from "../components/custom/AppSidebar";
import { Separator } from "../components/ui/separator";

function Layout({ children }) {
  return (
    <SidebarProvider>
      {/* sidebar  */}
      <AppSidebar />
      {/* sidebar  */}
      <SidebarInset>
        <header className="flex py-4 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          search bar and user profile
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
