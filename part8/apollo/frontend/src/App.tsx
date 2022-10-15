import React, { useState } from 'react';
import {
  useApolloClient,
  useQuery,
  useSubscription,
  useMutation,
} from '@apollo/client';
import LoginForm from './components/LoginForm';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

import { ErrorMessage } from './types';
import { ALL_PERSONS, PERSON_ADDED } from './queries';

const Notify = ({ message }: ErrorMessage) => {
  if (!message) {
    return null;
  }
  return <div style={{ color: 'red' }}>{message}</div>;
};

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} added`);
      updateCache(client.cache, { query: ALL_PERSONS }, addedPerson);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message: ErrorMessage) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
};

export default App;
