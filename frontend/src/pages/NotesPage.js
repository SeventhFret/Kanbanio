import { useEffect, useState } from 'react';
import SideBar from "../components/SideBar";
import NotesExplorer from "../components/NotesExplorer";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { Note } from '../components/Note';
import { useApiNotes, useUsersFolders } from '../components/Utils';



export function NotesPage({ userData, loggedIn }) {
    const [selectedNote, setSelectedNote] = useState();
    const [noteChanged, setNoteChanged] = useState(false);
    const folders = useUsersFolders("N");
    const notes = useApiNotes();



    if (!loggedIn) {
        return ( <UnauthorizedErrorPage /> )
    }

    const changeSelectedNote = (noteInd) => {
        setSelectedNote(noteInd);
    }

    const handleNoteChanged = () => {
        notes.filter((note) => {return note.id !== selectedNote})
        setNoteChanged(true);
        setSelectedNote(null);
    }


    const MainContent = () => (
        <div style={{ display: 'flex', flexDirection: 'row', position: "sticky", maxHeight: '95vh' }}>
            <NotesExplorer 
            changeSelectedNote={changeSelectedNote} 
            selectNote={selectedNote}
            folders={folders}
            notes={notes} />

        { ((selectedNote || selectedNote === 0) && notes) ?
            <Note 
            note={notes[selectedNote]}
            handleNoteChanged={handleNoteChanged}
            />
            : null }
        </div>
    )

    return (
        <SideBar selected={'Notes'} mainContent={<MainContent />} isNotesPage={true} userData={userData} />
    )
}