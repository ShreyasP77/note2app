import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/noteContext"
import AddNote from './AddNote'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
const Notes = () => {
  let navigate = useNavigate();
  const context = useContext(NoteContext)
  const { notes, getNotes, editNote } = context
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/login')

    }


  }, [])


  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const handleClick = (e) => {
    e.preventDefault()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
  }

  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })

  }



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <AddNote />


      <Button variant="primary" onClick={handleShow} className='d-none' ref={ref}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>  <Form>
          <Row className="mb-3">
            <Form.Group as={Col} size="sm" controlId="etitle">
              <Form.Label >Title</Form.Label>
              <Form.Control type="text" name='etitle' placeholder="text title" value={note.etitle} onChange={onChange} />
            </Form.Group>

            <Form.Group as={Col} controlId="edescription">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" name='edescription' placeholder="desc" value={note.edescription} onChange={onChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="etag">
              <Form.Label>tag</Form.Label>
              <Form.Control type="text" name='etag' placeholder="tag" value={note.etag} onChange={onChange} />
            </Form.Group>
          </Row>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} ref={refclose}>
            Close
          </Button>
          <Button disabled={note.etitle.length < 5 || note.edescription.length < 5} variant="primary" type='submit' onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='row my-3'>
        <h5>Your Notes</h5>
        <div className='container text-danger mx-1'>
          {notes.length === 0 && '*no Notes to display*'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;


        })}
      </div>
    </>
  )
}

export default Notes
