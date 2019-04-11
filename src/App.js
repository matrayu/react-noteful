import React, { Component } from 'react';
import  { Route, Link } from 'react-router-dom';
import NavFolders from './components/NavFolders/NavFolders';
import NavNote from './components/NavNote/NavNote';
import MainNoteFolders from './components/MainNoteFolders/MainNoteFolders';
import MainNote from './components/MainNote/MainNote';
import dummyStore from './dummy-store';
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    this.setState(dummyStore)
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    
    const findNote = (notes, noteId) => {
      const foundNote = notes.find(note => note.id === noteId)
      return foundNote
    };

    const findFolder = (folders, folderId) => {
      const foundFolder = folders.find(folder => folder.id === folderId)
      return foundFolder
    };

    // <Route path="/about/:substring" component={AboutMenu} /> -> this.props.history | match | location

    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps =>
              <NavFolders
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            }
          />
        )}
        
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params // let noteId = routeProps.match.params.noteId
            // import React, {Component, useEffect, useState} from 'react';
            // const {username, password} = req.body;
            // let pickle = req.body.username;
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NavNote
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes, folders } = this.state;

    const getFolderNotes = (notes=[], folderId) => (
      (!folderId) 
        ? notes 
        : notes.filter(note => note.folderId === folderId)
    )

    const findNote = (notes, noteId) => {
      const foundNote = notes.find(note => note.id === noteId)
      return foundNote
    };

    return (
      <>
        {['/', '/folders/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const folderNotes = getFolderNotes(notes, folderId)
              return (
                <MainNoteFolders
                  {...routeProps}
                  notes={folderNotes}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            console.log(note)
            return (
              <MainNote
                {...routeProps}
                note={note}
              />
            )
          }}
        />
      </>
    )

  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Link to='/'>Noteful</Link>
        </header>
        <main className="App__main">
          <nav className="App__mainNav">
            {this.renderNavRoutes()}
          </nav>
          <section className='App__mainSection'>
            {this.renderMainRoutes()}
          </section>
        </main>
      </div>
    );
  }
}

export default App;