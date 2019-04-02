import React, { Component } from 'react';
import Note from '../Note/Note';
import './NoteList.css'

class NoteList extends Component {
    static defaultProps = {
        notes: []
    }

    render() {
        const { notes } = this.props
        return (
            <div className="noteList">
                <ul className="noteList__list">
                    {notes.map(note =>
                        <Note
                            key={note.id}
                            {...note}
                        />
                    )}
                </ul>
                <div className='noteList__buttons'>
                    <button className='notes_addNote'>Add Note</button>
                </div>
            </div>
        )
    }
}

export default NoteList