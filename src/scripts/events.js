/* globals chrome */
import { saveTabs } from '../events/actions/index';
import { extract } from './utils';

class IOEvent {
  constructor(store) {
    this.limit = 6;
    this.store = store;

    this.queryTab(this.closeMultipleOnExcess);
    this.onTabCreate();
    this.store.subscribe(this.handleChange);
  }

  onTabCreate() {
    return chrome.tabs.onCreated.addListener(() => this.queryTab(this.closeOneOnExcess));
  }

  queryTab(callBack) {
    return chrome.tabs.query({ currentWindow: true }, callBack);
  }

  config(title) {
    return {
      type: 'basic',
      iconUrl: './icons/icon48.png',
      title: 'Tab Limit has been reach',
      message: `${title} is due to be closed`,
      buttons: [{ title: 'Yes' }, { title: 'No' }],
    };
  }

  closeOneOnExcess = (tabs) => {
    if (tabs.length > this.limit) {
      console.log('running');
      const tab = tabs[0];
      const options = this.config(tab.title);
      this.createNotification(
        tab.id,
        options,
        this.notificationClickHandler,
        tab
      );
    }
  };

  closeMultipleOnExcess = (tabs) => {
    if (tabs.length > this.limit) {
      const toStore = tabs.slice(0, (tabs.length - this.limit));

      const tabinfo = toStore.map(({
        url, id, favIconUrl, title,
      }) => {
        return {
          url, id, favIconUrl, title,
        };
      });

      const ids = tabinfo.length > 1
        ? tabinfo.map(tab => tab.id)
        : tabinfo[0].id;
      this.store.dispatch(saveTabs(tabinfo));
      chrome.tabs.remove(ids);
    }
  };

  handleChange = () => {
    const val = this.store.getState().tabLimit;
    if (this.limit === val) return;
    this.limit = val;

    this.queryTab(this.closeMultipleOnExcess);
  };

  createNotification = (id, options, callbackAction, tab) => {
    id = (id).toString();

    chrome.notifications.create(id, options);
    chrome.notifications.onButtonClicked.addListener((...args) => {
      callbackAction.apply(this, args.concat(tab))
        .then((notifId) => {
          chrome.notifications.clear(notifId);
        });
    });
  };

  notificationClickHandler(id, index, tab) {
    if (index === 0) {
      const tabInfo = extract(['id', 'url', 'title', 'favIconUrl'], tab);

      this.store.dispatch(saveTabs(tabInfo));
      chrome.tabs.remove(tabInfo.id);
    }

    return Promise.resolve(id);
  }
}

export default IOEvent;
