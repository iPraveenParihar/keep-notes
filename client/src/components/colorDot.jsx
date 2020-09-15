import React from 'react';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

function ColorDot(props) {

    const style = {
        backgroundColor: props.color,
        borderRadius: "50%",
        border: "1px solid black",
        width: "25px",
        height: "25px",
    }

    return (
        <span
            style={style}>
            { props.selectedColor === props.color ? <CheckOutlinedIcon style={{ color: "black" }} /> : null}
        </span>
    );
}

export default ColorDot;
