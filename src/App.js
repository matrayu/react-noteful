import React, { Component } from 'react';
import  { Route, Link } from 'react-router-dom';
import NavFolders from './components/NavFolders/NavFolders';
import NavNote from './components/NavNote/NavNote';
import MainNoteFolders from './components/MainNoteFolders/MainNoteFolders';
import MainNote from './components/MainNote/MainNote';
import NotesContext from './components/NotesContext';
import config from 'config';

import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  }

  deleteNote = noteId => {
    console.log('deleteNote ran', noteId)
    const newNotes = this.state.notes.filter(note => 
      note.id !== noteId  
    )
    this.setState({ notes: newNotes })
  }

  componentDidMount() {
    const head = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    const notes = fetch(config.API_ENDPOINT + '/notes', head)
    const folders = fetch(config.API_ENDPOINT + '/folders', head)

    Promise.all([notes, folders])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) {
          throw new Error(`${notesRes.status} - ${notesRes.statusText}`)
        }
        if (!foldersRes.ok)
          throw new Error(`${foldersRes.status} - ${foldersRes.statusText}`)

        return Promise.all([
          notesRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders })
      })
      .catch(e => {
        console.error(e)
      })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NavFolders}
          />
        )}
        
        <Route
          path='/note/:noteId'
          component={NavNote}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={MainNoteFolders}
          />
        )}
        <Route
          path='/note/:noteId'
          component={MainNote}
        />
      </>
    )
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addNote: this.addNote,
      addFolder: this.addFolder,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
    }
    return (
      <div className="App">
        <header className="App__header">
          <Link to='/'>Noteful</Link>
        </header>
        <NotesContext.Provider value={contextValue}>
          <main className="App__main">
            <nav className="App__mainNav">
              {this.renderNavRoutes()}
            </nav>
            <section className='App__mainSection'>
              {this.renderMainRoutes()}
            </section>
          </main>
        </NotesContext.Provider>
      </div>
    );
  }
}

export default App;