import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import CreateIcon from '@mui/icons-material/Create';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { FolderFormDialog } from './FolderFormDialog';
import { NoteFormDialog } from './NoteFormDialog';




export default function NotesExplorer(props) {
  const getSavedFoldersState = () => {
    const savedFoldersState = localStorage.getItem('foldersState');

    if (savedFoldersState) {
      return JSON.parse(savedFoldersState);
    } 
    return {}
  }
  
  const { changeSelectedNote, selectNote, folders, notes } = props;
  const [foldersState, setFoldersState] = useState(getSavedFoldersState());
  const [selectedNote, setSelectedNote] = useState(selectNote);
  const [createNoteClicked, setCreateNoteClicked] = useState(false);


  const handleSelectedNote = (event, noteId) => {
    setSelectedNote(noteId);
    changeSelectedNote(noteId);
  }

  const handleOpen = (event, folderId) => {
    const currentState = foldersState[folderId];
    
    if (currentState !== undefined) {
      setFoldersState({
            ...foldersState,
            [folderId]: !currentState
        });
      } else {
        setFoldersState({
          ...foldersState,
          [folderId]: true
        });
      };
      
    }

    const handleCreateNoteClicked = () => {
      setCreateNoteClicked(!createNoteClicked);
    }

    
  useEffect(() => {
    localStorage.setItem("foldersState", JSON.stringify(foldersState));
  }, [foldersState]);


  return (
    <List
      sx={{ width: '100%', 
      maxWidth: 360, 
      height: '100vh',
      bgcolor: 'background.paper', 
      margin: 0, 
      borderRight: '1px solid black',
      position: 'static',
      overflow: 'auto',
       }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems: 'center' }}>
          <Typography variant='h5' p={2} flexGrow={1}>Notes</Typography>
          <Toolbar>
            <IconButton
            title='Create note'
            onClick={handleCreateNoteClicked}
            sx={{ height: '100%' }}>
              <CreateIcon />
            </IconButton>
          </Toolbar>
            { createNoteClicked ? 
            <NoteFormDialog
            folders={folders}
            handleCreateNoteClicked={handleCreateNoteClicked} />
            : null }
        </div>
      }
    >
      <Divider />

      { folders ? folders.map((folder) => (
      <div key={folder.id}>
      <ListItemButton id={folder.id}
      onClick={(event) => handleOpen(event, folder.id)}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.title} />
        { foldersState[folder.id] ? <ExpandLess /> : <ExpandMore /> }
      </ListItemButton>

      <Collapse in={foldersState[folder.id]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { notes ?  
          notes.map((note, index) => (
            (note.folder === folder.id) ?
            <ListItemButton
            key={index}
            id={index}
            onClick={(event) => handleSelectedNote(event, index)}
            selected={(selectedNote === index) ? true : false}
            sx={{ pl: 4 }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={note.title} />
          </ListItemButton>
          : null
        ))
          : null}
        </List>
      </Collapse>
      </div>
        )) : null
      } 
    <Divider sx={{ mt: '2vh' }} />
    <FolderFormDialog />
    </List>
  );
}