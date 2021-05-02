const main = require('./t.js');
const createDriver = require('../../lib/_driver');
const {Builder, By, Key, until} = require('selenium-webdriver');

//main();

(
    async function name(params) {
        await createDriver();
        await driver.navigate().to('https://www.8notes.com/scores/13733.asp');
        
        const comp_table = await driver.findElement(By.css('#infobox > .comp_table'));
        const comp_table_content = await comp_table.getAttribute('textContent');
        console.log(comp_table_content);
    }
)();