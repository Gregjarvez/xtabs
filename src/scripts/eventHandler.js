import { extract, getTabInfo } from './utils';
import { saveTabs, setLimit } from '../events/actions/index';

class EventHandler {
  constructor(context) {
    this.context = context;
  }

  closeOneOnExcess = (tabs) => {
    if (tabs.length > this.context.limit) {
      if (this.context.closeType === 'left-most') {
        return this.closeTab(tabs);
      }
      return this.closeOldestTab(tabs);
    }
  }

  closeMultipleOnExcess = (tabs) => {
    if (tabs.length > this.context.limit) {
      const tabinfo = tabs.slice(0, (tabs.length - this.context.limit))
        .map(getTabInfo);

      this.context.store.dispatch(saveTabs(tabinfo));
      chrome.tabs.remove(tabinfo.map(tab => tab.id));
    }
  }

  closeTab(tabs) {
    const { store } = this.context;
    const i = tabs.findIndex(tab => !tab.pinned && !tab.active);
    const closable = tabs[i];
    console.log(closable);

    if (!closable) {
      const limit = store.getState().settings.tabLimit + 1;
      return store.dispatch(setLimit(limit));
    }

    const tabInfo = extract(['id', 'url', 'title', 'favIconUrl', 'pinned'], closable);

    this.context.store.dispatch(saveTabs(tabInfo));
    return chrome.tabs.remove(tabInfo.id);
  }

  closeOldestTab(tabs) {
    tabs = tabs.sort((a, b) => a.id - b.id);
    return this.closeTab(tabs);
  }

  setBadgeNumber(num) {
    return chrome.browserAction.setBadgeText({ text: `${num}` });
  }

  setInitialBackground() {
    chrome.browserAction.setBadgeBackgroundColor({ color: '#118AB2' });
  }

  hydrateStoreonLoad() {
    chrome.storage.local.get(['closeType', 'tabLimit'], (store) => {
      this.context.store.dispatch({ type: 'HYDRATE', payload: store });
    });
  }

  setParamsToPersistantStorage(params) {
    chrome.storage.local.set(params, () => {
      if (chrome.runtime.lastError) {
        // todo store to a different storage momentarily
      }
    });
  }
}

export default EventHandler;
