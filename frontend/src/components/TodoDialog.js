import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import AbcIcon from '@mui/icons-material/Abc';
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
import CalendarMonth from '@mui/icons-material/CalendarMonth';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export function TodoDialog(props) {
    const { todoData, folders, kanban } = props;
    const [folder, setFolder] = React.useState();
    const [title, setTitle] = React.useState();
    const [endDate, setEndDate] = React.useState();

    const [open, setOpen] = React.useState(false);

    function submitTodo() {
        if (todoData) {
            const patchUrl = "/todo/" + todoData.id + "/";

            const updatedTodoData = {
                "title": title,
                "end_date": dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
                "folder": folder
            }

            api.patch(patchUrl, updatedTodoData, {
                headers: {
                    Authorization: 'JWT ' + localStorage.getItem("access")
                },
            })
            .then(res => {handleClose(); window.location.reload();})
            .catch(error => {handleClose();})
            
        } else {
            const newTaskData = {
                "title": title,
                "folder": folder,
                "end_date": dayjs(endDate).format('YYYY-MM-DDTHH:mm:ssZ')
            }
            api.post("/todo/", newTaskData, {
                headers: {
                    "Authorization": "JWT " + localStorage.getItem("access")
                }
            })
            .then(res => {console.log(res);handleClose();})
            .catch(error => {console.log(error);handleClose();})

            // window.location.reload();
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
        <ListItemButton sx={{ display: 'flex',
         flexDirection: kanban ? 'column' : 'row', 
         alignItems: kanban ? "flex-start" : 'initial',
         border: kanban ? "1px solid black" : 'none',
         borderRadius: kanban ? '10px' : 0,
         flexGrow: 1 }}  onClick={handleClickOpen}>
            <Typography display='flex' key={todoData.id} sx={{ minWidth: kanban ? null : '80%' , flexGrow: 1 }}>
                {kanban ? <AbcIcon sx={{ mr: '0.5vw' }} /> : null}
                {todoData.title}
            </Typography>
            <Typography display='flex' sx={{ minWidth: '20%', mt: kanban ? '1vh' : 0 }}>
                {kanban ? <CalendarMonth sx={{ mr: '0.5vw' }} /> : null}
                { dayjs(new Date(todoData.end_date)).format("DD.MM.YYYY HH:MM") }
            </Typography>
        </ListItemButton>
        : 
        <ListItemButton onClick={handleClickOpen}>
            <AddIcon />
            Add task
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
            <DialogTitle>{todoData ? "Create task" : "Edit task"}</DialogTitle>
            <DialogContent>
            <DialogContentText mb={2} id="alert-dialog-slide-description">
                {todoData ? "Enter data to create task" : "Edit data to change task" }
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
                            <MenuItem key={folder.id} value={folder.id}>{folder.title}</MenuItem>
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