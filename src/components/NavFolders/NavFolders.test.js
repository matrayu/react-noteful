import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NavFolders from './NavFolders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NavFolders />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});