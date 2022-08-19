import React from "react";

const Notification = ({ message, type }) => {
  const styleNotification = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const styleError = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (!message) return null;

  if (type === "notification")
    return <div style={styleNotification}>{message}</div>;
  if (type === "error") return <div style={styleError}>{message}</div>;
};

export default Notification;
