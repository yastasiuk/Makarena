
const puppeteer = require('puppeteer')
const {url} = require("./config.js")

; (async () => {
    const browser = await puppeteer.launch({ headless:false })
    const random_useragent = require ("random-useragent")
    const fs = require('fs')
    const page = await browser.newPage ()

    await page.setDefaultTimeout(10000)
    await page.setUserAgent(random_useragent.getRandom()) // this allows to bypasss scraping protections 

    const name_selector = ".wc-WebConsoleModule_Header"
    //> .ip-ControlBar_ButtonBar
    
    await page.goto(url)
    await page.waitForSelector(name_selector)
    const name = await page.$eval(name_selector, myEls => myEls.innerText)

    console.log(name)

    //close browsers
    await browser.close()

})().catch(error => {
    console.log(error)
    process.exit(1)
})

