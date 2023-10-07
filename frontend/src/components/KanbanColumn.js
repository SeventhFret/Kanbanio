import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TodoDialog } from "./TodoDialog";

export function KanbanColumn(props) {


    return (
        <Box component='div'
        display='flex' 
        flexDirection='column'
        sx={{ p: 5, 
              minWidth: '20vw',
              maxWidth: '22vw',
              overflow: 'auto',
              borderRadius: '5px', 
              backgroundColor: props.columnColor }}>
            <Typography variant="h6" pb="2vh" >{props.title}</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
                { props.todos ? props.todos.map((todo) => (
                    (todo.folder === props.folderId) ? 
                        <TodoDialog key={props.folderId} kanban={true} todoData={todo} folders={props.folders} />
                    : null
                )) : null }
            </Box>
        </Box>
    )
}