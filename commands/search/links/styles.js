const {Builder, By, Key, until} = require('selenium-webdriver');

async function getStyleLink(param = 1) {
    try {
        
        let styleSelector = By.css('#ulfornav > li:nth-of-type(2) > .menuforward li:nth-of-type(' + param + ') > a');
        let styleLink = await driver.findElement(styleSelector).getAttribute("href");
        return styleLink;

    } catch (error){
		throw error;
	}
};

module.exports = getStyleLink;
  
