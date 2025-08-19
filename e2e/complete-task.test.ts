import { expect, test } from '@playwright/test';

test('you should be able to complete a task', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (1)').click();

  const complete = page.getByRole('checkbox', { name: 'Mark Buy milk complete' });

  await expect(complete).not.toBeChecked();
  await complete.check();
});
