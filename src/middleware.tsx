/** Resource: https://clerk.com/docs/references/nextjs/add-onboarding-flow */
"use server";
import {
 // clerkClient,
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

//const isPrivateRoute = createRouteMatcher(["/dashboard/:path*"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
 // const { userId, sessionClaims, sessionId } = await auth();
 // const isAdmin = sessionClaims?.metadata?.role === "admin";
 // const isBoardingComplete = sessionClaims?.metadata?.onboardingComplete;

  // console.log("auth(): ", await auth());

  // Redirect to sign-in if the route is private and the user is not logged in
  if (!isPublicRoute(req)) {
    await auth.protect({
      unauthorizedUrl: new URL("/401", req.url).toString(),
      unauthenticatedUrl: new URL("/sign-in", req.url).toString(),
    });
  }

  // If the user is logged in but hasn't completed onboarding, revoke the session
/*   if (userId && !isBoardingComplete) {
    const client = await clerkClient();
    await client.sessions.revokeSession(sessionId);
  } */

  // Allow access to private routes if the user is signedin and is an admin
/*   if (userId && !isAdmin && isPrivateRoute(req)) {
    const signInUrl = new URL("/401", req.url);
    return NextResponse.redirect(signInUrl);
  } */

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
