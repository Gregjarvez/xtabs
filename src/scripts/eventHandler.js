import { extract, getTabInfo } from './utils';
import { saveTabs } from '../events/actions/index';


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
  };

  closeMultipleOnExcess = (tabs) => {
    if (tabs.length > this.context.limit) {
      const tabinfo = tabs
        .slice(0, (tabs.length - this.context.limit))
        .map(getTabInfo);

      this.context.store.dispatch(saveTabs(tabinfo));
      chrome.tabs.remove(tabinfo.map(tab => tab.id));
    }
  };

  closeTab([tab]) {
    const tabInfo = extract(
      ['id', 'url', 'title', 'favIconUrl'],
      tab
    );
    this.context.store.dispatch(saveTabs(tabInfo));
    chrome.tabs.remove(tabInfo.id);
  }

  closeOldestTab(tabs) {
    tabs = tabs.sort((a, b) => a.id - b.id);
    return this.closeTab(tabs);
  }

  setBadgeNumber(num) {
    return chrome
      .browserAction
      .setBadgeText({ text: `${num}` });
  }

  setInitialBackground() {
    chrome
      .browserAction
      .setBadgeBackgroundColor({ color: '#118AB2' });
  }
}

export default EventHandler;
