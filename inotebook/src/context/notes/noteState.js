import React from 'react';
import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {


  const host = "https://note-2-app.herokuapp.com"


  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // const update = () =>{
  //     setTimeout(() =>{
  //         setstate({
  //             "name":"parya",
  //             "class":"20b"
  //         })
  //     },1000);
  // }


  // Get all Notes
  const getNotes = async () => {
   
    // TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });

    const json_response = await response.json()

    setNotes(json_response)
  }

  // ADD a Note
  const addNote = async (newNote) => {
    let title = newNote.title;
    let description = newNote.description;

    let tag = newNote.tag;
    // TODO: API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header

    });

    const json_response = await response.json()


    // let note = {
    //   // "_id": "61bb25b1bb3abc452ce3736b",
    //   // "user": "61bae2da890611de10218fdb",
    //   "title": newNote.title,
    //   "description": newNote.description,
    //   "tag": newNote.tag,
    //   // "date": "2021-12-16T11:40:33.270Z",
    //   // "__v": 0
    // };
    setNotes(notes.concat(json_response))
  }

  // DELETE a Note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json_response = response.json()

    const newNotes = notes.filter((note) => { return note._id !== id })

    setNotes(newNotes)
    // return note._id!==id

  }

  // UPDATE a Note
  const editNote = async (id, title, description, tag) => {


    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json_response = await response.json()

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

      }

    }


    setNotes(newNotes)


  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;
