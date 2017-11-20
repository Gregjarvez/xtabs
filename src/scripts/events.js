/* globals chrome */
import store from '../events/background';
import { saveTabs } from '../events/actions/index';
import { extract } from './utils';

class IOEvent {
  constructor() {
    this.limit = 6;

    this.queryTab(this.closeMultipleOnExcess);
    this.onTabCreate();
    if (store) {
      store.subscribe(this.handleChange);
    }
  }

  onTabCreate() {
    return chrome.tabs
      .onCreated
      .addListener(() => this.queryTab(this.closeOneOnExcess));
  }

  queryTab(callBack) {
    return chrome.tabs.query({ currentWindow: true }, callBack);
  }

  closeOneOnExcess = (tabs) => {
    if (tabs.length >= this.limit) {
      const tabInfo = extract(
        ['id', 'url', 'title', 'favIconUrl'],
        tabs[0],
      );
      store.dispatch(saveTabs(tabInfo));
      chrome.tabs.remove(tabInfo.id);
    }
  }

  closeMultipleOnExcess = (tabs) => {
    if (tabs.length > this.limit) {
      const toStore = tabs.slice(0, (tabs.length - this.limit));

      const tabinfo = toStore.map(({
        url, id, favIconUrl, title
      }) => {
        return {
          url, id, favIconUrl, title,
        };
      });

      const ids = tabinfo.length > 1
        ? tabinfo.map(tab => tab.id)
        : tabinfo[0].id;
      store.dispatch(saveTabs(tabinfo));
      chrome.tabs.remove(ids);
    }
  }

  handleChange = () => {
    const val = store.getState().tabLimit;
    if (this.limit === val) return;
    this.limit = val;
  }
}

export default IOEvent;
