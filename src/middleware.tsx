import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/stripe",
  "/api/webhooks/clerk",
]);

/* export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
}); */

export default async function middleware(request: NextRequest) {
  console.log("\u001b[1;32m" + request.url + "\u001b[0m");

  try {
    const response = await clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })(request, {} as NextFetchEvent);

    if (!response) {
      throw new TypeError("Expected an instance of Response to be returned");
    }

    return response;
  } catch (error) {
    console.log("\u001b[1;31m" + error + "\u001b[0m");
    return NextResponse.redirect("/error");
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
