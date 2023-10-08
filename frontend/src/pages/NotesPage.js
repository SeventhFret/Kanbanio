import { useState } from 'react';
import SideBar from "../components/SideBar";
import NotesExplorer from "../components/NotesExplorer";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { Note } from '../components/Note';
import { Box, Divider, Typography } from '@mui/material';
import Markdown from 'react-markdown'
import dayjs from 'dayjs';
import { useApiNotes, useUsersFolders } from '../components/Utils';
import TextField from '@mui/material/TextField';



export function NotesPage({ userData, loggedIn }) {
    const [selectedNote, setSelectedNote] = useState(0);
    const folders = useUsersFolders("N");
    const notes = useApiNotes();

    if (!loggedIn) {
        return ( <UnauthorizedErrorPage /> )
    }

    const changeSelectedNote = (noteInd) => {
        setSelectedNote(noteInd);
    }


    const MainContent = () => (
        <div style={{ display: 'flex', flexDirection: 'row', position: "sticky", maxHeight: '95vh' }}>
            <NotesExplorer 
            changeSelectedNote={changeSelectedNote} 
            selectNote={selectedNote}
            folders={folders}
            notes={notes} />

        { ((selectedNote || selectedNote === 0) && notes) ?
            <Note note={notes[selectedNote]} />
            : null }
        </div>
    )

    return (
        <SideBar selected={'Notes'} mainContent={<MainContent />} isNotesPage={true} userData={userData} />
    )
}