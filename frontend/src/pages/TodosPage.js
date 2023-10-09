import "./TodosPage.css";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SideBar from "../components/SideBar";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { useApiGetTodos, useApiGetFolders } from "../components/Utils";
import { KanbanTab, ListTab } from "../components/TodoTabs";


const columnColors = {
    "Todo": "rgba(162, 163, 162, 0.504)",
    "In Progress": "rgba(246, 214, 68, 0.504)",
    "Done": "rgba(41, 241, 41, 0.504)"
}

export function TodosPage({ userData, loggedIn }) {
    
    const [currentTab, setCurrentTab] = useState(0);
    const folderChanged = false;
    const [todosChanged, setTodosChanged] = useState(false);
    const todos = useApiGetTodos();
    const folders = useApiGetFolders("T", folderChanged);
    
    if (!loggedIn) {
        return ( <UnauthorizedErrorPage /> )
    }
    
    const changeTab = (event, newValue) => {
        setCurrentTab(newValue);
    }

    const handleTodosChanged = (newTab) => {
        setTodosChanged(!todosChanged);
        changeTab(null, newTab);
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
                 <KanbanTab 
                 folders={folders}
                 todos={todos}
                 columnColors={columnColors}
                 handleTodosChanged={handleTodosChanged}
                />
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