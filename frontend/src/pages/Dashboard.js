import './Home.css';
import './Dashboard.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UnauthorizedErrorPage } from '../components/UnauthorizedError';
import { useApiGetLatestTodos, useApiGetLatestNotes } from '../components/Utils';
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton } from '@mui/material';


export function DashboardPage({userData, loggedIn}) {
    const latestTodos = useApiGetLatestTodos();
    const latestNotes = useApiGetLatestNotes();

    if (!loggedIn) { return <UnauthorizedErrorPage /> }
    
    const MainContent = () => (
        <div>
            <Typography variant='h3'>Welcome back, {userData ? userData.first_name : "Dear User" }!</Typography>
            <Box display='flex' flexDirection='row' sx={{ color: 'white', mt: 5 }} flexGrow={1} gap={5}>
                <Box sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px", width: '50%' }}>
                    <Typography variant='h4'>Latest tasks</Typography>
                    <List>
                       { latestTodos ? latestTodos.map((todo) => (
                        <Link key={todo.id} to="/todos/" className='latest-todos-link'>
                            <ListItemButton sx={{ border: '1px solid white', borderRadius: '5px', mb: '1vh' }}>
                                <Typography sx={{ maxWidth: '100%', overflow: 'auto' }}>{todo.title}</Typography>
                            </ListItemButton>
                        </Link>
                       ))
                       : <ListItem>All clear!</ListItem> }
                    </List>
                </Box>

                <Box sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px", width: '50%' }}>
                    <Typography variant='h4' sx={{ mb: 1 }}>Notes</Typography>
                    { latestNotes ? latestNotes.map((note) => (
                        <Link key={note.id} to="/notes/" className='latest-todos-link'>
                            <ListItemButton sx={{ border: '1px solid white', borderRadius: '5px', mb: '1vh' }}>
                                <Typography sx={{ maxWidth: '100%', overflow: 'auto' }}>{note.title}</Typography>
                            </ListItemButton>
                        </Link>
                       ))
                       : <ListItem>All clear!</ListItem> }
                </Box>
            </Box>
        </div>
    )

    return (
        <SideBar selected={'Dashboard'} userData={userData} mainContent={<MainContent />} />
    )
    }
