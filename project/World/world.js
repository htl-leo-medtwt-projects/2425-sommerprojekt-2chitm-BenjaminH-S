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
        const clansButton = document.getElementById("clans");
        const cursButton = document.getElementById("curses");
        const charsButton = document.getElementById("characters");

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

            if (clansButton) {
                clansButton.style.backgroundColor = "white";
            }
            
            if (cursButton) {
                cursButton.style.backgroundColor = "white";
            }

            if (charsButton) {
                charsButton.style.backgroundColor = "white";
            }

            if (quizPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/World_Light.jpg')";
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

            if (clansButton) {
                clansButton.style.backgroundColor = "#b82f10";
                clansButton.addEventListener('mouseover', () => {
                    clansButton.style.color = 'black';
                });
            }
            
            if (cursButton) {
                cursButton.style.backgroundColor = "#b82f10";
                cursButton.addEventListener('mouseover', () => {
                    cursButton.style.color = 'black';
                });
            }

            if (charsButton) {
                charsButton.style.backgroundColor = "#b82f10";
                charsButton.addEventListener('mouseover', () => {
                    charsButton.style.color = 'black';
                });
            }

            if (quizPage) {
                document.body.style.backgroundImage = "url('../Img/Backgrounds/World_Dark.jpg')";
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

    const zeninBtn = document.getElementById("zenin-btn");
    const gojoBtn = document.getElementById("gojo-btn");
    const kamoBtn = document.getElementById("kamo-btn");
    
    if (zeninBtn && gojoBtn && kamoBtn) {
        zeninBtn.addEventListener("click", () => showClanInfo("Zenin"));
        gojoBtn.addEventListener("click", () => showClanInfo("Gojo"));
        kamoBtn.addEventListener("click", () => showClanInfo("Kamo"));
    }

    function showClanInfo(clanName) {
        const clanHighlightElement = document.getElementById("clan_highlight");
        
        document.getElementById("zenin-btn").classList.remove("dimmed", "active");
        document.getElementById("gojo-btn").classList.remove("dimmed", "active");
        document.getElementById("kamo-btn").classList.remove("dimmed", "active");
        
        if (clanName === "Zenin") {
            document.getElementById("zenin-btn").classList.add("active");
            document.getElementById("gojo-btn").classList.add("dimmed");
            document.getElementById("kamo-btn").classList.add("dimmed");
        } else if (clanName === "Gojo") {
            document.getElementById("gojo-btn").classList.add("active");
            document.getElementById("zenin-btn").classList.add("dimmed");
            document.getElementById("kamo-btn").classList.add("dimmed");
        } else if (clanName === "Kamo") {
            document.getElementById("kamo-btn").classList.add("active");
            document.getElementById("zenin-btn").classList.add("dimmed");
            document.getElementById("gojo-btn").classList.add("dimmed");
        }
        
        const clanDetails = {
            "Gojo": {
                name: "Gojo Clan",
                highlight: "The Six Eyes",
                description: "Der Gojo-Clan ist legendär – nicht nur wegen seiner Techniken, sondern auch, weil er Satoru Gojo hervorgebracht hat: Den ersten in 400 Jahren, der mit Sechs Augen (Rikugan) und der Unendlichkeit (Limitless) geboren wurde. Der Clan war immer stark, wurde aber durch Gojos Existenz praktisch unangreifbar.",
                imageId: "gojo-img"
            },
            "Zenin": {
                name: "Zenin Clan",
                highlight: "Mastery of Cursed Techniques",
                description: "Der Zenin-Clan steht für Macht, Tradition und brutale Meritokratie. Der Clan glaubt an die Überlegenheit starker Techniken und schaut auf nicht-verfluchte Familienmitglieder mit Verachtung herab. Frauen und Techniken wie die der Zehn Schattentechnik wurden nur akzeptiert, wenn sie mit Macht einhergingen. Doch diese Ideologie führte auch zur eigenen Zersetzung. Interne Konflikte, Neid und Machtgier sorgten für den Zerfall des Clans",
                imageId: "zenin-img"
            },
            "Kamo": {
                name: "Kamo Clan",
                highlight: "Blood Manipulation",
                description: "Der Kamo-Clan ist einer der ältesten und einflussreichsten Jujutsu-Clans Japans. Er ist berüchtigt für seine strenge Hierarchie, politische Kälte und seine Verbindung zur dunklen Vergangenheit der Jujutsu-Geschichte. Der Clan stellt Effizienz und Reinheit der Linie über alles – sogar über Menschlichkeit. Der Ruf des Kamo-Clans ist durch eine düstere Figur getrübt: Kamo Noritoshi (alt), besser bekannt als Kenjaku, ein abtrünniger Jujutsu-Zauberer, der für ethisch verwerfliche Experimente berüchtigt ist. Besonders bekannt ist sein grausames Experiment, bei dem er mit der Fluchgeburt Choso und seinen 'Brüdern' Hybridwesen aus Flüchen und Menschen erschuf.",
                imageId: "kamo-img"
            }
        };
    
        const clan = clanDetails[clanName];
    
        document.getElementById("clan_name").textContent = clan.name;
    
        if (clanHighlightElement) {
            if (clanName === "Gojo") {
                clanHighlightElement.innerHTML = 
                `<hr> The <span>Six</span> <img src="../Img/World/Six_Eyes.png" alt="The Six Eyes" class="inline-eye"> <span>Eyes</span>
                <div id="six_eyes_info">Die Sechs Augen sind eine vererbte, einzigartige Augentechnik, die nur extrem selten innerhalb des Gojo-Clans auftritt – in Jahrhunderten vielleicht nur einmal. Sie verleihen dem Träger eine außergewöhnliche Wahrnehmung, die weit über das normale Sehen hinausgeht.</div>`;
            } else {
                clanHighlightElement.textContent = clan.highlight;
            }
        }
    
        document.getElementById("clan-description").textContent = clan.description;
    
        document.querySelectorAll('.clan-img').forEach(img => img.classList.add('hidden'));
        const image = document.getElementById(clan.imageId);
        if (image) image.classList.remove('hidden');
    }

    function showCurseInfo(curseName) {
        document.querySelectorAll('.curse-btn').forEach(btn => {
            btn.classList.remove('active', 'dimmed');
        });
        
        document.querySelectorAll('.curse-btn').forEach(btn => {
            if (btn.getAttribute('data-curse') === curseName) {
                btn.classList.add('active');
            } else {
                btn.classList.add('dimmed');
            }
        });
        
        const curseDetails = {
            "Jogo": {
                title: "Jogo",
                highlight: "Disaster Curse of Volcanoes",
                description: "Jogo ist einer der vier Speziellen Grade unter den Disaster Curses und verkörpert die menschliche Angst vor Vulkanen. Mit einer Kraft, die selbst die von erfahrenen Jujutsu-Zauberern übertrifft, nutzt er seine Fähigkeit, Flammen und Magma zu kontrollieren. Seine Kampfphilosophie betont den Triumph der Stärksten - eine brutale Meritokratie, die sein ganzes Denken beherrscht.",
                imageUrl: "../Img/World/Jogo_Full.png"
            },
            "Hanami": {
                title: "Hanami",
                highlight: "Disaster Curse of Nature",
                description: "Hanami repräsentiert die menschliche Angst vor der Natur und deren Rache für den Umweltschaden. Als Spezieller Grad nutzt Hanami Pflanzen- und Holzmanipulation mit außergewöhnlicher Präzision. Im Gegensatz zu den anderen Disaster Curses zeigt Hanami eine gewisse Sensibilität für das Gleichgewicht der Natur und handelt aus der Überzeugung, dass die Menschen eine Bedrohung für die natürliche Ordnung darstellen.",
                imageUrl: "../Img/World/Hanami_Full.png"
            },
            "Mahito": {
                title: "Mahito",
                highlight: "Disaster Curse of Humanity",
                description: "Mahito verkörpert die Angst der Menschen vor anderen Menschen - ein Konzept so tief und dunkel wie die menschliche Seele selbst. Seine Fähigkeit 'Idle Transfiguration' erlaubt es ihm, die Seele eines Wesens zu manipulieren, wodurch er Körper nach Belieben verformen kann. Als relativ junger Fluch ist Mahito verspielt, sadistisch und betrachtet Menschen lediglich als Spielzeuge für seine grausamen 'Experimente'.",
                imageUrl: "../Img/World/Mahito_Full.png"
            },
            "Dagon": {
                title: "Dagon",
                highlight: "Disaster Curse of the Ocean",
                description: "Dagon, anfangs als 'Rumpfisch-Fluch' bekannt, repräsentiert die menschliche Angst vor dem Ozean und seinen unergründlichen Tiefen. Nach seiner Transformation erreicht er einen Speziellen Grad und entwickelt eine ausgeprägte Persönlichkeit. Seine Fluch-Technik 'Horizont des Gefangenen Todes' erschafft eine Domain Expansion in Form eines Strandes, der von tödlichen Wasserkreaturen bevölkert wird.",
                imageUrl: "../Img/World/Dagon_Full.png"
            },
            "Sukuna": {
                title: "Sukuna",
                highlight: "The King of Curses",
                description: "Sukuna ist keine normale Cursed Spirit, sondern eine legendäre Figur aus der Jujutsu-Geschichte - der 'König der Flüche'. In der Heian-Ära als menschlicher Zauberer geboren, wurde er zu einem Fluch, der selbst in einer Zeit der mächtigen Zauberer gefürchtet war. Seine Macht war so groß, dass nach seinem Tod seine Finger als mächtige verfluchte Objekte erhalten blieben. Als Ryomen Sukuna wiedergeboren wird, zeigt er unvergleichliche Stärke und Arroganz.",
                imageUrl: "../Img/World/Sukuna_Full.png"
            }
        };
        
        const curse = curseDetails[curseName];
        
        const descriptionElement = document.getElementById('curse-description');
        
        let infoContainer = document.getElementById('curse-info-container');
        if (!infoContainer) {
            infoContainer = document.createElement('div');
            infoContainer.id = 'curse-info-container';
            descriptionElement.parentNode.insertBefore(infoContainer, descriptionElement);
        }
        
        infoContainer.innerHTML = `
            <h3 class="curse-title">${curse.title}</h3>
            <p class="curse-highlight">${curse.highlight}</p>
            <img src="${curse.imageUrl}" alt="${curse.title}" class="curse-image-display">
        `;
        
        descriptionElement.textContent = curse.description;
    }

    const jogoBtn = document.getElementById("jogo-btn");
    const hanamiBtn = document.getElementById("hanami-btn");
    const mahitoBtn = document.getElementById("mahito-btn");
    const dagonBtn = document.getElementById("dagon-btn");
    const sukunaBtn = document.getElementById("sukuna-btn");
    
    if (jogoBtn && hanamiBtn && mahitoBtn && dagonBtn && sukunaBtn) {
        jogoBtn.addEventListener("click", () => showCurseInfo("Jogo"));
        hanamiBtn.addEventListener("click", () => showCurseInfo("Hanami"));
        mahitoBtn.addEventListener("click", () => showCurseInfo("Mahito"));
        dagonBtn.addEventListener("click", () => showCurseInfo("Dagon"));
        sukunaBtn.addEventListener("click", () => showCurseInfo("Sukuna"));
        
        showCurseInfo("Mahito");
    }
    
    const jujutsuSorcererCard = document.querySelector('.character-card:nth-child(1)');
    const curseUserCard = document.querySelector('.character-card:nth-child(2)');
    
    if (jujutsuSorcererCard && curseUserCard) {
        jujutsuSorcererCard.addEventListener('click', function() {
            updateCharacterInfo('sorcerer');
            this.style.transform = 'translateY(-10px) scale(1.05)';
            curseUserCard.style.transform = 'translateY(0) scale(0.95)';
            curseUserCard.style.opacity = '0.7';
            this.style.opacity = '1';
        });
        
        curseUserCard.addEventListener('click', function() {
            updateCharacterInfo('curse');
            this.style.transform = 'translateY(-10px) scale(1.05)';
            jujutsuSorcererCard.style.transform = 'translateY(0) scale(0.95)';
            jujutsuSorcererCard.style.opacity = '0.7';
            this.style.opacity = '1';
        });
    }
    
    const characterInfoSections = document.querySelectorAll('.character-info');
    characterInfoSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(184, 47, 16, 0.2)';
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            this.style.transform = 'translateY(0)';
        });
    });

    function updateCharacterInfo(type) {
        const weaponsInfo = document.querySelector('.character-info:nth-child(1)');
        const energyInfo = document.querySelector('.character-info:nth-child(2)');
        
        if (type === 'sorcerer') {
            weaponsInfo.querySelector('p').textContent = 'Jujutsu-Zauberer nutzen spezielle Waffen, die mit verfluchter Energie verstärkt sind. Diese Waffen können Flüche verletzen und zerstören.';
            energyInfo.querySelector('p').textContent = 'Jujutsu-Zauberer nutzen und kontrollieren verfluchte Energie durch Training und Techniken, um Flüche zu bekämpfen und die Gesellschaft zu schützen.';
        } else {
            weaponsInfo.querySelector('p').textContent = 'Fluchnutzer verwenden oft verunreinigte oder verbotene Waffen, die mit negativer Energie durchdrungen sind, um ihre zerstörerischen Ziele zu erreichen.';
            energyInfo.querySelector('p').textContent = 'Fluchnutzer manipulieren verfluchte Energie für bösartige Zwecke, oft durch verbotene Techniken und auf Kosten anderer Menschen oder sogar ihrer eigenen Menschlichkeit.';
        }
    }

    loadSettings();
});