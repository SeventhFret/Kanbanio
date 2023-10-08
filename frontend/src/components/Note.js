import "./Note.css";
import { useEffect, useState, useCallback } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Markdown from 'react-markdown';
import dayjs from "dayjs";
import { useApiUpdateNote } from "./Utils";


export function Note(props) {
    const { note } = props;
    const [noteText, setNoteText] = useState(note ? note.text : "");
    const [noteFocused, setNoteFocused] = useState(false);
    const updateNote = useApiUpdateNote();


    const handleSaveKeys = useCallback((event, note, noteText) => {

        if ((event.metaKey === true && event.key === "s")) {
            const updatedNoteData = {
                ...note,
                text: noteText
            }

            console.log(updatedNoteData);
            event.preventDefault();
            window.removeEventListener('keydown', handleSaveKeys);
            setNoteFocused(false);
            updateNote(updatedNoteData);
        }
    }, [updateNote]);


    useEffect(() => {
        if (noteFocused) {
            window.addEventListener("keypress", handleSaveKeys);
        } 
        return () => {
            document.removeEventListener('keydown', handleSaveKeys);
          };
    }, [noteFocused, handleSaveKeys])

    const handleNoteFocus = () => {
        setNoteFocused(true);
    }


    return (
        <>
        { note ? 
        <div style={{ padding: '5vw', minWidth: '70%', maxHeight: '100vh' }}>
            <Box position='static'>
                <Typography variant='h4' sx={{ mb: '1vh' }}>{note.title}</Typography>
                <Typography sx={{ mb: '1vh' }}>Created: {dayjs(new Date(note.created)).format("MM-DD-YYYY HH:MM")}</Typography>
                <Divider sx={{ mb: '5vh' }} />
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
                // <TextareaAutosize 
                // onChange={changeNoteText} 
                // defaultValue={notes[selectedNote].text} 
                // className='note-text-area' /> 
                :
                <div 
                 onClick={handleNoteFocus} 
                //  style={{ display: 'flex', flexGrow: 1, backgroundColor: 'red' }}
                >
                    <Markdown style={{ display: 'flex', flexDirection: 'column' }}>{noteText}</Markdown>
                </div>
                    }
                {/* <Typography variant='subtitle'>{notes[selectedNote].text}</Typography> */}
            </Box>
        </div>
        : null }
        </>
    );
}