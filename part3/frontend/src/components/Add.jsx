import React from "react";

const Add = ({
  addPerson,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>add new</h2>
      <div>
        name: <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Add;
