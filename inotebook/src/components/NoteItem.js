import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import NoteContext from "../context/notes/noteContext"
import Notes from './Notes';
const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context
    const { note, updateNote } = props
    return (

        <div className='text-success col col-md-3 my-2'>
            <Card>

                <Card.Body>
                    <div className='d-flex align-items-end'>
                        <Card.Title className='pe-5'> {note.title}</Card.Title>
                        <sup><i className="fas fa-trash" onClick={
                            () => { deleteNote(note._id) }
                        }></i>
                        </sup> <sup>
                            <i className="fas fa-edit" onClick={() => { updateNote(note) }}></i></sup>
                    </div>
                    <Card.Text>
                        {note.description}
                    </Card.Text>

                </Card.Body>
            </Card>


        </div>

    )
}

export default NoteItem
