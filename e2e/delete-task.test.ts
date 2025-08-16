import { expect, test } from '@playwright/test';

test('you should be able to delete a task', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (1)').click();

  await expect(page.getByRole('cell', { name: 'Buy milk', exact: true })).toBeVisible();

  await page.getByTitle('Delete Buy milk').click();
  await expect(page.getByRole('cell', { name: 'Buy milk' })).not.toBeVisible();
});
