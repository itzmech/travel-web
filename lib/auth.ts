import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE = "wander_session";

const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

/**
 * Secret used to sign session JWTs. Provide it via the AUTH_SECRET
 * environment variable (see .env.example). In non-production a stable
 * development secret is used so local logins survive restarts.
 */
function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV !== "production"
      ? "dev-only-insecure-secret-change-me"
      : undefined);

  if (!secret) {
    throw new Error(
      "AUTH_SECRET environment variable is required in production."
    );
  }

  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  email: string;
};

/**
 * Credentials come from environment variables, never from source.
 * Local development falls back to well-known demo values so the app
 * is usable out of the box.
 */
export function isValidCredentials(email: string, password: string): boolean {
  const validEmail = (process.env.AUTH_EMAIL ?? "admin@wander.demo").toLowerCase();
  const validPassword = process.env.AUTH_PASSWORD ?? "wander-demo";

  return email.toLowerCase() === validEmail && password === validPassword;
}

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email } satisfies SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
