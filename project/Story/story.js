document.addEventListener("DOMContentLoaded", function () {
    let popup = document.getElementById("popup");
    let contrastToggle = document.getElementById("contrast-toggle");

    const langButtons = document.querySelectorAll(".flag-btn");
    const currentLang = localStorage.getItem("language") || "de";

    function setLanguage(lang) {
        localStorage.setItem("language", lang);
        updateText(lang);
    }

    function updateText(lang) {
        if (lang == "de") {
            document.documentElement.lang = "de";
            document.getElementById("settings-title").textContent = "Einstellungen";
            document.getElementById("contrast-label").textContent = "Kontrast";
            document.getElementById("language-label").textContent = "Sprache";
            document.getElementById("mediales").textContent = "Mediales";
            document.getElementById("welt").textContent = "Welt";
            document.getElementById("quiz").textContent = "Quiz";
            document.getElementById("geschichte").textContent = "Geschichte";
        } else if (lang == "en") {
            document.documentElement.lang = "en";
            document.getElementById("settings-title").textContent = "Settings";
            document.getElementById("contrast-label").textContent = "Contrast";
            document.getElementById("language-label").textContent = "Language";
            document.getElementById("mediales").textContent = "Media";
            document.getElementById("welt").textContent = "World";
            document.getElementById("quiz").textContent = "Quiz";
            document.getElementById("geschichte").textContent = "Story";
        }
    }

    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            setLanguage(selectedLang);
        });
    });

    updateText(currentLang);


    function toggleContrast() {
        if (document.body.classList.contains("light-mode")) {
            document.body.classList.remove("light-mode");
            localStorage.setItem("contrastMode", "dark");
        } else {
            document.body.classList.add("light-mode");
            localStorage.setItem("contrastMode", "light");
        }
    }

    if (localStorage.getItem("contrastMode") === "light") {
        document.body.classList.add("light-mode");
        contrastToggle.checked = true;
    }

    contrastToggle.addEventListener("change", toggleContrast);

    
    function Options() {
        popup.style.display = "block";
    }

    function closeOptions() {
        popup.style.display = "none";
    }

    document.getElementById("rad").addEventListener("click", function (event) {
        event.preventDefault();
        Options();
    });

    document.querySelector(".close").addEventListener("click", closeOptions);
});
