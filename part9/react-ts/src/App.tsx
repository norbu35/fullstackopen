import React from 'react';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the easy course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return <Part courseParts={courseParts} />;
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const Part = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  return (
    <p>
      {courseParts.map((part) => {
        switch (part.type) {
          case 'normal':
            return (
              <p>
                <b>{part.name}</b>
                {part.exerciseCount} <br />
                {part.description} <br />
              </p>
            );

          case 'groupProject':
            return (
              <p>
                {part.name} <br />
                {part.exerciseCount} <br />
                {part.groupProjectCount} <br />
              </p>
            );

          case 'submission':
            return (
              <p>
                {part.name} <br />
                {part.exerciseCount} <br />
                {part.description} <br />
                {part.exerciseSubmissionLink} <br />
              </p>
            );

          case 'special':
            return (
              <p>
                {part.name} <br />
                {part.exerciseCount} <br />
                {part.description} <br />
                {part.requirements}
              </p>
            );
          default:
            assertNever(part);
        }
      })}
    </p>
  );
};

export default App;
