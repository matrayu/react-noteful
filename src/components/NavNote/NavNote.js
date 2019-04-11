import React from 'react';
import './NavNote.css'

export default function NavNote(props) {
    return (
        <div className="NavNote">
            {props.folder.name}
            <button 
                className='NavNote__button'
                onClick={() => props.history.goBack()}
                >
                Back
            </button>
        </div>
    )
}

