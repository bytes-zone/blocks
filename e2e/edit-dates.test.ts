import { expect, test } from '@playwright/test';

test('you should be able to edit dates for a task', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByText('Inbox (1)').click();

  await expect(page.getByRole('rowheader', { name: 'Buy milk', exact: true })).toBeVisible();

  // edit due date
  await page.getByRole('button', { name: 'No due date set' }).click();
  await page.getByLabel('Due date').fill('2027-01-01');
  await page.getByLabel('Due date').blur();

  await expect(
    page.getByRole('button', { name: '1/1/2027, 12:00:00 PM', exact: true }),
  ).toBeVisible();

  // clear due date
  await page.getByRole('button', { name: 'Clear due date' }).click();
  await expect(page.getByRole('button', { name: 'No due date set' })).toBeVisible();
});
