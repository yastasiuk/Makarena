const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const random_useragent = require("random-useragent");
const { puppeteerConfig } = require('../config');

puppeteer.use(StealthPlugin());

class Browser {
  async createBrowser() {
    this.browser = await puppeteer.launch({
      ...puppeteerConfig,
    })
    return await this.openNewPage();
  }

  async openNewPage() {
    const page = await this.browser.newPage();
    this._updateUserAgent(page);
    return page;
  }

  async _updateUserAgent(page) {
    // поосторожней с ним, потому что он может выдать тебе старый агент, который не будетт поддерживаться сайтом, например, IE11 или аналоги.
    // Да и в целом это не совсем то, с помощью чего ориентируются бот это или нет, т.к. у тебя будут другие менее коственные признаки(наличие методов или наоборот отсутствие их)
    // а так же 1 и тот же IP
    // await page.setUserAgent(random_useragent.getRandom()) // this allows to bypasss scraping protections 
  }
}

module.exports = Browser;
