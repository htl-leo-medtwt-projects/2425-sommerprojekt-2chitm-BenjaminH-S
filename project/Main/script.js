document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded!");

    // Elements
    const popup = document.getElementById("popup");
    const contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");

    // Load settings from URL parameters
    function loadSettingsFromURL() {
        const params = new URLSearchParams(window.location.search);
        const language = params.get("lang") || "de"; // Default to German
        const contrastMode = params.get("contrast") || "dark"; // Default to dark mode

        console.log(`Loaded settings from URL: lang=${language}, contrast=${contrastMode}`);
        applyLanguage(language);
        applyContrast(contrastMode);
    }

    // Update all links with current settings
    function updateLinks() {
        const language = document.documentElement.lang || "de";
        const contrastMode = document.body.classList.contains("light-mode") ? "light" : "dark";

        document.querySelectorAll("a").forEach(link => {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set("lang", language);
            url.searchParams.set("contrast", contrastMode);
            link.href = url.toString();
        });
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
        updateLinks(); // Update links with the new language
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
        updateLinks(); // Update links with the new contrast mode
    }

    // Add event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            console.log(`Language button clicked: ${selectedLang}`);
            applyLanguage(selectedLang);
        });
    });

    // Add event listener to contrast toggle
    if (contrastToggle) {
        contrastToggle.addEventListener("change", function () {
            const newContrast = contrastToggle.checked ? "light" : "dark";
            console.log(`Contrast toggle changed: ${newContrast}`);
            applyContrast(newContrast);
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

    // Load settings from URL and apply them
    loadSettingsFromURL();
});