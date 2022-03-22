import { test, expect } from "@playwright/test";
import { APP_HOST } from "./locals";

test("basic test", async ({ page }) => {
  await page.goto(APP_HOST);
  await expect(page).toHaveTitle(/Quaestio/);
});
