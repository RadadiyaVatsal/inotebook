import NoteContext from "./noteContext";
import { useContext, useState } from "react";
import AlertContext from "./alertContext";

const NoteState = (props) => {
  const alertContext = useContext(AlertContext);
  const { updateMsg } = alertContext;

  const host = "https://inotebook-backend-35w8.onrender.com/api/";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [authToken,setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn , setLogin]=useState(false);
  // Fetch all notes
  const getAllNotes = async () => {

    if(!localStorage.getItem("token")){
      updateMsg("Please Login or sign up with us" , "success");
      setLogin(false);
      return;
    }
    const url = `${host}notes/fetchallnotes`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "auth-token": authToken,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      setNotes(json);
      setLogin(true);
    } catch (error) {
      console.error("Error fetching notes:", error);
      updateMsg("Error fetching notes: " + error.message, "danger");
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        },
        body: JSON.stringify({ title, description, tag })
      });
      const json = await response.json();

      if (json.errors) {
        updateMsg(json.errors[0].msg, "danger");
      } else {
        setNotes(notes.concat(json.note));
        updateMsg("Note successfully added", "success");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      updateMsg("Error adding note: " + error.message, "danger");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        }
      });
      const json = await response.json();

      if (json.errors) {
        updateMsg(json.errors[0].msg, "danger");
      } else {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
        updateMsg("Note successfully deleted", "success");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      updateMsg("Error deleting note: " + error.message, "danger");
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": authToken
        },
        body: JSON.stringify({ title, description, tag })
      });

      const json = await response.json();
      if (json.errors) {
        updateMsg(json.errors[0].msg, "danger");
      } else {
        setNotes(notes.map(note => note._id === id ? json : note));
        updateMsg("Note successfully edited", "success");
      }
    } catch (error) {
      console.error("Error editing note:", error);
      updateMsg("Error editing note: " + error.message, "danger");
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes , setToken , isLoggedIn , setLogin}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
