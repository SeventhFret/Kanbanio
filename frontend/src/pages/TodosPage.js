import "./TodosPage.css";
import * as React from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SideBar from "../components/SideBar";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import { getUsersTodos } from "../components/Utils";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { KanbanColumn } from "../components/KanbanColumn";
import { TodoDialog } from "../components/TodoDialog";
import { useState } from "react";
import { api } from "../components/ApiClient";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";





export function TodosPage({ userData, loggedIn }) {

    if (!loggedIn) (
        <UnauthorizedErrorPage />
    )
    
    const [currentTab, setCurrentTab] = useState(1);
    const [folders, setFolders] = useState([]);
    const [todos, setTodos] = useState([]);
    
    const getUsersTodos = () => {
        api.get("/todo/", {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setTodos(res.data)})
        .catch(error => {setTodos(false)})

    }

    const getUsersFolders = (type) => {
        let requestUrl = "/folder/";
    
        if (type === "N") {
            requestUrl = requestUrl + "?type=N";
        } else if (type === "T") {
            requestUrl = requestUrl + "?type=T";
        }
    
        api.get(requestUrl, {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setFolders(res.data)})
        .catch(error => {setFolders(false)})
    
    }
    
    const changeTab = (event, newValue) => {
        setCurrentTab(newValue);
    }
    
    useState(() => {
        getUsersTodos();
        getUsersFolders('T');
    }, [])

    const MainContent = () => (
        <Box sx={{ minHeight: '90vh'}} >
            <Tabs value={currentTab} onChange={changeTab}>
                <Tab label="Kanban">Kanban</Tab>
                <Tab label="List">List</Tab>
            </Tabs>

            <Divider sx={{ mb: 5 }} />

            { currentTab ?  
            <Box value={0} index={0}>
                <Box display='flex' flexDirection='column' gap={0.5}>
                <div>
                { folders ? folders.map((folder) => (
                    <Accordion
                    sx={{ backgroundColor: 'rgba(35, 194, 35, 0.3)' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"folder" + folder.id}
                        id={"folder" + folder.id}
                      >
                        <Typography>{folder.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box display='flex' flexDirection='row' gap={10} p={2} color={'secondary'} sx={{ borderBottom: '1px solid black' }}>
                            <Typography sx={{ minWidth: '10vw' }}>Title</Typography>
                            <Typography sx={{ minWidth: '10vw' }}>End date</Typography>
                        </Box>
                        { todos ? todos.map((todo) => (
                            (todo.folder === folder.id) ? 
                            // <Box display='flex' flexDirection='row' gap={10} p={2} sx={{ borderBottom: '1px solid black' }}>
                            <List>
                                <TodoDialog todoData={todo} folders={folders} />
                                {/* <ListItemButton sx={{ m: 0 }}>
                                    <Typography key={todo.id} sx={{ minWidth: '10vw' }}>
                                        {todo.title}
                                    </Typography>
                                    <Typography sx={{ minWidth: '10vw' }}>
                                        {todo.end_date}
                                    </Typography>
                                </ListItemButton> */}
                            </List>
                            // </Box>
                                : null
                        )) : null }
                        <Box display='flex' alignItems='center'>
                            <TodoDialog folders={folders} />
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    )) : null}
                </div>
                </Box>
            </Box> 
            :            
            <Box value={1} index={1} display="flex" gap={10} sx={{ minHeight: '80%' }}>
                    { folders ? folders.map((folder) => (
                        <KanbanColumn key={folder.id} title={folder.title} todos={todos} folderId={folder.id} />
                    )) : null}
            </Box>
            }
        </Box>
    )
    
    return (
        <SideBar mainContent={<MainContent />} userData={userData} />
    )
    


}