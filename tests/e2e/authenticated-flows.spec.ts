import { expect, Page, test } from "@playwright/test";

const E2E_TEST_EMAIL = process.env.E2E_TEST_EMAIL;
const E2E_TEST_PASSWORD = process.env.E2E_TEST_PASSWORD;

async function signIn(page: Page) {
  await page.goto("/sign-in");

  const emailInput = page
    .locator('input[name="identifier"], input[type="email"]')
    .first();
  await emailInput.fill(E2E_TEST_EMAIL!);
  await emailInput.press("Enter");

  const passwordInput = page
    .locator('input[name="password"], input[type="password"]')
    .first();

  await passwordInput.waitFor({ state: "visible", timeout: 15_000 });
  await passwordInput.fill(E2E_TEST_PASSWORD!);
  await passwordInput.press("Enter");

  await page.waitForURL(/\/($|\?)/, { timeout: 45_000 });
}

test.describe("authenticated user flows", () => {
  test.beforeEach(async ({ page }) => {
    test.skip(
      !E2E_TEST_EMAIL || !E2E_TEST_PASSWORD,
      "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to run authenticated flows.",
    );
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
