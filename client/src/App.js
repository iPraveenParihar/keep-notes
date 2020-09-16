import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import AppBar from './components/appbar.jsx';
import TakeNote from './components/takeNote.jsx';
import NotesContainer from './components/notesContainer.jsx';
import { Note } from './models/noteModel';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
      notes: [],
      searchResult: [],
      snackBarMessage: "",
    }

    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {

    var fetchedNotes = [];

    axios.get('/notes')
      .then(res => {
       
        res.data.forEach((note) => {
          var noteObject = new Note({
            id: note['_id'],
            title: note['title'],
            noteText: note['noteText'],
            noteColor: note['noteColor']
          });
          fetchedNotes.unshift(noteObject);
        });

        this.setState(
          { notes: fetchedNotes, isFetching: false, searchResult: fetchedNotes }
        );

      })
      .catch(error => console.log(error));
  }

  handlenoteSaveCallback = async (note) => {
  
    await axios.post('/notes/add', note)
      .then((res) => {
        const responseData = res.data;
      
        const addedNote = new Note({
          id: responseData['_id'],
          title: responseData['title'],
          noteText: responseData['noteText'],
          noteColor: responseData['noteColor']
        });

    
        this.state.notes.unshift(addedNote);
        this.setState(
          { notes: this.state.notes, snackBarMessage: "Noted Saved" }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleNoteDeleteCallback = (deletedNote) => {

    const url = '/notes/' + deletedNote.id;

    axios.delete(url)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    const notes = this.state.notes.filter((note) => note.id !== deletedNote.id);
    this.setState(
      { notes: notes, searchResult: notes }
    );
  }

  handleSearchCallback = (searchQuery) => {

    console.log(searchQuery);
    const notes = this.state.notes.filter((note) => (note.title.includes(searchQuery) || note.noteText.includes(searchQuery)));
    this.setState(
      { searchResult: notes }
    );
  }

  render() {

    return (
      <Router>
        <div className="App">
          <AppBar searchCallback={this.handleSearchCallback} />
          <TakeNote noteSaveCallback={this.handlenoteSaveCallback} />
          <NotesContainer notes={this.state.searchResult} noteDeleteCallback={this.handleNoteDeleteCallback} />
        </div>
      </Router>
    );
  }

}

export default App;