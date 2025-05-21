let mediaPreview;
let currentLanguage = 'de';

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
                "geschichte": "Geschichte",
                "episodes" : "Episoden",
                "movie" : "Film"
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "Quiz",
                "geschichte": "Story",
                "episodes" : "Episodes",
                "movie" : "Movie"
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

const episodeData = {
    "Season 1": [
        {
            title: { de: "Ep 1 – Ryomen Sukuna", en: "Ep 1 – Ryomen Sukuna" },
            description: {
                de: "Yuji Itadori trifft auf ein verfluchtes Objekt.",
                en: "Yuji Itadori encounters a cursed object."
            },
            video: "https://www.youtube.com/embed/1"
        },
        {
            title: { de: "Ep 2 – Für mich selbst", en: "Ep 2 – For Myself" },
            description: {
                de: "Yuji beginnt seine Ausbildung bei der Jujutsu-Schule.",
                en: "Yuji begins his training at Jujutsu High."
            },
            video: "https://www.youtube.com/embed/2"
        },
        {
            title: { de: "Ep 3 – Mädchen aus Stahl", en: "Ep 3 – Girl of Steel" },
            description: {
                de: "Kugisaki Nobara zeigt ihr Können.",
                en: "Nobara Kugisaki shows her skills."
            },
            video: "https://www.youtube.com/embed/3"
        },
        {
            title: { de: "Ep 4 – Verfluchte Womb", en: "Ep 4 – Cursed Womb" },
            description: {
                de: "Ein gefährlicher Fluch taucht auf.",
                en: "A dangerous curse emerges."
            },
            video: "https://www.youtube.com/embed/4"
        },
        {
            title: { de: "Ep 5 – Rückblick", en: "Ep 5 – Detention" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },

    ],
    "Season 2": [
        {
            title: { de: "Ep 1 – Geheimes Inventar", en: "Ep 1 – Hidden Inventory" },
            description: {
                de: "Gojo und Geto auf einer Mission in der Vergangenheit.",
                en: "Gojo and Geto go on a mission in the past."
            },
            video: "https://www.youtube.com/embed/21"
        },
        {
            title: { de: "Ep 2 – Früher Tod", en: "Ep 2 – Premature Death" },
            description: {
                de: "Ein tragisches Ereignis verändert alles.",
                en: "A tragic event changes everything."
            },
            video: "https://www.youtube.com/embed/22"
        },
        {
            title: { de: "Ep 3 – Shibuya Vorfall", en: "Ep 3 – Shibuya Incident" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        }

    ]
};

const movieData = [
    {
        title: { de: "Jujutsu Kaisen 0 – Der Film", en: "Jujutsu Kaisen 0 – The Movie" },
        description: {
            de: "Die Geschichte von Yuta Okkotsu vor der Hauptserie.",
            en: "The story of Yuta Okkotsu before the main series."
        },
        video: "https://www.youtube.com/embed/99"
    }
];


function renderEpisodes() {
    mediaPreview.innerHTML = '<h2>Seasons</h2>';
    for (const season in episodeData) {
        mediaPreview.innerHTML += `<h3>${season}</h3><ul>`;
        episodeData[season].forEach((ep, index) => {
            const title = ep.title[currentLanguage];
            mediaPreview.innerHTML += `<li class="clickable" data-type="episode" data-season="${season}" data-index="${index}">${title}</li>`;
        });
        mediaPreview.innerHTML += '</ul>';
    }
    mediaPreview.classList.remove("hidden");
    document.getElementById("media-detail").classList.add("hidden");
    attachClickEvents();
}

function renderMovies() {
    mediaPreview.innerHTML = '<h2>Movies</h2><ul>';
    movieData.forEach((movie, index) => {
        const title = movie.title[currentLanguage];
        mediaPreview.innerHTML += `<li class="clickable" data-type="movie" data-index="${index}">${title}</li>`;
    });
    mediaPreview.innerHTML += '</ul>';
    mediaPreview.classList.remove("hidden");
    document.getElementById("media-detail").classList.add("hidden");
    attachClickEvents();
}

function renderDetail(item) {
    const detail = document.getElementById("media-detail");
    const title = item.title[currentLanguage];
    const description = item.description[currentLanguage];
    detail.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe src="${item.video}" 
                    frameborder="0" 
                    allowfullscreen 
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            </iframe>
        </div>
    `;
    detail.classList.remove("hidden");
}


function attachClickEvents() {
    document.querySelectorAll('.clickable').forEach(item => {
        item.addEventListener("click", () => {
            const type = item.getAttribute("data-type");
            if (type === "episode") {
                const season = item.getAttribute("data-season");
                const index = item.getAttribute("data-index");
                renderDetail(episodeData[season][index]);
            } else if (type === "movie") {
                const index = item.getAttribute("data-index");
                renderDetail(movieData[index]);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    mediaPreview = document.getElementById("media-preview");

    document.querySelectorAll('.menu-item').forEach(button => {
        button.addEventListener("click", () => {
            const section = button.getAttribute("data-section");
            if (section === "episodes") {
                renderEpisodes();
            } else if (section === "movie") {
                renderMovies();
            }
        });
    });
});
