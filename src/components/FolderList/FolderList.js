import React, { Component } from 'react';
import Folder from '../Folder/Folder'
import './FolderList.css'

class FolderList extends Component {
    static defaultProps = {
        folders: []
    };

    render() {
        const { folders } = this.props
        console.log(folders)
        return (
            <>
                <ul className='folderList'>
                    {folders.map(folder =>
                        <Folder
                            key={folder.id}
                            title={folder.name}
                        />    
                    )}
                </ul>
                <div className='folderList__buttons'>
                    <button className='folderList__addFolder'>Add Folder</button>
                </div>
            </>
        )
    }
}

export default FolderList