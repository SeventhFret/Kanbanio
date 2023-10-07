import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';


export function TodoForm(props) {
    const { todoData, folders } = props;
    const [folder, setFolder] = useState();
    const [title, setTitle] = useState();
    const [endDate, setEndDate] = useState();
    
    function submitTodo() {
        if (todoData) {
            // Save todo
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

    return (
    <>
    <TextField onChange={handleTitleChange} value={todoData ? todoData.title : null} label="Title" ></TextField>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={todoData ? todoData.folder : folder}
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
    );
}