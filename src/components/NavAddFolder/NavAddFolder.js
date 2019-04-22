import React, { Component } from 'react';
import './NavAddFolder.css'

class NavAddFolder extends Component {
    render() {
        return (
            <div className='NavAddFolder'>
                <button 
                    className='NavAddFolder__button'
                    onClick={() => this.props.history.goBack()}
                    >
                    Back
                </button>
            </div>
        )
    }
}

export default NavAddFolder;