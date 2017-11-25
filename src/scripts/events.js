import EventHandler from './eventHandler';

class IOEvent {
  constructor(store) {
    this.limit = 6;
    this.store = store;
    this.closeType = this.store.getState().closeType;
    this.handler = new EventHandler(this);
    this.unsubscribe = this.store.subscribe(this.handleChange);

    this.onTabCreate();
    this.queryTab(this.handler.closeMultipleOnExcess);
    this.setInitialBadgeStatus();
  }

  onTabCreate() {
    return chrome.tabs
      .onCreated
      .addListener(() => this.queryTab(this.handler.closeOneOnExcess));
  }

  queryTab(callBack) {
    return chrome
      .tabs
      .query({ currentWindow: true }, callBack);
  }

  handleChange = () => {
    const { tabLimit, closeType, tabs } = this.store.getState();
    this.closeType = closeType;

    if (this.limit !== tabLimit) {
      this.limit = tabLimit;
      chrome.browserAction.setBadgeText({ text: `${tabs.length}` });
      return;
    }

    this.queryTab(this.handler.closeMultipleOnExcess);
  };

  setInitialBadgeStatus() {
    chrome
      .browserAction
      .setBadgeBackgroundColor({ color: '#118AB2' });

    chrome
        .browserAction
        .setBadgeText({ text: `${this.store.getState().tabs.length}` });
  }
}

export default IOEvent;
