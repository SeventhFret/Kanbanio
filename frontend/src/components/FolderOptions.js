import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiDeleteFolder } from './Utils';


export function FolderOptions(props) {
  const { handleFolderEdit, folderId, handleFolderChanged } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      { anchorEl ?
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
          <MenuItem
          onClick={() => {
            handleClose(); 
            handleFolderEdit(folderId)
            }}>
          <EditIcon />
            Edit
          </MenuItem>

          <MenuItem
          onClick={() => {
            handleClose(); 
            apiDeleteFolder(folderId); 
            handleFolderChanged()
            }}>
          <DeleteIcon />
          Delete
          </MenuItem>
      </Menu>
      : null }
    </div>
  );
}