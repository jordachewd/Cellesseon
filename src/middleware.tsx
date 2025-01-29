/** Resource: https://clerk.com/docs/references/nextjs/add-onboarding-flow */
import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
]);

const isPrivateRoute = createRouteMatcher(["/dashboard/:path*"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  const isBoardingComplete = sessionClaims?.metadata?.onboardingComplete;

  // Redirect to sign-in if the route is private and the user is not logged in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is logged in but hasn't completed onboarding, revoke the session
  if (userId && !isBoardingComplete) {
    const sessionId = sessionClaims?.sid;

    const client = await clerkClient();
    const response = await client.sessions.revokeSession(sessionId);

    if (response.status === "200") {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  // Allow access to private routes if the user is signedin and is an admin
  if (userId && !isAdmin && isPrivateRoute(req)) {
    console.log("isPrivateRoute", isPrivateRoute(req));

    const signInUrl = new URL("/401", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
