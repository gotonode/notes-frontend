import React from 'react'
import Note from './components/Note'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: props.notes
        }
    }

    render() {
        return (
            <div>
                <h1>Notes</h1>
                <ul>
                    {this.state.notes.map(note => <Note key={note.id} note={note} />)}
                </ul>
            </div>
        )
    }
}

export default App