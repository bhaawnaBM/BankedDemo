const { expect } = require('@playwright/test')

exports.PayByBank = class PayByBank {
  constructor(page) {
    this.page = page
    this.mockBank = 'data-testid=Mock Bank'
    this.accountName = 'data-testid=ACCOUNT_NAME'
    this.bsbNum = 'data-testid=BSB_NUMBER'
    this.accountNum = 'data-testid=ACCOUNT_NUMBER'
    this.continueBtn = 'data-testid=supplemental-attr-form-submit'
    this.paymentComplete = "//p[contains(text(),'Payment Complete')]"
    this.paymentFailed = "//p[contains(text(),'Payment Failed')]"
    this.changeBankBtn = 'data-testid=change-bank'
    this.cancleBtn = 'data-testid=cancel-payment'
  }

  async selectFromBank() {
    await this.page.locator(this.mockBank).click()
  }

  async enterAccountDetails(accountName, bsb, accountNumber) {
    await this.page.fill(this.accountName, accountName)
    await this.page.fill(this.bsbNum, bsb)
    await this.page.click(this.accountNum)
    await this.page.fill(this.accountNum, accountNumber)
    await this.page.click(this.continueBtn)
    await expect(
      this.page.getByRole('heading', {
        name: 'Checking your bank details with Mock Bank AU',
      })
    ).toBeVisible()
  }

  async validateSucccessfullMessageDisplayed() {
    try {
      await this.page.waitForTimeout(10000)
      await expect(this.page.locator(this.paymentComplete)).toBeVisible()
      await expect(this.paymentComplete).toContain('Payment Complete')
      await this.page.waitForTimeout(10000)
      await expect(
        this.page.getByRole('heading', { label: 'Banked :' })
      ).toBeVisible()
    } catch (error) {
      throw error
    }
  }

  async validateFailureMsgDisplayed() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Checking your bank details with Mock Bank AU',
      })
    ).toBeVisible()
    await this.page.waitForTimeout(10000)
    await expect(this.paymentFailed).toContain('Payment Failed')
    const changeBankBtn = await this.page.waitForSelector(this.changeBankBtn)
    await expect(changeBankBtn).toBeTruthy()
    await this.page.click(this.cancleBtn)
    await expect(
      this.page.getByRole('heading', { label: 'Banked :' })
    ).toBeVisible()
  }
}
