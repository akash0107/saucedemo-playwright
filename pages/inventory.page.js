class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async gotoInventory() {
    await this.page.goto('/inventory.html');
  }

  async inventoryPageLoad(){
    await this.page.waitForURL('**/inventory.html');
  }
}

module.exports = { InventoryPage };