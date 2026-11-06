class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postal = page.getByPlaceholder('Zip/Postal Code');
    this.continueBtn = page.getByRole('button', { name: 'Continue' });
    this.finishBtn = page.getByRole('button', { name: 'Finish' });
    this.completeHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async fillInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postal.fill(zip);
    await this.continueBtn.click();
  }

  async finish() {
    await this.finishBtn.click();
  }
}

module.exports = { CheckoutPage };