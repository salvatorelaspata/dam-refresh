chrome.alarms.onAlarm.addListener((alarm) => {
  // L'allarme avrà un nome tipo "refresh_12345"
  if (alarm.name.startsWith("refresh_")) {
    const tabId = parseInt(alarm.name.split("_")[1]);

    chrome.tabs.reload(tabId).catch(() => {
      // Se la scheda è stata chiusa, puliamo l'allarme e lo storage
      chrome.alarms.clear(alarm.name);
      chrome.storage.local.remove(`tab_${tabId}`);
    });
  }
});