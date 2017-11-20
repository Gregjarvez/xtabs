import React from 'react';

const Button = ({ title, onclick }) => {
  return (
    <span>
      <button onClick={onclick}>{title}</button>
    </span>
  );
};
export default Button;
