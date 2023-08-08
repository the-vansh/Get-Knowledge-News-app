const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../Models/Notes');
const { body, validationResult } = require('express-validator');

// route 4  to fetch all the notes form the database of the loged in user
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (err) {
        console.log(err.message);
       res.status(500).send("Internal server error")
    }
})


// router 5 to add the notes in the database

router.post('/addnote',
[
    body("title","Enter a valid name").isLength({min: 3}),
    body("description","description must be bigger the 5 cahracter").isLength({min:5})
]
,fetchuser,async(req,res)=>{
   
    try {
            const {title,description,tag} = req.body;
            const errors = validationResult(req); 
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }

            const notes = new Notes({
            title,description,tag,user:req.user.id
            })
            const savenote = await notes.save();
            res.json(savenote);
    } catch (error) {
            console.log(error.message);
           res.status(500).send("Internal server error")
     }
})


//router 6 to update the exiting notes

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;

    //create a new note object

    try {
        const newNote={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
    
        if((await note).user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
    
       
})

//router to delete the note the app of the ueser
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag} = req.body;

    //find and delte the notes 

    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        } 
        // allows user to delete
        if((await note).user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"suceess":"Note has been delete",note:note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
    
       
})

module.exports = router 