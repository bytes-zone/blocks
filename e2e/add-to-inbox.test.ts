import { expect, test } from '@playwright/test';

test('quick-adding a task should send it to the inbox', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (1)').click();

  await expect(page.getByText('Buy milk', { exact: true })).toBeVisible();
});
