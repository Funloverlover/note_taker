const fs = require("fs");

function getSavedNotes(cb) {
    fs.readFile("./db/db.json", (error, data)=>{
        cb(JSON.parse(data))
    })
}

function saveNotes(json, cb) {
    fs.readFile("./db/db.json", (error, data) => {
        data = JSON.parse(data)
        let output = { text: json.text, title: json.title, id: Date.now() }
        data.push(output)
        fs.writeFile("./db/db.json", JSON.stringify(data, null, 2), () => {
            return cb(output);
        });
    })
}

function deleteNote(id, cb) {
    fs.readFile("./db/db.json", (error, data) => {
        data = JSON.parse(data);
        let i = data.findIndex(e => e.id === parseInt(id));
        data.splice(i, 1);
        fs.writeFile("./db/db.json", JSON.stringify(data, null, 2), () => {
            return cb(`${id} has been deleted`);
        });
    });
}

module.exports = { getSavedNotes, saveNotes, deleteNote };