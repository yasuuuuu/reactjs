import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/logo';
import './styles/application';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <h1>
      <Logo />アプリケーションにようこそ！
    </h1>,
    document.body.appendChild(document.createElement('div')),
  )
});
