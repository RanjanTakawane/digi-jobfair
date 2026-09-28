"use client";

import { X } from "lucide-react";
import CreateJobFair from "./CreateJobFair";

export default function JobFairModal({
    isOpen,
    onClose,
    onCreated,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">
                            Job Fair Management
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-slate-900">
                            Create New Job Fair
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the event details to create a new job fair.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="max-h-[calc(90vh-105px)] overflow-y-auto">
                    <CreateJobFair
                        onClose={onClose}
                        onCreated={onCreated}
                    />
                </div>
            </div>
        </div>
    );
}