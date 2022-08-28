import React from 'react';

const Notification = ({ message }) => {
  if (message) {
    return (
      <div>
        <h3>{message}</h3>
      </div>
    );
  }
  return null;
};

export default Notification;
