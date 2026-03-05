import { expect, Page, test } from "@playwright/test";

function getAuthCredentials() {
  const email = process.env.E2E_TEST_EMAIL;
  const password = process.env.E2E_TEST_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to run authenticated flows.",
    );
  }

  return { email, password };
}

async function signIn(page: Page) {
  const { email, password } = getAuthCredentials();

  await page.goto("/sign-in");

  const emailInput = page
    .locator('input[name="identifier"], input[type="email"]')
    .first();
  await emailInput.fill(email);
  await emailInput.press("Enter");

  const passwordInput = page
    .locator('input[name="password"], input[type="password"]')
    .first();

  await passwordInput.waitFor({ state: "visible", timeout: 15_000 });
  await passwordInput.fill(password);
  await passwordInput.press("Enter");

  await page.waitForURL(/\/($|\?)/, { timeout: 45_000 });
}

test.describe("authenticated user flows", () => {
  test.skip(
    !process.env.E2E_TEST_EMAIL || !process.env.E2E_TEST_PASSWORD,
    "Set E2E_TEST_EMAIL and E2E_TEST_PASSWORD to run authenticated flows.",
  );

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
