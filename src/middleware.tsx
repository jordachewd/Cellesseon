import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPrivateRoute = createRouteMatcher(["/dashboard/:path*"]);
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  try {
    const { userId, sessionClaims, redirectToSignIn } = await auth();
    const isAdmin = sessionClaims?.metadata?.role === "admin";

    // Redirect to sign-in if the route is private and the user is not logged in
    if (!userId && !isPublicRoute(req)) {
      return redirectToSignIn({ returnBackUrl: "/workspace" });
    }

    // Allow access to private routes if the user is signed in and is an admin
    if (userId && !isAdmin && isPrivateRoute(req)) {
      const unAuthUrl = new URL("/401", req.url);
      return NextResponse.redirect(unAuthUrl);
    }
    
  } catch (error) {
    console.error("Error in middleware:", error);
    if (error instanceof Error && "digest" in error) {
      console.error("Error digest:", error.digest);
    }
    return NextResponse.redirect(new URL("/500", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

/** Resources: https://clerk.com/docs/references/nextjs/add-onboarding-flow */
