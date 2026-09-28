export const JOB_FAIR_STATUSES = [
  "draft",
  "published",
  "ongoing",
  "completed",
  "cancelled",
];

// Statuses an admin may pick when creating (matches the create form)
const CREATE_STATUSES = ["draft", "published"];

const TEXT_LIMITS = {
  name: 200,
  description: 2000,
  venueName: 200,
  address: 500,
  city: 100,
  district: 100,
  state: 100,
  pincode: 20,
  organizerName: 200,
  organizerEmail: 200,
  organizerPhone: 30,
};

const DATE_FIELDS = [
  "startDate",
  "endDate",
  "registrationStartDate",
  "registrationEndDate",
];

const TIME_FIELDS = ["startTime", "endTime"];
const COUNT_FIELDS = ["expectedCandidates", "expectedCompanies"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Validates a create-job-fair request and returns an allowlisted `data`
 * object. Any field not listed here (jobFairCode, tokens, URLs, counts,
 * isDeleted, createdBy, ...) is dropped and stays server controlled.
 */
export function validateJobFair(body) {
  const errors = [];
  const data = {};

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, errors: ["Invalid request body"], data };
  }

  for (const [field, max] of Object.entries(TEXT_LIMITS)) {
    const value = body[field];

    if (value === undefined || value === null || value === "") {
      data[field] = "";
      continue;
    }

    if (typeof value !== "string") {
      errors.push(`${field} must be a string`);
      continue;
    }

    const trimmed = value.trim();

    if (trimmed.length > max) {
      errors.push(`${field} must be at most ${max} characters`);
    }

    data[field] = trimmed;
  }

  if (!data.name) errors.push("Job fair name is required");
  if (!data.venueName) errors.push("Venue name is required");

  data.organizerEmail = data.organizerEmail?.toLowerCase();

  if (data.organizerEmail && !EMAIL_REGEX.test(data.organizerEmail)) {
    errors.push("Invalid organizer email");
  }

  for (const field of DATE_FIELDS) {
    const value = body[field];

    if (!value) {
      data[field] = null;
      continue;
    }

    const date = typeof value === "string" ? new Date(value) : null;

    if (!date || Number.isNaN(date.getTime())) {
      errors.push(`${field} is not a valid date`);
      continue;
    }

    data[field] = date;
  }

  if (!data.startDate) errors.push("Start date is required");
  if (!data.endDate) errors.push("End date is required");

  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    errors.push("End date cannot be before start date");
  }

  if (
    data.registrationStartDate &&
    data.registrationEndDate &&
    data.registrationEndDate < data.registrationStartDate
  ) {
    errors.push(
      "Registration end date cannot be before registration start date",
    );
  }

  for (const field of TIME_FIELDS) {
    const value = body[field];

    if (!value) {
      data[field] = "";
    } else if (typeof value !== "string" || !TIME_REGEX.test(value)) {
      errors.push(`${field} must be in HH:MM format`);
    } else {
      data[field] = value;
    }
  }

  for (const field of COUNT_FIELDS) {
    const value = body[field];

    if (value === undefined || value === null || value === "") {
      data[field] = 0;
      continue;
    }

    const count = Number(value);

    if (!Number.isInteger(count) || count < 0) {
      errors.push(`${field} must be a non-negative whole number`);
      continue;
    }

    data[field] = count;
  }

  if (body.status === undefined || body.status === null || body.status === "") {
    data.status = "draft";
  } else if (!CREATE_STATUSES.includes(body.status)) {
    errors.push(`Status must be one of: ${CREATE_STATUSES.join(", ")}`);
  } else {
    data.status = body.status;
  }

  return { valid: errors.length === 0, errors, data };
}
