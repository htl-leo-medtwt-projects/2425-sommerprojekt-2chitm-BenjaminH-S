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
            if (navBar) navBar.style.backgroundColor = "black";
            if (navItems) {
                navItems.forEach((item, index) => {
                    item.style.borderRight = "4px solid white";
                    if (index === 0) item.style.borderLeft = "4px solid white";
                });
            }
            if (settingsBox) settingsBox.style.backgroundColor = "white";
            if (searchBar) searchBar.style.backgroundColor = "white";
            if (StoryPage) document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Light.jpeg')";
        } else {
            document.body.classList.remove("light-mode");
            if (contrastToggle) contrastToggle.checked = false;
            if (navBar) navBar.style.backgroundColor = "#b82f10";
            if (navItems) {
                navItems.forEach((item, index) => {
                    item.style.borderRight = "4px solid black";
                    if (index === 0) item.style.borderLeft = "4px solid black";
                });
            }
            if (settingsBox) settingsBox.style.backgroundColor = "#b82f10";
            if (searchBar) {
                searchBar.style.backgroundColor = "#932810";
                searchBar.style.color = "black";
            }
            if (StoryPage) document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Dark.png')";
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

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const timelineData = [
        {
            title: "Gojo & Geto als Schüler",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Gojo und Geto sollen Riko Amanai schützen, das Star Plasma Vessel – die Welt hängt an ihrem Leben.",
            img: "../Img/Story/gojo_geto_youth.jpg",
            trivia: "Geto und Gojo galten als unbesiegbares Duo – bis sie auf Toji trafen."
        },
        {
            title: "Toji tötet Riko Amanai",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Toji Fushiguro bricht die Schutzbarriere und erschießt Riko Amanai – vor Getos Augen.",
            img: "../Img/Story/toji_kills_riko.jpg",
            trivia: "Toji besitzt keine Fluchenergie, aber sein Körper ist ein Tempel für verfluchte Werkzeuge."
        },
        {
            title: "Gojo erweckt 'Red' & 'Infinity'",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Verletzt, aber lebendig – Gojo entdeckt Reversed Cursed Technique & kombiniert Red + Blue.",
            img: "../Img/Story/gojo_awakened.jpg",
            trivia: "Gojo ist der erste Jujutsuzauberer, der gleichzeitig 'Limitless' & 'Reversed Cursed Energy' gemeistert hat."
        },
        {
            title: "Gojo tötet Toji",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Nach der Wiederauferstehung tötet Gojo Toji mit 'Hollow Purple' – ein Meisterwerk der Technik.",
            trivia: "Gojo ist der erste Jujutsuzauberer, der gleichzeitig 'Limitless' & 'Reversed Cursed Energy' gemeistert hat."
        },
        {
            title: "Getos Fall",
            year: 2007,
            arc: "Hidden Inventory",
            desc: "Nach Riko Amanais Tod verliert Geto den Glauben an Menschen – seine dunkle Wandlung beginnt.",
            img: "../Img/Story/geto_fall.jpg",
            trivia: "Geto sagte: 'Die Welt braucht nur Jujuzisten.' Danach tötete er über 100 Zivilisten."
        },
        {
            title: "Yuji trifft Sukuna",
            year: 2018,
            arc: "Einführung",
            desc: "Yuji Itadori verschluckt Sukunas Finger und wird das Gefäß für den König der Flüche.",
            img: "../Img/Story/yuji_sukuna.jpg",
            trivia: "Sukuna hat ursprünglich 4 Arme und 2 Gesichter in seiner echten Form."
        },
        {
            title: "Eintritt in die Jujutsu Schule",
            year: 2018,
            arc: "Jujutsu High",
            desc: "Yuji, Megumi und Nobara starten ihre Ausbildung und treffen Satoru Gojo.",
            img: "../Img/Story/gojo_intro.jpg",
            trivia: "Gojo ist der erste in 100 Jahren, der mit der Sechs-Augen-Technik geboren wurde."
        },
        {
            title: "Kyoto Goodwill Event",
            year: 2018,
            arc: "Kyoto Turnier",
            desc: "Die beiden Schulen treten gegeneinander an. Panda & Todo zeigen ihre Stärke.",
            img: "../Img/Story/kyoto_event.jpg",
            trivia: "Aoi Todo ist ein Idol-Fan – sein Lieblings-Typ bei Frauen ist 'hoch mit großem Hintern'."
        },
        {
            title: "Shibuya Incident",
            year: 2018,
            arc: "Shibuya",
            desc: "Gojo wird versiegelt. Sukuna richtet Massaker an. Nanami stirbt.",
            img: "../Img/Story/shibuya.jpg",
            trivia: "Sukuna tötet über 1000 Menschen in wenigen Minuten – mit nur einem Finger!"
        },
        {
            title: "Culling Game",
            year: 2018,
            arc: "Culling Game",
            desc: "Ein tödliches Spiel beginnt. Yuji, Megumi & Kinji kämpfen gegen Zeit und Regeln.",
            img: "../Img/Story/culling.jpg",
            trivia: "Hakari kann durch sein Domain-Glücksspiel für 4:11 Minuten unsterblich sein."
        },
        {
            title: "Gojo vs Sukuna beginnt",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Gojo tritt gegen den König der Flüche an – Sukuna im Körper von Megumi, mit Mahoraga in petto.",
            img: "../Img/Story/shinjuku_start.jpg",
            trivia: "Ihr Kampf erschütterte die Realität – ganze Stadtteile verschwanden in Sekunden."
        },
        {
            title: "Gojo stirbt",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Sukuna trickst Gojo mit Mahoragas Adaption aus und durchtrennt ihn komplett.",
            img: "../Img/Story/gojo_dead.jpg",
            trivia: "Seine letzten Worte waren über Toji – ein Hinweis, dass er nicht in Frieden geht."
        }
    ];

    const container = document.createElement("div");
    container.id = "roadmap";
    document.body.appendChild(container);

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Suche nach Arc oder Jahr...";
    searchInput.id = "searchBox";
    document.body.insertBefore(searchInput, container);

    const triviaBox = document.createElement("div");
    triviaBox.id = "triviaBox";
    document.body.appendChild(triviaBox);

    timelineData.forEach((event, index) => {
        const node = document.createElement("div");
        node.className = "roadmap-node";
        node.innerHTML = `
            <div class="dot" data-index="${index}"></div>
            <div class="label">${event.year}<br><strong>${event.title}</strong></div>
            <div class="desc hidden">
                <img src="${event.img}" alt="${event.title}" class="event-img"/>
                <p>${event.desc}</p>
                <button class="trivia-btn">Wusstest du schon?</button>
                <audio id="sound-${index}" src="${event.sound}"></audio>
            </div>
        `;
        container.appendChild(node);
    });

    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            document.querySelectorAll(".desc").forEach(d => d.classList.add("hidden"));
            document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
            dot.classList.add("active");

            const descBox = document.querySelectorAll(".desc")[idx];
            descBox.classList.remove("hidden");

            const audio = document.getElementById(`sound-${idx}`);
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        });
    });

    document.querySelectorAll(".trivia-btn").forEach((btn, idx) => {
        btn.addEventListener("click", () => {
            triviaBox.innerHTML = `<strong>Trivia:</strong> ${timelineData[idx].trivia}`;
            triviaBox.classList.add("show");
        });
    });

    searchInput.addEventListener("input", () => {
        const val = searchInput.value.toLowerCase();
        document.querySelectorAll(".roadmap-node").forEach((node, idx) => {
            const item = timelineData[idx];
            if (
                item.title.toLowerCase().includes(val) ||
                item.arc.toLowerCase().includes(val) ||
                item.year.toString().includes(val)
            ) {
                node.style.display = "flex";
            } else {
                node.style.display = "none";
            }
        });
    });
});





