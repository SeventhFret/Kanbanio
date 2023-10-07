import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { api } from './ApiClient';
import dayjs from 'dayjs';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export function TodoDialog(props) {
    const { todoData, folders } = props;
    const [folder, setFolder] = React.useState();
    const [title, setTitle] = React.useState();
    const [endDate, setEndDate] = React.useState();

    const [open, setOpen] = React.useState(false);

    function submitTodo() {
        if (todoData) {
            const patchUrl = "/todo/" + todoData.id + "/";

            api.patch(patchUrl, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem("access")
                },
                body: {
                    "title": title,
                    "end_date": dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                    "folder": folder
                }
            })
            .then(res => {console.log(res);})
            .catch(error => {console.log(error);})
            
        } else {
            // Create todo
        }
    }

    
    const handleFolderSelect = (e) => {
        setFolder(e.target.value);
    }
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
        { todoData ? 
        <ListItemButton onClick={handleClickOpen}>
            <Typography key={todoData.id} sx={{ minWidth: '10vw' }}>
                {todoData.title}
            </Typography>
            <Typography sx={{ minWidth: '10vw' }}>
                {dayjs(new Date(todoData.end_date)).toString()}
            </Typography>
        </ListItemButton>
        : 
        <ListItemButton onClick={handleClickOpen}>
            <AddIcon />
            Add todo
        </ListItemButton>
        }
        <div style={{ minWidth: '30vw' }}>
          <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: '5vw' }}
          >
            <DialogTitle>{"Create todo"}</DialogTitle>
            <DialogContent>
            <DialogContentText mb={2} id="alert-dialog-slide-description">
                Enter data to create todo
            </DialogContentText>
            <Box display='flex' flexDirection='column' gap={2}>
                <>
                <TextField onChange={handleTitleChange} defaultValue={todoData ? todoData.title : null} label="Title" ></TextField>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={todoData ? todoData.folder : folder ? folder : folders[0].id}
                    label="Status"
                    onChange={handleFolderSelect}
                    >
                        { folders ? folders.map((folder) => (
                            <MenuItem value={folder.id}>{folder.title}</MenuItem>
                        )) : null }
                    </Select>
                </FormControl>
            
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                    value={todoData ? dayjs(new Date(todoData.end_date)) : null}
                    onChange={(newDate) => setEndDate(newDate)}
                        label={'End date'} />
                </LocalizationProvider>
                </>

            </Box>

            </DialogContent>
            <DialogActions sx={{ mb: '1vh', mr: '1vw' }}>
              <Button variant='filled' onClick={handleClose}>Cancel</Button>
              <Button variant='contained' onClick={submitTodo}>Save</Button>
            </DialogActions>
          </Dialog>
        </div>
        </>
      );



}