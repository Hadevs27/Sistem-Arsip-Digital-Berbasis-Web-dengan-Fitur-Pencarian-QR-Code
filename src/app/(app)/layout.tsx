import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, QrCode, Tags, Users, Activity, LogOut, Menu } from "lucide-react";

// We'll create a simple Sidebar for now, without Sheet if it's not installed yet, or we'll just build a basic responsive one.

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["ADMIN", "PEGAWAI"] },
    { name: "Arsip", href: "/arsip", icon: FileText, roles: ["ADMIN", "PEGAWAI"] },
    { name: "Scan QR", href: "/scan", icon: QrCode, roles: ["ADMIN", "PEGAWAI"] },
    { name: "Kategori", href: "/kategori", icon: Tags, roles: ["ADMIN", "PEGAWAI"] },
    { name: "Pengguna", href: "/admin/users", icon: Users, roles: ["ADMIN"] },
    { name: "Log Aktivitas", href: "/logs", icon: Activity, roles: ["ADMIN"] },
  ];

  const allowedNavs = navItems.filter(item => item.roles.includes(role || ""));

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 flex-col border-r border-neutral-200 bg-white/80 backdrop-blur-md md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="flex h-[72px] items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <QrCode className="h-5 w-5" />
            </div>
            <span className="text-xl text-neutral-900 tracking-tight">Arsip Digital</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-6 px-4">
          <ul className="grid gap-2">
            {allowedNavs.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-neutral-500 transition-all hover:bg-primary-50 hover:text-primary-700 active:scale-[0.98]"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col relative z-0">
        <header className="flex h-[72px] items-center gap-4 border-b border-neutral-200/50 bg-white/50 backdrop-blur-sm px-6 sticky top-0 z-20">
          <div className="flex flex-1 items-center justify-between">
            <div className="md:hidden flex items-center gap-2 font-bold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <QrCode className="h-4 w-4" />
              </div>
              <span className="text-lg text-neutral-900">Arsip Digital</span>
            </div>
            <div className="hidden md:block">
              {/* Optional Breadcrumb or Page Title can go here */}
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-neutral-900">{session?.user?.name}</span>
                <span className="text-xs text-neutral-500 font-medium bg-neutral-100 px-2 py-0.5 rounded-full">{role}</span>
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <Button type="submit" variant="ghost" size="icon" className="text-neutral-500 hover:text-danger hover:bg-danger/10 rounded-full h-10 w-10 transition-colors">
                  <LogOut className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 md:p-8 lg:p-10 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
