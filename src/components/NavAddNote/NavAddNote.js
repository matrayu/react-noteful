import React, { Component } from 'react';
import './NavAddNote.css'

class NavAddNote extends Component {
    render() {
        return (
            <div className='navAddNote'>
                <button 
                    className='navAddNote__button'
                    onClick={() => this.props.history.goBack()}
                    >
                    Back
                </button>
            </div>
        )
    }
}

export default NavAddNote;