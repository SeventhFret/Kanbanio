import { useState } from 'react';
import SideBar from "../components/SideBar";
import NotesExplorer from "../components/NotesExplorer";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { Note } from '../components/Note';
import { useApiNotes, useApiGetFolders } from '../components/Utils';



export function NotesPage({ userData, loggedIn }) {
    const [selectedNote, setSelectedNote] = useState();
    const [noteChanged, setNoteChanged] = useState(false);
    const [folderChanged, setFolderChanged] = useState(false);
    const folders = useApiGetFolders("N", folderChanged);
    const notes = useApiNotes(noteChanged);


    if (!loggedIn) {
        return ( <UnauthorizedErrorPage /> )
    }

    const changeSelectedNote = (noteInd) => {
        setSelectedNote(noteInd);
    }

    const handleNoteChanged = (action) => {
        setNoteChanged(true);
        if (action === 'deleted') {
            setSelectedNote(null);
        } 
    }

    const handleFolderChanged = () => {
        setFolderChanged(!folderChanged);
    }

    const MainContent = () => (
        <div style={{ display: 'flex', flexDirection: 'row', position: "sticky", maxHeight: '95vh' }}>
            <NotesExplorer 
            changeSelectedNote={changeSelectedNote} 
            selectNote={selectedNote}
            folders={folders}
            handleFolderChanged={handleFolderChanged}
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
        <SideBar 
         selected={'Notes'}
         mainContent={<MainContent />} 
         isNotesPage={true} 
         userData={userData} />
    )
}