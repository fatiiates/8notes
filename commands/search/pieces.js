const {Builder, By, Key, until} = require('selenium-webdriver');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cliProgress = require('cli-progress');

const getPiecesByLink = async function(links) {
    try {
        
        const opt = {
            format: 'Veriler ayıklanıyor... [{bar}] {percentage}% | Kalan süre: {eta}s | {value}/{total}'
        };

        const progressBar = new cliProgress.SingleBar(opt, cliProgress.Presets.shades_classic);

        const filename = 'outputs/pieces_dump_' + (new Date()).getTime() + '_' + uuidv4() + '.json';
        var jsonData = { pieces: [] };
        const data = JSON.stringify(jsonData, null, '\t');
        
        await fs.writeFile(filename, data, { flag: 'w+' }, function (err, file) {
            if (err) 
                throw err;
        });
        
        progressBar.start(links.length, 0);
        
        for (const link of links) {
                       
            await driver.navigate().to(link);

            let paginationMax = await driver.findElement(By.css('.pagination li:nth-last-child(2)')).getAttribute("textContent");
            paginationMax = parseInt(paginationMax);

            for (let i = 2; i <= paginationMax + 1; i++) {
                
                let tbody = await driver.findElement(By.css('.table-responsive tbody'));
                let tr = await tbody.findElements(By.css('tr'));

                let difficultyLevels = {
                    "Beginners Level": 0,
                    "Easy Level": 1,
                    "Intermediate Level": 2,
                    "Advanced Level": 3
                }

                for (const el of tr) {
                    
                    let td = await el.findElements(By.css('td'));

                    let link = (await el.getAttribute('onClick')).split('document.location=')[1].replace(/'/g, '');
                    let artist = (await td[1].getAttribute('textContent')).trim();
                    let title = await td[2].getAttribute('textContent');
                    let difficulty = difficultyLevels[await (await td[3].findElement(By.css('img'))).getAttribute('title')];
                        
                    jsonData.pieces.push({
                        link,
                        artist,
                        title,
                        difficulty
                    });

                }
                if(i != paginationMax + 1){
                    var url = new URL(link);
                    url.searchParams.append('page', i);
            
                    await driver.navigate().to(url.href);
                    paginationMax = parseInt(await driver.findElement(By.css('.pagination li:nth-last-child(2)')).getAttribute("textContent"));
                }
            }
            
            const data = JSON.stringify(jsonData, null, '\t');
                
            await fs.writeFile(filename, data, { flag: 'w+' }, (err) => {
                if (err) {
                    throw err;
                }
            });
            await progressBar.update(links.indexOf(link) + 1);
        }
        progressBar.stop();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPiecesByLink
}