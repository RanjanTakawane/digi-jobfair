"use client";

import { useState } from "react";
import {
  GENDERS,
  EDUCATION_QUALIFICATIONS,
  PROFESSIONAL_STATUSES,
  WORK_EXPERIENCE_CATEGORIES,
  TARGET_INDUSTRIES,
  LIMITS,
} from "@/utils/candidateOptions";
import { validateCandidate } from "@/validators/candidate/candidate";

const initialValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  whatsappNumber: "",
  alternateContactNumber: "",
  email: "",
  dateOfBirth: "",
  permanentAddress: "",
  currentCity: "",
  currentDistrict: "",
  educationQualification: "",
  specialization: "",
  passingYear: "",
  professionalStatus: "",
  workExperienceCategory: "",
  currentOrLastJobProfile: "",
  currentOrLastCompany: "",
  skills: [],
  targetIndustries: [],
  preferredJobLocations: [],
  declarationAccepted: false,
  website: "", // honeypot, must stay empty
};

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "gender",
  "dateOfBirth",
  "whatsappNumber",
  "email",
  "permanentAddress",
  "currentCity",
  "currentDistrict",
  "educationQualification",
  "passingYear",
  "professionalStatus",
  "workExperienceCategory",
  "skills",
  "targetIndustries",
  "preferredJobLocations",
  "declarationAccepted",
];

const isFilled = (v) => (Array.isArray(v) ? v.length > 0 : typeof v === "boolean" ? v : String(v).trim() !== "");

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:ring-4 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-100"
      : "border-zinc-300 hover:border-zinc-400 focus:border-[#673ab7] focus:ring-[#673ab7]/15"
  }`;

function Card({ children, accent }) {
  return (
    <section
      className={`overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ${
        accent ? "border-t-[10px] border-t-[#673ab7]" : ""
      }`}
    >
      {children}
    </section>
  );
}

function SectionCard({ step, title, description, children }) {
  return (
    <Card>
      <div className="flex items-center gap-3 border-b border-zinc-100 bg-[#f7f4fc] px-6 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#673ab7] text-sm font-semibold text-white">
          {step}
        </span>
        <div>
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          {description && <p className="text-xs text-zinc-500">{description}</p>}
        </div>
      </div>
      <div className="grid gap-x-5 gap-y-6 px-6 py-6 sm:grid-cols-2">{children}</div>
    </Card>
  );
}

function Field({ label, error, required, hint, full, children }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-zinc-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      {children}
      {hint && !error && <span className="text-xs text-zinc-500">{hint}</span>}
      <ErrorText>{error}</ErrorText>
    </label>
  );
}

function ErrorText({ children }) {
  if (!children) return null;
  return (
    <span role="alert" className="flex items-center gap-1 text-xs font-medium text-red-600">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v5H9V6zm0 6h2v2H9v-2z" />
      </svg>
      {children}
    </span>
  );
}

function RadioGroup({ name, label, options, value, onChange, error, required, cols = "sm:grid-cols-2" }) {
  return (
    <fieldset className="flex flex-col gap-2 sm:col-span-2">
      <legend className="mb-1 text-sm font-medium text-zinc-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </legend>
      <div className={`grid gap-2 ${cols}`}>
        {options.map((option) => {
          const on = value === option;
          return (
            <label
              key={option}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition ${
                on
                  ? "border-[#673ab7] bg-[#673ab7]/5 text-zinc-900"
                  : "border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={on}
                onChange={() => onChange(option)}
                className="h-4 w-4 accent-[#673ab7]"
              />
              {option}
            </label>
          );
        })}
      </div>
      <ErrorText>{error}</ErrorText>
    </fieldset>
  );
}

function TagInput({ name, label, placeholder, values, max, error, onChange }) {
  const [text, setText] = useState("");

  const add = () => {
    const parts = text.split(",").map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    const next = [...values];
    for (const p of parts) {
      if (next.length >= max) break;
      if (!next.some((v) => v.toLowerCase() === p.toLowerCase())) next.push(p.slice(0, LIMITS.listItem));
    }
    onChange(next);
    setText("");
  };

  return (
    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <span className="text-sm font-medium text-zinc-800">
        {label}
        <span className="text-red-600"> *</span>
      </span>
      <div className={`flex flex-wrap items-center gap-2 rounded-lg border bg-white p-2 transition focus-within:ring-4 ${
        error
          ? "border-red-500 focus-within:ring-red-100"
          : "border-zinc-300 focus-within:border-[#673ab7] focus-within:ring-[#673ab7]/15"
      }`}>
        {values.map((v) => (
          <span key={v} className="flex items-center gap-1.5 rounded-full bg-[#ede7f6] py-1 pl-3 pr-1.5 text-xs font-medium text-[#4527a0]">
            {v}
            <button
              type="button"
              aria-label={`Remove ${v}`}
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#673ab7] hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <input
          name={name}
          value={text}
          placeholder={values.length >= max ? "Limit reached" : placeholder}
          disabled={values.length >= max}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            }
            if (e.key === "Backspace" && !text && values.length) onChange(values.slice(0, -1));
          }}
          onBlur={add}
          className="min-w-[10rem] flex-1 bg-transparent px-1.5 py-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>
      {!error && (
        <span className="text-xs text-zinc-500">
          Press Enter or comma to add. {values.length}/{max} added.
        </span>
      )}
      <ErrorText>{error}</ErrorText>
    </div>
  );
}

export default function CandidateRegisterForm({ token }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);

  const set = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: undefined } : e));
  };
  const bind = (name) => ({
    name,
    value: values[name],
    onChange: (e) => set(name, e.target.value),
    className: inputClass(errors[name]),
    "aria-invalid": errors[name] ? true : undefined,
  });

  const toggleIndustry = (industry) =>
    set(
      "targetIndustries",
      values.targetIndustries.includes(industry)
        ? values.targetIndustries.filter((i) => i !== industry)
        : [...values.targetIndustries, industry]
    );

  const hasExperience = values.workExperienceCategory && values.workExperienceCategory !== "Fresher";

  const requiredFields = hasExperience
    ? [...REQUIRED_FIELDS, "currentOrLastJobProfile", "currentOrLastCompany"]
    : REQUIRED_FIELDS;
  const filledCount = requiredFields.filter((f) => isFilled(values[f])).length;
  const progress = Math.round((filledCount / requiredFields.length) * 100);

  function clearForm() {
    if (!window.confirm("Clear all the answers in this form?")) return;
    setValues(initialValues);
    setErrors({});
    setServerError("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting) return; // guards against double clicks
    setServerError("");

    const form = e.currentTarget;
    const focusFirst = (errs) => {
      const first = Object.keys(errs).find((k) => errs[k]);
      const el = first && form.querySelector(`[name="${first}"], [data-name="${first}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus?.({ preventScroll: true });
    };

    const { errors: clientErrors } = validateCandidate(values);
    if (clientErrors) {
      setErrors(clientErrors);
      setServerError("Some required questions need your attention.");
      focusFirst(clientErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/candidates/register/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok) {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (result.errors) {
          setErrors(result.errors);
          focusFirst(result.errors);
        }
        setServerError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <Card accent>
        <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-current" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h2 className="text-2xl font-semibold text-zinc-900">Registration successful</h2>
          <p className="max-w-md text-zinc-600">
            Thank you, {values.firstName}. Your response has been recorded. We will contact you on Gmail with
            further details about the job fair.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Card accent>
        <div className="px-6 py-6">
          <h1 className="text-3xl font-semibold text-zinc-900">Candidate Registration</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Register for the DigiHire Job Fair. It takes about 3 minutes. Your details are shared only with
            participating employers.
          </p>
          <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-red-600">* Indicates required question</p>
        </div>
        <div className="flex items-center gap-3 border-t border-zinc-100 bg-zinc-50 px-6 py-3">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Form completion"
          >
            <div className="h-full rounded-full bg-[#673ab7] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <span className="w-10 text-right text-xs font-medium text-zinc-600">{progress}%</span>
        </div>
      </Card>

      <SectionCard step={1} title="Personal details" description="Tell us who you are">
        <Field label="First name" required error={errors.firstName}>
          <input {...bind("firstName")} maxLength={LIMITS.name} autoComplete="given-name" placeholder="Your answer" />
        </Field>
        <Field label="Middle name" error={errors.middleName}>
          <input {...bind("middleName")} maxLength={LIMITS.name} placeholder="Your answer" />
        </Field>
        <Field label="Last name" required error={errors.lastName}>
          <input {...bind("lastName")} maxLength={LIMITS.name} autoComplete="family-name" placeholder="Your answer" />
        </Field>
        <Field label="Date of birth" required error={errors.dateOfBirth}>
          <input type="date" max={new Date().toISOString().slice(0, 10)} {...bind("dateOfBirth")} />
        </Field>
        <RadioGroup
          name="gender"
          label="Gender"
          required
          options={GENDERS}
          value={values.gender}
          error={errors.gender}
          onChange={(v) => set("gender", v)}
          cols="sm:grid-cols-4"
        />
      </SectionCard>

      <SectionCard step={2} title="Contact details" description="How employers can reach you">
        <Field label="WhatsApp number" required error={errors.whatsappNumber} hint="10-digit mobile number">
          <input type="tel" inputMode="numeric" placeholder="9876543210" autoComplete="tel" {...bind("whatsappNumber")} />
        </Field>
        <Field label="Alternate contact number" error={errors.alternateContactNumber} hint="Optional">
          <input type="tel" inputMode="numeric" placeholder="Your answer" {...bind("alternateContactNumber")} />
        </Field>
        <Field label="Email" required error={errors.email} full>
          <input type="email" maxLength={LIMITS.email} placeholder="name@example.com" autoComplete="email" {...bind("email")} />
        </Field>
      </SectionCard>

      <SectionCard step={3} title="Address" description="Where you live">
        <Field label="Permanent address" required error={errors.permanentAddress} full>
          <textarea rows={3} placeholder="Your answer" {...bind("permanentAddress")} maxLength={LIMITS.address} />
        </Field>
        <Field label="Current city" required error={errors.currentCity}>
          <input {...bind("currentCity")} maxLength={LIMITS.shortText} placeholder="Your answer" />
        </Field>
        <Field label="Current district" required error={errors.currentDistrict}>
          <input {...bind("currentDistrict")} maxLength={LIMITS.shortText} placeholder="Your answer" />
        </Field>
      </SectionCard>

      <SectionCard step={4} title="Education" description="Your highest qualification">
        <Field label="Education qualification" required error={errors.educationQualification}>
          <select {...bind("educationQualification")}>
            <option value="">Choose</option>
            {EDUCATION_QUALIFICATIONS.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </Field>
        <Field label="Passing year" required error={errors.passingYear}>
          <input type="number" inputMode="numeric" placeholder="e.g. 2024" {...bind("passingYear")} />
        </Field>
        <Field label="Specialization" error={errors.specialization} hint="Optional, e.g. Computer Science" full>
          <input {...bind("specialization")} maxLength={LIMITS.shortText} placeholder="Your answer" />
        </Field>
      </SectionCard>

      <SectionCard step={5} title="Professional details" description="Your work background">
        <RadioGroup
          name="professionalStatus"
          label="Professional status"
          required
          options={PROFESSIONAL_STATUSES}
          value={values.professionalStatus}
          error={errors.professionalStatus}
          onChange={(v) => set("professionalStatus", v)}
          cols="sm:grid-cols-3"
        />
        <RadioGroup
          name="workExperienceCategory"
          label="Total work experience"
          required
          options={WORK_EXPERIENCE_CATEGORIES}
          value={values.workExperienceCategory}
          error={errors.workExperienceCategory}
          onChange={(v) => set("workExperienceCategory", v)}
          cols="sm:grid-cols-3"
        />
        <Field
          label="Current / last job profile"
          required={hasExperience}
          error={errors.currentOrLastJobProfile}
          hint={hasExperience ? undefined : "Not needed for freshers"}
        >
          <input {...bind("currentOrLastJobProfile")} maxLength={LIMITS.shortText} placeholder="Your answer" />
        </Field>
        <Field
          label="Current / last company"
          required={hasExperience}
          error={errors.currentOrLastCompany}
          hint={hasExperience ? undefined : "Not needed for freshers"}
        >
          <input {...bind("currentOrLastCompany")} maxLength={LIMITS.shortText} placeholder="Your answer" />
        </Field>
        <TagInput
          name="skills"
          label="Skills"
          placeholder="e.g. Excel, Communication"
          values={values.skills}
          max={LIMITS.maxSkills}
          error={errors.skills}
          onChange={(v) => set("skills", v)}
        />
      </SectionCard>

      <SectionCard step={6} title="Job preferences" description="What you are looking for">
        <div data-name="targetIndustries" tabIndex={-1} className="flex flex-col gap-2 outline-none sm:col-span-2">
          <span className="text-sm font-medium text-zinc-800">
            Target industries <span className="text-red-600">*</span>
            <span className="font-normal text-zinc-500"> (select all that apply)</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {TARGET_INDUSTRIES.map((industry) => {
              const on = values.targetIndustries.includes(industry);
              return (
                <button
                  type="button"
                  key={industry}
                  aria-pressed={on}
                  onClick={() => toggleIndustry(industry)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    on
                      ? "border-[#673ab7] bg-[#673ab7] text-white shadow-sm"
                      : "border-zinc-300 bg-white text-zinc-700 hover:border-[#673ab7] hover:text-[#673ab7]"
                  }`}
                >
                  {on && <span className="mr-1">✓</span>}
                  {industry}
                </button>
              );
            })}
          </div>
          <ErrorText>{errors.targetIndustries}</ErrorText>
        </div>
        <TagInput
          name="preferredJobLocations"
          label="Preferred job locations"
          placeholder="e.g. Pune, Mumbai"
          values={values.preferredJobLocations}
          max={LIMITS.maxLocations}
          error={errors.preferredJobLocations}
          onChange={(v) => set("preferredJobLocations", v)}
        />
      </SectionCard>

      {/* Honeypot: hidden from users and assistive tech, bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      <Card>
        <div className="flex flex-col gap-5 px-6 py-6">
          <div>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-800">
              <input
                type="checkbox"
                name="declarationAccepted"
                className="mt-0.5 h-4 w-4 accent-[#673ab7]"
                checked={values.declarationAccepted}
                onChange={(e) => set("declarationAccepted", e.target.checked)}
              />
              <span>
                I declare that the information provided is true and correct to the best of my knowledge.
                <span className="text-red-600"> *</span>
              </span>
            </label>
            <div className="mt-2">
              <ErrorText>{errors.declarationAccepted}</ErrorText>
            </div>
          </div>

          {serverError && (
            <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {serverError}
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-[#673ab7] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5b32a3] focus:outline-none focus:ring-4 focus:ring-[#673ab7]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
              )}
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={clearForm}
              disabled={submitting}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#673ab7] transition hover:bg-[#673ab7]/10 disabled:opacity-60"
            >
              Clear form
            </button>
          </div>
        </div>
      </Card>

      <p className="pb-6 text-center text-xs text-zinc-500">Never submit passwords through this form.</p>
    </form>
  );
}
