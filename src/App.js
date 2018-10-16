import React from 'react'
import Note from './components/Note'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notes: props.notes,
            showAll: true, // We show all notes, important and not important.
            newNote: ''
        }
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
        this.setState({ newNote: "haa" })
    }

    toggleVisible = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNote: event.target.value })
    }

    render() {

        const notesCollection = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important === true)

        const rows = () => notesCollection.map(note => <Note key={note.id} note={note} />)

        const label = this.state.showAll === true ? "only important notes" : "all notes"

        return (
            <div>
                <h1>Notes</h1>
                <ul>
                    {rows()}
                </ul>
                <form onSubmit={this.addNote} onMouseOver={this.test}>
                    <input value={this.state.newNote} onChange={this.handleNoteChange} />
                    <button type="submit">Save note</button>
                    <button onClick={this.toggleVisible}>Show {label}</button>
                </form>
            </div>
        )
    }
}

export default App