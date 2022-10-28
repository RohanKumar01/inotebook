const express = require("express");
const User = require("../models/User");
const Note = require("../models/Note");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Fetch All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    let note = await Note.find({ Note: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {    
  try {
    const {title, description, tag} = req.body;
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  // Id is not same and other person is tryng to update the note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
}
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/updatenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
        
  // Find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }

  // Allow deletion only if user owns ths node
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Note.findByIdAndDelete(
    req.params.id)
   res.json({"Sucess" : "Note has been deleted", note: note});
} catch (error) {
        console.error(error.message);
      res.status(500).send("Internal Server Error");       
}
});

module.exports = router;

// const express= require('express');
// const router = express.Router()
// const fetchuser = require('../middleware/fetchuser');
// const { body, validationResult } = require('express-validator');
// const Note = require('../models/Note');
// const User = require('../models/User');

// // Route 4: Fetch logged in user's notes using : POST + "auth/api/fetchalnotes". Doesn't require login
// router.get('/fetchallnotes',fetchuser, async (req,res) => {
//         try{
//         const notes = await notes.find({user : req.user.id});
//         res.json(notes)
//         } catch(error){
//                 console.error(error.message);
//                 res.status(500).send("Internal Server Error");
//         }
// })

// // ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required

// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
//         try {

//             const { title, description, tag } = req.body;

//             // If there are errors, return Bad request and the errors
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }
//             const note = new Note({
//                 title, description, tag, user: req.user.id
//             })
//             const savedNote = await note.save()

//             res.json(savedNote)

//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     })

// module.exports=router
