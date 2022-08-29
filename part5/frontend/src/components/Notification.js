import React from 'react';

const Notification = ({ message }) => {
  const styleNotification = {
    border: '1px solid green',
    borderRadius: 5,
    background: 'lightgrey',
    color: 'green',
    padding: '0.5em 1em',
  };

  const styleError = {
    border: '1px solid red',
    borderRadius: 5,
    background: 'lightgrey',
    color: 'red',
    padding: '0.5em 1em',
  };

  if (message.content) {
    if (message.type === 'error') {
      return (
        <div style={styleError}>
          <h3>{message.content}</h3>
        </div>
      );
    } else {
      return (
        <div style={styleNotification}>
          <h3>{message.content}</h3>
        </div>
      );
    }
  }
  return null;
};

export default Notification;
