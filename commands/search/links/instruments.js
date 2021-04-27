const {Builder, By, Key, until} = require('selenium-webdriver');

async function getClassicalStyleLink(param = 1) {
    try {
        
        let styleSelector = By.css('#ulfornav > li > .menuforward li:nth-of-type(' + param + ') > a');
        let styleLink = await driver.findElement(styleSelector).getAttribute("href");
        
        await driver.navigate().to(styleLink);
        
        let classicalSelectorByAnchorTags = await driver.findElements(By.css('#a2 > .full_width_display > .gs2'));
        let classicalStyleLink = await classicalSelectorByAnchorTags[2].getAttribute('href');
        return classicalStyleLink;

    } catch (error){
		console.log(error);
	}
};

module.exports = getClassicalStyleLink;
  
