import "../components/SideBar.css";
import SideBar from "../components/SideBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import Alert from "@mui/material/Alert";
import { ThemeProvider } from "@emotion/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getAvatarPath } from "../components/Utils";
import { redButtonTheme } from "../components/Themes";
import { UnauthorizedErrorPage } from "../components/UnauthorizedError";
import { useEffect, useState } from "react";
import { api } from "../components/ApiClient";
import { Link } from "react-router-dom";


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
            <UnauthorizedErrorPage />
        )
    }
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

                    <Box display='flex' flexDirection='column' width="60%" gap={2}>
                        { userData ? 
                        <>
                        <Typography variant="h4">First name: {userData['first_name']}</Typography>
                        <Typography variant="h4">Last name: {userData['last_name']}</Typography>
                        <Typography variant="h4">Email: {userData['email']}</Typography>
                        </>

                        : null
                    }
                    </Box>
                <Divider sx={{ my: 5 }} />
                <ThemeProvider theme={redButtonTheme}>
                    <Link to="/logout/" className="link">
                        <Button variant="contained" sx={{ width: '20%' }}>Logout</Button>
                    </Link>
                </ThemeProvider>
                </Box>
            )
        }

        return (
            <SideBar userData={userData} mainContent={< MainContent />} />
        )

}