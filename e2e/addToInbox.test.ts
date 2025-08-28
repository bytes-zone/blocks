import { expect, test } from '@playwright/test';
import { goToInbox, quickAdd, start } from './utils';

test('quick-adding a task should send it to the inbox', async ({ page }) => {
  await start(page);
  await quickAdd(page, 'Buy milk');
  await goToInbox(page);

  await expect(page.getByText('Buy milk', { exact: true })).toBeVisible();
});
