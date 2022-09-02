import { connect } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import noteService from '../services/notes';

const NewNote = (props) => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    const newNote = await noteService.createNew(content);
    props.createNote(newNote);
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default connect(null, { createNote })(NewNote);
