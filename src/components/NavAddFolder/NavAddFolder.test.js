import React from 'react';
import ReactDOM from 'react-dom';
import NavAddFolder from './NavAddFolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavAddFolder />, div);
  ReactDOM.unmountComponentAtNode(div);
});