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
