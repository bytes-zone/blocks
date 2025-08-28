import { expect, test } from '@playwright/test';
import { addArea, goToInbox, quickAdd, start } from './utils';

test('nav should be accessible', async ({ page }) => {
  await start(page);

  await quickAdd(page, 'Buy milk due:in 2 days');
  await addArea(page, 'Home');
  await addArea(page, 'Work');

  await expect(page.getByRole('banner')).toMatchAriaSnapshot({ name: 'nav.aria.yaml' });
});

test('inbox page snapshot should be accessible', async ({ page }) => {
  await start(page);

  await quickAdd(page, 'Buy milk due:in 2 days');
  await quickAdd(page, 'Wash the car blocks:2');

  await goToInbox(page);

  await page.getByRole('button', { name: 'Edit Buy milk', exact: true }).click();

  await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'inbox.aria.yaml' });
});

test('area page snapshot should be accessible', async ({ page }) => {
  await start(page);

  await addArea(page, 'Gardening');
  await page.getByRole('link', { name: 'Gardening' }).click();

  await expect(page.getByRole('main')).toMatchAriaSnapshot({ name: 'area.aria.yaml' });
});
