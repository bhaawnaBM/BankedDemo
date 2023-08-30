module.exports = {
  timeout: 60000,
  fullyParallel: false,
  retries: 0,
  testDir: 'tests',
  use: {
    headless: false,
    viewport: { width: 1280, height: 1280 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
    baseURL: 'https://demo.banked.com',
    reporter: 'always',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },

    // {
    //   name: 'Firefox',
    //   use: { browserName:'firefox'},
    // },

    // {
    //   name: 'Webkit',
    //   use: { browserName:'webkit' },
    // },
  ],
}
