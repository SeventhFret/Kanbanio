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
import { api } from "../components/ApiClient";
import Alert from "@mui/material/Alert";


export function ProfilePage({ userData, loggedIn }) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [messages, setMessages] = useState([]);
    let formData = new FormData();


    useEffect(() => {
        if (userData) {
            setAvatarUrl(getAvatarPath(userData['avatar']));
        }
    }, [userData])


    const submitPhoto = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        console.log(formData);

        formData.append("avatar", e.target.files[0]);
        api.post("/users/avatar/", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(resp => {setMessages(resp.data.messages)})
        .catch(error => {console.log(error);})

    }


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

                    <Box display='flex' flexDirection='row' my={5}>
                        <Avatar src={avatarUrl ? avatarUrl : null} sx={{ width: '10vw', height: '10vw' }} />
                        <Box display='flex' justifyContent='center' flexDirection='column' ml={5}>
                            <Typography variant="h5">Change avatar</Typography>
                            <form style={{ marginTop: '2vh' }} encType="multipart/form-data">
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} type="submit">
                                Upload file
                                <input onChange={submitPhoto} type="file" hidden accept="image/png"></input>
                            </Button>
                            </form>
                            { messages.map((message) => (
                                <Alert>{message}</Alert>
                            )) }
                        </Box>
                    </Box>

                    <Box display='flex' flexDirection='column' gap={2}>
                        { userData ? 
                        <>
                        <Typography variant="h4">First name: {userData['first_name']}</Typography>
                        <Typography variant="h4">Last name: {userData['last_name']}</Typography>
                        <Typography variant="h4">Email: {userData['email']}</Typography>
                        </>
                        : null
                    }
                    </Box>
                </Box>
            )
        }

        return (
            <SideBar userData={userData} mainContent={< MainContent />} />
        )
    }


}