document.addEventListener("DOMContentLoaded", function () {

    AOS.init({
        duration: 1000, 
        once: true 
    });
    
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
                "arc-buttons": {
                    "All": "Alle",
                    "Cursed Child": "Verfluchtes Kind",
                    "Hidden Inventory": "Verstecktes Inventar",
                    "Kyoto Goodwill Event": "Kyoto Austausch-Event",
                    "Shibuya Incident": "Shibuya Zwischenfall",
                    "Culling Games": "Auslese-Spiele",
                    "Shinjuku Showdown": "Shinjuku Showdown"
                }
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "Quiz",
                "geschichte": "Story",
                "arc-buttons": {
                    "All": "All",
                    "Cursed Child": "Cursed Child",
                    "Hidden Inventory": "Hidden Inventory",
                    "Kyoto Goodwill Event": "Kyoto Goodwill Event",
                    "Shibuya Incident": "Shibuya Incident",
                    "Culling Games": "Culling Games",
                    "Shinjuku Showdown": "Shinjuku Showdown"
                }
            }
        };
    
        const langData = translations[lang];
    
        Object.keys(langData).forEach(key => {
            if (key !== "arc-buttons") {
                const element = document.getElementById(key);
                if (element) {
                    element.textContent = langData[key];
                }
            }
        });
    
        const arcButtons = document.querySelectorAll('.arc-btn');
        arcButtons.forEach(button => {
            const arcKey = button.getAttribute('data-arc');
            if (langData["arc-buttons"][arcKey]) {
                button.textContent = langData["arc-buttons"][arcKey];
            }
        });
    
        document.documentElement.lang = lang;
    }
    

    function applyContrast(mode) {
        const navBar = document.querySelector("ul");
        const navItems = document.querySelectorAll("ul li");
        const settingsIcon = document.getElementById("rad");
        const settingsBox = document.getElementById("popup");
        const searchBar = document.getElementById("searchBox");         
        const secondarySearch = document.getElementById("search-bar");  
        const StoryPage = window.location.pathname.includes("Story/story.html");
    
        const dots = document.querySelectorAll(".dot");
        const labels = document.querySelectorAll(".label");
        const arcButtons = document.querySelectorAll(".arc-btn");
    
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
    
            if (secondarySearch) {
                secondarySearch.style.backgroundColor = "#111";
                secondarySearch.style.color = "white"; 
                secondarySearch.style.border = "1px solid white";
                secondarySearch.style.caretColor = "white";
                secondarySearch.classList.add("light-search");
            }
            

            if (searchBar) {
                searchBar.style.backgroundColor = "#111";
                searchBar.style.color = "white";
                searchBar.style.border = "1px solid white";
                searchBar.style.caretColor = "white";
                searchBar.classList.add("light-search");
            }
    
            if (StoryPage)
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Light.jpeg')";
    
            arcButtons.forEach(btn => {
                btn.style.backgroundColor = "#111";
                btn.style.color = "white";
            });
    
            dots.forEach(dot => {
                dot.style.backgroundColor = "white";
            });
    
            labels.forEach(label => {
                label.style.color = "white";
            });
    
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
    
            if (secondarySearch) {
                secondarySearch.style.backgroundColor = "#b82f10";
                secondarySearch.style.color = "white";
                secondarySearch.style.border = "none";
                secondarySearch.style.caretColor = "white";
                secondarySearch.classList.remove("light-search");
            }
            

            if (settingsBox) settingsBox.style.backgroundColor = "#b82f10";
    
            if (searchBar) {
                searchBar.style.backgroundColor = "#b82f10";
                searchBar.style.color = "white";
                searchBar.style.border = "none";
                searchBar.style.caretColor = "white";
                searchBar.classList.remove("light-search");
            }
    
            if (StoryPage)
                document.body.style.backgroundImage = "url('../Img/Backgrounds/Story_Dark.png')";
    
            arcButtons.forEach(btn => {
                btn.style.backgroundColor = "#b82f10";
                btn.style.color = "white";
            });
    
            dots.forEach(dot => {
                dot.style.backgroundColor = "#ff3c00";
            });
    
            labels.forEach(label => {
                label.style.color = "white";
            });
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
            img: "../Img/Story/G_G.png",
            trivia: "Geto und Gojo galten als unbesiegbares Duo – bis sie auf Toji trafen."
        },
        {
            title: "Toji tötet Riko Amanai",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Toji Fushiguro bricht die Schutzbarriere und erschießt Riko Amanai – vor Getos Augen.",
            img: "../Img/Story/Toji.png",
            trivia: "Toji besitzt keine Fluchenergie, aber sein Körper ist ein Tempel für verfluchte Werkzeuge."
        },
        {
            title: "Gojo erweckt 'Red' & 'Infinity'",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Verletzt, aber lebendig – Gojo entdeckt Reversed Cursed Technique & kombiniert Red + Blue.",
            img: "../Img/Story/Revival.png",
            trivia: "Gojo ist der erste Jujutsuzauberer, der gleichzeitig 'Limitless' & 'Reversed Cursed Energy' gemeistert hat."
        },
        {
            title: "Gojo tötet Toji",
            year: 2006,
            arc: "Hidden Inventory",
            desc: "Nach der Wiederauferstehung tötet Gojo Toji mit 'Hollow Purple' – ein Meisterwerk der Technik.",
            img: "../Img/Story/Toji_D.png",
            trivia: "Gojo ist der erste Jujutsuzauberer, der gleichzeitig 'Limitless' & 'Reversed Cursed Energy' gemeistert hat."
        },
        {
            title: "Getos Fall",
            year: 2007,
            arc: "Hidden Inventory",
            desc: "Nach Riko Amanais Tod verliert Geto den Glauben an Menschen – seine dunkle Wandlung beginnt.",
            img: "../Img/Story/Geto.png",
            trivia: "Geto sagte: 'Die Welt braucht nur Jujuzisten.' Danach tötete er über 100 Zivilisten."
        },
        {
            title: "Yuta Okkotsus Fluch",
            year: 2017,
            arc: "Verfluchtes Kind",
            desc: "Yuta wird von Rika verfolgt, dem Geist seiner Kindheitsfreundin – und betritt die Jujutsu-Welt.",
            img: "../Img/Story/Yuta_Rika.png",
            trivia: "Yuta ist ein entfernter Verwandter von Gojo – beide stammen vom legendären Sugawara no Michizane ab."
        },
        {
            title: "Hallo Gojo",
            year: 2017,
            arc: "Verfluchtes Kind",
            desc: "Der veränderte Geto stellt sich Gojo vor – und beschwört die Dämonen Nachtsparade",
            img: "../Img/Story/Hello.png",
            trivia: "Geto hat Fluchnutzer rund um Japan rekrutiert, um die Nachtparade zu beschwören."
        },
        {
            title: "Mein bester Freund",
            year: 2017,
            arc: "Verfluchtes Kind",
            desc: "Yuta tötet Geto mithilfe der neu erweckten Rika",
            img: "../Img/Story/Blast.png",
            trivia: "Gojo erzählte Yuta, dass Geto eigentlich sein bester Freund war..."
        },
        {
            title: "Rika wird erlöst",
            year: 2017,
            arc: "Verfluchtes Kind",
            desc: "Nach dem Sieg über Geto verschwindet Rika – Yuta verabschiedet sich endgültig.",
            img: "../Img/Story/Rika_Ende.png",
            trivia: "Rikas Fluch war nicht bösartig – sie blieb wegen Yutas eigener verfluchter Energie gebunden."
        },
        {
            title: "Kenjaku übernimmt Getos Körper",
            year: 2017,
            arc: "Verfluchtes Kind",
            desc: "Der uralte Fluchgeist Kenjaku übernimmt Suguru Getos Leiche – ein neuer Plan beginnt.",
            img: "../Img/Story/G_K.png",
            trivia: "Kenjaku war früher in Noritoshi Kamo – einem der grausamsten Fluchzauberer der Geschichte."
        },
        {
            title: "Yuji trifft Sukuna",
            year: 2018,
            arc: "Furchterregende Gebärmutter",
            desc: "Yuji Itadori verschluckt Sukunas Finger und wird das Gefäß für den König der Flüche.",
            img: "../Img/Story/Sukuna.png",
            trivia: "Sukuna hat ursprünglich 4 Arme und 2 Gesichter in seiner echten Form."
        },
        {
            title: "Eintritt in die Jujutsu Schule",
            year: 2018,
            arc: "Furchterregende Gebärmutter",
            desc: "Nachdem Satoru Gojo ihn unter seine Fittiche nimmt, stellt er ihn noch Megumi Fushiguro und Nobara Kugisaki vor.",
            img: "../Img/Story/School.png",
            trivia: "Gojo ist der erste in 100 Jahren, der mit der Sechs-Augen-Technik geboren wurde."
        },
        {
            title: "Meine gegen deine Schule",
            year: 2018,
            arc: "Kyoto Goodwill Event",
            desc: "Yuji und seine Freunde treten gegen die Kyoto-Jujutsu-Schule unter anderem Aoi Todo an - in einem Wettkampf.",
            img: "../Img/Story/Goodwill.png",
            trivia: "Aoi Todo ist ein Idol-Fan – sein Lieblings-Typ bei Frauen ist 'hoch mit großem Hintern'."
        },
        {
            title: "Plötzliche Unterbrechung",
            year: 2018,
            arc: "Kyoto Goodwill Event",
            desc: "Dann taucht Hanami auf und greift die Schüler an – Yuji und Todo kämpfen gegen ihn, bis Gojo ihn verscheucht.",
            img: "../Img/Story/Hanami.png",
            trivia: "Hanami kam als Fluch zur Welt, aufgrund der menschlichen Angst vor Naturkatastrophen."
        },
        {
            title: "Baseball?",
            year: 2018,
            arc: "Kyoto Goodwill Event",
            desc: "Danach schließen die Schüler Frieden und spielen ausgerechnet Baseball, wegen Gojo.",
            img: "../Img/Story/Baseball.png",
            trivia: "Nach dem Arc wird Yuji von Todo als 'Bester Freund' bezeichnet."
        },
        {
            title: "Willkommen in Shibuya",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Gojo wird versiegelt durch Kenjaku mithilfe der 'Prison Realm'",
            img: "../Img/Story/Cube.png",
            trivia: "Im Prison Realm verläuft die Zeit gar nicht und man kann seine Fluch-Energie kaum verwenden!."
        },
        {
            title: "Yuji vs Choso",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Choso greift Yuji an, um ihn zu töten, da er seine Brüder getötet hat - aber selbst nach der Konfrontation bleibt Yuji am Leben.",
            img: "../Img/Story/Choso.png",
            trivia: "Choso, Kechisu und Eso sind Flüche, die von Kenjaku erschaffen wurde."
        },
        {
            title: "Toji?",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Nach seiner Wiederbelebung greift Toji Dagon an und dezimiert ihn mit Leichtigkeit.",
            img: "../Img/Story/T_D.png",
            trivia: "Toji's Seele wurde durch einen Fluchnutzer manipuliert und in dessen Körper eingenommen, zu seinem Pech..."
        },
        {
            title: "Jogos Amoklauf",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Jogo greift die anderen an, nachdem er Dagon verloren hat und verletzt Leute, wie Nanami und Maki schwer, dafür tötet er aber Naobito Zenin.",
            img: "../Img/Story/J_N.png",
            trivia: "Maki überlebt den Amoklauf von Jogo, aufgrund der Reinheit ihrer Seele."
        },
        {
            title: "Steh wieder auf",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Jogo nimmt Yuji's toten Körper und steckt Sukunas Finger in ihn rein, um Sukuna wiederzubeleben.",
            img: "../Img/Story/Comeback.png",
            trivia: "Als 'Dank' dominiert Sukuna Jogo in einem Kampf mit Überlegenheit und tötet ihn mit Leichtigkeit."
        },
        {
            title: "Megumis versteckter Shikai",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Bevor Megumi (nicht) an Haruta stirbt, beschwört er Mahoraga – den stärksten Shikai.",
            img: "../Img/Story/Mahoraga.png",
            trivia: "Mahoraga kann sich an jede Technik anpassen – selbst an Sukunas 'Domain Expansion', mithilfe von Drehungen des Rades über seinem Kopf."
        },
        {
            title: "Sukunas ultimative Technik",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Sukuna enthüllt seine Technik 'Fukuma Mizushi' – eine Domain ohne Barriere, um Mahoraga zu zerstören.",
            img: "../Img/Story/Fukuma.png",
            trivia: "'Fukuma Mizushi' bedeutet etwa 'Schloss der dunklen Tiefe' – eine der tödlichsten Techniken in JJK."
        },
        {
            title: "Nanami stirbt",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Nanami wird schwer verletzt und begegnet Mahito – sein Ende kommt abrupt, als Mahito ihn hochjagt.",
            img: "../Img/Story/Nanami.png",
            trivia: "Nanamis letzte Gedanken galten Yuji – er hoffte, dass dieser seinen Weg findet."
        },
        {
            title: "Kugisaki wird schwer verletzt",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Mahito trifft Nobara ins Gesicht – ihr Schicksal bleibt zunächst unklar.",
            img: "../Img/Story/Kugisaki.png",
            trivia: "Laut Shoko besteht Hoffnung auf Rettung – aber Kugisaki liegt im Koma."
        },   
        {
            title: "Mahito's Ende",
            year: 2018,
            arc: "Shibuya Incident",
            desc: "Als Mahito von Todo und hauptsächlich Yuji besiegt wird, absorbiert Kenjaku seine Seele, um die Culling Games ins Leben zu rufen.",
            img: "../Img/Story/Absorb.png",
            trivia: "Kenjaku konsumiert Mahitos Seele, um seine Techniken der Seelendeformation zu erlangen."
        }, 
        {
            title: "Culling Games",
            year: 2018,
            arc: "Culling Games",
            desc: "Ein tödliches Spiel beginnt. Yuji, Megumi, Yuta & Co. kämpfen gegen die Zeit, um Gojo zu retten.",
            img: "../Img/Story/C_G.png",
            trivia: "Man kann in den Culling Games auch seine eigenen Regeln aufstellen, wenn man genügend Punkte hat."
        },
        {
            title: "Hakaris Glücks-Domain",
            year: 2018,
            arc: "Culling Games",
            desc: "Hakari kämpft gegen Kashimo und aktiviert seine Glücks-Domain – unsterblich für 4:11 Minuten.",
            img: "../Img/Story/Hakari.png",
            trivia: "Hakari kann durch sein Domain-Glücksspiel für 4:11 Minuten unsterblich sein."
        },
        {
            title: "Maki schlachtet den Zenin-Clan",
            year: 2018,
            arc: "Culling Games",
            desc: "Maki tötet ihren gesamten Clan, die ihre Schwester Mai umgebracht haben.",
            img: "../Img/Story/Maki.png",
            trivia: "Naoya Zenin hat sogar zweimal versucht sie aufzuhalten - Das zweite Mal als Fluch!"
        },
        {
            title: "Dreifacher Ärger",
            year: 2018,
            arc: "Culling Games",
            desc: "Yuta kämpft gegen die Wiederbelebten Jujuzisten Ryo und Uro",
            img: "../Img/Story/Panel.png",
            trivia: "Yuta war kurz davor seine Domäne zu beschwören, aber wurde daran gehindert!"
        },
        {
            title: "Yuki Tsukumo stirbt",
            year: 2018,
            arc: "Culling Games",
            desc: "Yuki kämpft gegen Kenjaku, nutzt sogar eine Mini-Schwarzes-Loch-Technik – stirbt aber am Ende.",
            img: "../Img/Story/Yuki.png",
            trivia: "Yuki war eine Spezialklasse-Zauberin – wie Gojo – und hatte alternative Fluchenergie-Theorien."
        },
        {
            title: "Megumi wird kontrolliert",
            year: 2018,
            arc: "Culling Games",
            desc: "Sukuna übernimmt Megumis Körper und löscht seinen Willen – ein tragischer Wendepunkt.",
            img: "../Img/Story/Megumi_Sukuna.png",
            trivia: "Sukuna opfert Megumis Schwester Tsumiki, um Megumis Seele zu brechen."
        },
        {
            title: "Gojo vs Sukuna beginnt",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Gojo tritt gegen den König der Flüche an – Sukuna im Körper von Megumi, mit Mahoraga in petto.",
            img: "../Img/Story/Gojo_Sukuna.png",
            trivia: "Ihr Kampf erschütterte die Realität – ganze Stadtteile verschwanden in Sekunden."
        },
        {
            title: "Gojo stirbt",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Sukuna trickst Gojo mit Mahoragas Adaption aus und durchtrennt ihn komplett.",
            img: "../Img/Story/Gojo_Lose.png",
            trivia: "Seine letzten Worte waren über Toji – ein Hinweis, dass er nicht in Frieden geht."
        },
        {
            title: "Kashimo vs. Sukuna",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Kashimo nutzt seine Gottform und greift Sukuna an – dieser verwandelt sich erstmals in seine wahre Form.",
            img: "../Img/Story/Kashimo.png",
            trivia: "Sukunas wahre Form besitzt vier Arme und nutzt Schwerter, Elektrizität und Raumtechnik gleichzeitig."
        },
        {
            title: "Reines Blutbad",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Jeder stellt sich Sukunas Weg entgegen – Aber diejenigen, die es tun werden sofort von ihm besiegt.",
            img: "../Img/Story/Lose.png",
            trivia: "Yuta Okkotsu stellt sich Sukuna 2 mal in den Weg - aber das zweite Mal als Gojo!"
        },
        {
            title: "Todo ist wieder dabei!",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Bevor die letzte Hoffnung stirbt, taucht Todo auf und kämpft mit Yuji gegen Sukuna.",
            img: "../Img/Story/Clutch.png",
            trivia: "Aufgrund von Todo haben die meisten gefallenen Jujuzisten Sukuna's Macht überlebt."
        },
        {
            title: "Sukuna stirbt",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Yuji tötet dafür Sukuna und befreit Megumi aus seinem Körper. Als Revanche für Gojo.",
            img: "../Img/Story/Yuji_Sukuna.png",
            trivia: "Yuji gab Sukuna die Chance, mit ihm zu leben – aber der verneinte das Angebot."
        },
        {
            title: "Von jetzt an",
            year: 2018,
            arc: "Shinjuku Showdown",
            desc: "Yuji, Megumi, Nobara sind wieder vereinigt und leben Gojo's Traum weiter, für den Gojo gestorben ist.",
            img: "../Img/Story/From.png",
            trivia: "Yuji übernimmt Gojo's Rolle als Mentor und motiviert andere dazu der Jujutsu High beizutreten."
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

    const arcFilter = document.createElement("div");
    arcFilter.id = "arcFilter";
    arcFilter.style.margin = "2vw auto";
    arcFilter.style.textAlign = "center";
    arcFilter.style.fontFamily = "'Jost'";
    arcFilter.innerHTML = `
    <button class="arc-btn" data-arc="All">Alle</button>
    <button class="arc-btn" data-arc="Verfluchtes Kind">Cursed Child</button>
    <button class="arc-btn" data-arc="Hidden Inventory">Hidden Inventory</button>
    <button class="arc-btn" data-arc="Kyoto Goodwill Event">Kyoto Goodwill Event</button>
    <button class="arc-btn" data-arc="Shibuya Incident">Shibuya Incident</button>
    <button class="arc-btn" data-arc="Culling Games">Culling Games</button>
    <button class="arc-btn" data-arc="Shinjuku Showdown">Shinjuku Showdown</button>`;
    
    document.body.insertBefore(arcFilter, searchInput);

    timelineData.forEach((event, index) => {
        const node = document.createElement("div");
        node.className = "roadmap-node";
        node.setAttribute("data-aos", "fade-up"); 
    
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

    document.querySelectorAll(".arc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const selectedArc = btn.dataset.arc.toLowerCase();
            document.querySelectorAll(".roadmap-node").forEach((node, idx) => {
                const item = timelineData[idx];
                const matches = selectedArc === "all" || item.arc.toLowerCase() === selectedArc;
    
                if (matches) {
                    node.style.display = "flex";
                    node.style.opacity = 0;
                    setTimeout(() => {
                        node.style.opacity = 1;
                        node.style.transition = "opacity 0.8s ease";
                    }, 0);
                } else {
                    node.style.display = "none";
                }
            });
    
            AOS.refresh();
    
            triviaBox.classList.remove("show");
        });
    });
    
    

    document.querySelectorAll(".dot").forEach(dot => {
        dot.addEventListener("click", (e) => {
            const idx = e.target.dataset.index;
            const descBoxes = document.querySelectorAll(".desc");
            const allDots = document.querySelectorAll(".dot");
            const thisDesc = descBoxes[idx];
    
            const isActive = dot.classList.contains("active");
            descBoxes.forEach(d => d.classList.add("hidden"));
            allDots.forEach(d => d.classList.remove("active"));
    
            if (!isActive) {
                dot.classList.add("active");
                thisDesc.classList.remove("hidden");
            }
        });
    });
    
    document.addEventListener("click", (e) => {
        const isDot = e.target.classList.contains("dot");
        const isDesc = e.target.closest(".desc");
    
        if (!isDot && !isDesc) {
            document.querySelectorAll(".desc").forEach(d => d.classList.add("hidden"));
            document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
        }
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

secondarySearch.classList.add("light-search");

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