import React from "react";

const Course = ({ courses }) => {
  const Header = ({ name }) => <h1>{name}</h1>;

  const Total = ({ parts }) => {
    const sum = parts.reduce((acc, curr) => {
      return (acc += curr.exercises);
    }, 0);
    return (
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    );
  };

  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

  const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );

  return courses.map((course) => (
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

export default Course;
