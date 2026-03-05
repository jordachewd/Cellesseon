import { expect, Page, test } from "@playwright/test";
import {
  getE2ETestUser,
  missingCredentialsError,
  requireE2ETestUser,
} from "./utils/e2e-test-user";

const e2eTestUser = getE2ETestUser();

async function signIn(page: Page) {
  const { identifier, password } = requireE2ETestUser();

  await page.goto("/sign-in");

  const identifierInput = page
    .locator('input[name="identifier"], input[type="email"]')
    .first();
  await identifierInput.fill(identifier);
  await identifierInput.press("Enter");

  const passwordInput = page
    .locator('input[name="password"], input[type="password"]')
    .first();

  await passwordInput.waitFor({ state: "visible", timeout: 15_000 });
  await passwordInput.fill(password);
  await passwordInput.press("Enter");

  await page.waitForURL(/\/($|\?)/, { timeout: 45_000 });
  await page.waitForLoadState("networkidle");
}

test.describe("authenticated user flows", () => {
  test.skip(!e2eTestUser, missingCredentialsError);

  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test("opens profile and plans pages after sign-in", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();

    await page.goto("/plans");
    await expect(
      page.getByRole("heading", { name: /your plan/i }),
    ).toBeVisible();
  });

  test("redirects non-admin users from dashboard to unauthorized screen", async ({
    page,
  }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/401$/);
    await expect(
      page.getByRole("heading", { name: "Unauthorized" }),
    ).toBeVisible();
  });

  test("allows logout from avatar menu", async ({ page }) => {
    await page.goto("/");

    const accountButton = page.locator('button[aria-haspopup="true"]').first();
    await accountButton.click();
    await page.getByText("Logout").click();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("link", { name: "Try it for free" }),
    ).toBeVisible();
  });
});
