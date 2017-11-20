import IOEvents from './events';

class App {
  constructor(store) {
    this.events = new IOEvents(store);
  }
}

export default App;
