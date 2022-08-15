import React, { useEffect, useState } from "react";
import personService from "./services/persons";

import Add from "./components/Add";
import Filter from "./components/Filter";
import List from "./components/List";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    personService.getAll().then((resp) => setPersons(resp));
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleRemove = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)))
        .catch((err) => {
          setNotificationMessage({
            message: `${
              persons.find((person) => person.id === id).name
            } has already been deleted from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 5000);
        });
    }
    setNotificationMessage({
      message: `Deleted ${persons.find((person) => person.id === id).name}`,
      type: "notification",
    });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: null });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with a new one?`
        )
      ) {
        const changedPerson = {
          ...existingPerson,
          number: newNumber,
        };
        personService.update(existingPerson.id, changedPerson);
      }

      setNotificationMessage({
        message: `${persons.find(
          (person) => person.name === newName
        )}'s number changed`,
        type: "notification",
      });
      setTimeout(() => {
        setNotificationMessage({ message: null, type: null });
      }, 5000);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(newPerson));
      personService.create(newPerson);

      setNotificationMessage(`Added ${newName}`);
      setTimeout(() => {
        setNotificationMessage({ message: null, type: null });
      }, 5000);
    }
  };

  return (
    <div>
      <Notification
        message={notificationMessage.message}
        type={notificationMessage.type}
      />
      <Filter handleFilter={handleFilter} filter={filter} />
      <Add
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <List persons={persons} filter={filter} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
