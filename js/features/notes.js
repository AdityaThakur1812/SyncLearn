let notes = [];
let noteInput;
let addNoteBtn;
let notesContainer;

export function initNote() {
  noteInput = document.getElementById("noteInput");
  addNoteBtn = document.getElementById("addNoteBtn");
  notesContainer = document.getElementById("notesContainer");

  addNoteBtn.addEventListener("click", addNote);
  loadNotes();
}

function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") {
    alert("Please enter something in notes");
    return;
  }
  const noteObj = {
    id: Date.now(),
    text: noteText,
  };
  notes.push(noteObj);
  renderNotes(noteObj);
  saveNotes();
  noteInput.value = "";
}

function renderNotes(note) {
  let noteCard = document.createElement("div");
  noteCard.classList.add("note-card");
  noteCard.dataset.id = note.id; // *assign every note a new id
  noteCard.innerHTML = `
    <p class= "note-text"> ${note.text} </p> 
    <div class="note-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-note-btn">Delete</button>
    </div>
    `;
  notesContainer.appendChild(noteCard);
  setUpDelete(noteCard);
  setupEdit(noteCard);
}

function setUpDelete(noteCard) {
  const deleteBtn = noteCard.querySelector(".delete-note-btn");
  deleteBtn.addEventListener("click", () => {
    const noteId = Number(noteCard.dataset.id); // this will return the id of the current note
    notes = notes.filter((note) => {
      return noteId !== note.id;
    });
    saveNotes();
    noteCard.remove();
  });
}

function setupEdit(noteCard) {
  const editBtn = noteCard.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const noteTextElement = noteCard.querySelector(".note-text");
    const currText = noteTextElement.innerText;
    const updatedText = prompt("edit your notes", currText); //it shows popup and returns the new currText if any thing edit
    if (updatedText == null) return;
    noteTextElement.innerText = updatedText;
    const noteId = Number(noteCard.dataset.id);
    notes.forEach((n) => {
      if (noteId === n.id) {
        n.text = updatedText;
      }
    });
    saveNotes();
  });
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    notes.forEach((note) => renderNotes(note));
  }
}
