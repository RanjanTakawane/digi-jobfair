import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    middleName: { type: String, trim: true, maxlength: 50, default: "" },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },

    whatsappNumber: { type: String, required: true, unique: true, trim: true },
    alternateContactNumber: { type: String, trim: true, default: "" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    permanentAddress: { type: String, required: true, trim: true, maxlength: 300 },
    currentCity: { type: String, required: true, trim: true },
    currentDistrict: { type: String, required: true, trim: true },

    educationQualification: { type: String, required: true },
    specialization: { type: String, trim: true, default: "" },
    passingYear: { type: Number, required: true },

    professionalStatus: { type: String, required: true },
    workExperienceCategory: { type: String, required: true },
    currentOrLastJobProfile: { type: String, trim: true, default: "" },
    currentOrLastCompany: { type: String, trim: true, default: "" },

    skills: { type: [String], default: [] },
    targetIndustries: { type: [String], default: [] },
    preferredJobLocations: { type: [String], default: [] },

    declarationAccepted: { type: Boolean, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Candidate ||
  mongoose.model("Candidate", candidateSchema);
