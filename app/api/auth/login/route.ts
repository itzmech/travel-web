import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  isValidCredentials,
} from "@/lib/auth";

/**
 * Simple in-memory sliding-window rate limiter (5 attempts / 15 min / IP).
 * Good enough for a single instance; swap for a shared store (e.g. Redis)
 * when running multiple server instances.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const attempts = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);
  return false;
}

function clearAttempts(key: string) {
  attempts.delete(key);
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toString()?.trim() ?? "";
  const password = body?.password?.toString() ?? "";

  if (!isValidCredentials(email, password)) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 }
    );
  }

  clearAttempts(ip);

  const token = await createSessionToken(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  return response;
}
