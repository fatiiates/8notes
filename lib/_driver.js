const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());


async function createDriver() {
    try {
        var driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('https://www.8notes.com/');
        
        global.driver = driver;

    } catch (error){
        console.log(error);
    }
};

module.exports = createDriver;
  
