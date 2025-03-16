document.addEventListener("DOMContentLoaded", function () {
    let popup = document.getElementById("popup");
    let contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");
    const savedLang = sessionStorage.getItem("language") || "de";
    const contrastMode = sessionStorage.getItem("contrastMode") || "dark";

    updateText(savedLang);
    document.documentElement.lang = savedLang;

    if (contrastMode === "light") {
        document.body.classList.add("light-mode");
        if (contrastToggle) contrastToggle.checked = true;
    } else {
        document.body.classList.remove("light-mode");
        if (contrastToggle) contrastToggle.checked = false;
    }

    function setLanguage(lang) {
        sessionStorage.setItem("language", lang);
        updateText(lang);
    }

    function updateText(lang) {
        if (lang === "de") {
            document.documentElement.lang = "de";
            document.getElementById("settings-title").textContent = "Einstellungen";
            document.getElementById("contrast-label").textContent = "Kontrast";
            document.getElementById("language-label").textContent = "Sprache";
        } else if (lang === "en") {
            document.documentElement.lang = "en";
            document.getElementById("settings-title").textContent = "Settings";
            document.getElementById("contrast-label").textContent = "Contrast";
            document.getElementById("language-label").textContent = "Language";
        }
    }

    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            setLanguage(this.getAttribute("data-lang"));
        });
    });

    function toggleContrast() {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.remove("light-mode");
            sessionStorage.setItem("contrastMode", "dark");
        } else {
            document.body.classList.add("light-mode");
            sessionStorage.setItem("contrastMode", "light");
        }
    }

    if (contrastToggle) contrastToggle.addEventListener("change", toggleContrast);

    function openOptions() {
        popup.style.display = "block";
    }

    function closeOptions() {
        popup.style.display = "none";
    }

    document.getElementById("rad").addEventListener("click", function (event) {
        event.preventDefault();
        openOptions();
    });

    document.querySelector(".close").addEventListener("click", closeOptions);
});
