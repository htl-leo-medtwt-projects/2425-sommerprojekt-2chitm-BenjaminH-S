document.addEventListener("DOMContentLoaded", function () {
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
        if (parts.length == 2) return parts.pop().split(";").shift();
        return null;
    }

    function loadSettings() {
        const language = getCookie("language") || "de";
        const contrastMode = getCookie("contrastMode") || "dark";
        applyLanguage(language);
        applyContrast(contrastMode);
    }

    function applyLanguage(lang) {
        const translations = {
            "de": {
                "settings-title": "Einstellungen",
                "contrast-label": "Kontrast",
                "language-label": "Sprache",
                "mediales": "Mediales",
                "welt": "Welt",
                "quiz": "FunHub",
                "geschichte": "Geschichte"
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "FunHub",
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

    function applyContrast(mode) {
    const navBar = document.querySelector("ul");
    const navItems = document.querySelectorAll("ul li");
    const settingsIcon = document.getElementById("rad");
    const settingsBox = document.getElementById("popup");
    const searchBar = document.querySelector('input[type="text"]');
    const MainPage = window.location.pathname.includes("Main/main.html");
    const cards = document.querySelectorAll(".card"); // Füge dies hinzu

    if (mode === "light") {
        document.body.classList.add("light-mode");
        if (contrastToggle) contrastToggle.checked = true;

        if (navBar) {
            navBar.style.backgroundColor = "black";
            navBar.style.color = "white";
        }

        if (navItems) {
            navItems.forEach((item, index) => {
                item.style.borderRight = "4px solid white";
                if (index === 0) {
                    item.style.borderLeft = "4px solid white";
                } else {
                    item.style.borderLeft = "none";
                }
            });
        }

        if (settingsIcon) {
            settingsIcon.style.borderLeft = "none";
            settingsIcon.style.borderRight = "none";
        }

        if (settingsBox) {
            settingsBox.style.backgroundColor = "white";
        }

        if (searchBar) {
            searchBar.style.backgroundColor = "white";
        }

        if (MainPage) {
            document.body.style.backgroundImage = "url('../Img/Backgrounds/Main_Light.png')";
        }

        // Boxen weiß im Light-Mode
        if (cards) {
            cards.forEach(card => {
                card.style.backgroundColor = "white";
                card.style.color = "black";
            });
        }

    } else {
        document.body.classList.remove("light-mode");
        if (contrastToggle) contrastToggle.checked = false;

        if (navBar) {
            navBar.style.backgroundColor = "#b82f10";
            navBar.style.color = "black";
        }

        if (navItems) {
            navItems.forEach((item, index) => {
                item.style.borderRight = "4px solid black";
                if (index === 0) {
                    item.style.borderLeft = "4px solid black";
                } else {
                    item.style.borderLeft = "none";
                }
            });
        }

        if (settingsIcon) {
            settingsIcon.style.borderLeft = "none";
            settingsIcon.style.borderRight = "none";
        }

        if (settingsBox) {
            settingsBox.style.backgroundColor = "#b82f10";
            settingsBox.style.color = "black";
        }

        if (searchBar) {
            searchBar.style.backgroundColor = "#932810";
            searchBar.style.color = "black";
        }

        if (MainPage) {
            document.body.style.backgroundImage = "url('../Img/Backgrounds/Main_Dark.jpg')";
        }

        // Boxen orange im Dark-Mode
        if (cards) {
            cards.forEach(card => {
                card.style.backgroundColor = "#ff6600";
                card.style.color = "black";
            });
        }
    }
}

    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            applyLanguage(selectedLang);
            setCookie("language", selectedLang, 7);
        });
    });

    if (contrastToggle) {
        contrastToggle.addEventListener("change", function () {
            const newContrast = contrastToggle.checked ? "light" : "dark";
            applyContrast(newContrast);
            setCookie("contrastMode", newContrast, 7);
        });
    }

    function showOptions() {
        if (popup) popup.classList.remove("hidden");
    }

    function closeOptions() {
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

    loadSettings();
});

document.querySelectorAll('.flag-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.flag-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('input[type="text"]');
    const suggestionsBox = document.getElementById("suggestions");

    const pages = [
        { label: "Mediales", url: "../Media/media.html" },
        { label: "Welt", url: "../World/world.html" },
        { label: "FunHub", url: "../Quiz/quiz.html" },
        { label: "Geschichte", url: "../Story/story.html" },
        { label: "Aoi Todo", url: "../World/world.html#aoi" },
        { label: "Aoi Todo/Geschichte", url: "../Story/story.html#aoi" }
    ];

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase().trim();
        suggestionsBox.innerHTML = "";

        if (!query) {
            suggestionsBox.classList.add("hidden");
            return;
        }

        const matches = pages.filter(page =>
            page.label.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
            suggestionsBox.classList.remove("hidden");
            matches.forEach(match => {
                const item = document.createElement("div");
                item.textContent = match.label;
                item.addEventListener("click", () => {
                    window.location.href = match.url;
                });
                suggestionsBox.appendChild(item);
            });
        } else {
            suggestionsBox.classList.add("hidden");
        }
    });

    document.addEventListener("click", function (e) {
        if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
            suggestionsBox.classList.add("hidden");
        }
    });

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const query = searchInput.value.toLowerCase().trim();
            const match = pages.find(page =>
                page.label.toLowerCase().includes(query)
            );
            if (match) {
                window.location.href = match.url;
            } else {
                alert("Keine passende Seite gefunden.");
            }
        }
    });
});

