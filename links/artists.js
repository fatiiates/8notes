const {Builder, By, Key, until} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());


async function getArtistLink(param = 1) {
    try {
		var driver = new webdriver.Builder().forBrowser('chrome').build();
        
        await driver.get('https://www.8notes.com/');
        
        let styleSelector = By.css('#ulfornav > li:nth-of-type(3) > .menuforward li:nth-of-type(' + param + ') > a');
        let styleLink = await driver.findElement(styleSelector).getAttribute("href");
        return styleLink;
        /*await driver.navigate().to(styleLink);
        
        let classicalSelectorByAnchorTags = await driver.findElements(By.css('#a2 > .full_width_display > .gs2'));
        let classicalStyleLink = await classicalSelectorByAnchorTags[2].getAttribute('href');
        return classicalStyleLink;*/

    } catch (error){
		console.log(error);
	}
    finally{
        driver.quit();
    }
};

module.exports = getArtistLink;
  
