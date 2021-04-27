const yargs = require('yargs')
const SearchCommand = require('./commands/search')

yargs.command({
    command: 'search',
    describe: 'searching',
    builder: {
        instrument: {
            describe: 'searching area',
            demandOption: false,
            type: 'string'
        },
        style: {
            describe: 'searching area',
            demandOption: false,
            type: 'string'
        }
    },
    handler: async function (argv) {
        try {
            await SearchCommand.init();
            if (![undefined, "", null].includes(argv.all))
                await SearchCommand.searchingForAll(argv.all)
            else if (![undefined, "", null].includes(argv.instrument))
                await SearchCommand.searchingByInstrument(argv.instrument)
            else if (![undefined, "", null].includes(argv.style))
                await SearchCommand.searchingByStyle(argv.style)
            else if (![undefined, "", null].includes(argv.artist))
                await SearchCommand.searchingByArtist(argv.artist)
            else 
                console.log(chalk.red.inverse('There are missing parameters'));
    
        } catch (error) {
            
        }
        finally {
            SearchCommand.destroy();
        }
    }
})
yargs.parse()