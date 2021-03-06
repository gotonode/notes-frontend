import React from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const errorDelay = 2000

const Notification = ({ message }) => {
	if (message === null || message.length === 0) {
		return null
	}
	return (
		<div id="error">
			{message}
		</div>
	)
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			notes: [],
			showAll: true, // We show all notes, important and not important.
			newNote: "",
			errorMessage: null
		}
		console.log("Constructor called.")
	}

	eventHandler = (notes) => {
		console.log("Promise fulfilled.")
		this.setState({ notes })
	}

	componentDidMount() {
		console.log("Mount.")
		const promise = noteService.getAll()
		promise.then(this.eventHandler)
	}

	addNote = (event) => {
		// Prevent the page from reloading. This is a SPA, we don't need page reloads.
		event.preventDefault()

		if (this.state.newNote.trim().length === 0) {
			// alert("Please write something.")
			return
		}

		const noteObject = {
			content: this.state.newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5
		}

		noteService.create(noteObject).then(newNote => {
			this.setState({ notes: this.state.notes.concat(newNote), newNote: "" })
		})
	}

	toggleVisible = () => {
		this.setState({
			showAll: !this.state.showAll
		})
	}

	handleNoteChange = (event) => this.setState({ newNote: event.target.value })

	toggleImportanceOf = (id) => {
		return () => {

			const note = this.state.notes.find(n => n.id === id)
			const changedNote = { ...note, important: !note.important }

			console.log(`Need to toggle importance of note ${note.id}.`)

			noteService.update(id, changedNote)
				.then(changedNote => {
					const notes = this.state.notes.filter(n => n.id !== id)
					this.setState({ notes: notes.concat(changedNote) })
				}).catch(error => {
					this.setState({
						notes: this.state.notes.filter(n => n.id !== id),
						errorMessage: `Note ${id} has already been deleted from the server.`
					})
					setTimeout(() => {
						this.setState({ errorMessage: null })
					}, errorDelay)
				})
		}
	}


	render() {

		const notesCollection = this.state.showAll ? this.state.notes : this.state.notes.filter(note => note.important === true)

		const rows = () => notesCollection.map(note => <Note key={note.id} note={note} toggleImportance={this.toggleImportanceOf(note.id)} />)

		const label = this.state.showAll === true ? "only important notes" : "all notes"

		return (
			<div>
				<h1>Notes</h1>
				<Notification message={this.state.errorMessage} />
				<ul>
					{rows()}
				</ul>
				<form onSubmit={this.addNote}>
					<input value={this.state.newNote} onChange={this.handleNoteChange} />
					<button type="submit" className="btn btn-primary">Save note</button>
					<button onClick={this.toggleVisible} className="btn btn-secondary">Show {label}</button>
				</form>
			</div>
		)
	}
}

export default App
