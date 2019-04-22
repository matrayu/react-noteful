import React from 'react';
import ReactDOM from 'react-dom';
import NavAddNote from './NavAddNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavAddNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});