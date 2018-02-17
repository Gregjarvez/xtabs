import React from 'react';
import { Button } from './commons';


const Counter = ({ tabLimit, increment, decrement }) => {
  return (
    <span className="limitBtns">
      <Button buttonClassName="limitBtn" onclick={increment}>+</Button>
      <span className="limitCounter">Limit: {tabLimit}</span>
      <Button buttonClassName="limitBtn" onclick={decrement}>-</Button>
    </span>
  );
};

export default Counter;
