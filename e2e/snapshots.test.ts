import { expect, test } from '@playwright/test';

test('inbox page snapshot should be accessible', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk due:8/20/25');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByPlaceholder('What do you need to do?').fill('Wash the car blocks:2');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (2)').click();

  await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'inbox.aria.yaml' });
});
