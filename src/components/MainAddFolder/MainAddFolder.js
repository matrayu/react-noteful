import React, { Component } from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types'
import './MainAddFolder.css'
import config from '../../config.js';

class MainAddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foldername: '',
            id: '',
            "nameValid": false,
            "formValid": false,
            "validationMessage": '',
            "error": true,
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

    folderNameChanged(foldername) {
        this.setState({foldername}, () => {this.validateName(foldername)});
    }

    handleSubmit(e) {
        e.preventDefault();
        const folder = (({foldername, id}) => ({foldername, id}))(this.state);
        const url = `${config.API_ENDPOINT}/folders`
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
                this.setState(
                    {
                        foldername: '',
                        id: '',
                    }
                ) 
                this.props.handleAdd(data, () => {
                    this.props.history.goBack();
                })    
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
            fieldError = 'A folder name is required';
            hasError = true;
        } else {
            fieldError = '';
            hasError = false;
        };
        this.setState({
            validationMessage: fieldError,
            nameValid: !hasError,
        }, this.formValid);
    };

    
    render() {
        return (
            <div className='mainAddFolder'>
                <h2>Create Folder</h2>
                <form className='mainAddFolder__form' onSubmit={e => this.handleSubmit(e)}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' id='name' placeholder='Folder Name' value={this.state.foldername} onChange={e => this.folderNameChanged(e.target.value)} />
                    <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessage} />
                    <div className='mainAddFolder__buttons'>
                        <button type='submit' disabled={!this.state.formValid}>Add Folder</button>
                    </div>
                </form>
            </div>
        )
    }
}

MainAddFolder.propTypes = {
    handleAdd: PropTypes.func
}

export default MainAddFolder;