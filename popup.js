const inputSeconds = document.getElementById('seconds');
const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');
const bodyContainer = document.getElementById('body-container');
const statusText = document.getElementById('status-text');

let currentTabId;

// 1. Inizializzazione: identifica la scheda e carica il suo stato specifico
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  currentTabId = tabs[0].id;
  const storageKey = `tab_${currentTabId}`;

  chrome.storage.local.get([storageKey], (result) => {
    const data = result[storageKey];
    if (data) {
      inputSeconds.value = data.seconds;
      updateUI(true);
    } else {
      updateUI(false);
    }
  });
});

function updateUI(isActive) {
  if (isActive) {
    bodyContainer.classList.add('active');
    btnStart.disabled = true;
    btnStop.disabled = false;
    statusText.textContent = "Stato: ATTIVO (Questa scheda)";
  } else {
    bodyContainer.classList.remove('active');
    btnStart.disabled = false;
    btnStop.disabled = true;
    statusText.textContent = "Stato: Disattivo";
  }
}

// 2. Avvio Refresh per QUESTA scheda
btnStart.addEventListener('click', () => {
  const sec = parseFloat(inputSeconds.value);
  const alarmName = `refresh_${currentTabId}`;
  const storageKey = `tab_${currentTabId}`;

  chrome.storage.local.set({
    [storageKey]: { seconds: sec, active: true }
  }, () => {
    chrome.alarms.create(alarmName, {
      periodInMinutes: sec / 60
    });
    updateUI(true);
  });
});

// 3. Stop Refresh per QUESTA scheda
btnStop.addEventListener('click', () => {
  const alarmName = `refresh_${currentTabId}`;
  const storageKey = `tab_${currentTabId}`;

  chrome.alarms.clear(alarmName, () => {
    chrome.storage.local.remove(storageKey, () => {
      updateUI(false);
    });
  });
});