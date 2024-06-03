import React, { useContext , useEffect} from 'react'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import NoteContext from '../contexts/noteContext'

const Notes = () => {
  
    const context=useContext(NoteContext);
    const {notes , getAllNotes , isLoggedIn} = context;

    useEffect( () =>{
      getAllNotes();
    } , [])
  return (
    <>{
        isLoggedIn &&
        <>
         <AddNote/>  { /* this will update the noteContext so that's why notes will be updated */}
        <div className="row">
         {
          notes.map( (note , key) => (
             <NoteItem note={note} key={key}/>
          ))}

        </div>
        </>
     }
    </>
  )
}

export default Notes
