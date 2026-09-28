// Usage (values come from env vars, never hardcoded):
//   ADMIN_EMAIL=... ADMIN_PASSWORD=... ADMIN_FIRST_NAME=... ADMIN_LAST_NAME=... npm run create-admin
// MONGODB_URI is loaded from .env via `node --env-file=.env`.
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const {
  MONGODB_URI,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} = process.env;

const missing = [
  ["MONGODB_URI", MONGODB_URI],
  ["ADMIN_EMAIL", ADMIN_EMAIL],
  ["ADMIN_PASSWORD", ADMIN_PASSWORD],
  ["ADMIN_FIRST_NAME", ADMIN_FIRST_NAME],
  ["ADMIN_LAST_NAME", ADMIN_LAST_NAME],
]
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

if (ADMIN_PASSWORD.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters.");
  process.exit(1);
}

const email = ADMIN_EMAIL.trim().toLowerCase();

try {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });

  // Import after connecting so the shared model registers on this mongoose instance.
  const { default: User } = await import("../models/User.js");

  if (await User.exists({ email })) {
    console.error(`A user with email ${email} already exists. Nothing created.`);
    process.exitCode = 1;
  } else {
    const user = await User.create({
      firstName: ADMIN_FIRST_NAME.trim(),
      lastName: ADMIN_LAST_NAME.trim(),
      email,
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
      role: "ADMIN",
      companyId: null,
      status: "ACTIVE",
    });

    console.log(`Admin created: ${user.email} (id ${user._id})`);
  }
} catch (error) {
  console.error("Failed to create admin:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
