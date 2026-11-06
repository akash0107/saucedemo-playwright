const { test, expect } = require('../../fixtures/test.fixture');

test.beforeEach(async ({ inventory }) => {
  await inventory.gotoInventory();

  await expect(inventory.title).toBeVisible();
});


test('sauce demo checkout @smoke', { tag: "@smoke" }, async ({ inventory, cart, checkout, step }, testInfo) => {

  testInfo.annotations.push({
    type: 'feature',
    description: 'Checkout happy path',
  });

  await step('Add product to cart and checkout', async () => {
    await inventory.addProductByName('Sauce Labs Backpack');
    await inventory.openCart();
  });

  await step('Fill checkout info', async () => {
    await cart.checkout();
    await checkout.fillInfo('Akash', 'Debnath', '411001');
  });

  await step('Finish order', async () => {
    await checkout.finish();
    await expect(checkout.completeHeader).toBeVisible();
  });
});
