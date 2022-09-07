import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

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

  if (notification.message) {
    if (notification.type === 'error') {
      return (
        <div style={styleError}>
          <h3>{notification.message}</h3>
        </div>
      );
    } else {
      return (
        <div style={styleNotification}>
          <h3>{notification.message}</h3>
        </div>
      );
    }
  }
  return null;
};

export default Notification;
