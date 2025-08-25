import { expect, test } from '@playwright/test';
import { start, quickAdd, goToInbox } from './utils';

test('you should be able to edit dates for a task', async ({ page }) => {
  await start(page);
  await quickAdd(page, 'Buy milk');
  await goToInbox(page);

  await page.getByRole('button', { name: 'Edit Buy milk', exact: true }).click();

  // edit due date
  await page.getByLabel('Due').fill('in 2 days');
  await page.getByLabel('Due').blur();

  await page.keyboard.press('Escape');

  await expect(page.getByText('due in 2 days')).toBeVisible();
});
