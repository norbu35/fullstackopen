import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [counter, setCounter] = useState();
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>Press</button>
    </div>
  );
};
