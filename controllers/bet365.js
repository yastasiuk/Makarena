const { url } = require("../config.js");
const { scenarios } = require('../mappings');
const { wait } = require('../utils');

class Bet365Controller {
  constructor(browserController) {
    this.browserController = browserController;
  }

  async init() {
    console.log('init');
    this.bet365Page = await this.browserController.createBrowser();
    await this.bet365Page.goto(url);
    this.scenario = await this.getMappingScenario();
    // TODO: fix to correct logic(waiting for an app to load)
    await wait(5);
  }

  // Will be executed in browser
  async _getMappings(scenarios, maxWaitingTime = 10000, tick = 500) {
    if (!document) {
      throw new Error('Should be evaluated in browser!');
    }

    let timeElapsed = 0;
    return new Promise((res, rej) => {
      const interval = setInterval(() => {
        scenarios.forEach(s => {
          // document.body на document.querySelector и т.п. у них навешана кастомная функция, которая похожу просто делает while(true) {}
          // Возможно ещё и репортит тебя, лол (не делал дамп траффик, но есть шанс что так и есть - отправлять по сокетам или whatever инфу что ты ботовод ;) )
          const testNode = document.body.querySelector(s.test);
          if (testNode) {
            clearInterval(interval);
            res(s);
          }
        })
        timeElapsed += tick;
        if (maxWaitingTime < timeElapsed) {
          clearInterval(interval);
          rej('Timeout error');
        }
      }, 500);
    });
  }

  async _getSportLinks(sportLinks) {
    if (!document) {
      throw new Error('Should be evaluated in browser!');
    }

    return [...document.body.querySelectorAll(sportLinks)].slice(2).map(node => node.textContent);
  }

  async getMappingScenario() {
    console.log('getMappingScenario');
    if (!this.bet365Page) {
      throw new Error('Bet365 is not defined');
    }
    const scenario =  await this.bet365Page.evaluate(this._getMappings, scenarios);
    console.log('Scenario:', scenario.name);
    return scenario;
  }

  async getSportLinks() {
    console.log('getSportLinks');
    if (!this.scenario) {
      throw new Error('Scenario is not defined');
    }
    console.log('SportLinks:', this.scenario.mappings.sportsLink);
    return await this.bet365Page.evaluate(this._getSportLinks, this.scenario.mappings.sportsLink);
  }
}

module.exports = Bet365Controller;
