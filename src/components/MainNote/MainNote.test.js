import React from 'react';
import ReactDOM from 'react-dom';
import MainNote from './MainNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainNote />, div);
  ReactDOM.unmountComponentAtNode(div);
});