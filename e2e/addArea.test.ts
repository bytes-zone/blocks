import { expect, test } from '@playwright/test';
import { addArea, start } from './utils';

test('you can add an area and navigate to it', async ({ page }) => {
  await start(page);

  // Add the area and make sure it shows up in the sidebar
  await addArea(page, 'Work');
  await expect(page.getByRole('navigation', { name: 'areas' }).getByRole('link')).toContainText(
    'Work',
  );

  // Go to the area and check that the heading is correct
  await page.getByRole('link', { name: 'Work' }).click();
  await expect(page.getByRole('heading', { name: 'Work' })).toBeVisible();
});
