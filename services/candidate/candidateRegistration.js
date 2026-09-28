import connectDB from "@/lib/mongodb";
import JobFair from "@/models/admin/JobFair";
import Candidate from "@/models/Candidate";
import JobFairCandidate from "@/models/JobFairCandidate";

const OPEN_STATUSES = ["published", "ongoing"];
const DAY_MS = 24 * 60 * 60 * 1000;
const TOKEN_REGEX = /^[a-f0-9]{64}$/;

export class RegistrationError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Resolves the job fair from the registration token and checks that
// registration is currently open. The token is the only thing the client sends.
export async function getOpenJobFair(token) {
  if (typeof token !== "string" || !TOKEN_REGEX.test(token)) {
    throw new RegistrationError(404, "This registration link is invalid");
  }

  await connectDB();

  const jobFair = await JobFair.findOne({
    candidateRegistrationToken: token,
    isDeleted: false,
  })
    .select("name status registrationStartDate registrationEndDate")
    .lean();

  if (!jobFair) {
    throw new RegistrationError(404, "This registration link is invalid");
  }

  const now = Date.now();
  const start = jobFair.registrationStartDate?.getTime();
  const end = jobFair.registrationEndDate?.getTime();

  const open =
    OPEN_STATUSES.includes(jobFair.status) &&
    (!start || now >= start) &&
    (!end || now < end + DAY_MS); // end date is inclusive

  if (!open) {
    throw new RegistrationError(403, "Registration is not open for this job fair");
  }

  return jobFair;
}

// `data` is the validated candidate object. Returns the registration id.
export async function createCandidate(data, token) {
  const jobFair = await getOpenJobFair(token);

  // The same person (WhatsApp number) can register for several job fairs and
  // keeps a single profile; an existing profile is reused, never overwritten.
  let candidate = await Candidate.findOne({
    whatsappNumber: data.whatsappNumber,
  })
    .select("_id")
    .lean();

  if (!candidate) {
    try {
      candidate = await Candidate.create(data);
    } catch (error) {
      // lost a race with a concurrent registration of the same number
      if (error?.code === 11000 && error.keyPattern?.whatsappNumber) {
        candidate = await Candidate.findOne({
          whatsappNumber: data.whatsappNumber,
        })
          .select("_id")
          .lean();
      }

      if (!candidate) throw error;
    }
  }

  // Unique (jobFairId, candidateId): a duplicate throws 11000
  const registration = await JobFairCandidate.create({
    jobFairId: jobFair._id,
    candidateId: candidate._id,
  });

  await JobFair.updateOne({ _id: jobFair._id }, { $inc: { candidateCount: 1 } });

  return String(registration._id);
}
