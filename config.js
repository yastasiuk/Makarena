module.exports = {
    url: 'https://www.bet365.com/#/IP/',
    puppeteerConfig: {
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--no-default-browserLocator-check',
        '--disable-web-security',
        '--disable-extensions',
        '--allow-running-insecure-content',
      ],
    },
}