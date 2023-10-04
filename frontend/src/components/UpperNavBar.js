import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { ThemeProvider } from '@emotion/react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { whiteBlackButtonTheme } from './Themes';



export function NavBar(loggedIn) {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "black", color: "white" }} position='fixed'>
            <Toolbar>
                {/* <Typography variant='h4' >Kanbanio</Typography> */}
                <h2 style={{ flexGrow: 1 }}>Kanbanio</h2>
                
                <ThemeProvider theme={whiteBlackButtonTheme}>
                    <Link to="/register/" style={{ textDecoration: 'none' }}><Button variant='contained'>Register</Button></Link>
                    <Link to="/login/" style={{ textDecoration: 'none', marginLeft: '1vw' }}><Button variant='contained'>Login</Button></Link>
                </ThemeProvider>
            </Toolbar>
      </AppBar>
      </Box>
    )
}