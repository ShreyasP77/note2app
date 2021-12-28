const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

//ROUTE_1: Fetch all notes: POST request at /api/notes/fetchallnotes.login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("some Error occured");
    }


})

//ROUTE_2: Add a note: POST request at /api/notes/addNote.login required
router.post('/addNote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter proper description').isLength({ min: 5 }),

], async (req, res) => {
    // If there are errors, return a bad request 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body

    try {
        const notes = Notes({ user: req.user.id, title, description, tag })
        const savedNotes = await notes.save()
        res.json(savedNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some Error occured");
    }
})


//ROUTE_3: Update note: PUT request at /api/notes/updateNote.login required
router.put('/updateNote/:id', fetchuser
    , [
        body('title', 'Enter a valid title').isLength({ min: 5 }),
        body('description', 'Enter proper description').isLength({ min: 5 }),

    ]
    ,
    async (req, res) => {
        // If there are errors, return a bad request 
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        try {

            const newNote = {};
            if (title) {
                newNote.title = title
            }
            if (description) {
                newNote.description = description
            }
            if (tag) {
                newNote.tag = tag
            }

            let notes = await Notes.findById(req.params.id);


            if (!notes) {
                return res.status(404).send("Not Found")
            }


            if (notes.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }
            notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some Error occured");
        }
    })




//ROUTE_4: Dwlete note: DELETE request at /api/notes/deleteNote.login required
router.delete('/deleteNote/:id', fetchuser
    ,
    async (req, res) => {
        // If there are errors, return a bad request 
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        try {


            let notes = await Notes.findById(req.params.id);


            if (!notes) {
                return res.status(404).send("Not Found")
            }


            if (notes.user.toString() !== req.user.id) {
                return res.status(401).send("Not allowed")
            }
            notes = await Notes.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: notes });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some Error occured");
        }
    })
module.exports = router;