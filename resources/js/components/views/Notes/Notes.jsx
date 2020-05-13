import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import NoteCard from "./NoteCards/NoteCard";
import DeletedNoteCard from "./NoteCards/DeletedNoteCard";
import NewNoteForm from "./NewNoteForm/NewNoteForm";
import LoadingScreen from "react-loading-screen";
import axios from "axios";
import "./Notes.css";

const Notes = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletedNotes, setDeletedNotes] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [recipientUserName, setRecipientUserName] = useState("");
  const [showShareFormId, setShowShareFormId] = useState("");
  const [userList, setUserList] = useState({});
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios("api/auth/user", {
      method: "get",
      headers: {
        Authorization: `Bearer ${
          localStorage["appState"]
            ? JSON.parse(localStorage["appState"]).access_token
            : ""
        }`
      }
    })
      .then(res => {
        setName(res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1));
        setUserId(res.data.id);
        return res.data.id;
      })
      .then(userId => {
        axios
          .get(`api/notes/${userId}`)
          .then(res => {
            // const tempNotes = res.data.map(note => {
            //   note.shareTarget = false
            //   return note
            // })
            // const tempDelNotes = [...res.data.map(note => {
            //   note.shareTarget = false
            //   return note
            // })]
            // let arr = Object.entries(res.data).map(innerArray => innerArray[1]);
            setNotes(res.data);
            // setDeletedNotes(tempDelNotes)
            setUser(res.data.username);
            setLoading(false);
          })
          .catch(err => console.log(err));
      });
  }, []);

  // useEffect(() => {
  //   axios.post(`api/notes/`, {
  //     userId
  //   })
  //     .then(res => {
  //       // const tempNotes = res.data.map(note => {
  //       //   note.shareTarget = false
  //       //   return note
  //       // })
  //       // const tempDelNotes = [...res.data.map(note => {
  //       //   note.shareTarget = false
  //       //   return note
  //       // })]
  //       setNotes(res.data)
  //       // setDeletedNotes(tempDelNotes)
  //       setUser(res.data.username)
  //       setLoading(false)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  //   useEffect(() => {
  //     let scopedUser = user
  //     axios.get('api/showallusers')
  //       .then(res => {
  //         let scopedUserList = [...res.data.users.filter(user => {
  //           return user.username !== scopedUser
  //         })]
  //         setRecipient(scopedUserList[0].userId)
  //         setRecipientUserName(scopedUserList[0].username)
  //         return setUserList(scopedUserList)
  //       })
  //       .catch(err => err)
  //   }, [user])

  const updateTitle = e => setTitle(e.target.value);
  const updateDescription = e => setDescription(e.target.value);
  const updateRecipient = e => {
    setRecipient(e.target.value);
    const selectText = document.querySelector("select#userSelect");
    const username = selectText.options[selectText.selectedIndex].text;
    setRecipientUserName(username);
  };
  const toggleShareForm = e => {
    const id = e.target.closest("div[data-note-id]").dataset.noteId;
    if (id === showShareFormId) {
      return setShowShareFormId("");
    } else {
      const tempNotes = [...notes.filter(note => note._id === id)];
      tempNotes[0].shareTarget = !tempNotes[0].shareTarget;
      setShowShareFormId(tempNotes[0]._id);
    }
  };
  const toggleNoteForm = () => setShowNoteForm(!showNoteForm);
  const resetForm = () => {
    setTitle("");
    setDescription("");
  };
  const toggleDeletedElt = () => {
    setShowDeleted(!showDeleted);
    if (showNoteForm) {
      toggleNoteForm();
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("api/notes", {
        title,
        description,
        userId
      })
      .then(res => {
        console.log(res);
        setNotes(res.data);
        resetForm();
        return toggleNoteForm(!showNoteForm);
      })
      .catch(err => err);
  };
  const deleteNote = e => {
    const id = e.target.closest("div[data-note-id]").dataset.noteId;
    axios
      .delete(`api/notes/${userId}/${id}`)
      .then(res => {
        setNotes(res.data);
      })
      .catch(err => err);
    console.log(
      `Deleted note! If this was a mistake, you can restore it in the deleted notes view.`
    );
  };
  const restoreNote = e => {
    const id = e.target.closest("div[data-note-id]").dataset.noteId;
    axios
      .patch("api/restore", {
        noteId: id
      })
      .then(res => {
        setNotes([...res.data.notes.notes]);
        setDeletedNotes([...res.data.deleted.notes]);
      })
      .catch(err => err);
    alert(`Note restored to your profile!`);
  };
  const shareNote = e => {
    e.preventDefault();
    const id = e.target.closest("div[data-note-id]").dataset.noteId;
    axios
      .post("api/share", {
        userId: recipient,
        noteId: id
      })
      .then(() => {
        alert(`Note shared with ${recipientUserName} successfully!`);
      })
      .catch(err => err);
    return toggleShareForm(e);
  };

  // cards generated by looping over note arrays
  const deletedNotesElt = deletedNotes.map(note => (
    <DeletedNoteCard
      key={note._id}
      dataNoteId={note._id}
      title={note.title}
      description={note.description}
      restoreNote={restoreNote}
      updatedAt={note.updatedAt}
      createdAt={note.createdAt}
    />
  ));

  const notesElt = notes.map(note => (
    <NoteCard
      updatedAt={note.updated_at}
      createdAt={note.created_at}
      key={note.id}
      dataNoteId={note.id}
      title={note.title}
      description={note.description}
      deleteNote={deleteNote}
      toggleShareForm={toggleShareForm}
      showShareFormId={showShareFormId}
      shareNote={shareNote}
      updateRecipient={updateRecipient}
      recipient={recipient}
      userList={userList}
    />
  ));

  return (
    <div className="container">
      {loading ? (
        <LoadingScreen
          loading={loading}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Grabbing your notes. Hang tight."
        />
      ) : (
        <>
          <h1>Hello, {name}.</h1>
          <button
            type="button"
            style={{ outline: "none" }}
            onClick={toggleDeletedElt}
            className={!showDeleted ? "btn btn-outline-info" : "btn btn-danger"}
          >
            {showDeleted ? "Back to notes" : "See deleted notes"}
          </button>

          {showDeleted ? (
            ""
          ) : (
            <button
              className={
                !showNoteForm ? "btn btn-outline-success" : "btn btn-danger"
              }
              type="button"
              onClick={toggleNoteForm}
            >
              {showNoteForm ? "Cancel" : "New note"}
            </button>
          )}

          <div className="card-columns">
            {showNoteForm ? (
              <NewNoteForm
                handleSubmit={handleSubmit}
                title={title}
                updateTitle={updateTitle}
                description={description}
                updateDescription={updateDescription}
              />
            ) : (
              ""
            )}
            {showDeleted ? deletedNotesElt : notesElt}
          </div>
        </>
      )}
    </div>
  );
};

export default Notes;
