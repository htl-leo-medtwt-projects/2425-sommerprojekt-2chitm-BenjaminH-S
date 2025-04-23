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

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    const timelineData = [
        {
            title: "Yuji trifft Sukuna",
            year: 2018,
            arc: "Einführung",
            desc: "Yuji Itadori verschluckt Sukunas Finger und wird das Gefäß für den König der Flüche."
        },
        {
            title: "Jujutsu Schule",
            year: 2019,
            arc: "Tokyo Jujutsu High",
            desc: "Yuji, Megumi und Nobara bilden ein Team und lernen über Flüche, Lehrer und Techniken."
        },
        {
            title: "Kyoto Turnier",
            year: 2020,
            arc: "Kyoto Goodwill Event",
            desc: "Freundschaftsturnier zwischen Tokyo & Kyoto. Konflikte, Techniken, Intrigen."
        },
        {
            title: "Shibuya Incident",
            year: 2021,
            arc: "Shibuya",
            desc: "Gojo wird versiegelt. Massive Zerstörung. Sukuna tötet hunderte – Tokyo ist im Chaos."
        },
        {
            title: "Culling Game",
            year: 2022,
            arc: "Culling Game",
            desc: "Yuji, Megumi & Co kämpfen um Regeln, Leben und Zukunft in einem tödlichen Spiel."
        }
    ];

    const container = document.createElement("div");
    container.id = "roadmap";
    document.body.appendChild(container);

    timelineData.forEach((event, index) => {
        const node = document.createElement("div");
        node.className = "roadmap-node";
        node.innerHTML = `
            <div class="dot" data-index="${index}"></div>
            <div class="label">${event.year}<br><strong>${event.title}</strong></div>
            <div class="desc hidden">${event.desc}</div>
        `;
        container.appendChild(node);
    });

    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            const allDescs = document.querySelectorAll(".desc");
            allDescs.forEach(d => d.classList.add("hidden"));
            document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
            allDescs[idx].classList.remove("hidden");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const nodes = document.querySelectorAll(".roadmap-node");
    const progressBar = document.createElement("div");
    progressBar.id = "progress-bar";
    document.getElementById("roadmap").prepend(progressBar);

    const completed = JSON.parse(localStorage.getItem("completedChapters")) || [];

    nodes.forEach((node, index) => {
        const dot = node.querySelector(".dot");
        const label = node.querySelector(".label");
        const desc = node.querySelector(".desc");

        if (completed.includes(index)) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            if (!completed.includes(index)) {
                completed.push(index);
                localStorage.setItem("completedChapters", JSON.stringify(completed));
                dot.classList.add("active");
                updateProgressBar();
            }
            desc.classList.toggle("hidden");
        });
    });

    function updateProgressBar() {
        const percent = (completed.length / nodes.length) * 100;
        progressBar.style.width = `${percent}%`;
    }

    updateProgressBar();
});

