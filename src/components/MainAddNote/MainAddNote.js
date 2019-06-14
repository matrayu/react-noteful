import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import './MainAddNote.css'
import config from '../../config.js';

class MainAddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "title": "",
            "folder_id": "",
            "content": "",
            "error": true,
            "nameValid": false,
            "folderValid":  false,
            "formValid": false,
            "validationMessages": {
                title: "",
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

    noteTitleChange(title) {
        this.setState({title}, () => {this.validateTitle(title)} );
    };

    noteContentChange(content) {
        this.setState({
            content
        });
    };

    noteFolderChange(folder_id) {
        this.setState({folder_id}, () => this.validateFolder(folder_id));
    };

    formValid() {
        if (this.state.titleValid && this.state.folderValid) {
            this.setState({
                formValid: this.state.titleValid && this.state.folderValid
            });
        } else {
            this.setState({ formValid: false })
        }
    };

    validateTitle(fieldValue) {
        const fieldErrors = {...this.state.validationMessages}
        let hasError = false;

        fieldValue = fieldValue.trim()
        if (fieldValue.length === 0) {
            fieldErrors.title = 'Title is required';
            hasError = true;
        } else {
            fieldErrors.title = '';
            hasError = false;
        }
        this.setState({
            validationMessages: fieldErrors,
            titleValid: !hasError,
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
        const { titleValid, folderValid, formValid } = this.state;
        const note = (({title, folder_id, content}) => ({title, folder_id, content}))(this.state);
        const url = `${config.API_ENDPOINT}/notes`
        const options = {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-type': 'application/json',
            },
        };

        if (!formValid) {
            if (!titleValid) {
                console.log(messages.title)
            }
            else if (!folderValid) {
                console.log(messages.folder)
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
                    "title": "",
                    "folder_id": "",
                    "content": "",
                })
                this.props.handleAdd(data)
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
                <option value={folder.id} key={folder.id}>{folder.foldername}</option>
            )
        })

        return (
            <div className='mainAddNote'>
                <h2 className='mainAddNote__header'>Create a note</h2>
                <form className='mainAddNote__form' onSubmit={e => this.handleSubmit(e)}>
                    <ValidationError hasError={!this.state.titleValid} message={this.state.validationMessages.name} />
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='' value={this.state.title} onChange={e => this.noteTitleChange(e.target.value)} />
                    <label htmlFor='content'>Content</label>
                    <input type='text' name='content' id='content' placeholder='' value={this.state.content} onChange={e => this.noteContentChange(e.target.value)} />
                    <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
                    <label htmlFor='folder'>Folder</label>
                    <select name='folder' id='folder' onChange={e => this.noteFolderChange(e.target.value)} >
                        <option>...</option>
                        {foldersList}
                    </select>
                    
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