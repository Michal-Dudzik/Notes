export default class NotesApi {
	static getAllNotes() {
		const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');

		return notes.sort((a, b) => {
			return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
		});
	}

	static saveNotes(noteToSave) {
		const notes = NotesApi.getAllNotes();
		const exsiting = notes.find((note) => note.id == noteToSave.id);

		// edit / update
		if (exsiting) {
			exsiting.title = noteToSave.title;
			exsiting.body = noteToSave.body;
			exsiting.updated = new Date().toISOString();
		} else {
			noteToSave.id = math.floor(Math.random() * 1000000);
			noteToSave.created = new Date().toISOString();
			notes.push(noteToSave);
		}
		localStorage.setItem('notesapp-notes', JSON.stringify(notes));
	}

	static deleteNotes(id) {
		const notes = NotesApi.getAllNotes();
		const newNotes = notes.filter((note) => note.id != id);

		localStorage.setItem('notesapp-notes', JSON.stringify(newNotes));
	}
}
