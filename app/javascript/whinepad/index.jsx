import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import schema from './files/schema'
import Whinepad from './components/whinepad'
import Logo from './components/logo'
import './styles/application';

let data = JSON.parse(localStorage.getItem('data'));

// default example data, read from the schema
if (!data) {
  data = {};
  schema.forEach((item) => data[item.id] = item.sample);
  data = [data];
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <div className="app-header">
        <Logo/>Whinepadにようこそ！
      </div>
      <Whinepad schema={schema} initialData={data} />
    </div>,
    document.body.appendChild(document.createElement('div')),
  )
});
