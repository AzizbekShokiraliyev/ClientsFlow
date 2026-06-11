import {Sidebar as MainSidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter} from "../ui/sidebar"
import {LayoutDashboard, Users, Briefcase, KanbanSquare, ListChecks, LogOut, ChevronRight} from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import { Button } from "../ui/button"

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Clients",   path: "/clients",   icon: Users },
  { label: "Deals",     path: "/deals",     icon: Briefcase },
  { label: "Kanban",    path: "/kanban",    icon: KanbanSquare },
  { label: "Tasks",     path: "/tasks",     icon: ListChecks },
]

const Sidebar = () => {
  return (
    <MainSidebar className="border-none w-64">

      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-lg">
            <span className="text-white dark:text-black font-black text-sm">CF</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-none">ClientFlow</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pro workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.15em] px-3 mb-3">
          Workspace
        </p>

        <SidebarMenu className="gap-0.5">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild className="h-auto p-0">
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <div className={`group relative flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer
                      ${isActive ? "bg-foreground text-background shadow-md" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"}`}>
                      {isActive && (<div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-background/40 rounded-full" />)}

                      <div className={`
                        flex h-7 w-7 items-center justify-center rounded-lg transition-all
                        ${isActive
                          ? "bg-background/15"
                          : "bg-muted group-hover:bg-background"
                        }
                      `}>
                        <item.icon className="w-3.5 h-3.5" />
                      </div>

                      <span className="text-sm font-medium flex-1">{item.label}</span>

                      <ChevronRight className={`
                        w-3.5 h-3.5 transition-all duration-200
                        ${isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40"}
                      `} />
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <Link to='/'>
        <SidebarFooter className="px-3 py-4">
          <div className="mx-1 rounded-xl border border-border/50 bg-muted/30 p-3">
            <div className="flex items-center gap-12">
                <p className="text-sm font-semibold leading-none truncate">Tizimdan chiqish</p>
                
                <Button>
                    <LogOut className="w-3.5 h-3.5" />
                </Button>
            </div>
          </div>
        </SidebarFooter>
      </Link>

    </MainSidebar>
  )
}

export default Sidebar