import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const authState = vi.hoisted(() => ({
  userId: null as string | null,
  role: null as string | null,
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware: (
    handler: (
      auth: () => Promise<{
        userId: string | null;
        sessionClaims?: { metadata?: { role?: string } };
      }>,
      req: NextRequest,
    ) => unknown,
  ) => {
    return (req: NextRequest) =>
      handler(
        async () => ({
          userId: authState.userId,
          sessionClaims: authState.role
            ? { metadata: { role: authState.role } }
            : undefined,
        }),
        req,
      );
  },
  createRouteMatcher: (patterns: string[]) => {
    return (req: NextRequest) => {
      const pathname = req.nextUrl.pathname;

      if (patterns.includes("/dashboard/:path*")) {
        return pathname === "/dashboard" || pathname.startsWith("/dashboard/");
      }

      return patterns.some((pattern) => {
        if (pattern === "/") {
          return pathname === "/";
        }

        if (pattern === "/sign-in(.*)") {
          return pathname.startsWith("/sign-in");
        }

        if (pattern === "/sign-up(.*)") {
          return pathname.startsWith("/sign-up");
        }

        return pathname === pattern;
      });
    };
  },
}));

import { proxy } from "@/proxy";

describe("proxy route protection", () => {
  beforeEach(() => {
    authState.userId = null;
    authState.role = null;
  });

  it("allows unauthenticated access to public routes", async () => {
    const request = new NextRequest("http://localhost:3000/");
    const response = await proxy(request, {} as never);

    expect(response).toBeUndefined();
  });

  it("allows unauthenticated webhook requests for Stripe and Clerk", async () => {
    const stripeWebhookRequest = new NextRequest(
      "http://localhost:3000/api/webhooks/stripe",
    );
    const clerkWebhookRequest = new NextRequest(
      "http://localhost:3000/api/webhooks/clerk",
    );

    const stripeResponse = await proxy(stripeWebhookRequest, {} as never);
    const clerkResponse = await proxy(clerkWebhookRequest, {} as never);

    expect(stripeResponse).toBeUndefined();
    expect(clerkResponse).toBeUndefined();
  });

  it("redirects unauthenticated users from protected routes to /sign-in", async () => {
    const request = new NextRequest("http://localhost:3000/profile");
    const response = await proxy(request, {} as never);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe(
      "http://localhost:3000/sign-in",
    );
  });

  it("redirects non-admin users away from /dashboard", async () => {
    authState.userId = "user_123";
    authState.role = "user";

    const request = new NextRequest("http://localhost:3000/dashboard");
    const response = await proxy(request, {} as never);

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe("http://localhost:3000/401");
  });

  it("allows admin users to access /dashboard", async () => {
    authState.userId = "user_123";
    authState.role = "admin";

    const request = new NextRequest("http://localhost:3000/dashboard");
    const response = await proxy(request, {} as never);

    expect(response).toBeUndefined();
  });
});
