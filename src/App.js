import React from 'react'
import Note from './components/Note'
import axios from 'axios'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            showAll: true, // We show all notes, important and not important.
            newNote: ''
        }
        console.log("Constructor called.")
    }

    eventHandler = (response) => {
        console.log("Promise fulfilled.")
        this.setState({ notes: response.data })
    }

    componentDidMount() {
        console.log("Mount.")
        const promise = axios.get("http://192.168.100.208:3001/notes")
        promise.then(this.eventHandler)
    }

    addNote = (event) => {
        // Prevent the page from reloading. This is a SPA, we don't need page reloads.
        event.preventDefault()

        const noteObject = {
            id: this.state.notes.length + 1,
            content: this.state.newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5
        }

        const notes = this.state.notes.concat(noteObject)

        this.setState({
            notes: notes,
            newNote: ''
        })
    }

    test = (event) => {
        this.setState({
            newNote: "haa"
        })
    }

    toggleVisible = () => {
        this.setState({
            showAll: !this.state.showAll
        })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({
            newNote: event.target.value
        })
    }

    render() {

        const notesCollection = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important === true)

        const rows = () => notesCollection.map(note => < Note key={note.id} note={note} />)

        const label = this.state.showAll === true ? "only important notes" : "all notes"

        return (
            <div>
                <h1>Notes</h1>
                <ul>
                    {rows()}
                </ul>
                <form onSubmit={this.addNote} onMouseOver={this.test}>
                    <input value={this.state.newNote} onChange={this.handleNoteChange} />
                    <button type="submit" class="btn btn-primary">Save note</button>
                    <button onClick={this.toggleVisible} class="btn btn-secondary">Show {label}</button>
                </form>
            </div>
        )
    }
}

export default App