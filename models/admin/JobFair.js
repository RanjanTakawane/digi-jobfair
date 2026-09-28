import mongoose from "mongoose";

const JobFairSchema = new mongoose.Schema(
  {
    jobFairCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    // Event dates
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      trim: true,
      default: "",
    },

    endTime: {
      type: String,
      trim: true,
      default: "",
    },

    // Registration window
    registrationStartDate: {
      type: Date,
      default: null,
    },

    registrationEndDate: {
      type: Date,
      default: null,
    },

    // Venue
    venueName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    district: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    pincode: {
      type: String,
      trim: true,
      default: "",
    },

    // Organizer
    organizerName: {
      type: String,
      trim: true,
      default: "",
    },

    organizerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    organizerPhone: {
      type: String,
      trim: true,
      default: "",
    },

    expectedCandidates: {
      type: Number,
      min: 0,
      default: 0,
    },

    expectedCompanies: {
      type: Number,
      min: 0,
      default: 0,
    },

    // QR registration tokens
    candidateRegistrationToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    companyParticipationToken: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    candidateRegistrationUrl: {
      type: String,
      required: true,
    },

    companyParticipationUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published",
        "ongoing",
        "completed",
        "cancelled",
      ],
      default: "draft",
      index: true,
    },

    candidateCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    companyCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Admin who created the job fair (set server-side from the session)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes
JobFairSchema.index({ createdAt: -1 });
JobFairSchema.index({ startDate: 1 });

const JobFair =
  mongoose.models.JobFair ||
  mongoose.model("JobFair", JobFairSchema);

export default JobFair;