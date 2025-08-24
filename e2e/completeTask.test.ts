import { expect, test } from '@playwright/test';
import { goToInbox, quickAdd, start } from './utils';

test('you should be able to complete a task', async ({ page }) => {
  await start(page);
  await quickAdd(page, 'Buy milk');
  await goToInbox(page);

  const complete = page.getByRole('checkbox', { name: 'Mark Buy milk complete' });

  await expect(complete).not.toBeChecked();
  await complete.check();
});
