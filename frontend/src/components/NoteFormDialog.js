import { useState, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { apiCreateNote } from './Utils';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export function NoteFormDialog(props) {
    const { handleCreateNoteClicked, folders } = props;
    const [dialogOpened, setDialogOpened] = useState(true);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [noteFolder, setNoteFolder] = useState(folders ? folders[0].id : null)

    const handleDialogClose = () => {
        setDialogOpened(false);
        handleCreateNoteClicked();
    }

    const handleFolderSelect = (e) => {
        setNoteFolder(e.target.value);
    }

    const handleTitleChange = (e) => {
        setNoteTitle(e.target.value);
    }

    const handleTextChange = (e) => {
        setNoteText(e.target.value);
    }

    const submitNoteCreation = () => {
        const noteData = {
            title: noteTitle,
            text: noteText,
            folder: noteFolder
        }
        apiCreateNote(noteData);
        handleDialogClose();
    }

    return (
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={dialogOpened}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: '5vw' }}
          >
            <DialogTitle>Create note</DialogTitle>
            <DialogContent>
            <DialogContentText mb={2} id="alert-dialog-slide-description">
                Enter data to create note
            </DialogContentText>
            <Box display='flex' flexDirection='column' gap={2}>
                <TextField onChange={handleTitleChange} label="Title"></TextField>
                <TextField multiline maxRows={10} onChange={handleTextChange} label="Text"></TextField>
                { folders ?
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                    <Select
                    label="Folder"
                    value={noteFolder}
                    onChange={handleFolderSelect}
                    >
                        { folders ? folders.map((folder) => (
                            <MenuItem key={folder.id} value={folder.id}>{folder.title}</MenuItem>
                        )) : null }
                    </Select>
                </FormControl>
                : null }
            </Box>

            </DialogContent>
            <DialogActions sx={{ mb: '1vh', mr: '1vw' }}>
              <Button variant='filled' onClick={handleDialogClose}>Cancel</Button>
              <Button variant='contained' onClick={submitNoteCreation}>Save</Button>
            </DialogActions>
          </Dialog>
    )
}