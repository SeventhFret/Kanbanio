import "./Note.css";
import { useState } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Toolbar from "@mui/material/Toolbar";
import Markdown from 'react-markdown';
import IconButton from "@mui/material/IconButton";
import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import { apiUpdateNote, apiDeleteNote } from "./Utils";


export function Note(props) {
    const { note, handleNoteChanged } = props;
    const [noteText, setNoteText] = useState(note ? note.text : "");
    const [noteFocused, setNoteFocused] = useState(false);


    const handleNoteSave = () => {
        if (note.text !== noteText) {
            note.text = noteText;
            apiUpdateNote(note);
            setNoteFocused(false);
            handleNoteChanged();
        }
    }
    
    const handleNoteFocus = () => {
        setNoteFocused(true);
    }
    
    const handlePreview = () => {
        setNoteFocused(false);
    }
    
    const handleDeleteNote = () => {
        apiDeleteNote(note.id);
        handleNoteChanged('deleted');
    }


    return (
        <>
        { note ? 
        <div style={{ padding: '5vw', minWidth: '70%', maxHeight: '100vh' }}>
            <Box position='static'>
                <Typography variant='h4' sx={{ mb: '1vh' }}>{note.title}</Typography>
                <Typography variant="body2" sx={{ mb: '1vh' }}>Created: {dayjs(new Date(note.created)).format("MM-DD-YYYY HH:MM")}</Typography>
                <Divider />
                <Toolbar sx={{ ml: -1, maxHeight: '1vh' }}>
                    <Typography>Actions</Typography>

                    <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />

                    <IconButton
                     title="Preview note"
                     onClick={handlePreview}>
                        <PreviewIcon />
                    </IconButton>

                    <IconButton
                    title="Save note"
                    onClick={handleNoteSave}>
                        <SaveIcon />
                    </IconButton>

                    <IconButton
                    title='Delete note'
                    onClick={handleDeleteNote}>
                        <DeleteIcon />
                    </IconButton>
                </Toolbar>
                <Divider sx={{ mb: '2vh' }} />
            </Box>
            <Box 
             className='note-content' 
             display="flex" 
             flexGrow={1}>
                { noteFocused ?
                <TextareaAutosize
                autoFocus={noteFocused}
                className='note-text-area'
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                ></TextareaAutosize>
                :
                <div onClick={handleNoteFocus}>
                    <Markdown style={{ display: 'flex', flexDirection: 'column', paddingTop: 0 }}>{noteText}</Markdown>
                </div>
                    }
                {/* <Typography variant='subtitle'>{notes[selectedNote].text}</Typography> */}
            </Box>
        </div>
        : null }
        </>
    );
}