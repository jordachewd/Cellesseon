export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: "admin" | "client";
      onboardingComplete?: boolean;
    };
  }
}
