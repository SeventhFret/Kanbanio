import './Home.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavBar } from "../components/UpperNavBar";
import SideBar from '../components/SideBar';


export function DashboardPage({userData, loggedIn}) {
    console.log(userData);

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

        const MainContent = () => (
            <div>
                <Typography variant='h3'>Welcome back, {userData ? userData.first_name : "User" }!</Typography>
                <Button>Get user</Button>
            </div>
        )

        return (
            <SideBar userData={userData} mainContent={<MainContent />} />

            // <div className='flex section f-c'>
                
            //     <Box sx={{ backgroundColor: "black" }}>
            //         <Typography variant='h2'>Welcome to dashboard</Typography>
            //     </Box>
            // </div>

        )
    }

}