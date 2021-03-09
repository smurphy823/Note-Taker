const router = require("express").Router();
const { response } = require("express");
const fs = require("fs");
const uuid = require("uuid/v1");
let notes = require("../db/db.json")

router.get("/api/notes", function(req, res){
    res.json(notes)
})

router.post("/api/notes", function(req, res){
    req.body.id = uuid()
    notes.push(req.body)
    const data = JSON.stringify(notes)
    fs.writeFile(notes, data, function(err){
        if(err)throw err
    })
    res.end()
})

router.delete("/api/notes/:id", function(req, res){
    let filteredNotes = notes.filter(function(note){
        return note.id !== req.params.id
    })
    fs.writeFileSync(notes, JSON.stringify(filteredNotes), function(err){
        if(err)throw err
    })
    res.end()
})

module.exports = router
