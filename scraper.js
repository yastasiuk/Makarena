const Browser = require('./controllers/browser');
const Bet365Controller = require('./controllers/bet365');

async function init() {
  const browser = new Browser();
  const bet365 = new Bet365Controller(browser);
  await bet365.init();
  console.log('links:', await bet365.getSportLinks());

}

init().catch(err => {
  console.log(err)
  // process.exit(1);
});

