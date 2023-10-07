import * as React from 'react';
import "./SideBar.css";
import logo from "../logo.png";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { Link } from 'react-router-dom';
import { apiUrl } from './ApiClient';


// Template from MUI docs

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function SideBar({ userData, mainContent, isNotesPage }) {
  const [open, setOpen] = React.useState(true);
  let avatarUrl = "";

  if (userData) {
    avatarUrl = "http://127.0.0.1:8000" + userData["avatar"];
  }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        { open ? 
            <DrawerHeader>
                <Box alignItems="center" display="flex" flexGrow={1}>
                  <img src={logo} alt="Kanbanio logo" style={{ width: '2vw' }}></img>
                    <Typography sx={{ pl: 2 }} flexGrow={1} variant='h5'>Kanbanio</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            </DrawerHeader> 
        :
        <DrawerHeader>
          <IconButton onClick={handleDrawerOpen}>
            <img src={logo} alt="Kanbanio logo" style={{ width: '2vw' }}></img>
          </IconButton>
        </DrawerHeader> 
        }

        <Divider />

        <List>
          {["Dashboard", 'Todos', "Notes"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link className='link' to={"/" + text.toLowerCase() + "/"}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  { index === 0 ? <SpaceDashboardIcon /> : null }
                  { index === 1 ?  <FormatListNumberedIcon /> : null}
                  { index === 2 ? <TextSnippetIcon /> : null }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}

        </List>

        <Box display="flex" flexGrow={1} justifyContent={ open ? 'center' : 'center' } alignItems="flex-end" sx={{ mb: 3 }}>
          <Link to="/profile/" className='link'>
            <ListItemButton sx={{ p: 1.5 }}>
                <Box display="flex" justifyContent='center' alignItems='center' sx={{ pl: open ? '2vw' : 0 }}>
                    <Avatar src={ userData ? avatarUrl : apiUrl + "/media/avatars/default.png" } sx={{ mr: open ? 2 : 'auto' }}></Avatar>
                    <Typography sx={{ display: open ? 'block' : 'none' }}>{userData ? userData["username"] : 'Username'}</Typography>
                </Box>
            </ListItemButton>
          </Link>
        </Box>

        <Divider />
      </Drawer>

      {/* PAGE CONTENT */}
      <Box sx={{ minWidth: '60%', flexGrow: 1, ml: isNotesPage ? 0 : '5vw', p: isNotesPage ? 0 : 5 }}>
        { mainContent }
      </Box>
    </Box>
  );
}