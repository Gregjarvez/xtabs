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
    chrome
      .browserAction
      .setBadgeText({ text: `${tabs.length}` });

    if (this.limit === tabLimit) {
      return;
    }
    this.limit = tabLimit;

    this.queryTab(this.handler.closeMultipleOnExcess);
  };

  setInitialBadgeStatus() {
    this.handler.setInitialBackground();
    this.hanlder.setBadgeNumber(this.store.getState().tabs.length);
  }

}

export default IOEvent;
