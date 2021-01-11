import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';

ReactDOM.render(
    <React.StrictMode>
      <Main enter={false}/>
    </React.StrictMode>,
    document.getElementById('root')
);
