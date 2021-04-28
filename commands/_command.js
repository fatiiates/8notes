const createDriver = require('../lib/_driver');

class Command{

    static init = async function(){ 
        try {
            await createDriver();
            if([undefined, null].includes(global.driver)){
                console.log("Web driver başlatılırken bir problem oluştu.");
                process.exit(1);
            }
        } catch (error) {
            
        }
    }

    static destroy = function(){
        try {
            if(![undefined, null].includes(global.driver))
                driver.quit();
        } catch (error) {
            throw error;
        }
        
    }

}

module.exports = Command
