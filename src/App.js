import React, { Component } from 'react';
import  { Route, Link } from 'react-router-dom';
import NavFolders from './components/NavFolders/NavFolders';
import NavNote from './components/NavNote/NavNote';
import MainNoteFolders from './components/MainNoteFolders/MainNoteFolders';
import MainNote from './components/MainNote/MainNote';
import MainAddFolder from './components/MainAddFolder/MainAddFolder';
import MainAddNote from './components/MainAddNote/MainAddNote';
import NavAddFolder from './components/NavAddFolder/NavAddFolder';
import NavAddNote from './components/NavAddNote/NavAddNote';
import NotesContext from './components/NotesContext';
import AppError from './AppError';
import config from './config';

import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    showAddFolder: false,
    showAddNote: false,
    error: null,
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
  };

  deleteNote = notes => {
    const newNotes = this.state.notes.filter(note => note.id != notes)
    this.setState({ notes: newNotes })
  }

  deleteFolder = (folderId, folderNotes, cb) => {
    const newFolders = this.state.folders.filter(folder => folder.id != folderId)
    let newNotes = this.state.notes;
    folderNotes.forEach(n => {
      newNotes = newNotes.filter(note => {
        return note.id !== n.id;
      })
    });
    this.setState({
        folders: newFolders,
        notes: newNotes 
    }, cb())
  };

  addFolder = (folderName, cb) => {
    this.setState({ 
      folders: [...this.state.folders, folderName] 
    }, cb())
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    })
  };

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
          path='/notes/:noteId'
          component={NavNote}
        />
        <Route
          path='/add-folder'
          component={NavAddFolder}
        />
        <Route
          path='/add-note'
          component={NavAddNote}
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
            render={(renderProps) => <MainNoteFolders {...renderProps} />}
          />
        )}
        <Route
          path='/notes/:noteId'
          component={MainNote}
        />
        <Route
          path='/add-folder'
          render={(renderProps) => <MainAddFolder {...renderProps} handleAdd={(folder, cb) => this.addFolder(folder, cb)} />}
        />
        <Route
          path='/add-note'
          render={(renderProps) => <MainAddNote {...renderProps} handleAdd={note => this.addNote(note)} />}
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
          <Link className="App__link" to='/'>Noteful</Link>
        </header>
        <NotesContext.Provider value={contextValue}>
          <main className="App__main">
            <AppError>
              <nav className="App__mainNav">
                {this.renderNavRoutes()}
              </nav>
              <section className='App__mainSection'>
                {this.renderMainRoutes()}
              </section>
            </AppError>
          </main>
        </NotesContext.Provider>
      </div>
    );
  }
}

export default App;