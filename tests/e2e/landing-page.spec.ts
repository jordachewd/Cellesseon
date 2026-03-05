import { expect, test } from "@playwright/test";

test("loads landing page for unauthenticated users", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Cellesseon/i);
  await expect(
    page.getByText("Simplify tasks and boost productivity"),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Try it for free" }),
  ).toBeVisible();
});

test("toggles dark mode and persists it after reload", async ({ page }) => {
  await page.goto("/");

  const darkModeButton = page.getByRole("button", {
    name: "Switch to dark mode",
  });
  await darkModeButton.click();

  await expect(page.locator("html")).toHaveAttribute(
    "data-cellesseon-theme",
    "dark",
  );

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute(
    "data-cellesseon-theme",
    "dark",
  );
});
