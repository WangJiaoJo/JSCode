const fs = require('fs'); 

let exportedMethod = {
    getAllNotes: () => {
        var notes = JSON.parse(fs.readFileSync("./private/notes.json"));
        return Promise.resolve(notes);
    },
    getNote: (id) => {
        if (id == undefined) return Promise.reject("No id provided");
        var notes = JSON.parse(fs.readFileSync("./private/notes.json"));
        // let note = notes.filter(x => x.id == id).shift();
        // if (!note) return Promise.reject("Sorry. No Note Found");
        for (var i in notes) {
            if(notes[i].id.toString() == id) return Promise.resolve(notes[i]);
        }
        return Promise.reject("Can not find the note");
    },
    addNote: (note) => {
        var notes = JSON.parse(fs.readFileSync("./private/notes.json"));
        var id = notes[notes.length-1].id + 1;
        note.id = id;
        notes.push(note);
        fs.writeFile('./private/notes.json', JSON.stringify(notes), function () {
            return Promise.resolve(id);
        });
        return Promise.resolve(note);
    }
};

module.exports = exportedMethod;
