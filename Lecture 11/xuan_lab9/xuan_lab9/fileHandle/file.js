"use strict";
/*
 Created by lx on 2016/11/10
 Name: Xuan Li
 CWID:10409939
 Email: xli100@stevens.edu
 */
const express = require('express');
const fs = require('fs');
const xss = require('xss');
const filePath = './fileHandle/note.json';
function custom_sort(a, b) {
    return new Date(a.NoteDueDate).getTime() - new Date(b.NoteDueDate).getTime();
}


let exportedMethods = {
    getAllNote: () => {
        var notes = JSON.parse(fs.readFileSync(filePath));
        notes.sort(custom_sort);
        return Promise.resolve(notes);
    },
    getNoteById: (noteid) => {
        var obj = JSON.parse(fs.readFileSync('./fileHandle/note.json', 'utf8'));
        for(var note in obj) {
            if(obj[note].id.toString() === noteid) return  Promise.resolve(obj[note]);
        }
        return Promise.reject("error");
    },
    addNote: (newNote) => {
        var obj = JSON.parse(fs.readFileSync('./fileHandle/note.json', 'utf8'));
        var newId = obj[obj.length-1].id;
        newId++;
        newNote.id = newId;
        obj.push(newNote);
        fs.writeFile('./fileHandle/note.json', JSON.stringify(obj), function (err) {
            if (err) {
                return Promise.reject(err)
            }else{
                return Promise.resolve(newId);
            }
        });
        return Promise.resolve(newNote)
    }
};

module.exports = exportedMethods;