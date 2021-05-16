const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

async function createDriver(param = null) {
    try {
        var driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('https://www.8notes.com/');
        
        if(param == null)
            global.driver = driver;
        else
            return driver;

    } catch (error){
        throw error;
    }
};

module.exports = createDriver;
  
