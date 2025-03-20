document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js wurde geladen!");

    let popup = document.getElementById("popup");
    let contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");

    // 🔹 BroadcastChannel für ALLE Seiten erstellen
    const channel = new BroadcastChannel("settings_channel");

    // 🔹 SPRACHE LADEN
    function loadLanguage() {
        const storedLang = localStorage.getItem("language") || "de"; 
        console.log(`Geladene Sprache aus localStorage: ${storedLang}`);  // Debugging
        updateText(storedLang);
        document.documentElement.lang = storedLang;
    }

    function setLanguage(lang) {
        localStorage.setItem("language", lang);
        console.log(`Sprache gespeichert: ${lang}`); // Debugging
        updateText(lang);
        channel.postMessage({ type: "language", value: lang });
    }

    function updateText(lang) {
        console.log(`Text wird auf Sprache ${lang} aktualisiert...`); // Debugging
        const translations = {
            "de": {
                "settings-title": "Einstellungen",
                "contrast-label": "Kontrast",
                "language-label": "Sprache",
                "mediales": "Mediales",
                "welt": "Welt",
                "quiz": "Quiz",
                "geschichte": "Geschichte"
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "Quiz",
                "geschichte": "Story"
            }
        };

        Object.keys(translations[lang]).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = translations[lang][id];
            }
        });
    }

    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            setLanguage(selectedLang);
        });
    });

    // 🔹 KONTRASTMODUS LADEN
    function loadContrast() {
        const storedContrast = localStorage.getItem("contrastMode") || "dark";
        if (storedContrast === "light") {
            document.body.classList.add("light-mode");
            if (contrastToggle) contrastToggle.checked = true;
        } else {
            document.body.classList.remove("light-mode");
        }
        console.log(`Gespeicherter Kontrastmodus: ${storedContrast}`);
    }

    function toggleContrast() {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.remove("light-mode");
            localStorage.setItem("contrastMode", "dark");
        } else {
            document.body.classList.add("light-mode");
            localStorage.setItem("contrastMode", "light");
        }
        console.log(`Neuer Kontrastmodus: ${localStorage.getItem("contrastMode")}`);

        // 🔥 ÄNDERUNG AN ALLE SEITEN SENDEN
        channel.postMessage({ type: "contrast", value: localStorage.getItem("contrastMode") });
    }

    if (contrastToggle) {
        contrastToggle.addEventListener("change", toggleContrast);
    }

    // 🔹 SPRACHE & KONTRASTMODUS DIREKT LADEN
    loadLanguage();
    loadContrast();

    // 🔥 ÄNDERUNGEN IN ECHTZEIT AN ALLE SEITEN SENDEN
    channel.onmessage = function (event) {
        console.log("Nachricht empfangen:", event.data); // Debugging
        if (event.data.type === "language") {
            console.log(`Sprache geändert auf ${event.data.value}, Update auf dieser Seite!`);
            updateText(event.data.value);
            document.documentElement.lang = event.data.value;
        }
        if (event.data.type === "contrast") {
            console.log(`Kontrastmodus geändert auf ${event.data.value}, Update auf dieser Seite!`);
            loadContrast();
        }
    };

    // 🔹 POPUP-STEUERUNG
    function showOptions() {
        if (popup) popup.style.display = "block";
    }

    function closeOptions() {
        if (popup) popup.style.display = "none";
    }

    const settingsButton = document.getElementById("rad");
    if (settingsButton) {
        settingsButton.addEventListener("click", function (event) {
            event.preventDefault();
            showOptions();
        });
    }

    const closeButton = document.querySelector(".close");
    if (closeButton) {
        closeButton.addEventListener("click", closeOptions);
    }
});
