/** Resource: https://clerk.com/docs/references/nextjs/add-onboarding-flow */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
]);

const isPrivateRoute = createRouteMatcher(["/(admin)(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  const isBoardingComplete = sessionClaims?.metadata?.onboardingComplete;

  // Redirect to sign-in if the route is private and the user is not logged in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is logged in but hasn't completed onboarding, redirect to "/"
  if (userId && !isBoardingComplete) {
    const onboardingUrl = new URL("/", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // Allow access to private routes if the user is signed in and is an admin
  if (userId && isAdmin && isPrivateRoute(req)) {
    return NextResponse.next();
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
