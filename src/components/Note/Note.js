import React, { Component } from 'react';
import './Note.css'

export default function Note(props) {
    return (
        <li className='note' id={props.folderId}>
            <div className='note__row'>
                <h2>{props.name}</h2>
                <div className='note__modified'>
                    {props.modified}
                </div>
            </div>
            <div className='note__button'>
                <button className='note__delete'>Delete</button>
            </div>
        </li>
    )
}