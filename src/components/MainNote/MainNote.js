import React from 'react';
import './MainNote.css'

export default function MainNote(props) {
    console.log('MainNote')
    return (
        
        <div className="MainNote">
            <div className='MainNote__info'>
                {props.note.name}
            </div>
            <div className='MainNote__content'>
                {props.note.content}
            </div>
        </div>
    )
}

MainNote.defaultProps = {
    note: {
        content: '',
    }
}