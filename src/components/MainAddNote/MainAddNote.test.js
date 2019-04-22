import React from 'react';
import ReactDOM from 'react-dom';
import MainAddNote from './MainAddNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainAddNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});