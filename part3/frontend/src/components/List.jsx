import React from "react";

const List = ({ people, filter, handleRemove }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul style={{ listStyleType: "none" }}>
        {filter
          ? people
              .filter((person) =>
                person.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((person) => (
                <li key={person.id}>
                  {person.name} {person.number}
                </li>
              ))
          : people.map((person) => (
              <li key={person.id}>
                {person.name} {person.number}{" "}
                <button onClick={() => handleRemove(person.id)}>delete</button>
              </li>
            ))}
      </ul>
    </>
  );
};

export default List;
