document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded!");

    const popup = document.getElementById("popup");
    const contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");


    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    // Load settings from cookies
    function loadSettings() {
        const language = getCookie("language") || "de"; 
        const contrastMode = getCookie("contrastMode") || "dark"; 

        console.log(`Loaded settings from cookies: lang=${language}, contrast=${contrastMode}`);
        applyLanguage(language);
        applyContrast(contrastMode);
    }

    // Apply language settings
    function applyLanguage(lang) {
        console.log(`Applying language: ${lang}`);
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

        document.documentElement.lang = lang; // Update the <html> lang attribute
    }

    // Apply contrast settings
    function applyContrast(mode) {
        console.log(`Applying contrast mode: ${mode}`);
        if (mode === "light") {
            document.body.classList.add("light-mode");
            if (contrastToggle) contrastToggle.checked = true;
        } else {
            document.body.classList.remove("light-mode");
            if (contrastToggle) contrastToggle.checked = false;
        }
    }

    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            console.log(`Language button clicked: ${selectedLang}`);
            applyLanguage(selectedLang);
            setCookie("language", selectedLang, 7); // Save to cookies
        });
    });

    // Add event listener to contrast toggle
    if (contrastToggle) {
        contrastToggle.addEventListener("change", function () {
            const newContrast = contrastToggle.checked ? "light" : "dark";
            console.log(`Contrast toggle changed: ${newContrast}`);
            applyContrast(newContrast);
            setCookie("contrastMode", newContrast, 7); // Save to cookies
        });
    }

    // Show and hide the settings popup
    function showOptions() {
        console.log("Showing options...");
        if (popup) popup.classList.remove("hidden");
    }

    function closeOptions() {
        console.log("Closing options...");
        if (popup) popup.classList.add("hidden");
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

    // Load settings on page load
    loadSettings();
});