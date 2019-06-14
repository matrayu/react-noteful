import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import './NavNote.css'

class NavNote extends Component {
    static contextType = NotesContext;

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {},
        },
    }

    render() {
        const { notes, folders } = this.context;
        
        const findNote = (notes, noteId) => {
            const foundNote = notes.find(note => note.id === noteId)
            return foundNote
        };
        const findFolder = (folders, folderId) => {
            const foundFolder = folders.find(folder => folder.id === folderId)
            return foundFolder
        };

        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId) || {};

        return (
            <div className="NavNote">
                <div className='NavNote__name'>{folder.foldername}</div>
                <button 
                    className='NavNote__button'
                    onClick={() => this.props.history.goBack()}
                    >
                    Back
                </button>
            </div>
        )
    }
}

export default NavNote;