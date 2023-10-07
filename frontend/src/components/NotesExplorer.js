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
import Divider from '@mui/material/Divider';
// import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';




export default function NotesExplorer(props) {
  const { handleFolderOpen, changeSelectedNote, selectNote, folderState, folders, notes } = props;
  const [foldersState, setFoldersState] = useState({});
  const [selectedNote, setSelectedNote] = useState();

  

  const handleSelectedNote = (event, noteId) => {
    setSelectedNote(noteId);
    changeSelectedNote(noteId);
  }

  const handleOpen = (event, folderId) => {
    setFoldersState()
    handleFolderOpen(event, folderId);
  }


  useEffect(() => {
    setFoldersState(folderState);
    setSelectedNote(selectNote);
   }, [folderState, selectNote]);

  return (
    <List
      sx={{ width: '100%', 
      maxWidth: 360, 
      height: '100vh', 
      bgcolor: 'background.paper', 
      margin: 0, 
      borderRight: '1px solid black',
      position: 'static' 
       }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
          <Typography variant='h5' p={2}>Notes</Typography>
      }
    >
      <Divider />

      { folders ? folders.map((folder) => (
        <>
      <ListItemButton id={folder.id} onClick={(event) => handleOpen(event, folder.id)}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={folder.title} />
        {foldersState[folder.id] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={foldersState[folder.id]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { notes ?  
          notes.map((note, index) => (
            (note.folder === folder.id) ?
            <ListItemButton
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
      </>
        )) : null
      }
    </List>
  );
}