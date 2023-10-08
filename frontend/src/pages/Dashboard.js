import './Home.css';
import './Dashboard.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UnauthorizedErrorPage } from '../components/UnauthorizedError';
import { api } from '../components/ApiClient';
import SideBar from '../components/SideBar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton } from '@mui/material';


export function DashboardPage({userData, loggedIn}) {
    console.log(userData);

    if (!loggedIn) ( <UnauthorizedErrorPage /> )

    const [latestTodos, setLatestTodos] = useState();

    useEffect(() => {
        api.get("/todo/?latest", {
            headers: {
                "Authorization": "JWT " + localStorage.getItem("access")
            }
        })
        .then(res => {setLatestTodos(res.data)})
        .catch(errors => {console.log(errors);})
    }, []);

    const MainContent = () => (
        <div>
            <Typography variant='h3'>Welcome back, {userData ? userData.first_name : "User" }!</Typography>
            <Box display='flex' flexDirection='row' sx={{ color: 'white', mt: 5 }} flexGrow={1} gap={5}>
                <Box  sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px", width: '50%' }}>
                    <Typography variant='h4'>Latest tasks</Typography>
                    <List>
                       { latestTodos ? latestTodos.map((todo) => (
                        <Link to="/todos/" className='latest-todos-link'>
                            <ListItemButton sx={{ border: '1px solid white', borderRadius: '5px', mb: '1vh' }}>
                                <Typography sx={{ maxWidth: '100%', overflow: 'auto' }}>{todo.title}</Typography>
                            </ListItemButton>
                        </Link>
                       ))
                       
                       : <ListItem>All clear!</ListItem> }

                    </List>
                </Box>

                <Box sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px", width: '50%' }}>
                    <Typography variant='h4'>Notes</Typography>
                    <Typography>Some notes</Typography>
                </Box>
            </Box>
        </div>
    )

    return (
        <SideBar selected={'Dashboard'} userData={userData} mainContent={<MainContent />} />
    )
    }
