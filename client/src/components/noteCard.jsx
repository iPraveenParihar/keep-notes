import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardContent, CardActions, makeStyles } from '@material-ui/core';

import NoteColors from './noteColors.jsx';

function NoteCard(props) {

    const [noteColor, setNoteColor] = React.useState(props.note.noteColor);

    const noteColorCallback = (noteColor) => {
        setNoteColor(noteColor);
    }

    const useStyles = makeStyles({
        note: {
            borderRadius: "15px",
            '&:hover': {
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            },
        },
        
    });

    const classes = useStyles();

    const handleNoteDelete = (note) => {
        props.noteDeleteCallback(note);
    }

    return (
        <Card variant="outlined" className={classes.note} style={{ backgroundColor: noteColor }}>
            <CardContent style={{ textAlign: "left" }}>
                <Typography variant="h6" gutterBottom>
                    {props.note.title}
                </Typography>
                <Typography variant="body2" component="p" >
                    {props.note.noteText}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs style={{ textAlign: "left" }}>
                        <NoteColors noteColorCallback={noteColorCallback} selectedColor={noteColor} />
                    </Grid>
                    <Grid item>
                        <Button onClick={() => handleNoteDelete(props.note)}>Delete</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default NoteCard;