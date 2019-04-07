import React from 'react';
import ReactDOM from 'react-dom';
import MainNoteFolders from './Note';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNoteFolders />, div);
  ReactDOM.unmountComponentAtNode(div);
});