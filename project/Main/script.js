document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded!");

    let popup = document.getElementById("popup");
    let contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");

    // Initialize BroadcastChannel
    let channel;
    try {
        channel = new BroadcastChannel("settings_channel");
        console.log("BroadcastChannel initialized.");
    } catch (error) {
        console.error("BroadcastChannel not supported:", error);
    }

    // Load language from localStorage and apply it
    function loadLanguage() {
        const storedLang = localStorage.getItem("language") || "de";
        console.log(`Loaded language from localStorage: ${storedLang}`);
        applyLanguage(storedLang);
    }

    // Save language to localStorage and notify other pages
    function setLanguage(lang) {
        localStorage.setItem("language", lang);
        console.log(`Language saved: ${lang}`);
        applyLanguage(lang);
        if (channel) {
            channel.postMessage({ type: "language", value: lang });
        }
    }

    // Apply language settings
    function applyLanguage(lang) {
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

        document.documentElement.lang = lang;
    }

    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            console.log(`Language button clicked: ${selectedLang}`);
            setLanguage(selectedLang);
        });
    });

    // Load contrast mode from localStorage and apply it
    function loadContrast() {
        const storedContrast = localStorage.getItem("contrastMode") || "dark";
        console.log(`Loaded contrast mode from localStorage: ${storedContrast}`);
        applyContrast(storedContrast);
    }

    // Save contrast mode to localStorage and notify other pages
    function toggleContrast() {
        const newContrast = document.body.classList.contains("light-mode") ? "dark" : "light";
        localStorage.setItem("contrastMode", newContrast);
        console.log(`Contrast mode saved: ${newContrast}`);
        applyContrast(newContrast);

        if (channel) {
            channel.postMessage({ type: "contrast", value: newContrast });
        }
    }

    // Apply contrast settings
    function applyContrast(mode) {
        if (mode === "light") {
            document.body.classList.add("light-mode");
            if (contrastToggle) contrastToggle.checked = true;
        } else {
            document.body.classList.remove("light-mode");
            if (contrastToggle) contrastToggle.checked = false;
        }
    }

    // Add event listener to contrast toggle
    if (contrastToggle) {
        contrastToggle.addEventListener("change", function () {
            console.log("Contrast toggle changed!");
            toggleContrast();
        });
    }

    // Load initial settings
    loadLanguage();
    loadContrast();

    // Listen for messages from other pages
    if (channel) {
        channel.onmessage = function (event) {
            console.log("Message received:", event.data);
            if (event.data.type === "language") {
                console.log(`Language changed to: ${event.data.value}`);
                applyLanguage(event.data.value);
            }
            if (event.data.type === "contrast") {
                console.log(`Contrast mode changed to: ${event.data.value}`);
                applyContrast(event.data.value);
            }
        };
    }
});