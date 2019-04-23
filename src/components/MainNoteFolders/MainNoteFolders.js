import config from '../../config.js';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types'
import './MainNoteFolders.css';

export default class MainNoteFolders extends React.Component {
    static defaultProps = {
        note: {
            content: '',
        },
        deleteNote: () => {}
    }
    static contextType = NotesContext

    handleDeleteRequest = (noteId, e) => {
        e.preventDefault();

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { notes } = this.context

        const getFolderNotes = (notes=[], folderId) => (
            (!folderId) 
              ? notes 
              : notes.filter(note => note.folderId === folderId)
        )

        const { folderId } = this.props.match.params
        const folderNotes = getFolderNotes(notes, folderId)

        return (
            <div className='MainNoteFolders'>
                <ul className='MainNoteFolders__list'>
                    {folderNotes.map(note => 
                        <li className='MainNoteFolders' id={note.id} key={note.id}>
                            <div className='MainNoteFolders__row'>
                                <Link to={`/note/${note.id}`}>
                                    <h2>{note.name}</h2>
                                </Link>
                                <div className='MainNoteFolders__modified'>
                                    {format(note.modified, 'Do MMM YYYY')}
                                </div>
                            </div>
                            <div className='MainNoteFolders__button'>
                                <button 
                                    className='MainNoteFolders__delete'
                                    onClick={this.handleDeleteRequest.bind(this, note.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
                <Link to={'/add-note'}>
                    <button>Add Note</button>
                </Link>
            </div>
        )
    }
}

MainNoteFolders.propTypes = {
    deleteNote: PropTypes.func,
    note: PropTypes.object
}
