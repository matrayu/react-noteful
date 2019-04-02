import React, { Component } from 'react';
import './Folder.css'

export default function Folder(props) {
    return (
        <li className='folder'>
            {props.title}
        </li>
    )
}