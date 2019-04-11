import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './MainNoteFolders.css';



export default function MainNoteFolders(props) {

    return (
        <div className='MainNoteFolders'>
            <ul className='MainNoteFolders__list'>
                {props.notes.map(note => 
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
                            <button className='MainNoteFolders__delete'>Delete</button>
                        </div>
                    </li>
                )}
            </ul>
            <button>Add Note</button>
        </div> 
    )
}