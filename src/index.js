import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

axios.get('http://192.168.100.208:3001/notes').then(response => {
    const notes = response.data
    ReactDOM.render(< App notes={notes} />, document.getElementById('root'));
})

