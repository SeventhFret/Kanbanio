import { useState, forwardRef } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { redButtonTheme } from './Themes';
import { useApiCreateFolder } from './Utils';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export function FolderFormDialog(props) {
    const { handleFolderChange, folderTitle } = props;
    const [title, setTitle] = useState(folderTitle ? folderTitle : null);
    const submitFolderCreate = useApiCreateFolder({"title": title, "type": "N"});

    const [openEdit, setOpenEdit] = useState(false);
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    // const useCreateFolder = () => {
    //     setFolderCreated(useApiCreateFolder());
    // }
    
    const handleEditOpen = () => {
        setOpenEdit(true);
    };

    const handleEditClose = () => {
        setOpenEdit(false);
    };


    return (
        <div>
        <ListItemButton sx={{ py: 2 }} onClick={handleEditOpen}>
          <ThemeProvider theme={redButtonTheme}>
            <ListItemIcon>
                <CreateNewFolderIcon />
            </ListItemIcon>
          </ThemeProvider>
            Add folder
        </ListItemButton>

        <div style={{ minWidth: '30vw' }}>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={openEdit}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEditClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: '5vw' }}
          >
            <DialogTitle>Create folder</DialogTitle>
            <DialogContent>
            <DialogContentText mb={2} id="alert-dialog-slide-description">
                Enter data to create folder
            </DialogContentText>
            <Box display='flex' flexDirection='column' gap={2}>
                <TextField autoFocus={true} onChange={handleTitleChange} label="Title"></TextField>
            </Box>

            </DialogContent>
            <DialogActions sx={{ mb: '1vh', mr: '1vw' }}>
              <Button variant='filled' onClick={handleEditClose}>Cancel</Button>
              <Button 
              variant='contained' 
              onClick={() => {
                submitFolderCreate({"title": title, "type": "N"}); 
                handleFolderChange(); 
                handleEditClose();
                }}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        </div>
      );
}