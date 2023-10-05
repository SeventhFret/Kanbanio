import SideBar from "../components/SideBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getAvatarPath } from "../components/Utils";
import { NavBar } from "../components/UpperNavBar";
import { useEffect, useState } from "react";

export function ProfilePage({ userData, loggedIn }) {
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (userData) {
            setAvatarUrl(getAvatarPath(userData['avatar']));
        }
    }, [userData])

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
        const MainContent = () => {
            return (                
                <Box display='flex' flexDirection='column' flexGrow={1}>
                    <Box mb={2}>
                        <Typography variant="h3">{userData ? userData['username'] : 'User'}</Typography>
                    </Box>

                    <Divider />

                    <Box display='flex' flexDirection='row' mt={5}>
                        <Avatar src={avatarUrl ? avatarUrl : null} sx={{ width: '10vw', height: '10vw' }} />
                        <Box display='flex' flexDirection='column' ml={5}>
                            <Typography variant="h5">Change avatar</Typography>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <input type="file" hidden accept="image/png"></input>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )
        }

        return (
            <SideBar userData={userData} mainContent={< MainContent />} />
        )
    }


}