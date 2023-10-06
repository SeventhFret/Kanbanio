import { NavBar } from "./UpperNavBar";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";



export function UnauthorizedErrorPage() {
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
}