const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')
const { demandOption } = require('yargs')
yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Adding note',
    builder: {

        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },

        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true ,
            type: 'string'
        }
    },

    handler(argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List all notes',
    
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'read a note',

    builder: {
        title:{
            describe: 'title' ,
            demandOption:true ,
            type : 'string'
        }

    },
    handler(argv){
        notes.readNote(argv.title) 
    }
})

yargs.parse()
