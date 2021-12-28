import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/noteContext"
import { Form, Col, Row, Button } from 'react-bootstrap';

const AddNote = () => {
    const context = useContext(NoteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: " " })
    const handleClick = (e) => {
        e.preventDefault()

        addNote(note);
        setNote({ title: "", description: "", tag: " " })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <h5>Add Note</h5>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} size="sm" controlId="title">
                        <Form.Label >Title</Form.Label>
                        <Form.Control type="text" name='title' placeholder="text title" value={note.title} onChange={onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control type="text" name='description' placeholder="desc" value={note.description} onChange={onChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="tag">
                        <Form.Label>tag</Form.Label>
                        <Form.Control type="text" name='tag' placeholder="desc" value={note.tag} onChange={onChange} />
                    </Form.Group>
                </Row>



                <Button variant="primary" disabled={note.title.length < 5 || note.description.length < 5} type="submit" onClick={handleClick}>
                    Submit
                </Button>
            </Form>


        </div>
    )
}

export default AddNote
