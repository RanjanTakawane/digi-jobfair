import mongoose from "mongoose";

export const USER_ROLES = ["ADMIN", "COMPANY_EMPLOYEE"];
export const USER_STATUSES = ["ACTIVE", "INACTIVE"];

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: USER_ROLES, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    status: { type: String, enum: USER_STATUSES, default: "ACTIVE" },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);
