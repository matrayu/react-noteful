import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavFolders.css'

export default function NavFolders(props) {
    console.log('NavFolders')
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
            <button>Add Folder</button>
        </div>
    )
}