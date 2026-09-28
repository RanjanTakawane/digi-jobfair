"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  FileText,
  MapPin,
  Save,
  Users,
} from "lucide-react";

export default function CreateJobFair({
  onClose,
  onCreated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",

    startDate: "",
    endDate: "",

    startTime: "",
    endTime: "",

    registrationStartDate: "",
    registrationEndDate: "",

    venueName: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",

    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",

    expectedCandidates: "",
    expectedCompanies: "",

    status: "draft",
  });

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "text-sm font-semibold text-slate-700";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      console.log("Creating Job Fair:", form);

      const response = await fetch("/api/v1/job-fairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,

          expectedCandidates: form.expectedCandidates
            ? Number(form.expectedCandidates)
            : 0,

          expectedCompanies: form.expectedCompanies
            ? Number(form.expectedCompanies)
            : 0,
        }),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        let message = "Failed to create job fair";

        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          message = errorData.message || message;
        }

        throw new Error(message);
      }

      const data = await response.json();

      console.log("Job Fair Created:", data);

      if (onCreated) {
        onCreated(data);
      }

      onClose();
    } catch (error) {
      console.error("Create Job Fair Error:", error);

      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6"
    >
      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* BASIC INFORMATION */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Basic Information
            </h3>

            <p className="text-xs text-slate-500">
              General information about the event.
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <div>
            <label className={labelClass}>
              Job Fair Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Example: Pune Mega Job Fair 2026"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter job fair description"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* EVENT SCHEDULE */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarDays size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Event Schedule
            </h3>

            <p className="text-xs text-slate-500">
              Set event dates and timing.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Start Date{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              End Date{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Start Time
            </label>

            <div className="relative">
              <Clock
                size={17}
                className="absolute left-4 top-[22px] text-slate-400"
              />

              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              End Time
            </label>

            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* REGISTRATION WINDOW */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Users size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Registration Window
            </h3>

            <p className="text-xs text-slate-500">
              Define when registration starts and closes.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Registration Start
            </label>

            <input
              type="date"
              name="registrationStartDate"
              value={form.registrationStartDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Registration End
            </label>

            <input
              type="date"
              name="registrationEndDate"
              value={form.registrationEndDate}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* VENUE */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
            <MapPin size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Venue Details
            </h3>

            <p className="text-xs text-slate-500">
              Enter the physical event location.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass}>
              Venue Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="venueName"
              value={form.venueName}
              onChange={handleChange}
              required
              placeholder="Example: Pune Exhibition Centre"
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Address
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, area, landmark"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>City</label>

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Pune"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              District
            </label>

            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="Pune"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>State</label>

            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Maharashtra"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="411001"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ORGANIZER */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-900">
          Organizer Details
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          Contact person responsible for the event.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Organizer Name
            </label>

            <input
              type="text"
              name="organizerName"
              value={form.organizerName}
              onChange={handleChange}
              placeholder="Full name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Organizer Email
            </label>

            <input
              type="email"
              name="organizerEmail"
              value={form.organizerEmail}
              onChange={handleChange}
              placeholder="admin@example.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Organizer Phone
            </label>

            <input
              type="tel"
              name="organizerPhone"
              value={form.organizerPhone}
              onChange={handleChange}
              placeholder="9876543210"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* EXPECTED PARTICIPATION */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-900">
          Expected Participation
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Expected Candidates
            </label>

            <input
              type="number"
              min="0"
              name="expectedCandidates"
              value={form.expectedCandidates}
              onChange={handleChange}
              placeholder="5000"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              Expected Companies
            </label>

            <input
              type="number"
              min="0"
              name="expectedCompanies"
              value={form.expectedCompanies}
              onChange={handleChange}
              placeholder="100"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* STATUS */}
      <section className="rounded-2xl border border-slate-200 p-5">
        <label className={labelClass}>
          Job Fair Status
        </label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </section>

      {/* BUTTONS */}
      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white py-5">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />

          {loading ? "Creating..." : "Create Job Fair"}
        </button>
      </div>
    </form>
  );
}