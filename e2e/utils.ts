import { Page } from 'playwright/test';

export async function start(page: Page) {
  await page.goto('/?demo=true');
}

export async function quickAdd(page: Page, text: string) {
  await page.getByRole('button', { name: 'Add item' }).click();

  await page.getByPlaceholder('What needs doing?').fill(text);
  await page.getByPlaceholder('What needs doing?').press('Enter');
}
