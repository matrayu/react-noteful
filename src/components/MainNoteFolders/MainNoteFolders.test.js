import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MainNoteFolders from './MainNoteFolders';

const defaultProps = {
  location: '/'
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MainNoteFolders {...defaultProps}/>
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});