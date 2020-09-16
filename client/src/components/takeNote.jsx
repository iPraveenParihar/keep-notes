import React from 'react';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles, InputBase, ClickAwayListener, CardContent, CardActions } from '@material-ui/core';

import NoteColors from './noteColors';
import { Note } from '../models/noteModel.js';


function TakeNote(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        noteInput: {
            paddingTop: "8px",
            paddingBottom: "8px",
            textAlign: "left"
        },
    }));

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const [noteColor, setNoteColor] = React.useState("white");
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteText, setNoteText] = React.useState("");

    const handleNoteClose = () => {
        setOpen((prev) => !prev);
        setNoteColor("#ffffffff");
    }

    const handleNoteSave = (event) => {
        if(noteText === "" || noteTitle === ""){
            return;
        }
        let note = new Note({
            title: noteTitle,
            noteText: noteText,
            noteColor: noteColor
        });
        props.noteSaveCallback(note);
        setOpen(false);
        setNoteText("");
        setNoteTitle("");
    }

    const handleClickAway = () => {
        setOpen(false);
    }

    const handleNoteColorCallback = (noteColor) => {
        setNoteColor(noteColor);
    }

    const handleNoteTitleText = (event) => {
        setNoteTitle(event.target.value);
    }

    const handleNoteText = (event) => {
        setNoteText(event.target.value);
    }

    const noteShrink = (
        <Card elevation={2} raised={true}>
            <InputBase
                fullWidth={true}
                style={{ textAlign: "left", padding: "10px", fontWeight: "bold" }}
                className={classes.noteInput}
                placeholder="Take a note..."
                inputProps={{ 'aria-label': 'take-note' }}
                onClick={handleNoteClose} />
        </Card>
    );

    const noteExpand = (
        <Card elevation={8} raised={true} style={{ backgroundColor: noteColor }}>
            <CardContent>
                <InputBase
                    value={noteTitle}
                    fullWidth={true}
                    multiline={true}
                    style={{ textAlign: "left" }}
                    autoFocus={true}
                    onChange={handleNoteTitleText}
                    className={classes.noteInput}
                    placeholder="Title"
                    inputProps={{ 'aria-label': 'take-note-title' }} />
                <InputBase
                    value={noteText}
                    fullWidth={true}
                    multiline={true}
                    style={{ textAlign: "left" }}
                    autoFocus={false}
                    onChange={handleNoteText}
                    className={classes.noteInput}
                    placeholder="Take a note..."
                    inputProps={{ 'aria-label': 'take-note' }} />
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs style={{ textAlign: "left" }}>
                        <NoteColors noteColorCallback={handleNoteColorCallback} selectedColor={noteColor} />
                    </Grid>
                    <Grid item>
                        <Button onClick={handleNoteSave}>Save</Button>
                        <Button onClick={handleNoteClose}>Close</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container maxWidth='sm' style={{ marginTop: '20px' }}>
                {!open ? noteShrink : noteExpand}
            </Container>
        </ClickAwayListener>
    );
}
export default TakeNote;