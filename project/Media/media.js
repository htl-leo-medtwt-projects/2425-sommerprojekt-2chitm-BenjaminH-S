let mediaPreview;

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
            title: "Ep 1 – Ryomen Sukuna",
            description: "Yuji Itadori trifft auf ein verfluchtes Objekt.",
            video: "https://www.youtube.com/embed/example1"
        },
        {
            title: "Ep 2 – For Myself",
            description: "Yuji beginnt seine Ausbildung bei Jujutsu Tech.",
            video: "https://www.youtube.com/embed/example2"
        }
    ],
    "Season 2": [
        {
            title: "Ep 1 – Hidden Inventory",
            description: "Gojo und Geto auf einer Mission in der Vergangenheit.",
            video: "https://www.youtube.com/embed/example3"
        }
    ]
};

const movieData = [
    {
        title: "Jujutsu Kaisen 0 – The Movie",
        description: "Die Geschichte von Yuta Okkotsu vor den Hauptevents.",
        video: "https://www.youtube.com/embed/example4"
    }
];

function renderDetail(item) {
    const detail = document.getElementById("media-detail");
    detail.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
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

function renderEpisodes() {
    let html = '<h2>Seasons</h2>';
    for (const season in episodeData) {
        html += `<h3>${season}</h3><ul>`;
        episodeData[season].forEach((ep, index) => {
            html += `<li class="clickable" data-type="episode" data-season="${season}" data-index="${index}">${ep.title}</li>`;
        });
        html += '</ul>';
    }
    mediaPreview.innerHTML = html;
    mediaPreview.classList.remove("hidden");
    document.getElementById("media-detail").classList.add("hidden");
    attachClickEvents();
}

function renderMovies() {
    let html = '<h2>Movies</h2><ul>';
    movieData.forEach((movie, index) => {
        html += `<li class="clickable" data-type="movie" data-index="${index}">${movie.title}</li>`;
    });
    html += '</ul>';
    mediaPreview.innerHTML = html;
    mediaPreview.classList.remove("hidden");
    document.getElementById("media-detail").classList.add("hidden");
    attachClickEvents();
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
