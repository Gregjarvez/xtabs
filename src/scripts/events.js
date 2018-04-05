import EventHandler from './eventHandler';

class IOEvent {
  constructor(store) {
    this.store = store;
    const { closeType, tabLimit } = this.store.getState();
    this.limit = tabLimit;
    this.closeType = closeType;
    this.handler = new EventHandler(this);

    this.store.subscribe(this.onStoreChange);
    this.handler.hydrateStoreonLoad();
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

  onStoreChange = () => {
    const { settings, tabs } = this.store.getState();
    this.handler.setBadgeNumber(tabs.length);

    this.limit = settings.tabLimit;
    this.closeType = settings.closeType;

    this.handler.setParamsToPersistantStorage({
      closeType: this.closeType,
      tabLimit: this.limit
    });
  };

  setInitialBadgeStatus() {
    this.handler.setInitialBackground();
    this.handler.setBadgeNumber(this.store.getState().tabs.length);
  }
}

export default IOEvent;
