import { Page } from 'playwright/test';

export async function start(page: Page) {
  await page.goto('/?demo=true');
}

export async function goToInbox(page: Page) {
  await page.getByRole('navigation').getByText('Inbox').click();
}

export async function quickAdd(page: Page, text: string) {
  await page.getByRole('button', { name: 'Add item' }).click();

  await page.getByPlaceholder('What needs doing?').fill(text);
  await page.getByPlaceholder('What needs doing?').press('Enter');
}

export async function addArea(page: Page, text: string) {
  await page.getByRole('button', { name: 'Add area' }).click();

  await page.getByLabel('Title').fill(text);

  await page.getByRole('button', { name: 'Create' }).click();
}
