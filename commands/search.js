const chalk = require('chalk')
const getClassicalStyleLink = require('../links/instruments');
const getStyleLink = require('../links/styles');
const getArtistLink = require('../links/artists');

const searchingByInstrument = async function(title) {
   
    const instruments = ["piano", 
                    "guitar", 
                    "violin", 
                    "flute", 
                    "saxophone", 
                    "voice", 
                    "clarinet", 
                    "trumpet"
                ];
    var control = false;

    for (let i = 0; i < instruments.length; i++) 
        if (title.toLowerCase() === instruments[i]){ 
            const classicalStyleLink = await getClassicalStyleLink(i+1);
            console.log(classicalStyleLink);
            control = true;
            break;
        }

    if(!control)
        console.log(chalk.red.inverse('No result for this instrument'));
} 

const searchingByStyle = async function(title) {
   
    const styles = {
                    1: "classical", 
                    4: "rock and pop", 
                    5: "christmas"
                };
    var control = false;
    
    for (const [key, value] of Object.entries(styles)){
        
        if (title.toLowerCase() == value){ 
            const styleLink = await getStyleLink(key);
            console.log(styleLink);
            control = true;
            return 0;
        }
    }

    if(!control)
        console.log(chalk.red.inverse('No result for this style'));

}

const searchingByArtist = async function(title) {
   
    const artists = ["bach", 
                    "beethoven", 
                    "mozart", 
                    "tchaikovsky", 
                    "scott joplin", 
                    "chopin"
                ];
    var control = false;
    
    for (let i = 0; i < artists.length; i++) {
        
        if (title.toLowerCase() == artists[i]){ 
            const artistLink = await getArtistLink(i+1);
            console.log(artistLink);
            control = true;
            return 0;
        }
    }

    if(!control)
        console.log(chalk.red.inverse('No result for this artist'));

}

module.exports = { 
    searchingByInstrument,
    searchingByStyle,
    searchingByArtist
}
