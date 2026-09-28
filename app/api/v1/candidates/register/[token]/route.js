// POST /api/v1/candidates/register/[token]
import { NextResponse } from 'next/server';
import { validateCandidate } from '@/validators/candidate/candidate';
import { createCandidate, RegistrationError } from '@/services/candidate/candidateRegistration';

const MAX_BODY_BYTES = 20 * 1024;

// Reads the body as a stream and stops as soon as it goes over the limit, so a missing or
// wrong content-length header cannot make us buffer a huge body. Returns null when too large.
async function readBodyCapped(request, maxBytes) {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export async function POST(request, { params }) {
  try {
    const { token } = await params;

    // 1. Read the body (reject oversized or invalid JSON)
    const length = Number(request.headers.get('content-length') || 0);
    if (length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, message: 'Request too large' }, { status: 413 });
    }

    const text = await readBodyCapped(request, MAX_BODY_BYTES);
    if (text === null) {
      return NextResponse.json({ ok: false, message: 'Request too large' }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ ok: false, message: 'Invalid JSON' }, { status: 400 });
    }

    // 2. Honeypot: real users never fill this hidden field, so pretend success to bots
    if (body && typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    // 3. Validate and sanitize the fields
    const { data, errors } = validateCandidate(body);
    if (errors) {
      return NextResponse.json(
        { ok: false, message: 'Please fix the highlighted fields', errors },
        { status: 422 }
      );
    }

    // 4. Save the candidate for the job fair identified by the token
    const id = await createCandidate(data, token);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    // Invalid token / registration closed
    if (err instanceof RegistrationError) {
      return NextResponse.json({ ok: false, message: err.message }, { status: err.status });
    }

    // 5. Duplicate WhatsApp number / email / job fair registration (unique index violation)
    if (err?.code === 11000) {
      const field = err.keyPattern?.email ? 'email' : 'whatsappNumber';
      const label = field === 'email' ? 'email address' : 'WhatsApp number';
      const message = `This ${label} is already registered`;
      return NextResponse.json({ ok: false, message, errors: { [field]: message } }, { status: 409 });
    }

    console.error(err.message || err);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
