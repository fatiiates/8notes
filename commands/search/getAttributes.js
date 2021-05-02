const { workerData, isMainThread, parentPort } = require('worker_threads');
const createDriver = require('../../lib/_driver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');

let queue = [];
let jsonData = { pieces: [] };

const main = async function() {

    const driver = await createDriver();
    parentPort.on('message', (message) => {
        
        if (message == 'exit') 
            parentPort.unref();
        else if (message == 'start')
            getAttributes();
        else
            queue.push(message);
        
    });     

}

const getAttributes = async function(){
    
    while(queue.length > 0) {
        console.log(queue);
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

    //parentPort.postMessage('done');

}

if(!isMainThread)
    main();