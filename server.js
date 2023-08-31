const { getSavedNotes, saveNotes, deleteNote } = require('./database.js');
const express = require('express');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('/api/notes', (req, res) => {
    getSavedNotes((data)=>{
        res.status(201).json(data);
    })
});

app.post('/api/notes', (req, res) => {
    saveNotes(req.body, (data)=>{
        res.send(data)
    })
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, (data)=>{
        res.send(data)
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}! 🏎️`);
});