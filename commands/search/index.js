const chalk = require('chalk')
const getClassicalStyleLink = require('./links/instruments');
const getStyleLink = require('./links/styles');
const getArtistLink = require('./links/artists');

const piece = require('./pieces');
const Command = require('../_command');

class SearchCommand extends Command {

    static searchingByInstrument = async function(title) {   
        try {
            const instruments = ["piano", 
                            "guitar", 
                            "violin", 
                            "flute", 
                            "saxophone", 
                            "voice", 
                            "clarinet", 
                            "trumpet"
                        ];
            if(title === "all"){
                var links = [];
                for (let i = 0; i < instruments.length; i++) {
                    const classicalStyleLink = await getClassicalStyleLink(i+1);
                    links.push(classicalStyleLink);
                }
                return links;
            }else{
                var i = instruments.indexOf(title.toLowerCase());
                if(i == -1)
                    console.log(chalk.red.inverse('No result for this instrument'));
                else{
                    await SearchCommand.init();
                    const classicalStyleLink = await getClassicalStyleLink(i+1);
                    await piece.getPiecesByLink([classicalStyleLink]);
                }  
            }      
                          
        } catch (error) {
            throw error;
        } 
        
    } 

    static searchingByStyle = async function(title) {
        try {
            const styles = {
                            1: "classical", 
                            4: "rock and pop", 
                            5: "christmas"
                        };
            var control = false;
    
            if(title === "all"){
                var links = [];
                for (const [key, value] of Object.entries(styles)){
                    const styleLink = await getStyleLink(key);
                    links.push(styleLink);
                }
                return links;
            }else
                for (const [key, value] of Object.entries(styles)){
                    if (title.toLowerCase() == value){ 
                        await SearchCommand.init();
                        const styleLink = await getStyleLink(key);
                        await piece.getPiecesByLink([styleLink]);
                        control = true;
                        return 0;
                    }
                }
        
            if(!control)
                console.log(chalk.red.inverse('No result for this style'));      

        } catch (error) {
            throw error;
        }    
    }

    static searchingByArtist = async function(title) {     
        try {
            const artists = ["bach", 
                            "beethoven", 
                            "mozart", 
                            "tchaikovsky", 
                            "scott joplin", 
                            "chopin"
                        ];
            if(title === "all"){
                var links = [];
                for (let i = 0; i < artists.length; i++) {
                    const artistLink = await getArtistLink(i+1);
                    links.push(artistLink);
                }
                return links;
            }else{
                var i = artists.indexOf(title.toLowerCase());
                if(i == -1)
                    console.log(chalk.red.inverse('No result for this artist'));
                else{
                    await SearchCommand.init();
                    const artistLink = await getArtistLink(i+1);
                    await piece.getPiecesByLink([artistLink]);
                }
            }
            
        } catch (error) {
            throw error;
        }
    }
    
    static searchingForAll = async function() {
        try {

            await SearchCommand.init();
            const styleLinks = await SearchCommand.searchingByStyle("all");
            const artistLinks = await SearchCommand.searchingByArtist("all");
            const classicalStyleLinks = await SearchCommand.searchingByInstrument("all");
            
            const allLinks = artistLinks.concat(styleLinks, classicalStyleLinks);
            /*const allLinks = [
                'https://www.8notes.com/all/christmas/sheet_music/'

            ];*/
            await piece.getPiecesByLink(allLinks);

        } catch (error) {
            throw error;
        }
        
    }
}

module.exports = SearchCommand
