export default class NotesView {
	constructor(
		root,
		{ onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
	) {
		this.root = root;
		this.onNoteSelect = onNoteSelect;
		this.onNoteAdd = onNoteAdd;
		this.onNoteEdit = onNoteEdit;
		this.onNoteDelete = onNoteDelete;
		this.root.innerHTML = `
            <div class="notes__sidebar">
			<div class="notes__search function__tiles">
					<input type="text" placeholder="Search" />
			</div>
                <div class="notes__list"></div>
				<button class="notes__add function__tiles" type="button">Add Note</button>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
            </div>
			<button id="themeSwitcher">
				<img src="images/moon.png" alt="moon" />
			</button>
        `;

		const btnAddNote = this.root.querySelector('.notes__add');
		const inpTitle = this.root.querySelector('.notes__title');
		const inpBody = this.root.querySelector('.notes__body');

		btnAddNote.addEventListener('click', () => {
			this.onNoteAdd();
		});

		[inpTitle, inpBody].forEach((inputField) => {
			inputField.addEventListener('blur', () => {
				const updatedTitle = inpTitle.value.trim();
				const updatedBody = inpBody.value.trim();

				this.onNoteEdit(updatedTitle, updatedBody);
			});
		});

		this.updateNotePreviewVisibility(false);
	}

	_createListItemHTML(id, title, body, updated) {
		const MAX_BODY_LENGTH = 60;

		return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? '...' : ''}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, {
											dateStyle: 'full',
											timeStyle: 'short',
										})}
                </div>
				<span class="material-symbols-outlined favorite"> star </span>
				<span class="material-symbols-outlined delete"> delete </span>
            </div>
        `;
	}

	updateNoteList(notes) {
		const notesListContainer = this.root.querySelector('.notes__list');

		// Empty list
		notesListContainer.innerHTML = '';

		for (const note of notes) {
			const html = this._createListItemHTML(
				note.id,
				note.title,
				note.body,
				new Date(note.updated)
			);

			notesListContainer.insertAdjacentHTML('beforeend', html);
		}

		// Add select/delete events for each list item
		notesListContainer
			.querySelectorAll('.notes__list-item')
			.forEach((noteListItem) => {
				noteListItem.addEventListener('click', () => {
					this.onNoteSelect(noteListItem.dataset.noteId);
				});

				// noteListItem.addEventListener('dblclick', () => {
				// 	const doDelete = confirm(
				// 		'Are you sure you want to delete this note?'
				// 	);

				// 	if (doDelete) {
				// 		this.onNoteDelete(noteListItem.dataset.noteId);
				// 	}
				// });

				// Add event listeners for favorite and delete buttons
				noteListItem
					.querySelector('.favorite')
					.addEventListener('click', () => {
						this.onNoteFavorite(noteListItem.dataset.noteId);
					});

				noteListItem.querySelector('.delete').addEventListener('click', () => {
					this.onNoteDelete(noteListItem.dataset.noteId);
				});
			});
	}

	updateActiveNote(note) {
		this.root.querySelector('.notes__title').value = note.title;
		this.root.querySelector('.notes__body').value = note.body;

		this.root.querySelectorAll('.notes__list-item').forEach((noteListItem) => {
			noteListItem.classList.remove('notes__list-item--selected');
		});

		this.root
			.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
			.classList.add('notes__list-item--selected');
	}

	updateNotePreviewVisibility(visible) {
		this.root.querySelector('.notes__preview').style.visibility = visible
			? 'visible'
			: 'hidden';
	}
}
