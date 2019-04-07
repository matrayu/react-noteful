import React from 'react';
import ReactDOM from 'react-dom';
import NavNote from './NavNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});