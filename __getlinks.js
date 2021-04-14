const {Builder, By, Key, until} = require('selenium-webdriver');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

//var param = "piano/classical/sheet_music/";

async function getLinks(param) {
    try {
		var driver = new webdriver.Builder().forBrowser('chrome').build();
        // Navigate to Url
        await driver.get('https://www.8notes.com/'+param);
		let body = await driver.findElement(By.tagName('tbody'));
		let local_pieces = await body.findElements(By.tagName("tr"));
		for (let e of local_pieces) {
			let link = await e.getAttribute("onclick");
			let link_split = link.split("'")[1];
			let text = await e.getText();
            console.log(text + ": " + link_split);
        }

    } catch (error){
		console.log(error);
	}
    finally{
        driver.quit();
    }
};

export default getLinks;
  
