import React from 'react';
import './NavNote.css'

export default function NavNote(props) {
    console.log('NavNote')
    return (
        <div className="NavNote">
            {props.folder.name}
            <button>Back</button>
        </div>
    )
}

