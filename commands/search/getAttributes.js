const { workerData, isMainThread, parentPort } = require('worker_threads');
const createDriver = require('../../lib/_driver');
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
    try {
        while(queue.length > 0) {
        
            const array = queue[0];
            for (let j = 0; j < array.length; j++) {
                
                await driver.navigate().to('https://www.8notes.com' + array[j].link);
                const img_containers = await driver.findElements(By.className('img-container'));
                var img_src = [];
                for (const img_container of img_containers) {
                    const img = await img_container.findElement(By.css('img'));
                    img_src.push(await img.getAttribute('src'));
                }
        
                const midi_a_tag = await driver.findElement(By.css('#midi_container > .ilistbox > .versionlist > ul > li:nth-of-type(3) > a'));
                const midi_href = await midi_a_tag.getAttribute('href');
                
                const comp_table = await driver.findElement(By.css('#infobox > .comp_table'));
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