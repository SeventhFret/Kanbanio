import Box from "@mui/material/Box";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import List from "@mui/material/List";
import AbcIcon from '@mui/icons-material/Abc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TodoDialog } from "./TodoDialog";
import { KanbanColumn } from "./KanbanColumn";


export function KanbanTab(props) {
    const { folders, columnColors, todos, handleTodosChanged } = props;

    return (
        <Box 
            component='div' 
            value={1} 
            index={1} 
            display="flex"
            gap={5} 
            sx={{ height: "80vh", overflow: "auto" }}>
                { folders ? folders.map((folder) => (
                    <KanbanColumn 
                     handleTodosChanged={handleTodosChanged}
                     columnColor={columnColors[folder.title]}
                     key={folder.id} 
                     title={folder.title} 
                     todos={todos} 
                     folderId={folder.id} 
                     folders={folders} />
                )) : null}
            </Box>
    )
}


export function ListTab(props) {
    const { folders, columnColors, todos, handleTodosChanged } = props;

    return (
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
                <Box 
                 display='flex' 
                 flexDirection='row' 
                 p={2} 
                 color={'secondary'} 
                 sx={{ borderBottom: '1px solid black' }}>
                    <Typography 
                     display='flex' 
                     alignItems='center' 
                     sx={{ minWidth: '80%', fontWeight: 'bold' }}>
                        <AbcIcon size={'sm'} />
                        Title
                    </Typography>

                    <Typography 
                     display='flex' 
                     alignItems='center' 
                     sx={{ minWidth: '20%', fontWeight: 'bold' }}>
                        <CalendarMonthIcon />
                        End date
                    </Typography>
                </Box>
                <List>
                { todos ? todos.map((todo) => (
                    (todo.folder === folder.id) ? 
                        <TodoDialog 
                        handleTodosChanged={() => {handleTodosChanged(1)}}
                        key={todo.id}
                        kanban={false} 
                        todoData={todo} 
                        folders={folders}
                        currentFolder={todos.folder} />
                        : null
                        )) : null }
                </List>
                <Box display='flex' alignItems='center'>
                    <TodoDialog 
                    handleTodosChanged={handleTodosChanged}
                    folders={folders} />
                </Box>
                </AccordionDetails>
            </Accordion>

            )) : null}
            </div>
           </Box>
        </Box> 
    )
}