import { randomInt } from "crypto";

// No 0/O/1/I to keep the code readable
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// e.g. JF-26-K7M2QX
export function generateJobFairCode() {
  const year = String(new Date().getFullYear()).slice(-2);

  let suffix = "";

  for (let i = 0; i < 6; i++) {
    suffix += ALPHABET[randomInt(ALPHABET.length)];
  }

  return `JF-${year}-${suffix}`;
}
