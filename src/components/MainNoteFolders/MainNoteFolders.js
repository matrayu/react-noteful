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
        match: {
            params: {
                folderId: '',
            },
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
            return res
        })
        .then(data => {
            this.context.deleteNote(noteId)
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleFolderDeleteRequest = (folderId, folderNotes, e) => {
        e.preventDefault();
        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
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
            return res
        })
        .then(data => {
            this.context.deleteFolder(folderId, folderNotes, () => {
                this.props.history.push('/')
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const { notes } = this.context;
        const { folderId } = this.props.match.params
        
        const getFolderNotes = (notes=[], folderId) => (
            (!folderId) 
              ? notes 
              : notes.filter(note => note.folder_id == folderId)
        );
        const folderNotes = getFolderNotes(notes, folderId);

        return (
            <div className='MainNoteFolders'>
                <ul className='MainNoteFolders__list'>
                    {folderNotes.map(note =>
                        <li className='MainNoteFolders' id={note.id} key={note.id}>
                            <div className='MainNoteFolders__row'>
                                <div className="MainNoteFolders__title">
                                    <Link to={`/notes/${note.id}`}>
                                        <h2>{note.title}</h2>
                                    </Link>
                                </div>
                                <div className='MainNoteFolders__modified'>
                                    Created: {format(note.date_modified, 'Do MMM YYYY')}
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
                <div className="bttn__block">
                    <Link to={'/add-note'}>
                        <button className="MainNoteFolders__addNote_button">Add Note</button>
                    </Link>
                    <div className='MainNoteFolders__deleteFolder'>
                        <button 
                            className='MainNoteFolders__deleteFolder_button'
                            onClick={this.handleFolderDeleteRequest.bind(this, folderId, folderNotes)}
                        >
                            Delete Folder
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

MainNoteFolders.propTypes = {
    deleteNote: PropTypes.func,
    note: PropTypes.object
}
