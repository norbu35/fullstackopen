import React, { useState } from "react";

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  const Button = ({ onClick, rating }) => {
    return <button onClick={onClick}>{rating}</button>;
  };

  const GiveFeedback = () => {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleClickGood} rating={"good"} />
        <Button onClick={handleClickNeutral} rating={"neutral"} />
        <Button onClick={handleClickBad} rating={"bad"} />
      </div>
    );
  };

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    );
  };

  const Statistics = ({ good, neutral, bad }) => {
    if (good || neutral || bad) {
      return (
        <table>
          <th>
            <h1>statistics</h1>
          </th>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine
              text={"average"}
              value={(good * 1 + neutral * 0 + (bad * -1) / total) / 10}
            />
            <StatisticLine
              text={"positive"}
              value={(good / total) * 100 + "%"}
            />
          </tbody>
        </table>
      );
    }
    return <div>no feedback given</div>;
  };

  return (
    <>
      <GiveFeedback />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};
export default App;
