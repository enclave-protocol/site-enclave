import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import './Components/Welcome.css';

ReactDOM.render(
    <React.StrictMode>
      <Main enter={false}/>
    </React.StrictMode>,
    document.getElementById('root')
);
