const createDriver = require('../lib/_driver');

class Command{

    static init = async function(){
        await createDriver();
        if([undefined, null].includes(driver)){
            console.log("Web driver başlatılırken bir problem oluştu.");
            process.exit(1);
        }
    }

    static destroy = function(){
        if(![undefined, null].includes(driver))
            driver.quit();
    }

}

module.exports = Command
