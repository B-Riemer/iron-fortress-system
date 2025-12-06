import { SidebarLogo } from "./sidebar-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUser } from "./sidebar-user";

export function Sidebar() {
  return (
    <aside className="hidden fixed left-0 top-0 h-screen w-64 border-r border-white/5 bg-zinc-950/60 backdrop-blur-xl md:flex flex-col">
      <SidebarLogo />
      <SidebarNav />
      <SidebarUser />
    </aside>
  );
}

