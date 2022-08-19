import React from "react";

const Filter = ({ filter, handleFilter }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter} />
      </div>
    </>
  );
};

export default Filter;
