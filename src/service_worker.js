// jshint esversion: 6

/* ---------------------- Settings ---------------------- */

const defaultSettings = {
  enabled: true,
};
var settings = {};

/* ---------------------- Functions --------------------- */

function saveSettings() {
  chrome.storage.sync.set(settings);
}

function toggle() {
  settings.enabled = !settings.enabled;
  saveSettings();

  setBadge();
}

function setBadge() {
  if (settings.enabled) {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#4caf50" });
  } else {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#f44336" });
  }
}

function work(tabID, changeInfo, tab) {
  if (settings.enabled)
    if (tab.url.includes("https://www.youtube.com/shorts/")) {
      chrome.tabs.update(tabID, { url: tab.url.replace("https://www.youtube.com/shorts/", "https://www.youtube.com/watch?v=") });
    }
}

/* ------------------------ Init ------------------------ */

chrome.storage.sync.get(Object.keys(defaultSettings), (storage) => {
  settings = Object.assign({}, defaultSettings, storage);
  saveSettings();

  setBadge();
});

chrome.action.onClicked.addListener(toggle);
chrome.tabs.onUpdated.addListener(work);
