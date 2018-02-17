import React from 'react';
import Settings from './settings.png';

export const Gear = () => {
  return (
    <img src={Settings} alt="Gear" />
  );
};

export const Button = ({ onclick, buttonClassName, children }) => {
  return (
    <button className={buttonClassName} onClick={onclick} >{ children }</button>
  );
};
