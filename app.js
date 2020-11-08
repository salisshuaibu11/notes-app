const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('Add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('List', 'List all notes')
    .command('Read', 'Read a note', {
        title: titleOptions
    })
    .command('Remove', 'remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
const command = process.argv[2];

if (command === 'add') {
    const note = notes.addNote(argv.title, argv.body);
    if (note) {
       console.log('Note created'); 
       notes.logNote(note);
    } else {
        console.log('Note already exist');
    }
} else if (command === 'list') {
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    const note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Not not found');
    }
} else if (command === 'remove') {
    const noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}