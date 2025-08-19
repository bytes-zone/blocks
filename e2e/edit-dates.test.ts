import { expect, test } from '@playwright/test';

test('you should be able to edit dates for a task', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (1)').click();

  await page.getByRole('button', { name: 'Edit Buy milk', exact: true }).click();

  // edit due date
  await page.getByLabel('Due').fill('in 2 days');
  await page.getByLabel('Due').blur();

  await page.keyboard.press('Escape');

  await expect(page.getByText('due in 2 days')).toBeVisible();
});
