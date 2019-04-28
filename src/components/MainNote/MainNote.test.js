import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainNote from './MainNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MainNote />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});