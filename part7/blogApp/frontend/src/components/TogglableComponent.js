import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from 'react-bootstrap/Button';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(props.startVisible);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <br />
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
