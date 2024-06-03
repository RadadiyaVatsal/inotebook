import React, { useContext, useState, useRef } from 'react';
import noteContext from "../contexts/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note } = props;
  const { deleteNote, editNote } = context;

  // Hooks should be called at the top level of the component
  const [currentNote, setCurrentNote] = useState({ _id: "", title: "", description: "", tag: "" });
  const modalRef = useRef(null);

  // If note or note.title is undefined, return null
  if (!note || !note.title) {
    return null; // or some placeholder UI
  }

  const handleEditClick = (note) => {
    setCurrentNote(note);
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    editNote(currentNote._id, currentNote.title, currentNote.description, currentNote.tag);
    const modalElement = modalRef.current;
    const modal = window.bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  };

  return (
    <>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update your notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={currentNote.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" value={currentNote.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" value={currentNote.tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal ends */}
      <div className="col-md-3 mb-3 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="description">{note.description}</p>
            <p className="tag">{note.tag}</p>
            <button className="fa-solid fa-trash" style={{ border: "none", background: "none" }} onClick={() => { deleteNote(note._id) }}></button>
            <button className="fa-regular fa-pen-to-square mx-4" style={{ border: "none", background: "none" }} onClick={() => handleEditClick(note)}></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItem;
