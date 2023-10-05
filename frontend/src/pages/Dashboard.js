import './Home.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavBar } from "../components/UpperNavBar"


export function DashboardPage({loggedIn}) {
    if (!loggedIn) {
        return (
            <>
            <NavBar loggedIn={false} />
            <div className='flex section f-c'>
                <Box sx={{ backgroundColor: "black", p: 5, borderRadius: '15px' }}>
                    <Typography sx={{ color: 'red' }} variant='h2'>Error</Typography>
                    <Typography sx={{ color: 'white' }} variant='h4'>You have to login to access this page</Typography>
                </Box>
            </div>
            </>
        )
    } else {
        return (
            <div className='flex section f-c'>
                <Box sx={{ backgroundColor: "black" }}>
                    <Typography variant='h2'>Welcome to dashboard</Typography>
                </Box>
            </div>

        )
    }

}