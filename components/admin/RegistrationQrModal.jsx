"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, ExternalLink, X } from "lucide-react";

// Public links must work on candidates' phones, so prefer the configured
// public URL; fall back to the admin's current origin (fine on a deployed site).
function getPublicBaseUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL || window.location.origin).replace(
    /\/$/,
    "",
  );
}

export default function RegistrationQrModal({
  isOpen,
  onClose,
  title,
  jobFairName,
  path,
}) {
  const [qr, setQr] = useState({ url: "", src: "" });
  const [copied, setCopied] = useState(false);

  const url = isOpen && path ? `${getPublicBaseUrl()}${path}` : "";
  const src = qr.url === url ? qr.src : "";

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    QRCode.toDataURL(url, { width: 360, margin: 2 })
      .then((dataUrl) => {
        if (!cancelled) setQr({ url, src: dataUrl });
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the link is still shown for manual copy
    }
  };

  const fileName = `${(jobFairName || "job-fair")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-candidate-qr.png`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-600">{title}</p>

            <h2 className="mt-1 truncate text-xl font-bold text-slate-900">
              {jobFairName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6 text-center">
          <div className="mx-auto flex h-[300px] w-[300px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt="Registration QR code" className="h-72 w-72" />
            ) : (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            )}
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Candidates scan this code to open the registration form.
          </p>

          <div className="mt-4 break-all rounded-xl bg-slate-50 px-4 py-3 text-left text-xs text-slate-600">
            {url}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy"}
            </button>

            <a
              href={src || undefined}
              download={fileName}
              aria-disabled={!src}
              className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${
                src ? "" : "pointer-events-none opacity-50"
              }`}
            >
              <Download size={16} />
              PNG
            </a>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ExternalLink size={16} />
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
