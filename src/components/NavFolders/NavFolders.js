import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavFolders.css'

export default function NavFolders(props) {

    
    return (
        <div className='NavFolders'>
            <ul className='NavFolders__list'>
            {props.folders.map(folder =>
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