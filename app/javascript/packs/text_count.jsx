import React from 'react';
import ReactDOM from 'react-dom';
import TextCount from './text_count/text_count';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TextCount defaultText="Bob" />,
    document.body.appendChild(document.createElement('div')),
  )
});
