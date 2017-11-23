import React from 'react';
import SearchField from './filter';
import Stack from './stack';
import Settings from './settings';

const App = () => (
    <div className="container">
      <SearchField />
      <Stack />
      <Settings />
    </div>
);

export default App;
