import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
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


export default function SideBar({ userData, mainContent }) {
  const [open, setOpen] = React.useState(false);
  let userAvatarFile = "";
  let avatarUrl = "";

  if (userData) {
    const filePath = userData["avatar"].split("/");
    userAvatarFile = filePath[filePath.length - 1];
    avatarUrl = apiUrl + '/media/avatars/' + userAvatarFile;
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
                    <Typography flexGrow={1} variant='h5'>Kanbanio</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            </DrawerHeader> 
        :
        <DrawerHeader>
          <IconButton onClick={handleDrawerOpen}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader> 
        }

        <Divider />

        <List>
          {['Todos', "Notes"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
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
                  {index % 2 === 0 ? <TextSnippetIcon /> : <FormatListNumberedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}

        </List>

        <Box display="flex" flexGrow={1} justifyContent={ open ? 'center' : 'center' } alignItems="flex-end" sx={{ mb: 3 }}>
            <ListItemButton sx={{ p: 1.5 }}>
                <Box display="flex" justifyContent='center' alignItems='center' sx={{ pl: open ? '2vw' : 0 }}>
                    <Avatar src={ userData ? avatarUrl : apiUrl + "/media/avatars/default.png" } sx={{ mr: open ? 2 : 'auto' }}></Avatar>
                    <Typography sx={{ display: open ? 'block' : 'none' }}>{userData ? userData["username"] : 'Username'}</Typography>
                </Box>
            </ListItemButton>
        </Box>

        <Divider />
      </Drawer>

      {/* PAGE CONTENT */}
      <Box sx={{ flexGrow: 1, ml: '5vw', p: 5 }}>
        { mainContent }
      </Box>
    </Box>
  );
}