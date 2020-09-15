import React from 'react';
import Grid from '@material-ui/core/Grid';
import NoteCard from './noteCard.jsx';
import { Container, Typography } from '@material-ui/core';


function NotesContainer(props) {

    const noNotesUI = (
        <Typography>No Notes</Typography>
    );

    const notesContainer = (
        <Grid container spacing={2}>
            { props.notes.map((note) =>
                <Grid item xs={12} sm={4} md={3} key={note.id}>
                    <NoteCard note={note} noteDeleteCallback={props.noteDeleteCallback} />
                </Grid>)}
        </Grid>
    );

    return (
        <Container style={{ marginTop: "50px" }}>
            { props.notes.length === 0 ? noNotesUI : notesContainer}
        </Container>
    );
}

export default NotesContainer;