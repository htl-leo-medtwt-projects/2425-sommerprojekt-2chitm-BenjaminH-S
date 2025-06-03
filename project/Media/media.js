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

    const langFromCookie = getCookie("language");
    if (langFromCookie) {
        currentLanguage = langFromCookie;
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

document.querySelectorAll('.flag-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        currentLanguage = selectedLang; 
        setCookie("language", selectedLang, 7);

        const activeSection = document.querySelector('.menu-item.active');
        if (activeSection) {
            const section = activeSection.getAttribute('data-section');
            renderContent(section); 
        }
    });
});

function renderContent(section) {
    if (section === "episodes") {
        renderEpisodes();
    } else if (section === "movie") {
        renderMovies();
    }
}


document.querySelectorAll('.menu-item').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const section = btn.getAttribute('data-section');
        renderContent(section);
    });
});


const episodeData = {
    "Season 1": [
        {
            title: { de: "Ryomen Sukuna", en: " Ryomen Sukuna" },
            description: {
                de: "Yuji Itadori trifft auf ein verfluchtes Objekt.",
                en: "Yuji Itadori encounters a cursed object."
            },
            video: "https://www.youtube.com/embed/1"
        },
        {
            title: { de: "Für mich selbst", en: "For Myself" },
            description: {
                de: "Yuji beginnt seine Ausbildung bei der Jujutsu-Schule.",
                en: "Yuji begins his training at Jujutsu High."
            },
            video: "https://www.youtube.com/embed/2"
        },
        {
            title: { de: "Mädchen aus Stahl", en: "Girl of Steel" },
            description: {
                de: "Kugisaki Nobara zeigt ihr Können.",
                en: "Nobara Kugisaki shows her skills."
            },
            video: "https://www.youtube.com/embed/3"
        },
        {
            title: { de: "Der unheilvolle Fluchschloss", en: "The ominous cursed castle" },
            description: {
                de: "Ein gefährlicher Fluch taucht auf.",
                en: "A dangerous curse emerges."
            },
            video: "https://www.youtube.com/embed/4"
        },
        {
            title: { de: "Der unheilvolle Fluchschloss, Teil 1", en: "The ominous cursed castle, Part 1" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Der unheilvolle Fluchschloss, Teil 2", en: "The ominous cursed castle, Part 2" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Nach dem Regen", en: "After the rain" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Überfall", en: "Raid" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Langeweile", en: "Boredom" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Kleingetier und Umkehrvergeltung", en: "Small animals and retaliation" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Ruhender Wandel", en: "Resting change" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Starrsinn", en: "Stubbornness" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "An dein zukünftiges Ich", en: "To the future me" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Bis morgen", en: "Until tomorrow" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Austausch mit der Kyoto Schwesterschule Wettkampf 0", en: "Kyoto Sister School Exchange Event Battle 0" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Austausch mit der Kyoto Schwesterschule Wettkampf 1", en: "Kyoto Sister School Exchange Event Battle 1" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Austausch mit der Kyoto Schwesterschule Wettkampf 2", en: "Kyoto Sister School Exchange Event Battle 2" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Austausch mit der Kyoto Schwesterschule Wettkampf 3", en: "Kyoto Sister School Exchange Event Battle 3" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Weiser", en: "Wiser" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Schwarzer Blitz", en: "Black Flash" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Nonstandard", en: "Non-Standard" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Jujutsu Koshien", en: "Jujutsu Koshien" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Der Ursprung des blinden Gehorsams", en: "The origin of blind obedience" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Der Ursprung des blinden Gehorsams 2", en: "The origin of blind obedience 2" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
        {
            title: { de: "Mittäterschaft", en: "Complicity" },
            description: {
                de: "Yuji trifft eine schwere Entscheidung.",
                en: "Yuji makes a hard choice."
            },
            video: "https://www.youtube.com/embed/5"
        },
    ],

    "Season 2": [
        {
            title: { de: "Der versteckte Schatz, Teil 1", en: "The Hidden Treasure, Part 1" },
            description: {
                de: "Gojo und Geto auf einer Mission in der Vergangenheit.",
                en: "Gojo and Geto go on a mission in the past."
            },
            video: "https://www.youtube.com/embed/21"
        },
        {
            title: { de: "Der versteckte Schatz, Teil 2", en: "The Hidden Treasure, Part 2" },
            description: {
                de: "Ein tragisches Ereignis verändert alles.",
                en: "A tragic event changes everything."
            },
            video: "https://www.youtube.com/embed/22"
        },
        {
            title: { de: "Der versteckte Schatz, Teil 3", en: "The Hidden Treasure, Part 3" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Der versteckte Schatz, Teil 4", en: "The Hidden Treasure, Part 4" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Verfrühter Tod", en: "Premature Death" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Es ist so", en: "It's like that" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Abendsfest", en: "Evening Festival" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Der Shibuya Vorfall", en: "The Shibuya Incident" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Shibuya Vorfall - Tor öffne", en: "Shibuya Incident - Gate open" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Pandemonium", en: "Schwankungen" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Seance", en: "Seance" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Unverblümtes Messer", en: "Blunt Knife" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Rote Skala", en: "Red Scale" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Schwankungen", en: "Fluctuations" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Schwankungen Teil 2", en: "Fluctuations, Part 2 " },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Donnerschlag", en: "Thunderclap" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Donnerschlag Teil 2", en: "Thunderclap Part 2" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Richtig und Falsch", en: "Right And Wrong" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Richtig und Falsch Teil 2", en: "Right And Wrong Part 2" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Richtig und Falsch Teil 3", en: "Right And Wrong Part 3" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Metamorphosis", en: "Metamorphosis" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Metamorphosis Teil 2", en: "Metamorphosis Part 2" },
            description: {
                de: "Der Shibuya-Bogen beginnt.",
                en: "The Shibuya arc begins."
            },
            video: "https://www.youtube.com/embed/23"
        },
        {
            title: { de: "Shibuya Vorfall: Tor geschlossen", en: "Shibuya Incident: Gate closed" },
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
    mediaPreview.innerHTML = `<h2>${currentLanguage === "de" ? "Staffeln" : "Seasons"}</h2>`;
    for (const season in episodeData) {
        mediaPreview.innerHTML += `<h3>${season}</h3>`;
        episodeData[season].forEach((ep, index) => {
            const title = ep.title[currentLanguage];
            mediaPreview.innerHTML += `<li class="clickable" data-type="episode" data-season="${season}" data-index="${index}">${title}</li>`;
        });
    }
    mediaPreview.classList.remove("hidden");
    document.getElementById("media-detail").classList.add("hidden");
    attachClickEvents();
}

function renderMovies() {
    mediaPreview.innerHTML = `<h2>${currentLanguage === "de" ? "Filme" : "Movies"}</h2>`;
    movieData.forEach((movie, index) => {
        const title = movie.title[currentLanguage];
        mediaPreview.innerHTML += `<li class="clickable" data-type="movie" data-index="${index}">${title}</li>`;
    });
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

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('contrast-toggle');
    toggle.addEventListener('change', function () {
        document.body.classList.toggle('light-mode', toggle.checked);
    });
});
