import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  Building2,
  Users,
  FileBarChart,
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }) {
  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Job Fairs",
      href: "/admin/jobfair",
      icon: CalendarDays,
    },
    {
      name: "Companies",
      href: "/admin/companies",
      icon: Building2,
    },
    {
      name: "Candidates",
      href: "/admin/candidates",
      icon: Users,
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: FileBarChart,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <BriefcaseBusiness size={21} />
            </div>

            <div>
              <p className="text-lg font-bold text-slate-900">
                JobFair<span className="text-blue-600">Connect</span>
              </p>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </Link>
        </div>

        <nav className="space-y-2 p-4">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full border-t border-slate-100 p-4">
          <LogoutButton />
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="flex h-20 items-center justify-between px-6 lg:px-8">
            <div>
              <p className="text-sm text-slate-400">Administration</p>
              <h2 className="text-lg font-semibold text-slate-900">
                Job Fair Management
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              A
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
