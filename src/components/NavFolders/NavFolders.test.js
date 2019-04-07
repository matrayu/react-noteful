import React from 'react';
import ReactDOM from 'react-dom';
import NavFolders from './NavFolders';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavFolders />, div);
  ReactDOM.unmountComponentAtNode(div);
});