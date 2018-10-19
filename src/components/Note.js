import React from 'react'

const Note = ({ note, toggleImportance }) => {
    const label = note.important ? "mark not important" : "mark important"
    let className = ""
    if (note.important) {
        className += "important"
    } else {
        className += "not-important"
    }
    return (
        <li><span className={className}>{note.content}</span> <small>(<span className="toggle-importance" onClick={toggleImportance}>{label}</span>)</small></li>
    )
}

export default Note