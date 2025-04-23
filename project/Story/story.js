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

    function applyContrast(mode) {
        const navBar = document.querySelector("ul");
        const navItems = document.querySelectorAll("ul li");
        const settingsIcon = document.getElementById("rad");
        const settingsBox = document.getElementById("popup");
        const searchBar = document.querySelector('input[type="text"]'); 
        const StoryPage = window.location.pathname.includes("Story/story.html");
    
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
    
            if (StoryPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Light.jpeg')";
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
    
            if (StoryPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Dark.png')";
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

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    const arcDots = document.querySelectorAll('.arc');
    const arcSections = document.querySelectorAll('.arc-section');
    const mainArcContainer = document.getElementById('main-arcs');

    arcDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            mainArcContainer.style.display = 'none';
            arcSections.forEach(section => section.classList.add('hidden'));
            targetSection.classList.remove('hidden');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            arcSections.forEach(section => section.classList.add('hidden'));
            mainArcContainer.style.display = 'flex';
            mainArcContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
