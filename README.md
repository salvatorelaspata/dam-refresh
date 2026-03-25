# dam-refresh 🔄

**dam-refresh** è un'estensione leggera e moderna per Google Chrome che permette di impostare un refresh automatico indipendente per ogni singola scheda. Grazie all'integrazione con le API Service Workers e Alarms, il refresh continua a funzionare anche se il popup viene chiuso.

## ✨ Caratteristiche

- **Multi-Tab Ready:** Gestisce timer diversi su schede diverse contemporaneamente.
- **Persistenza:** Utilizza `chrome.storage` per ricordare le impostazioni di ogni scheda.
- **Feedback Visivo:** L'interfaccia cambia colore (diventa verde) quando il refresh è attivo sulla scheda corrente.
- **Ottimizzata:** Utilizza i Service Worker (Manifest V3) per un consumo minimo di risorse e batteria.

## 📂 Struttura del Progetto

```text
dam-refresh/
├── manifest.json    # Configurazione e permessi dell'estensione
├── background.js    # Service worker per la gestione dei refresh in background
├── popup.html       # Interfaccia utente del popup
├── popup.css        # Stile dell'interfaccia (con transizioni di stato)
└── popup.js         # Logica di controllo specifica per ogni tab
```

## 🚀 Installazione

Dato che l'estensione non è ancora sul Chrome Web Store, puoi installarla manualmente in modalità sviluppatore:

1.  **Scarica o clona** questa cartella sul tuo computer.
2.  Apri Google Chrome e digita `chrome://extensions/` nella barra degli indirizzi.
3.  Abilita la **Modalità sviluppatore** (Developer mode) tramite l'interruttore in alto a destra.
4.  Clicca sul pulsante **Carica estensione non pacchettizzata** (Load unpacked).
5.  Seleziona la cartella `dam-refresh` che contiene i file del progetto.
6.  L'icona dell'estensione apparirà nella barra degli strumenti (potrebbe essere necessario cliccare sull'icona del puzzle per "fissarla").

## 🛠️ Utilizzo

1.  Vai sulla scheda che desideri aggiornare automaticamente.
2.  Clicca sull'icona di **dam-refresh**.
3.  Inserisci l'intervallo desiderato in **secondi**.
4.  Clicca su **Avvia**: il popup diventerà verde, a conferma che il processo è attivo.
5.  Puoi chiudere il popup o navigare in altre schede; **dam-refresh** continuerà a lavorare silenziosamente.
6.  Per fermare il processo, riapri il popup dalla scheda interessata e clicca su **Stop**.

## 📝 Note Tecniche

- **Intervallo Minimo:** Chrome impone un limite di circa 30-60 secondi per gli allarmi nelle estensioni pubblicate. In modalità sviluppatore, questo limite è spesso ignorato o ridotto per facilitare il testing.
- **Gestione Risorse:** Se una scheda viene chiusa manualmente, l'estensione pulisce automaticamente l'allarme associato per risparmiare memoria.

---

**Sviluppato con ❤️ per un browsing più efficiente.**

---
