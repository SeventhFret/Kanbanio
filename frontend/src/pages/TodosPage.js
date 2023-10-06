import "./TodosPage.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SideBar from "../components/SideBar";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import { getUsersTodos } from "../components/Utils";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { KanbanColumn } from "../components/KanbanColumn";
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
    let accordionState ={
        todoPanel: true,
        progressPanel: true,
        donePanel: true
    };
    // const folders = useUsersFolders("T");
    
    const getUsersTodos = () => {
        // let userTodos;
    
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
        // let folders 
    
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

    const handleExpand = (panel) => (event, isExpanded) => {
        console.log(isExpanded);
        if (accordionState[panel]) {
            accordionState[panel] = false;
        } else {
            accordionState[panel] = true;
        }
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
                { folders ? 
                    <Accordion 
                    onChange={handleExpand('todoPanel')}
                    expanded={accordionState.todoPanel}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Todo</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            Todos goes here
                        </AccordionDetails>
                    </Accordion>
                 : null}
                </Box>
            </Box> 
            :            
            <Box value={1} index={1} display="flex" sx={{ minHeight: '80%' }}>
                    { folders ? folders.map((folder) => (
                        <KanbanColumn key={folder.id} title={folder.title} todos={todos} />
                    )) : null}
            </Box>
            }
        </Box>
    )
    
    return (
        <SideBar mainContent={<MainContent />} userData={userData} />
    )
    


}