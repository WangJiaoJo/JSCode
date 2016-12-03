"use strict";
/*
 Created by lx on 2016/11/17
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
const express = require('express');
const router = express.Router();
const fileDate = require("../fileHandle/file");
const xss = require('xss');
const path = require("path");
let notFound = path.resolve("static/404.html");

function isdate(intYear,intMonth,intDay){
    if(isNaN(intYear)||isNaN(intMonth)||isNaN(intDay)) return false;
    if(intMonth>12||intMonth<1) return false;
    if ( intDay<1||intDay>31)return false;
    if((intMonth==4||intMonth==6||intMonth==9||intMonth==11)&&(intDay>30)) return false;
    if(intMonth==2){
        if(intDay>29) return false;
        if((((intYear%100==0)&&(intYear%400!=0))||(intYear%4!=0))&&(intDay>28))return false;
    }
    return true;
}

router.get("/", (req, res) => {
    var noteList = fileDate.getAllNote().then((noteList) => {
        for(var note in noteList) {
            noteList[note].NoteSummary = xss(noteList[note].NoteSummary);
            noteList[note].NoteBody = xss(noteList[note].NoteBody);
        }
        res.render("examples/noteList", {noteList: noteList});
    }).catch(() => {
        res.sendFile(notFound);
    });
});
router.get("/add", (req, res) => {
        res.render("examples/newNote");
});

router.post("/new", (req, res) => {
    let newNote = req.body;
    if (!newNote) {
        res.json("You must provide data to create a new Note");
        return;
    }
    if (!newNote.NoteTitle || typeof newNote.NoteTitle !== "string") {
        res.json( "You must provide a NoteTitle and as string type");
        return;
    }

    if (!newNote.NoteDueDate || typeof newNote.NoteDueDate !== "string") {
        res.json( "You must provide a NoteDueDate in form of yyyy/mm/dd ");
        return;
    }else{
        var matchArray = newNote.NoteDueDate.match(/^([0-9]{4})\/([0-1][0-9])\/([0-3][0-9])$/);
        if(matchArray==null){
            res.json("You must provide a NoteDueDate in form of yyyy/mm/dd ");
            return;
        }else{
            if(!isdate(matchArray[1],matchArray[2],matchArray[3])){
                res.json( "You must provide a NoteDueDate in form of yyyy/mm/dd ");
                return;
            }
        }
    }

    if (!newNote.NoteSummary || typeof newNote.NoteSummary !== "string") {
        res.json("You must provide a NoteSummary and as string type" );
        return;
    }
    if (!newNote.NoteBody || typeof newNote.NoteBody !== "string") {
        res.json( "You must provide a NoteBody and as string type");
        return;
    }

    fileDate.addNote(newNote).then((newNote) => {
       /* res.render("examples/note", {note: newNote});*/
       res.json({"status":"success","id":newNote.id});
    }).catch((e) => {
        res.sendFile(notFound);
    });
});

router.get("/:note", (req, res) => {
    let note = fileDate.getNoteById(req.params.note);
    note.then((note) => {
        if(!note) {
            res.json("error:No note information ");
            res.sendStatus(500);
        }
        note.NoteSummary = xss(note.NoteSummary);
        note.NoteBody = xss(note.NoteBody);
        res.render("examples/note", {note: note});
        return;
    }).catch((e) => {
        res.sendFile(notFound);
    });
});

router.get("/:note/next", (req, res) => {
    var noteList = fileDate.getAllNote().then((noteList) => {
        for(var index in noteList) {
            if(noteList[index].id.toString() === req.params.note) {
                if(index == noteList.length-1){
                    res.json({"status":"fail"});
                    return;
                }else{
                    noteList[parseInt(index)+1].NoteSummary = xss(noteList[parseInt(index)+1].NoteSummary);
                    noteList[parseInt(index)+1].NoteBody = xss(noteList[parseInt(index)+1].NoteBody);
                    res.json({"status":"success", "note": JSON.stringify(noteList[parseInt(index)+1])});
                    return;
                }
            }
        }

    }).catch(() => {
        res.sendFile(notFound);
    });
});
module.exports = router;