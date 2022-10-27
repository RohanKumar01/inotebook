import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "61322f19553781a8ca8d0e06",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "Hello Rohan",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.509Z",
          "__v": 0
        },
        {
          "_id": "61322f19553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "My Title",
          "description": "Please wake up early",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
        },
  
      ]
      const [notes, setNotes] = useState(notesInitial)

      // Add a Note
        const addNote = (title, description, tag)=>{
            console.log("Adding a new note") 
            const note = {
                "_id": "61322f19553781a8ca8d0e08",
          "user": "6131dc5e3e4037cd4734a066",
          "title": "hello there!",
          "description": "Genral Kenobi!?",
          "tag": "personal",
          "date": "2021-09-03T14:20:09.668Z",
          "__v": 0
            };
            setNotes(notes.concat(note))
        }

      // Delete a Note
      const deleteNote = ()=>{

      }

      // Edit a Note
      const editNote = ()=>{

    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;