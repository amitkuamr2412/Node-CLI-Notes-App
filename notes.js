const chalk = require('chalk')
const { time } = require('console')
const fs = require('fs')
const readNote = (title) => {
    const notes = loadNotes() 
    const findNote = notes.find((note) => note.title === title)

    if(findNote){
        console.log(chalk.blue.italic.inverse(findNote.title))
        console.log(findNote.body)
    }
    else{
        console.log(chalk.red.inverse('No note found?'))
    }

}
const removeNote = (title)=>{

    const notes = loadNotes()

    const notestokeep = notes.filter( (note) => note.title !==title)

    if(notestokeep.length === notes.length){
        console.log(chalk.red.inverse('No note found !'))
    }
    else {
        console.log(chalk.green.inverse('Note Removed')) 
        saveNotes(notestokeep)
    }
    
}

const addNote = (title,body) => {
    const notes = loadNotes()
    
    const find_duplicates = notes.find((note) => note.title === title)
    
//    debugger

    if(find_duplicates === undefined){
        notes.push({
            title: title,
            body: body
        }) 
        console.log(chalk.green.inverse('New note added!'))
        saveNotes(notes)

    } else{
        console.log(chalk.red.inverse('Note title taken !'))
    }



}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes) 
    fs.writeFileSync('notes.json',dataJson) 
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes() 
    if(notes.length == 0) console.log('No List found')
    notes.forEach((note) => console.log(note.title) )
}

module.exports = {
    addNote: addNote ,
    removeNote: removeNote,
    listNotes: listNotes ,
    readNote: readNote
}