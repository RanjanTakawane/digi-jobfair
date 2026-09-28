"use client";

import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    CheckCircle2,
    QrCode,
    ScanLine,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";

export default function Landing() {
    const features = [
        {
            icon: CalendarDays,
            title: "Create Multiple Job Fairs",
            description:
                "Create and manage multiple job fairs from one centralized platform.",
        },
        {
            icon: QrCode,
            title: "Automatic QR Codes",
            description:
                "Generate separate QR codes for candidate registration and company participation.",
        },
        {
            icon: Users,
            title: "Candidate Management",
            description:
                "Capture candidate profiles, education, experience, skills and resumes digitally.",
        },
        {
            icon: Building2,
            title: "Company Participation",
            description:
                "Allow companies to register for specific job fairs and manage their participation.",
        },
        {
            icon: BriefcaseBusiness,
            title: "Job Management",
            description:
                "Participating companies can publish available roles, openings and requirements.",
        },
        {
            icon: ScanLine,
            title: "QR Based Check-In",
            description:
                "Simplify registration, attendance and candidate-company interactions using QR scanning.",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Create Job Fair",
            description:
                "Admin creates a new job fair with event date, location and registration settings.",
        },
        {
            number: "02",
            title: "QR Codes Generated",
            description:
                "The system automatically generates Candidate Registration and Company Participation QR codes.",
        },
        {
            number: "03",
            title: "Candidates & Companies Register",
            description:
                "Participants scan the respective QR code and complete their registration online.",
        },
        {
            number: "04",
            title: "Manage Everything Digitally",
            description:
                "Track companies, candidates, jobs, applications and event activity from one dashboard.",
        },
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <BriefcaseBusiness size={23} />
                        </div>

                        <div>
                            <p className="text-xl font-bold tracking-tight">
                                JobFair
                                <span className="text-blue-600">Connect</span>
                            </p>
                            <p className="text-[11px] font-medium text-slate-400">
                                Smart Job Fair Platform
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
                        <a href="#features" className="transition hover:text-blue-600">
                            Features
                        </a>

                        <a href="#how-it-works" className="transition hover:text-blue-600">
                            How It Works
                        </a>

                        <a href="#solutions" className="transition hover:text-blue-600">
                            Solutions
                        </a>

                        <a href="#contact" className="transition hover:text-blue-600">
                            Contact
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="hidden rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:block"
                        >
                            Login
                        </Link>

                        <Link
                            href="/admin/job-fairs/create"
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                        >
                            Create Job Fair
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute left-[-120px] top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
                <div className="absolute right-[-100px] top-10 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
                    {/* LEFT */}
                    <div>
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            <Sparkles size={16} />
                            Smarter Job Fair Management
                        </div>

                        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                            Transform Traditional
                            <span className="block text-blue-600">Job Fairs Into Digital</span>
                            Experiences
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Replace paper forms and scattered Google Forms with one powerful
                            platform for job fair creation, QR registration, company
                            participation, candidate management and recruitment tracking.
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/admin/job-fairs/create"
                                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                            >
                                Create Your Job Fair
                                <ArrowRight size={19} />
                            </Link>

                            <a
                                href="#how-it-works"
                                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                            >
                                See How It Works
                            </a>
                        </div>

                        <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-emerald-500" />
                                No Paper Forms
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-emerald-500" />
                                QR Based Registration
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={17} className="text-emerald-500" />
                                Real-time Tracking
                            </div>
                        </div>
                    </div>

                    {/* RIGHT HERO CARD */}
                    <div className="relative">
                        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200/70 sm:p-7">
                            <div className="mb-6 flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">
                                        Active Job Fair
                                    </p>

                                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                                        Pune Mega Job Fair 2026
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                        <CalendarDays size={15} />
                                        15 November 2026
                                    </div>
                                </div>

                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                                    Active
                                </span>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* Candidate QR */}
                                <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-5">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                        <Users size={20} />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-900">
                                        Candidate Registration
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Scan to register for this job fair.
                                    </p>

                                    <div className="mt-5 flex aspect-square items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
                                        <QrCode
                                            size={120}
                                            strokeWidth={1.4}
                                            className="text-slate-900"
                                        />
                                    </div>

                                    <button className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                                        Candidate QR
                                    </button>
                                </div>

                                {/* Company QR */}
                                <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-5">
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                                        <Building2 size={20} />
                                    </div>

                                    <p className="text-sm font-semibold text-slate-900">
                                        Company Participation
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        Scan to participate as an employer.
                                    </p>

                                    <div className="mt-5 flex aspect-square items-center justify-center rounded-2xl bg-white p-6 shadow-sm">
                                        <QrCode
                                            size={120}
                                            strokeWidth={1.4}
                                            className="text-slate-900"
                                        />
                                    </div>

                                    <button className="mt-4 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">
                                        Company QR
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-3">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xl font-bold text-slate-900">1,248</p>
                                    <p className="mt-1 text-xs text-slate-500">Candidates</p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xl font-bold text-slate-900">48</p>
                                    <p className="mt-1 text-xs text-slate-500">Companies</p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xl font-bold text-slate-900">126</p>
                                    <p className="mt-1 text-xs text-slate-500">Jobs</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-7 -left-7 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl lg:block">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <ShieldCheck size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Secure Registration
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        QR based participant access
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST SECTION */}
            <section className="border-y border-slate-100 bg-slate-50">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 text-center md:grid-cols-4 lg:px-8">
                    <div>
                        <p className="text-3xl font-bold text-slate-900">100%</p>
                        <p className="mt-1 text-sm text-slate-500">Digital Registration</p>
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-slate-900">2 QR</p>
                        <p className="mt-1 text-sm text-slate-500">Per Job Fair</p>
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-slate-900">24/7</p>
                        <p className="mt-1 text-sm text-slate-500">Online Registration</p>
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-slate-900">1</p>
                        <p className="mt-1 text-sm text-slate-500">Centralized Platform</p>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                            Platform Features
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Everything needed to run a modern job fair
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-600">
                            Manage organizers, employers, candidates, jobs and registrations
                            without depending on multiple disconnected tools.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/60"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="bg-slate-950 py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-300">
                            Simple Process
                        </span>

                        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                            From job fair creation to registration in minutes
                        </h2>

                        <p className="mt-4 text-lg leading-8 text-slate-400">
                            A streamlined workflow designed for organizers, candidates and
                            participating companies.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold">
                                    {step.number}
                                </div>

                                <h3 className="mt-6 text-lg font-bold">{step.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTIONS */}
            <section id="solutions" className="py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                                Built for Everyone
                            </span>

                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                                One platform for every participant
                            </h2>

                            <p className="mt-5 text-lg leading-8 text-slate-600">
                                Give organizers complete control while providing simple
                                experiences for candidates and participating employers.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    "Admin dashboard for multiple job fairs",
                                    "Candidate registration and profile management",
                                    "Company participation and approval workflow",
                                    "Job creation and application management",
                                    "QR scanning and digital check-in",
                                    "Real-time reporting and analytics",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2
                                            size={20}
                                            className="mt-0.5 shrink-0 text-emerald-500"
                                        />

                                        <p className="text-slate-700">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="rounded-3xl bg-blue-600 p-7 text-white">
                                <Users size={28} />

                                <h3 className="mt-8 text-xl font-bold">For Candidates</h3>

                                <p className="mt-3 text-sm leading-6 text-blue-100">
                                    Scan, register, create your profile and discover participating
                                    employers and jobs.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7">
                                <Building2 size={28} className="text-indigo-600" />

                                <h3 className="mt-8 text-xl font-bold text-slate-900">
                                    For Companies
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    Register for events, publish jobs, meet candidates and manage
                                    recruitment activity.
                                </p>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:col-span-2">
                                <div className="flex items-start gap-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                                        <ShieldCheck size={23} />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">
                                            For Job Fair Organizers
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Control registrations, companies, candidate attendance,
                                            jobs, reports and complete event activity from a single
                                            administration portal.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 pb-24 lg:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-blue-600 px-8 py-14 text-center text-white sm:px-12">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Ready to digitize your next job fair?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-blue-100">
                        Create your event, generate registration QR codes and start
                        accepting candidates and participating companies digitally.
                    </p>

                    <Link
                        href="/admin/job-fairs/create"
                        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                        Create Job Fair
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                id="contact"
                className="border-t border-slate-200 bg-slate-50 py-10"
            >
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 text-center md:flex-row md:text-left lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <BriefcaseBusiness size={18} />
                        </div>

                        <span className="font-bold text-slate-900">
                            JobFair<span className="text-blue-600">Connect</span>
                        </span>
                    </div>

                    <p className="text-sm text-slate-500">
                        © 2026 JobFairConnect. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-blue-600">
                            Privacy
                        </Link>

                        <Link href="/terms" className="hover:text-blue-600">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}