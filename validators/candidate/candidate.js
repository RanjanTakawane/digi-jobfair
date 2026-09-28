// Shared by the registration form (browser) and the API (server): keep it
// free of Node-only imports. The returned `data` is a strict allowlist, so
// anything else in the request body is dropped.
import {
  GENDERS,
  EDUCATION_QUALIFICATIONS,
  PROFESSIONAL_STATUSES,
  WORK_EXPERIENCE_CATEGORIES,
  TARGET_INDUSTRIES,
  FRESHER,
  LIMITS,
} from "@/utils/candidateOptions";

const NAME_REGEX = /^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const text = (value) => (typeof value === "string" ? value.trim() : "");

// Accepts 9876543210, +91 98765 43210, 09876543210 ... returns 10 digits or null
function normalizePhone(value) {
  const compact = text(value).replace(/[\s()-]/g, "");
  const match = compact.match(/^(?:\+?91|0)?([6-9]\d{9})$/);

  return match ? match[1] : null;
}

function parseDate(value) {
  const raw = text(value);

  if (!DATE_REGEX.test(raw)) return null;

  const date = new Date(`${raw}T00:00:00.000Z`);

  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== raw
    ? null
    : date;
}

function cleanList(value, { max, allowed }) {
  if (!Array.isArray(value)) return null;

  const seen = new Set();
  const items = [];

  for (const item of value) {
    const clean = text(item);

    if (!clean || clean.length > LIMITS.listItem) return null;
    if (allowed && !allowed.includes(clean)) return null;

    if (!seen.has(clean.toLowerCase())) {
      seen.add(clean.toLowerCase());
      items.push(clean);
    }
  }

  return items.length > 0 && items.length <= max ? items : null;
}

export function validateCandidate(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { data: undefined, errors: { form: "Invalid request" } };
  }

  const errors = {};
  const data = {};

  const requiredText = (field, label, max) => {
    const value = text(body[field]);

    if (!value) errors[field] = `${label} is required`;
    else if (value.length > max) errors[field] = `${label} is too long`;
    else data[field] = value;
  };

  const optionalText = (field, label, max) => {
    const value = text(body[field]);

    if (value.length > max) errors[field] = `${label} is too long`;
    else data[field] = value;
  };

  const oneOf = (field, label, options) => {
    const value = text(body[field]);

    if (!options.includes(value)) errors[field] = `Please choose ${label}`;
    else data[field] = value;
  };

  // Personal
  requiredText("firstName", "First name", LIMITS.name);
  requiredText("lastName", "Last name", LIMITS.name);
  optionalText("middleName", "Middle name", LIMITS.name);

  for (const field of ["firstName", "middleName", "lastName"]) {
    if (data[field] && !NAME_REGEX.test(data[field])) {
      errors[field] = "Use letters only";
    }
  }

  oneOf("gender", "a gender", GENDERS);

  const dateOfBirth = parseDate(body.dateOfBirth);

  if (!dateOfBirth) {
    errors.dateOfBirth = "Enter a valid date of birth";
  } else {
    const now = new Date();
    let age = now.getUTCFullYear() - dateOfBirth.getUTCFullYear();

    if (
      now.getUTCMonth() < dateOfBirth.getUTCMonth() ||
      (now.getUTCMonth() === dateOfBirth.getUTCMonth() &&
        now.getUTCDate() < dateOfBirth.getUTCDate())
    ) {
      age -= 1;
    }

    if (age < 14 || age > 100) errors.dateOfBirth = "Enter a valid date of birth";
    else data.dateOfBirth = dateOfBirth;
  }

  // Contact
  const whatsappNumber = normalizePhone(body.whatsappNumber);

  if (!whatsappNumber) errors.whatsappNumber = "Enter a valid 10-digit mobile number";
  else data.whatsappNumber = whatsappNumber;

  if (text(body.alternateContactNumber)) {
    const alternate = normalizePhone(body.alternateContactNumber);

    if (!alternate) errors.alternateContactNumber = "Enter a valid 10-digit mobile number";
    else data.alternateContactNumber = alternate;
  } else {
    data.alternateContactNumber = "";
  }

  const email = text(body.email).toLowerCase();

  if (!email) errors.email = "Email is required";
  else if (email.length > LIMITS.email || !EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address";
  } else data.email = email;

  // Address
  requiredText("permanentAddress", "Permanent address", LIMITS.address);
  requiredText("currentCity", "Current city", LIMITS.shortText);
  requiredText("currentDistrict", "Current district", LIMITS.shortText);

  // Education
  oneOf("educationQualification", "a qualification", EDUCATION_QUALIFICATIONS);
  optionalText("specialization", "Specialization", LIMITS.shortText);

  const passingYear = Number(text(String(body.passingYear ?? "")));
  const thisYear = new Date().getFullYear();

  if (!Number.isInteger(passingYear) || passingYear < 1970 || passingYear > thisYear + 6) {
    errors.passingYear = "Enter a valid passing year";
  } else data.passingYear = passingYear;

  // Professional
  oneOf("professionalStatus", "a professional status", PROFESSIONAL_STATUSES);
  oneOf("workExperienceCategory", "your work experience", WORK_EXPERIENCE_CATEGORIES);

  const experienced = data.workExperienceCategory && data.workExperienceCategory !== FRESHER;

  if (experienced) {
    requiredText("currentOrLastJobProfile", "Job profile", LIMITS.shortText);
    requiredText("currentOrLastCompany", "Company", LIMITS.shortText);
  } else {
    optionalText("currentOrLastJobProfile", "Job profile", LIMITS.shortText);
    optionalText("currentOrLastCompany", "Company", LIMITS.shortText);
  }

  const skills = cleanList(body.skills, { max: LIMITS.maxSkills });

  if (!skills) errors.skills = `Add 1 to ${LIMITS.maxSkills} skills`;
  else data.skills = skills;

  // Preferences
  const targetIndustries = cleanList(body.targetIndustries, {
    max: TARGET_INDUSTRIES.length,
    allowed: TARGET_INDUSTRIES,
  });

  if (!targetIndustries) errors.targetIndustries = "Select at least one industry";
  else data.targetIndustries = targetIndustries;

  const preferredJobLocations = cleanList(body.preferredJobLocations, {
    max: LIMITS.maxLocations,
  });

  if (!preferredJobLocations) {
    errors.preferredJobLocations = `Add 1 to ${LIMITS.maxLocations} locations`;
  } else data.preferredJobLocations = preferredJobLocations;

  if (body.declarationAccepted !== true) {
    errors.declarationAccepted = "You must accept the declaration";
  } else data.declarationAccepted = true;

  return {
    data,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}
