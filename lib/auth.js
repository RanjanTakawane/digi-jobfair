import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "auth_token";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, seconds

function getSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Please define the JWT_SECRET environment variable in .env");
  }

  return new TextEncoder().encode(secret);
}

export async function createToken({ userId, role }) {
  return new SignJWT({ userId: String(userId), role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || "7d")
    .sign(getSecret());
}

// Returns the payload ({ userId, role }) or null if missing/invalid/expired.
export async function verifyToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });

    if (!payload.userId || !payload.role) return null;

    return payload;
  } catch {
    return null;
  }
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  };
}
