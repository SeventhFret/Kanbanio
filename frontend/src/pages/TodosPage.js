import "./TodosPage.css";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SideBar from "../components/SideBar";

import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { KanbanColumn } from "../components/KanbanColumn";
import { TodoDialog } from "../components/TodoDialog";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";
import { useApiGetTodos, useApiGetFolders } from "../components/Utils";
import { KanbanTab, ListTab } from "../components/TodoTabs";



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
    const folderChanged = false;
    const [todosChanged, setTodosChanged] = useState(false);
    const todos = useApiGetTodos();
    const folders = useApiGetFolders("T", folderChanged);
    
    
    const changeTab = (event, newValue) => {
        setCurrentTab(newValue);
    }

    const handleTodosChanged = () => {
        setTodosChanged(!todosChanged);
    }

    const MainContent = () => (
        <Box sx={{ minHeight: '90vh'}}>
            <Tabs value={currentTab} onChange={changeTab}>
                <Tab label="Kanban">Kanban</Tab>
                <Tab label="List">List</Tab>
            </Tabs>

            <Divider sx={{ mb: 5 }} />

            { currentTab ?  
                <ListTab 
                 folders={folders}
                 todos={todos}
                 columnColors={columnColors}
                 handleTodosChanged={handleTodosChanged}
                 />
            :
            <Box 
            component='div' 
            value={1} 
            index={1} 
            display="flex"
            gap={5} 
            sx={{ height: "80vh", overflow: "auto" }}>
                { folders ? folders.map((folder) => (
                    <KanbanColumn 
                     columnColor={columnColors[folder.title]}
                     key={folder.id} 
                     title={folder.title} 
                     todos={todos} 
                     folderId={folder.id} 
                     folders={folders} />
                )) : null}
            </Box>
            }
        </Box>
    )
    
    return (
        <SideBar 
        selected={"Todos"} 
        mainContent={<MainContent />} 
        userData={userData} />
    )
    


}