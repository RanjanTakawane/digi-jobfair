import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Plus,
  QrCode,
  Users,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Job Fairs",
      value: "0",
      icon: CalendarDays,
    },
    {
      title: "Registered Candidates",
      value: "0",
      icon: Users,
    },
    {
      title: "Participating Companies",
      value: "0",
      icon: Building2,
    },
    {
      title: "Generated QR Codes",
      value: "0",
      icon: QrCode,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">Admin Dashboard</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Manage your job fairs
          </h1>

          <p className="mt-2 text-slate-500">
            Create job fairs, manage companies and monitor candidate
            registrations.
          </p>
        </div>

        <Link
          href="/admin/jobfair"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Job Fair
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Job Fairs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your recently created events will appear here.
              </p>
            </div>

            <Link
              href="/admin/job-fairs"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600"
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarDays size={25} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No job fairs created
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Create your first job fair and the system will later generate
              candidate and company participation QR codes.
            </p>

            <Link
              href="/admin/jobfair/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Plus size={16} />
              Create Job Fair
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 p-7 text-white">
          <p className="text-sm font-medium text-blue-300">Quick Start</p>

          <h2 className="mt-3 text-2xl font-bold">
            Launch your next event digitally
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Add the event information first. After creation, candidate
            registration and company participation links can be generated.
          </p>

          <div className="mt-7 space-y-4">
            {[
              "Enter job fair details",
              "Set registration dates",
              "Set venue and event dates",
              "Create the job fair",
              "Generate candidate and company QR codes",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}