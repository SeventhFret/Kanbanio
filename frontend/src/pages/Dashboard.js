import './Home.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UnauthorizedErrorPage } from '../components/UnauthorizedError';
import SideBar from '../components/SideBar';


export function DashboardPage({userData, loggedIn}) {
    console.log(userData);

    if (!loggedIn) {
        return (
            <UnauthorizedErrorPage />
        )
    } else {

        const MainContent = () => (
            <div>
                <Typography variant='h3'>Welcome back, {userData ? userData.first_name : "User" }!</Typography>
                <Box display='flex' flexDirection='row' sx={{ color: 'white', mt: 5 }} flexGrow={1} gap={5}>
                    <Box flexGrow={1} sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px" }}>
                        <Typography variant='h4'>Todos</Typography>
                        <Typography>Some todos</Typography>
                    </Box>

                    <Box flexGrow={1} sx={{ backgroundColor: 'black', p: 5, borderRadius: "15px" }}>
                        <Typography variant='h4'>Notes</Typography>
                        <Typography>Some notes</Typography>
                    </Box>
                </Box>
            </div>
        )

        return (
            <SideBar userData={userData} mainContent={<MainContent />} />
        )
    }

}