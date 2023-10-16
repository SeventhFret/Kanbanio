import './Note.css';
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
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { IconButton, Toolbar, Typography } from '@mui/material';
import { FolderFormDialog } from './FolderFormDialog';
import { NoteFormDialog } from './NoteFormDialog';
import { FolderOptions } from './FolderOptions';
import { apiUpdateFolder } from './Utils';


export default function NotesExplorer(props) {
  const getSavedFoldersState = () => {
    const savedFoldersState = localStorage.getItem('foldersState');

    if (savedFoldersState) {
      return JSON.parse(savedFoldersState);
    } 
    return {}
  }
  
  const { changeSelectedNote, handleFolderChanged, selectNote, folders, notes } = props;
  const [foldersState, setFoldersState] = useState(getSavedFoldersState());
  const [selectedNote, setSelectedNote] = useState(selectNote);
  const [createNoteClicked, setCreateNoteClicked] = useState(false);
  const [folderEdit, setFolderEdit] = useState();
  const [newFolderTitle, setNewFolderTitle] = useState("");


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

    const submitFolderChanged = () => {
      const filterEditedFolder = folders.filter((folder) => {return folder.id === folderEdit});
      const updatedFolderData = filterEditedFolder[0];
      
      updatedFolderData.title = newFolderTitle;
      apiUpdateFolder(updatedFolderData);
    }

    const handleCreateNoteClicked = () => {
      setCreateNoteClicked(!createNoteClicked);
    }

    const handleFolderEdit = (folderId) => {
      setFolderEdit(folderId);
    }

    
  useEffect(() => {
    localStorage.setItem("foldersState", JSON.stringify(foldersState));
  }, [foldersState]);


  return (
    <Box 
    maxWidth={360} 
    height='100vh' 
    display='flex' 
    flexDirection='column'
    sx={{
      borderRight: '1px solid black',
    }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant='h5' p={2} flexGrow={1}>Notes</Typography>
          <Toolbar>
            { folders.length > 0 ?
            <IconButton
            title='Create note'
            onClick={handleCreateNoteClicked}
            sx={{ height: '100%' }}>
              <NoteAddIcon />
            </IconButton>
            : <Typography variant='subtitle2'>Add folder to create note</Typography>
            }
          </Toolbar>
            { createNoteClicked ? 
            <NoteFormDialog
            folders={folders}
            handleCreateNoteClicked={handleCreateNoteClicked} />
            : null }
        </div>
        <Divider />
    <List
      sx={{ width: '100%', 
      maxWidth: 360, 
      maxHeight: '95vh',
      bgcolor: 'background.paper', 
      margin: 0,
      position: 'static',
      overflow: 'auto',
      flexGrow: 1
       }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >

      { folders ? folders.map((folder) => (
      <Box key={folder.id}>
      <ListItem sx={{ p: 0 }}
      secondaryAction={
        <FolderOptions 
        handleFolderChanged={handleFolderChanged} 
        folderId={folder.id} 
        handleFolderEdit={handleFolderEdit} />
      }>
      <ListItemButton id={folder.id}
      onClick={(event) => handleOpen(event, folder.id)}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        { (folderEdit && folderEdit === folder.id) ? 
        <>
        <form onSubmit={submitFolderChanged}>
          <input type="text"
          autoFocus
          className='note-text-area' 
          value={newFolderTitle}
          placeholder={folder.title}
          onChange={(e) => {setNewFolderTitle(e.target.value)}}></input>
        </form>
        </>
         : <ListItemText primary={folder.title} />}
        { foldersState[folder.id] ? <ExpandLess /> : <ExpandMore /> }
      </ListItemButton>
      
      </ListItem>

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
      
      </Box>
        )) : null
      } 
    </List>
    <Divider />
    <FolderFormDialog handleFolderChange={handleFolderChanged} />
    </Box>
  );
}