import React from 'react';
import Button from './button';


const Counter = (props) => {
  return (
    <span className="limitBtns">
      <Button buttonClassName="limitBtn" onclick={props.increment}>+</Button>
      <span className="limitCounter">Limit: {props.tabLimit}</span>
      <Button buttonClassName="limitBtn" onclick={props.decrement}>-</Button>
    </span>
  );
};

export default Counter;
