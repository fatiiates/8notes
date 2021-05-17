const { Builder } = require('selenium-webdriver');
const { ServiceBuilder, setDefaultService } = require('selenium-webdriver/chrome');
const { path } = require('chromedriver');
setDefaultService(new ServiceBuilder(path).build());

class Command{

    static init = async function(param = null){ 
        try {
            var driver = new Builder().forBrowser('chrome').build();
        
            await driver.get('https://www.8notes.com/');
            
            if(param == null){
                global.driver = driver;
                if([undefined, null].includes(global.driver)){
                    console.log("Web driver başlatılırken bir problem oluştu.");
                    process.exit(1);
                }
            }
            else
                return driver;

        } catch (error) {
            throw error;
        }
    }

    static destroy = function(param = null){
        try {
            if(param == null){
                if(![undefined, null].includes(global.driver))
                    driver.quit();
            }
            else
                param.quit();
        } catch (error) {
            throw error;
        }
        
    }

}

module.exports = Command
