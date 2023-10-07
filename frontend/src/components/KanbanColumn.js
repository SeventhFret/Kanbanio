import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export function KanbanColumn(props) {

    return (
        <Box display='flex' 
        flexDirection='column' 
        sx={{ p: 5, 
              minWidth: '25%',
              minHeight: '70%',
              borderRadius: '5px', 
              backgroundColor: 'rgb(208, 208, 208)' }}>
            <Typography variant="h6" pb="2vh" >{props.title}</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                { props.todos ? props.todos.map((todo) => (
                    (todo.folder === props.folderId) ? 
                    <Box key={todo.id} sx={{ backgroundColor: 'grey', p: 2, borderRadius: '5px' }}>
                        <Typography>{todo.title}</Typography>
                    </Box>
                    : null
                )) : null }
            </Box>
        </Box>
    )
}