import React from 'react';

import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ColorDot from './colorDot';



const noteColors = [
    "#ffffffff",
    "#f28b82",
    "#fbbc04",
    "#fff475",
    "#ccff90",
    "#aecbfa",
    "#d7aefb"
]

function NoteColors(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleColorChange = (event, index) => {
        setAnchorEl(null);
        props.noteColorCallback(noteColors[index]);
    };

    return (
        <div>
            <IconButton onClick={handleClick} style={{ padding: "4px" }}>
                <PaletteOutlinedIcon fontSize="small" />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ padding: "0px" }}>
                <Grid container spacing={0}>
                    {noteColors.map((color, index) => (
                        <Grid item xs={2} key={color}>
                            <MenuItem
                                onClick={(event) => handleColorChange(event, index)}
                                style={{ padding: "2px", justifyContent: "center" }}>
                                <ColorDot color={color} selectedColor={props.selectedColor} />
                            </MenuItem>
                        </Grid>
                    ))}
                </Grid>
            </Menu>
        </div>
    );
}

export default NoteColors;