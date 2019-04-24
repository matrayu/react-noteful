import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'uuid';
import './MainAddNote.css'

class MainAddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": uuid.v4(),
            "name": "",
            "modified": moment().toISOString(),
            "folderId": "",
            "content": "",
            "error": false,
            "nameValid": false,
            "folderValid":  false,
            "formValid": false,
            "validationMessages": {
                name: "",
                folder: "",
            },
        };
    };

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    };

    static contextType = NotesContext;

    noteNameChange(name) {
        this.setState({name}, () => {this.validateName(name)} );
    };

    noteContentChange(content) {
        this.setState({
            content
        });
    };

    noteFolderChange(folderId) {
        this.setState({folderId}, () => this.validateFolder(folderId));
    };

    formValid() {
        if (this.state.nameValid && this.state.folderValid) {
        }
        this.setState({
            formValid: this.state.nameValid && this.state.folderValid
        });
    };

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim()
        if (fieldValue.length === 0) {
            fieldErrors.name = 'Name is required';
            hasError = true;
        } else {
            fieldErrors.name = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            nameValid: !hasError,
        }, this.formValid );
    }

    validateFolder(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        if (fieldValue === '...') {
            fieldErrors.folder = 'A folder must be selected';
            hasError = true;
        } else {
            fieldErrors.folder = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            folderValid: !hasError,
        }, this.formValid );
    };

    handleSubmit(e) {
        e.preventDefault();
        const messages = {...this.state.validationMessages};
        const { nameValid, folderValid, formValid } = this.state;
        const note = (({id, name, modified, folderId, content}) => ({id, name, modified, folderId, content}))(this.state);
        const url = 'http://localhost:9090/notes'
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-type': 'application/json',
            },
        };

        if (!formValid) {
            if (!nameValid) {
                alert(messages.name)
            }
            else if (!folderValid) {
                alert(messages.folder)
            }
        }
        else {
            fetch(url, options)
            .then(res => {
                if(!res.ok) {
                    return new Error('Something went wrong, please try again');
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    "id": uuid.v4(),
                    "name": "",
                    "modified": moment().toISOString(),
                    "folderId": "",
                    "content": "",
                })
                this.props.handleAdd(note)
                this.props.history.goBack()
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
                console.error(err)
            })
        }
    }

    render() {
        const { folders } = this.context;
        const foldersList = folders.map(folder => {
            return (
                <option value={folder.id} key={folder.id}>{folder.name}</option>
            )
        })

        return (
            <div className='mainAddNote'>
                <h2 className='mainAddNote__header'>Create a note</h2>
                <form className='mainAddNote__form' onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='' value={this.state.name} onChange={e => this.noteNameChange(e.target.value)} />
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
                    <label htmlFor='content'>Content</label>
                    <input type='text' name='content' id='content' placeholder='' value={this.state.content} onChange={e => this.noteContentChange(e.target.value)} />
                    <label htmlFor='folder'>Folder</label> 
                    <select name='folder' id='folder' onChange={e => this.noteFolderChange(e.target.value)} >
                        <option>...</option>
                        {foldersList}
                    </select>
                    <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
                    <div className='mainAddNote__buttons'>
                        <button type='submit' disabled={!this.state.formValid}>Add note</button>
                    </div>
                </form>
            </div>
        )
    }
}

MainAddNote.propTypes = {
    handleAdd: PropTypes.func
}

export default MainAddNote;