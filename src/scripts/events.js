import EventHandler from './eventHandler';
import ContextMenu from '../scripts/contextMenu';


class IOEvent {
  constructor(store) {
    const contextMenu = Object.create(ContextMenu);
    const context = this;

    this.store = store;
    const { closeType, tabLimit } = this.store.getState();
    this.limit = tabLimit;
    this.closeType = closeType;
    this.handler = new EventHandler(this);
    this.unsubscribe = this.store.subscribe(this.handleChange);

    contextMenu
      .removePreviousMenu()
      .installMenu()
      .initialActionListener(context);


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
    this.handler.setBadgeNumber(tabs.length);

    if (this.limit === tabLimit) {
      return;
    }
    this.limit = tabLimit;
    this.queryTab(this.handler.closeMultipleOnExcess);
  };

  setInitialBadgeStatus() {
    this.handler.setInitialBackground();
    this.handler.setBadgeNumber(this.store.getState().tabs.length);
  }
}

export default IOEvent;
