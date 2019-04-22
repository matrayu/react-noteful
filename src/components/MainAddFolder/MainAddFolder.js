import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import uuid from 'uuid';
import './MainAddFolder.css'

class MainAddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: uuid.v4(),
            "nameValid": false,
            "formValid": false,
            "validationMessage": '',
        };
    }

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }

    folderNameChanged(name) {
        this.setState({name}, () => {this.validateName(name)});
    }

    handleSubmit(e) {
        e.preventDefault();
        const folder = (({name, id}) => ({name, id}))(this.state);
        const url = 'http://localhost:9090/folders'
        const options = {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong. Please try again.');
                }
                return res.json();
            })
            .then(data => {
                this.setState({
                    name: '',
                    id: '',
                });
                this.props.handleAdd(folder);
                this.props.history.goBack();
            })
            .catch(err => {
                this.setState({
                    error: err.message
                });
                console.error(err)
            })
    }

    formValid() {
        if (this.state.nameValid) {
            console.log('New Folder Form is Valid!')
        }
        this.setState({
            formValid: this.state.nameValid
        })
    }

    validateName(fieldValue) {
        let fieldError = this.state.validationMessage;
        let hasError = false;

        fieldValue = fieldValue.trim();
        if (fieldValue.length === 0) {
            fieldError = 'Name is required';
            hasError = true;
        } else {
            fieldError = '';
            hasError = false;
        };

        console.log('Name Valid', this.state.nameValid)
        this.setState({
            validationMessage: fieldError,
            nameValid: !hasError,
        }, this.formValid);
    };

    
    render() {
        const error = this.state.error
            ? <div className='error'>{this.state.error}</div>
            : "";

        return (
            <div className='mainAddFolder'>
                <h2>Create Folder</h2>
                <form className='mainAddFolder__form' onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='Folder Name' value={this.state.name} onChange={e => this.folderNameChanged(e.target.value)} />
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessage} />
                    <div className='mainAddFolder__buttons'>
                        <button type='submit' disabled={!this.state.formValid}>Add Folder</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default MainAddFolder;