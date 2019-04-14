import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import { NavLink } from 'react-router-dom'
import './NavFolders.css'

class NavFolders extends Component {
    static contextType = NotesContext; 

    /* static defaultProps = {
        folders: [],
    } */

    render() {
        const { folders } = this.context
        return (
            <div className='NavFolders'>
                <ul className='NavFolders__list'>
                {folders.map(folder =>
                    <li key={folder.id}>
                        <NavLink 
                            className='NavFolders__folderLink'
                            to={`/folders/${folder.id}`}
                        >
                            {folder.name}
                        </NavLink>
                    </li>
                )}
                </ul>
                <div className='NavFolders__addFolder'>
                    <button 
                        className='NavFolders__addFolderBtn'
                    >
                        Add Folder
                    </button>
                </div>
            </div>
        )
    }
}

export default NavFolders;