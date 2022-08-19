import React, { useEffect, useState } from "react";
import personService from "./services/people";

import Add from "./components/Add";
import Filter from "./components/Filter";
import List from "./components/List";
import Notification from "./components/Notification";

const App = () => {
  const [people, setPeople] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({});

  useEffect(() => {
    personService.getAll().then((resp) => setPeople(resp));
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
        `Delete ${people.find((person) => person.id === id).name}?`
      )
    ) {
      personService
        .remove(id)
        .then(setPeople(people.filter((person) => person.id !== id)))
        .catch((err) => {
          setNotificationMessage({
            message: `${
              people.find((person) => person.id === id).name
            } has already been deleted from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 5000);
        });
    }
    setNotificationMessage({
      message: `Deleted ${people.find((person) => person.id === id).name}`,
      type: "notification",
    });
    setTimeout(() => {
      setNotificationMessage({ message: null, type: null });
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = people.find((person) => person.name === newName);

    if (existingPerson) {
      console.log(existingPerson);
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
        message: `${
          people.find((person) => person.name === newName).name
        }'s number changed`,
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

      personService
        .create(newPerson)
        .then((createdPerson) => {
          setNotificationMessage({
            message: `Added ${createdPerson.name}`,
            type: "notification",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 5000);
        })
        .catch((err) => {
          setNotificationMessage({
            message: err.res.data.error,
            type: "error",
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, type: null });
          }, 5000);
        });
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
      <List people={people} filter={filter} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
