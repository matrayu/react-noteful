import React from 'react';
import ReactDOM from 'react-dom';
import MainAddFolder from './MainAddFolder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainAddFolder />, div);
  ReactDOM.unmountComponentAtNode(div);
});