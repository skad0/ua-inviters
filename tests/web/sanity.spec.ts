import { APP_HOST } from "../configs/locals";
import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto(APP_HOST);
  await expect(page).toHaveTitle(/Quaestio/);
});
