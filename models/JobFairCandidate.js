import mongoose from "mongoose";

// One row per (job fair, candidate) registration
const jobFairCandidateSchema = new mongoose.Schema(
  {
    jobFairId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobFair",
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// A candidate can register once per job fair
jobFairCandidateSchema.index({ jobFairId: 1, candidateId: 1 }, { unique: true });

export default mongoose.models.JobFairCandidate ||
  mongoose.model("JobFairCandidate", jobFairCandidateSchema);
