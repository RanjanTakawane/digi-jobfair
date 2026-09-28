export function validateJobFair(data) {
  const errors = [];

  if (!data.name || !data.name.trim()) {
    errors.push("Job fair name is required");
  }

  if (!data.startDate) {
    errors.push("Start date is required");
  }

  if (!data.endDate) {
    errors.push("End date is required");
  }

  if (!data.venueName || !data.venueName.trim()) {
    errors.push("Venue name is required");
  }

  if (
    data.startDate &&
    data.endDate &&
    new Date(data.endDate) < new Date(data.startDate)
  ) {
    errors.push("End date cannot be before start date");
  }

  if (
    data.registrationStartDate &&
    data.registrationEndDate &&
    new Date(data.registrationEndDate) < new Date(data.registrationStartDate)
  ) {
    errors.push(
      "Registration end date cannot be before registration start date",
    );
  }

  if (
    data.organizerEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.organizerEmail)
  ) {
    errors.push("Invalid organizer email");
  }

  const allowedStatuses = [
    "draft",
    "published",
    "ongoing",
    "completed",
    "cancelled",
  ];

  if (data.status && !allowedStatuses.includes(data.status)) {
    errors.push("Invalid job fair status");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
