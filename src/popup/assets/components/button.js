import React from 'react';

const Button = ({ onclick, buttonClassName, children }) => {
  return (
    <button className={buttonClassName} onClick={onclick} >{ children }</button>
  );
};
export default Button;
