import './NotesPage.css';
import { useCallback, useEffect, useState } from 'react';
import SideBar from "../components/SideBar";
import NotesExplorer from "../components/NotesExplorer";
// import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { api } from '../components/ApiClient';
import { Box, Divider, Typography } from '@mui/material';
import Markdown from 'react-markdown'
import dayjs from 'dayjs';
import { useApiNotes, useApiNotesFolders } from '../components/Utils';
import TextareaAutosize from '@mui/material/TextareaAutosize';


export function NotesPage({ userData, loggedIn }) {
    const [selectedNote, setSelectedNote] = useState();
    // const [folders, setFolders] = useState(useApiNotesFolders());
    const folders = useApiNotesFolders();
    const notes = useApiNotes();
    // const [foldersState, setFoldersState] = useState({});
    // const [notes, setNotes] = useState(useApiNotes());
    const [noteFocused, setNoteFocused] = useState(false);
    const [noteText, setNoteText] = useState("");
    // const [noteTitle, setNoteTitle] = useState("");


    // if (!loggedIn) {
    //     return ( <UnauthorizedErrorPage /> )
    // }


    const changeSelectedNote = (noteInd) => {
        setSelectedNote(noteInd);
        console.log(notes);
    }

    const handleNoteFocus = () => {
        setNoteFocused(true);
    }

    const changeNoteText = (e) => {
        e.preventDefault();
        setNoteText(e.target.value);
    }



    const MainContent = () => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <NotesExplorer 
            // handleFolderOpen={handleFolderOpen} 
            changeSelectedNote={changeSelectedNote} 
            // folderState={foldersState}
            selectNote={selectedNote}
            folders={folders}
            notes={notes} />

            { (selectedNote || selectedNote === 0) ?
            <div style={{ padding: '5vw', minWidth: '70%', maxHeight: '100vh', overflow: 'auto' }}>
                <Box>
                    <Typography variant='h4' sx={{ mb: '1vh' }}>{notes[selectedNote].title}</Typography>
                    <Typography sx={{ mb: '1vh' }}>Created: {dayjs(new Date(notes[selectedNote].created)).format("MM-DD-YYYY HH:MM")}</Typography>
                    <Divider sx={{ mb: '5vh' }} />
                </Box>
                <Box className='note-content'>
                    { noteFocused ?
                    <TextareaAutosize 
                    onChange={changeNoteText} 
                    defaultValue={notes[selectedNote].text} 
                    className='note-text-area' /> 
                    :
                    <div onClick={handleNoteFocus}>
                        <Markdown>{notes[selectedNote].text}</Markdown>
                    </div>
                     }
                    {/* <Typography variant='subtitle'>{notes[selectedNote].text}</Typography> */}
                </Box>
            </div>
            : null
             }
        </div>
    )

    return (
        <SideBar selected={'Notes'} mainContent={<MainContent />} isNotesPage={true} userData={userData} />
    )
}