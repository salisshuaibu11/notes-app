const fs = require('fs');

const originalNote = {
    title: 'Some title',
    body: 'Some body'
};

// originalNotestring
let originalNotestring = JSON.stringify(originalNote)
fs.writeFileSync('notes.json', originalNotestring);

var noteString = fs.readFileSync('notes.json');
// note
const note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);