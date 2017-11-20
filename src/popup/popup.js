import React from 'react';
import { render } from 'react-dom';
import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';
import App from './assets/containers/app';

const proxyStore = new Store({
  portName: 'stackTabs'
});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>
    , document.querySelector('.app'),
  );
});

