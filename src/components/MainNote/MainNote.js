import React from 'react';
import config from '../../config.js';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import './MainNote.css';


export default class MainNote extends React.Component {
    static defaultProps = {
        deleteNote: () => {}, 
        match: {
            params: {
                noteId: '',
            },
        },
    }

    static contextType = NotesContext

    handleClickDelete(e) {
        e.preventDefault();
        const noteId = this.props.match.params.noteId
        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res
            })
            .then(data => {
                this.props.history.push('/')
                this.context.deleteNote(noteId)
            })
            .catch(error => {
                console.log(error)
            })
        } 
    
    render() {
        const { notes } = this.context
        const { noteId } = this.props.match.params
        const findNote = (notes, noteId) => {
            const foundNote = notes.find(note => note.id == noteId)
            return foundNote
        };
        const note = findNote(notes, noteId) || {}

        return (
            <div className="MainNote">
                <div className='MainNote__info'>
                    <h2>{note.title}</h2>
                </div>
                <div className='MainNote__content'>
                    {note.content}
                </div>
                <button
                    className='MainNote__button'
                    onClick={e => {this.handleClickDelete(e)}}
                >
                    Delete
                </button>
            </div>  
        );
    }
}

MainNote.propTypes = {
    deleteNote: PropTypes.func
}