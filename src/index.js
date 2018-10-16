import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const notes = [
    {
        id: 1,
        content: "First",
        date: "2018",
        important: true
    },
    {
        id: 2,
        content: "Second",
        date: "2018",
        important: true
    },
    {
        id: 3,
        content: "Third",
        date: "2018",
        important: false
    }
]

ReactDOM.render(< App notes={notes} />, document.getElementById('root'));