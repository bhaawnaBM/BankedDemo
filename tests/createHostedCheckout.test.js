import { test } from '@playwright/test'
import { CreateHostedCheckout } from '../pages/CreateHostedCheckout'
import { PayByBank } from '../pages/payByBank'

test.describe('Mock Bank AU', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/new')
  })

  test('Create a Hosted Checkout for AU region for a New Customer', async ({
    page,
  }) => {
    const createHostedChkout = new CreateHostedCheckout(page)
    await createHostedChkout.performCreateHostedCheckout()
  })

  test('Mocks successful creation of Agreement and payment with delay', async ({
    page,
  }) => {
    const createHostedChkout = new CreateHostedCheckout(page)
    await createHostedChkout.performCreateHostedCheckout()

    const payByBank = new PayByBank(page)
    await payByBank.selectFromBank()
    await payByBank.enterAccountDetails('Mr John Smith', '111-114', '12345678')
    await payByBank.validateSucccessfullMessageDisplayed()
  })

  test('creation of Agreement and payment failed', async ({ page }) => {
    const createHostedChkout = new CreateHostedCheckout(page)
    await createHostedChkout.performCreateHostedCheckout()

    const payByBank = new PayByBank(page)
    await payByBank.selectFromBank()
    await payByBank.enterAccountDetails('Mr John Smith', '111-114', '12345678')
    await payByBank.validateFailureMsgDisplayed()
  })

  // test('Mocks successful creation of Agreement(AD) and payment(PD) with delay', async ({
  //   page,
  // }) => {
  //   const createHostedChkout = new CreateHostedCheckout(page)
  //   await createHostedChkout.performCreateHostedCheckout()

  //   const payByBank = new PayByBank(page)
  //   await payByBank.selectFromBank()
  //   await payByBank.enterAccountDetails('Mr John Smith', '111-114', '050511')
  // })

  // test('Mocks failure creating anagreement.', async ({ page }) => {
  //   const createHostedChkout = new CreateHostedCheckout(page)
  //   await createHostedChkout.performCreateHostedCheckout()

  //   const payByBank = new PayByBank(page)
  //   await payByBank.selectFromBank()
  //   await payByBank.enterAccountDetails('Mr John Smith', '111-114', '010112')
  // })

  // test('Mocks payment failure due to Insufficient funds', async ({ page }) => {
  //   const createHostedChkout = new CreateHostedCheckout(page)
  //   await createHostedChkout.performCreateHostedCheckout()

  //   const payByBank = new PayByBank(page)
  //   await payByBank.selectFromBank()
  //   await payByBank.enterAccountDetails('Mr John Smith', '111-114', '010124')
  // })
})
