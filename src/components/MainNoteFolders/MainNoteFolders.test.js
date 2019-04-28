import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MainNoteFolders from './MainNoteFolders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MainNoteFolders />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});