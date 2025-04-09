document.addEventListener("DOMContentLoaded", function () {
    console.log("JS geladen");

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
                "quiz": "Quiz",
                "geschichte": "Geschichte",
                "clans": "Clans",
                "curses": "Flüche",
                "characters": "Charaktere",
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "Quiz",
                "geschichte": "Story",
                "clans": "Clans",
                "curses": "Curses",
                "characters": "Characters",
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
        const quizPage = window.location.pathname.includes("Quiz/quiz.html");

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

            if (quizPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Quiz_Light.jpg')";
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

            if (quizPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Quiz_Dark.jpg')";
            }
        }
    }

    function showOptions() {
        if (popup) popup.classList.remove("hidden");
    }

    function closeOptions() {
        if (popup) popup.classList.add("hidden");
    }

    window.closeOptions = closeOptions;

    langButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");
            applyLanguage(selectedLang);
            setCookie("language", selectedLang, 7);
        });
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            langButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    if (contrastToggle) {
        contrastToggle.addEventListener("change", function () {
            const newContrast = contrastToggle.checked ? "light" : "dark";
            applyContrast(newContrast);
            setCookie("contrastMode", newContrast, 7);
        });
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

    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener('click', () => {
            const section = button.getAttribute('data-section');
            document.querySelectorAll('.content-section').forEach(div => div.classList.add('hidden'));
            const target = document.getElementById(section);
            if (target) target.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.clan-btn').forEach(button => {
        button.addEventListener('click', () => {
            const clanName = button.getAttribute('data-clan');
            const clanDetails = {
                "Gojo": "Details über den Gojo-Clan...",
                "Zenin": "Details über den Zenin-Clan...",
                "Kamo": "Details über den Kamo-Clan..."
            };

            const description = document.getElementById("clan-description");
            if (description) {
                description.textContent = clanDetails[clanName] || "Keine Details verfügbar.";
            }

            document.querySelectorAll('.clan-img').forEach(img => img.classList.add('hidden'));
            const clanImg = document.getElementById(`${clanName.toLowerCase()}-img`);
            if (clanImg) clanImg.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.curse-btn').forEach(button => {
        button.addEventListener('click', () => {
            const curseName = button.getAttribute('data-curse');
            const curseDetails = {
                "Jogo": "Details über Jogo...",
                "Hanami": "Details über Hanami...",
                "Mahito": "Details über Mahito...",
                "Dagon": "Details über Dagon...",
                "Sukuna": "Details über Sukuna..."
            };

            const description = document.getElementById("curse-description");
            if (description) {
                description.textContent = curseDetails[curseName] || "Keine Details verfügbar.";
            }

            document.querySelectorAll('.curse-img').forEach(img => img.classList.add('hidden'));
            const curseImg = document.getElementById(`${curseName.toLowerCase()}-img`);
            if (curseImg) curseImg.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.character-img').forEach(image => {
        image.addEventListener('click', () => {
            document.querySelectorAll('.character-img').forEach(img => img.classList.remove('highlight'));
            image.classList.add('highlight');
        });
    });

    loadSettings();
});