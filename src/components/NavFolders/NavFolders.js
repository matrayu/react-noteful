import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import { NavLink, Link } from 'react-router-dom'
import './NavFolders.css'

class NavFolders extends Component {
    static contextType = NotesContext; 
    
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
                            {folder.foldername}
                        </NavLink>
                    </li>
                )}
                </ul>
                <div className='NavFolders__addFolder'>
                    <Link to='/add-folder'>
                        <button 
                            className='NavFolders__addFolderBtn'
                        >
                            Add Folder
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default NavFolders;