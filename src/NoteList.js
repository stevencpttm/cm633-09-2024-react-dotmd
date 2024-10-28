import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NoteList({ activeId }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // componentDidMount
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const response = await fetch(`http://localhost:3001/notes`);
    const data = await response.json();

    setNotes(data);
  }

  return (
    <ul className="rounded-md border text-md text-slate-700">
      {notes.length > 0 &&
        notes.map((note) => {
          return (
            <li
              className={`cursor-pointer border-b px-4 py-2 ${
                note.id === activeId ? "bg-slate-200" : ""
              }`}
            >
              <Link to={`/note/${note.id}`}>
                <strong>{note.title}</strong>
                <p className="leading text-xs text-slate-500">
                  {note.content.substring(0, 180)}
                </p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

export default NoteList;
