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
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
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
    
    const columnColors = {
        "Todo": "rgba(162, 163, 162, 0.504)",
        "In Progress": "rgba(246, 214, 68, 0.504)",
        "Done": "rgba(41, 241, 41, 0.504)"
    }

    const [currentTab, setCurrentTab] = useState(0);
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
        const requestUrl = "/folder/?type=T";
    
        api.get(requestUrl, {
            headers: {
                Authorization: "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setFolders(res.data); console.log(res.data);})
        .catch(error => {setFolders(false); console.log(error);})
    
    }
    
    const changeTab = (event, newValue) => {
        setCurrentTab(newValue);
        localStorage.setItem('todos_view', newValue);
    }

    
    useState(() => {
        getUsersTodos();
        getUsersFolders();
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
                <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
                { folders ? folders.map((folder) => (
                    <Accordion
                    id={"folder" + folder.id}
                    key={folder.id}
                    sx={{ backgroundColor: columnColors[folder.title] }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"folder" + folder.id}
                      >
                        <Typography variant="h5">{folder.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box display='flex' flexDirection='row' p={2} color={'secondary'} sx={{ borderBottom: '1px solid black' }}>
                            <Typography display='flex' alignItems='center' sx={{ minWidth: '80%', fontWeight: 'bold' }}><AbcIcon size={'sm'} />Title</Typography>
                            <Typography display='flex' alignItems='center' sx={{ minWidth: '20%', fontWeight: 'bold' }}><CalendarMonthIcon />End date</Typography>
                        </Box>
                        <List>
                        { todos ? todos.map((todo) => (
                            (todo.folder === folder.id) ? 
                                <TodoDialog key={todo.id} kanban={false} todoData={todo} folders={folders} />
                                : null
                                )) : null }
                        </List>
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
            <Box component='div' value={1} index={1} display="flex" gap={5} sx={{ height: "80vh", overflow: "auto" }}>
                { folders ? folders.map((folder) => (
                    <KanbanColumn columnColor={columnColors[folder.title]} key={folder.id} title={folder.title} todos={todos} folderId={folder.id} folders={folders} />
                )) : null}
            </Box>
            }
        </Box>
    )
    
    return (
        <SideBar mainContent={<MainContent />} userData={userData} />
    )
    


}