const { workerData, isMainThread, parentPort } = require('worker_threads');

const { By } = require('selenium-webdriver');
const fs = require('fs');

const Command = require('../../lib/_command');

let queue = [];
let jsonData = { pieces: [] };
 
const main = async function() {

    try {
        const driver = await Command.init('new');
        parentPort.on('message', (message) => {
            
            if (message == 'exit') 
                parentPort.unref();
            else if (message == 'start')
                getAttributes(driver);
            else
                queue.push(message);
            
        });   
    } catch (error) {
        throw error;
    }  

}

const getAttributes = async function(driver){
    var localDriver = driver;
    try {
        while(queue.length > 0) {
        
            const array = queue[0];
            for (let j = 0; j < array.length; j++) {
                error = false;
                await localDriver.navigate().to('https://www.8notes.com' + array[j].link)
                    .catch(async err => {
                        await localDriver.quit();
                        localDriver = null;
                        localDriver = await Command.init('new');
                        console.log('Error Item: ' + array[j].link);
                        j -= 1;
                        error = true;
                    });
                if (error)
                        continue;
                const img_containers = await localDriver.findElements(By.className('img-container'));
                var img_src = [];
                for (const img_container of img_containers) {
                    const img = await img_container.findElement(By.css('img'));
                    const src = await img.getAttribute('src');
                    if(src)
                        img_src.push(src);
                }
        
                const midi_a_tag = await localDriver.findElement(By.css('#midi_container > .ilistbox > .versionlist > ul > li:nth-of-type(3) > a'));
                const midi_href = await midi_a_tag.getAttribute('href');
                
                const comp_table = await localDriver.findElement(By.css('#infobox > .comp_table'));
                const comp_table_content = await comp_table.getText();
        
                array[j] = {
                    ...array[j],
                    img_src,
                    midi_href,
                    comp_table_content
                }
                
            }
            jsonData.pieces.push(...array);
            queue.shift();
            const data = JSON.stringify(jsonData, null, '\t');
                    
            await fs.writeFile(workerData.filename, data, { flag: 'w+' }, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
        
    } catch (error) {
        throw error;
    }
    finally {
        Command.destroy(driver);
        parentPort.postMessage('done');
    }
    
}

if(!isMainThread)
    main();