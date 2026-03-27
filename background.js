chrome.alarms.onAlarm.addListener((alarm) => {
  // L'allarme avrà un nome tipo "refresh_12345"
  if (alarm.name.startsWith("refresh_")) {
    const tabId = parseInt(alarm.name.split("_")[1]);

    // Verifica che la scheda esista ancora, poi ricarica.
    // Usare le Promise mantiene attivo il service worker durante l'operazione.
    chrome.tabs.get(tabId)
      .then(() => {
        // La scheda esiste: ricarica. Non restituiamo questa Promise
        // così eventuali errori transitori del reload non cancellano l'allarme.
        chrome.tabs.reload(tabId);
      })
      .catch(() => {
        // chrome.tabs.get ha fallito: la scheda è stata chiusa
        chrome.alarms.clear(alarm.name);
        chrome.storage.local.remove(`tab_${tabId}`);
      });
  }
});