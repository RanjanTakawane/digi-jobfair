"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  Plus,
  ChevronLeft,
  ChevronRight,
  Building2,
  Users,
  Eye,
  RefreshCw,
  QrCode,
} from "lucide-react";
import JobFairModal from "@/components/admin/JobFairModal";
import RegistrationQrModal from "@/components/admin/RegistrationQrModal";

export default function JobFair() {
  const [jobFairs, setJobFairs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [qrJobFair, setQrJobFair] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    const fetchJobFairs = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/v1/admin/job-fairs?page=${page}&limit=${limit}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch job fairs");
        }

        setJobFairs(data.data || []);

        setPagination({
          total: data.pagination?.total || 0,
          totalPages: data.pagination?.totalPages || 1,
          currentPage: data.pagination?.currentPage || page,
          hasNextPage: data.pagination?.hasNextPage || false,
          hasPreviousPage: data.pagination?.hasPreviousPage || false,
        });
      } catch (error) {
        console.error("Fetch Job Fairs Error:", error);
        setJobFairs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobFairs();
  }, [page, refreshKey]);

  const handlePrevious = () => {
    if (pagination.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pagination.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "published":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      case "draft":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "completed":
        return "bg-slate-100 text-slate-700 border-slate-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* HEADER */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Job Fairs</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Manage Job Fairs
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage recently created job fairs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Job Fair
        </button>
      </div>

      {/* SUMMARY */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Job Fairs</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {pagination.total}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Current Page</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {pagination.currentPage}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Total Pages</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {pagination.totalPages}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="font-bold text-slate-900">Recent Job Fairs</h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing up to {limit} job fairs per page.
            </p>
          </div>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-blue-600"
            title="Refresh"
          >
            <RefreshCw size={17} />
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading job fairs...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && jobFairs.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <CalendarDays size={28} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No job fairs found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first job fair to start accepting candidate and
              company registrations.
            </p>

            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Create Job Fair
            </button>
          </div>
        )}

        {/* LIST */}
        {!loading && jobFairs.length > 0 && (
          <div className="divide-y divide-slate-100">
            {jobFairs.map((jobFair) => (
              <div
                key={jobFair._id}
                className="p-6 transition hover:bg-slate-50/70"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-lg font-bold text-slate-900">
                        {jobFair.name}
                      </h3>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                          jobFair.status,
                        )}`}
                      >
                        {jobFair.status || "draft"}
                      </span>

                      {jobFair.jobFairCode && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {jobFair.jobFairCode}
                        </span>
                      )}
                    </div>

                    {jobFair.description && (
                      <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-500">
                        {jobFair.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} />

                        <span>
                          {formatDate(jobFair.startDate)}
                          {jobFair.endDate &&
                            jobFair.endDate !== jobFair.startDate &&
                            ` - ${formatDate(jobFair.endDate)}`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} />

                        <span>
                          {jobFair.venueName || "-"}
                          {jobFair.city ? `, ${jobFair.city}` : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid shrink-0 grid-cols-2 gap-3 sm:flex sm:items-center">
                    <div className="rounded-xl bg-blue-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-600" />

                        <div>
                          <p className="text-xs text-slate-500">Candidates</p>
                          <p className="font-bold text-slate-900">
                            {jobFair.candidateCount ?? 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-indigo-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-indigo-600" />

                        <div>
                          <p className="text-xs text-slate-500">Companies</p>
                          <p className="font-bold text-slate-900">
                            {jobFair.companyCount ?? 0}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      title="Details page coming soon"
                      className="col-span-2 inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-400 sm:col-span-1"
                    >
                      <Eye size={17} />
                      View Details
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setQrJobFair(jobFair)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <QrCode size={17} />
                    Candidate Registration QR
                  </button>

                  <button
                    type="button"
                    disabled
                    title="Company registration is coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-400"
                  >
                    <QrCode size={17} />
                    Company Registration QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && jobFairs.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Page{" "}
              <span className="font-semibold text-slate-900">
                {pagination.currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-900">
                {pagination.totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={!pagination.hasPreviousPage}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, index) => index + 1,
                )
                  .slice(
                    Math.max(0, pagination.currentPage - 3),
                    Math.max(5, pagination.currentPage + 2),
                  )
                  .map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                        pageNumber === pagination.currentPage
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
              </div>

              <button
                onClick={handleNext}
                disabled={!pagination.hasNextPage}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>

      <JobFairModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={(created) => {
          setCreateModalOpen(false);

          // show the candidate registration QR right after creating
          if (created?.data) setQrJobFair(created.data);

          // return to first page so newest job fair can appear
          setPage(1);

          // refresh list
          setRefreshKey((prev) => prev + 1);
        }}
      />

      <RegistrationQrModal
        isOpen={Boolean(qrJobFair)}
        onClose={() => setQrJobFair(null)}
        title="Candidate Registration QR"
        jobFairName={qrJobFair?.name}
        path={
          qrJobFair
            ? `/candidate/register/${qrJobFair.candidateRegistrationToken}`
            : ""
        }
      />
    </div>
  );
}
