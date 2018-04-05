const ContextMenu = {
  initialLizeContextMenu() {
    chrome.contextMenus.create({
      id: 'stack_tab_context_menu',
      title: 'Stack Tab',
    });
  },

  installMenu() {
    chrome.runtime.onInstalled.addListener(() => {
      this.initialLizeContextMenu();
    });
    return this;
  },
  removePreviousMenu() {
    chrome.runtime.onUpdateAvailable.addListener(() => {
      try {
        chrome.contextMenus.removeAll(() => {
          this.installMenu();
        });
      } catch (e) { console.log(e); }
    });
    return this;
  },

  initialActionListener(backgroundEvents) {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      backgroundEvents.handler.closeTab([tab], info.menuItemId);
    });
  }
};

export default ContextMenu;
