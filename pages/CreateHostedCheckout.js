const { expect } = require('@playwright/test')

exports.CreateHostedCheckout = class CreateHostedCheckout {
  constructor(page) {
    this.page = page
    this.newCustomer = '#new-customer'
    this.selectRegion = 'data-testid=region-selector'
    this.createHostedCheckoutBtn = 'data-testid=create-hosted-checkout'
  }

  async performCreateHostedCheckout() {
    await this.page.locator(this.newCustomer).check()
    await expect(this.page.locator(this.newCustomer).isChecked()).toBeTruthy()
    await this.page.locator(this.selectRegion).selectOption({ label: 'AU' })
    await this.page.waitForSelector(this.createHostedCheckoutBtn)
    await this.page.locator(this.createHostedCheckoutBtn).click()
    await expect(
      this.page.getByRole('heading', { label: 'Pay by Bank' })
    ).toBeVisible()
  }
}
