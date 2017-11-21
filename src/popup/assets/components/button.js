import React from 'react';

const Button = ({ title, onclick, classnameBtn }) => {
  return (
      <button onClick={onclick} className={classnameBtn}>{title}</button>

  );
};
export default Button;
