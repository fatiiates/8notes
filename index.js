const yargs = require('yargs')
const searchCommands = require('./commands/search.js')

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
    handler: function (argv) {
        if (![undefined, "", null].includes(argv.all))
            searchCommands.searchingAllLinks(argv.all)
        else if (![undefined, "", null].includes(argv.instrument))
            searchCommands.searchingByInstrument(argv.instrument)
        else if (![undefined, "", null].includes(argv.style))
            searchCommands.searchingByStyle(argv.style)
        else if (![undefined, "", null].includes(argv.artist))
            searchCommands.searchingByArtist(argv.artist)
        else 
            console.log(chalk.red.inverse('There are missing parameters'));
    }
})
yargs.parse()