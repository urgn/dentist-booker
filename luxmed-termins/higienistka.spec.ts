import { test, expect } from "@playwright/test";

test.skip("Higienistka", async ({ page }) => {
  await page.goto("https://www.luxmed.pl/");
  await page.getByRole("button", { name: "Zaloguj" }).click();
  await page
    .locator("#header")
    .getByRole("button", { name: "Portal Pacjenta" })
    .click();
  await page.getByPlaceholder("Login").fill(process.env.LUXMED_LOGIN);
  await page.getByPlaceholder("Hasło").fill(process.env.LUXMED_PASSWORD);
  await page.getByRole("button", { name: "Zaloguj się" }).click();
  await page.getByRole("button", { name: "Umów usługę" }).click();
  await page.locator(".click-area").click();
  await page.getByText("Stomatologia").click();
  await page
    .locator("#parent_4")
    .getByText("Higienistka stomatologiczna")
    .click();
  await page.getByRole("button", { name: "Szukaj" }).click();
  for (let day = 1; day <= 14; day++) {
    expect(
      await page
        .locator(`div:nth-child(${day}) > .card > .card-body > span`)
        .textContent()
    ).toMatch(/x|0/);
  }
});
