document.addEventListener("DOMContentLoaded", function () {
    console.log("JS geladen");

    const popup = document.getElementById("popup");
    const contrastToggle = document.getElementById("contrast-toggle");
    const langButtons = document.querySelectorAll(".flag-btn");

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
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
                "characters": "Weltaufbau",
                "gojo-clan": "Gojo Clan",
                "zenin-clan": "Zenin Clan",
                "kamo-clan": "Kamo Clan",
                "jogo": "Jogo",
                "hanami": "Hanami",
                "mahito": "Mahito",
                "dagon": "Dagon",
                "sukuna": "Sukuna",
                "six-eyes": "Die Sechs Augen sind eine vererbte, einzigartige Augentechnik, die nur extrem selten innerhalb des Gojo-Clans auftritt – in Jahrhunderten vielleicht nur einmal. Sie verleihen dem Träger eine außergewöhnliche Wahrnehmung, die weit über das normale Sehen hinausgeht.",
                "gojo-description": "Der Gojo-Clan ist legendär – nicht nur wegen seiner Techniken, sondern auch, weil er Satoru Gojo hervorgebracht hat: Den ersten in 400 Jahren, der mit Sechs Augen (Rikugan) und der Unendlichkeit (Limitless) geboren wurde. Der Clan war immer stark, wurde aber durch Gojos Existenz praktisch unangreifbar.",
                "zenin-description": "Der Zenin-Clan steht für Macht, Tradition und brutale Meritokratie. Der Clan glaubt an die Überlegenheit starker Techniken und schaut auf nicht-verfluchte Familienmitglieder mit Verachtung herab. Frauen und Techniken wie die der Zehn Schattentechnik wurden nur akzeptiert, wenn sie mit Macht einhergingen. Doch diese Ideologie führte auch zur eigenen Zersetzung. Interne Konflikte, Neid und Machtgier sorgten für den Zerfall des Clans.",
                "blood_tech": "Blutmanipulation ist eine mächtige Technik, die es dem Benutzer ermöglicht, das eigene Blut oder das Blut anderer zu kontrollieren und zu manipulieren. Diese Technik wird oft in Verbindung mit Fluchtechniken verwendet und erfordert eine präzise Kontrolle, da das Blut sowohl als Waffe als auch als Schutz eingesetzt werden kann.",
                "zenin_tech": "Die Meisterschaft von verfluchten Techniken bedeutet, die Kontrolle über mächtige, übernatürliche Kräfte zu erlangen, die durch Flüche oder verfluchte Energie erzeugt werden. Diese Techniken können unterschiedlichste Fähigkeiten umfassen, wie etwa Telekinese, Illusionen oder das Verfluchen von Gegnern. Ein wahrer Meister dieser Techniken nutzt sie nicht nur mit außergewöhnlicher Präzision, sondern kann auch Flüche auf höchstem Niveau entfesseln.",
                "kamo-description": "Der Kamo-Clan ist einer der ältesten und einflussreichsten Jujutsu-Clans Japans. Er ist berüchtigt für seine strenge Hierarchie, politische Kälte und seine Verbindung zur dunklen Vergangenheit der Jujutsu-Geschichte. Der Clan stellt Effizienz und Reinheit der Linie über alles – sogar über Menschlichkeit. Der Ruf des Kamo-Clans ist durch eine düstere Figur getrübt: Kamo Noritoshi (alt), besser bekannt als Kenjaku, ein abtrünniger Jujutsu-Zauberer, der für ethisch verwerfliche Experimente berüchtigt ist. Besonders bekannt ist sein grausames Experiment, bei dem er mit der Fluchgeburt Choso und seinen 'Brüdern' Hybridwesen aus Flüchen und Menschen erschuf.",
                "jogo-description": "Jogo ist einer der vier Spezialgrade unter den Katastrophenflüchen und verkörpert die menschliche Angst vor Vulkanen. Mit seinen Fähigkeiten, Flammen und Lava zu kontrollieren, übertrifft er selbst erfahrene Jujutsu-Zauberer.",
                "hanami-description": "Hanami repräsentiert die menschliche Angst vor der Natur und ihrem Racheakt für die Zerstörung der Umwelt. Sie nutzt Pflanzenmanipulation mit außergewöhnlicher Präzision.",
                "mahito-description": "Mahito verkörpert die menschliche Angst voreinander – eine tiefere, dunkle Dimension der menschlichen Seele. Mit seiner Technik 'Idle Transfiguration' kann er die Seelen von Lebewesen manipulieren und ihre Körper nach Belieben umgestalten.",
                "dagon-description": "Dagon, ursprünglich als 'Merman Curse' bekannt, repräsentiert die menschliche Angst vor dem Ozean. Mit seiner Technik 'Horizons of the Prison Death' erschafft er ein Domänen-Gebiet in Form eines Strandes, bevölkert mit tödlichen Meereswesen.",
                "sukuna-description": "Sukuna ist nicht nur ein gewöhnlicher Fluch, sondern eine legendäre Figur der Jujutsu-Geschichte – der 'König der Flüche'. Er wurde als Mensch in der Heian-Ära geboren, bevor er zu einem Fluch wurde, dessen Macht so immens war, dass seine Finger auch nach seinem Tod als mächtige verfluchte Objekte bewahrt wurden.",
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
                "characters": "World-Building",
                "gojo-clan": "Gojo Clan",
                "zenin-clan": "Zenin Clan",
                "kamo-clan": "Kamo Clan",
                "jogo": "Jogo",
                "hanami": "Hanami",
                "mahito": "Mahito",
                "dagon": "Dagon",
                "sukuna": "Sukuna",
                "six-eyes": "The Six Eyes are a unique, inherited eye technique that appears extremely rarely within the Gojo clan—perhaps only once in centuries. They grant the wearer extraordinary perception that goes far beyond normal vision.",
                "gojo-description": "The Gojo clan is legendary—not only for its techniques, but also because it produced Satoru Gojo: the first in 400 years to be born with six eyes (Rikugan) and the power of infinity (Limitless). The clan was always strong, but Gojo's existence made it virtually unassailable.",
                "zenin-description": "The Zenin clan stands for power, tradition, and brutal meritocracy. The clan believes in the superiority of strong techniques and looks down on non-cursed family members with contempt. Women and techniques like the Ten Shadow Technique were only accepted if they were accompanied by power. However, this ideology also led to its own disintegration. Internal conflicts, envy, and lust for power led to the clan's disintegration.",
                "kamo-description": "The Kamo clan is one of the oldest and most influential jujutsu clans in Japan. It is notorious for its strict hierarchy, political coldness, and its connection to the dark past of jujutsu history. The clan values ​​efficiency and purity of lineage above all else—even humanity. The Kamo clan's reputation is tarnished by one sinister figure: Kamo Noritoshi (old), better known as Kenjaku, a renegade jujutsu sorcerer notorious for conducting ethically reprehensible experiments. Particularly well-known is his cruel experiment in which he created hybrid creatures of curses and humans with the curseborn Choso and his 'brothers.'",
                "blood_tech": "Blood Manipulation is a powerful technique that allows the user to control and manipulate their own blood or the blood of others. This technique is often used in conjunction with curse techniques and requires precise control, as the blood can be used both as a weapon and as protection.",
                "zenin_tech": "Mastering cursed techniques means gaining control over powerful, supernatural forces generated by curses or cursed energy. These techniques can encompass a wide variety of abilities, such as telekinesis, illusions, or cursing opponents. A true master of these techniques not only uses them with exceptional precision but can also unleash curses of the highest order.", 
                "jogo-description": "Jogo is one of the four Special Grades among the Disaster Curses and embodies human fear of volcanoes. With power that exceeds even that of experienced Jujutsu sorcerers, he uses his ability to control flames and magma.",
                "hanami-description": "Hanami represents human fear of nature and its revenge for environmental damage. As a Special Grade, Hanami uses plant and wood manipulation with exceptional precision.",
                "mahito-description": "Mahito embodies the fear humans have of each other – a concept as deep and dark as the human soul itself. His ability, 'Idle Transfiguration,' allows him to manipulate the soul of any being, reshaping their body at will.",
                "dagon-description": "Dagon, initially known as the 'Merman Curse,' represents human fear of the ocean and its unfathomable depths. After his transformation, he reaches Special Grade and develops a distinctive personality.",
                "sukuna-description": "Sukuna is no ordinary Cursed Spirit but a legendary figure from Jujutsu history – the 'King of Curses.' Born as a human sorcerer in the Heian Era, he was transformed into a curse feared even in an age of powerful sorcerers.",
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

    const clansButton = document.getElementById("clans");

    if (clansButton) {
        clansButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
    
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.add('hidden'));
    
            const clansSection = document.getElementById("clans-section");
            if (clansSection) {
                clansSection.classList.remove('hidden');
            }
    
            const clanDescriptions = document.querySelectorAll('#clan-description p');
            clanDescriptions.forEach(description => description.classList.add('hidden'));
        });
    }

    const zeninBtn = document.getElementById("zenin-btn");
    const gojoBtn = document.getElementById("gojo-btn");
    const kamoBtn = document.getElementById("kamo-btn");
    
    if (zeninBtn && gojoBtn && kamoBtn) {
        zeninBtn.addEventListener("click", () => showClanInfo("Zenin"));
        gojoBtn.addEventListener("click", () => showClanInfo("Gojo"));
        kamoBtn.addEventListener("click", () => showClanInfo("Kamo"));
    }

    function showClanInfo(clanName) {
        const zeninBtnElement = document.getElementById("zenin-btn");
        const gojoBtnElement = document.getElementById("gojo-btn");
        const kamoBtnElement = document.getElementById("kamo-btn");
    
        if (zeninBtnElement) zeninBtnElement.classList.remove("dimmed", "active");
        if (gojoBtnElement) gojoBtnElement.classList.remove("dimmed", "active");
        if (kamoBtnElement) kamoBtnElement.classList.remove("dimmed", "active");
    
        if (clanName === "Zenin") {
            if (zeninBtnElement) zeninBtnElement.classList.add("active");
            if (gojoBtnElement) gojoBtnElement.classList.add("dimmed");
            if (kamoBtnElement) kamoBtnElement.classList.add("dimmed");
        } else if (clanName === "Gojo") {
            if (gojoBtnElement) gojoBtnElement.classList.add("active");
            if (zeninBtnElement) zeninBtnElement.classList.add("dimmed");
            if (kamoBtnElement) kamoBtnElement.classList.add("dimmed");
        } else if (clanName === "Kamo") {
            if (kamoBtnElement) kamoBtnElement.classList.add("active");
            if (zeninBtnElement) zeninBtnElement.classList.add("dimmed");
            if (gojoBtnElement) gojoBtnElement.classList.add("dimmed");
        }
    
        const clanDetails = {
            "Gojo": {
                name: "Gojo Clan",
                highlight: "The Six Eyes",
                descriptionId: "gojo-description",
                imageId: "gojo-img"
            },
            "Zenin": {
                name: "Zenin Clan",
                highlight: "Mastery of Cursed Techniques",
                descriptionId: "zenin-description",
                imageId: "zenin-img"
            },
            "Kamo": {
                name: "Kamo Clan",
                highlight: "Blood Manipulation",
                descriptionId: "kamo-description",
                imageId: "kamo-img"
            }
        };
    
        Object.values(clanDetails).forEach(clan => {
            const descriptionElement = document.getElementById(clan.descriptionId);
            if (descriptionElement) {
                descriptionElement.style.display = "none";
            }
        });
    
        const selectedClan = clanDetails[clanName];
        if (selectedClan) {
            const descriptionElement = document.getElementById(selectedClan.descriptionId);
            if (descriptionElement) {
                descriptionElement.style.display = "block";
            }
    
            const clanNameElement = document.getElementById("clan_name");
            if (clanNameElement) {
                clanNameElement.textContent = selectedClan.name;
            }
    
            const clanHighlightElement = document.getElementById("clan_highlight");
            if (clanHighlightElement) {
                if (clanName === "Gojo") {
                    clanHighlightElement.innerHTML = `
                        <hr> <span>The Six</span> <img src="../Img/World/Six_Eyes.png" alt="The Six Eyes" class="inline-eye"> <span>Eyes</span>
                        <div id="six-eyes">Die Sechs Augen sind eine vererbte, einzigartige Augentechnik, die nur extrem selten innerhalb des Gojo-Clans auftritt – in Jahrhunderten vielleicht nur einmal. 
                        Sie verleihen dem Träger eine außergewöhnliche Wahrnehmung, die weit über das normale Sehen hinausgeht.</div>`;
                } else if (clanName === "Zenin") {
                    clanHighlightElement.innerHTML = `
                    <hr> <span>Mastery of Cursed</span> <img src="../Img/World/Zenin_Tech.png" alt="Z_T" class="inline-eye"> <span>Techniques</span>
                    <div id="zenin_tech">Die Meisterschaft von verfluchten Techniken bedeutet, die Kontrolle über mächtige, übernatürliche Kräfte zu erlangen, die durch Flüche oder verfluchte Energie erzeugt werden. 
                    Diese Techniken können unterschiedlichste Fähigkeiten umfassen, wie etwa Telekinese, Illusionen oder das Verfluchen von Gegnern.
                    Ein wahrer Meister dieser Techniken nutzt sie nicht nur mit außergewöhnlicher Präzision, sondern kann auch Flüche auf höchstem Niveau entfesseln.</div>`;
                } else if (clanName === "Kamo") {
                    clanHighlightElement.innerHTML = `
                     <hr> <span>Blood</span> <img src="../Img/World/Kamo_Tech.png" alt="B_M" class="inline-eye"> <span>Manipulation</span>
                        <div id="blood_tech">Blutmanipulation ist eine mächtige Technik, die es dem Benutzer ermöglicht, das eigene Blut oder das Blut anderer zu kontrollieren und zu manipulieren. Diese Technik wird oft in Verbindung mit Fluchtechniken verwendet und erfordert eine präzise Kontrolle, 
                        da das Blut sowohl als Waffe als auch als Schutz eingesetzt werden kann.</div>
                    <hr> <div id="noritoshi_kamo"></div>`;
                }
            }
        }
    
        const sixEyesInfo = document.getElementById("six-eyes");
        if (sixEyesInfo) {
            if (clanName === "Gojo") {
                sixEyesInfo.style.display = "block";
            } else {
                sixEyesInfo.style.display = "none";
            }
        }

        const BloodInfo = document.getElementById("blood_tech");
        if (BloodInfo) {
            if (clanName === "Kamo") {
                sixEyesInfo.style.display = "block";
            } else {
                sixEyesInfo.style.display = "none";
            }
        }

        const ZeninInfo = document.getElementById("zenin_tech");
        if (ZeninInfo) {
            if (clanName === "Zenin") {
                sixEyesInfo.style.display = "block";
            } else {
                sixEyesInfo.style.display = "none";
            }
        }
    }

    function showCurseInfo(curseName) {
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
    
        const curse = curseDetails[curseName];
        if (!curse) {
            console.error("Fluch nicht gefunden:", curseName);
            return; 
        }
    
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

    loadSettings();
});


const cursesData = {
    Jogo: {
        de: "Jogo ist ein Katastrophenfluch des Feuers. Er glaubt fest an die Überlegenheit der Flüche über die Menschen und betrachtet sie als minderwertig. Trotz seiner Arroganz besitzt er gewaltige Macht, einschließlich vulkanischer Techniken.",
        en: "Jogo is a disaster curse of fire. He strongly believes in the superiority of curses over humans and views them as inferior. Despite his arrogance, he wields immense power, including volcanic techniques.",
    },
    Hanami: {
        de: "Hanami ist ein Naturfluch, der die Erde schützen möchte. Er kämpft im Namen der Umwelt und glaubt, dass die Menschheit dem Planeten schadet. Seine Pflanzenkräfte sind sowohl defensiv als auch zerstörerisch.",
        en: "Hanami is a nature curse who wants to protect the Earth. He fights in the name of nature, believing humanity harms the planet. His plant-based powers are both defensive and destructive.",
    },
    Mahito: {
        de: "Mahito ist ein menschenhassender Fluch, der die Seele manipulieren kann. Seine Philosophie ist, dass der wahre Mensch erst durch Leid geboren wird. Mahito ist grausam, verspielt und extrem gefährlich.",
        en: "Mahito is a curse who despises humans and can manipulate souls. He believes true humanity is born from suffering. Mahito is cruel, playful, and extremely dangerous.",
    },
    Dagon: {
        de: "Dagon ist ein Wasserfluch, der zunächst unreif wirkt, sich aber zu einem mächtigen Gegner entwickelt. Er kontrolliert Wasser und ruft Flutwellen sowie Meeresmonster herbei.",
        en: "Dagon is a water curse who first appears immature but evolves into a formidable enemy. He controls water and can summon tsunamis and sea creatures.",
    },
    Sukuna: {
        de: "Ryomen Sukuna, auch als König der Flüche bekannt, ist eine legendäre Gestalt mit unvorstellbarer Macht. Ursprünglich ein Mensch, wurde er zu einem Fluch durch seine brutale Herrschaft.",
        en: "Ryomen Sukuna, also known as the King of Curses, is a legendary figure of unimaginable power. Originally human, he became a curse through his brutal reign.",
    }
};

let currentLanguage = "de";

function showCurses() {
    const curseButtons = document.querySelectorAll(".curse-btn");
    const curseDescription = document.getElementById("curse-description");

    curseButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".curse-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const curse = button.dataset.curse;
            const description = cursesData[curse][currentLanguage] || cursesData[curse]["de"];
            curseDescription.innerHTML = `<p>${description}</p>`;
        });
    });
}

function updateCursesLanguage(lang) {
    currentLanguage = lang;
    const activeCurse = document.querySelector(".curse-btn.active");
    if (activeCurse) {
        activeCurse.click();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showCurses();
    document.querySelectorAll(".flag-btn").forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang;
            updateCursesLanguage(lang);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const translations = {
        de: {
            characters_header: "Weltaufbau",
            character_cards: [
                {
                    title: "Jujutsu-Zauberer",
                    text: "Um ein professioneller Jujutsu-Zauberer zu sein, benötigt man in der Regel ein hohes Maß an verfluchter Energie und wird mit dem angeborenen Talent geboren, verfluchte Techniken anzuwenden. Dies macht normalerweise über achtzig Prozent des Könnens eines Jujutsu-Zauberers aus. Jujutsu-Zauberer erhalten ihre Ausbildung meist direkt im Einsatz."
                },
                {
                    title: "Fluchnutzer",
                    text: "Ein Fluchnutzer ist ein böser menschlicher Zauberer, der Jujutsu mit bösen Absichten verwendet. Natürlich existieren sie schon so lange wie die Jujutsu-Zauberer und stellten insbesondere während der Heian-Ära eine bedeutende Bedrohung neben den verfluchten Geistern dar."
                }
            ],
            info_texts: ["Verfluchte Waffen", "Verfluchte Energie"],
            info_descriptions: [
                "Verfluchte Waffen sind mit verfluchter Energie durchdrungene Werkzeuge, die verfluchten Geistern auch ohne Techniken des Trägers schaden können. Sie existieren in vielen Formen – von einfachen Klingen bis zu komplexen Artefakten.",
                "Verfluchte Energie entsteht aus negativen menschlichen Emotionen. Zauberer nutzen sie, um mächtige Techniken auszuführen. Die Beherrschung verfluchter Energie ist essenziell im Kampf gegen Flüche."
            ]
        },
        en: {
            characters_header: "Worldbuilding",
            character_cards: [
                {
                    title: "Jujutsu Sorcerers",
                    text: "To be a jujutsu sorcerer as a profession, one generally possesses high levels of cursed energy and is born with the innate talent to use cursed techniques. This normally composes over eighty percent of a jujutsu sorcerer's skillset. Jujutsu sorcerer students receiving their training in the field."
                },
                {
                    title: "Curse Users",
                    text: "A curse user is an evil human sorcerer who uses jujutsu with malintent. Naturally, they have existed as long as jujutsu sorcerers have, and were also prominent threats during the Heian Era alongside cursed spirits."
                }
            ],
            info_texts: ["Cursed Weapons", "Cursed Energy"],
            info_descriptions: [
                "Cursed weapons are tools imbued with cursed energy, capable of harming cursed spirits even without the wielder using techniques. They come in many forms, from simple blades to complex artifacts.",
                "Cursed energy is born from negative human emotions. Sorcerers harness it to perform powerful techniques. Mastery of cursed energy is essential to survive in battles against curses."
            ]
        }
    };

    document.querySelectorAll(".flag-btn").forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang;
            applyCharacterTranslations(lang);
        });
    });

    function applyCharacterTranslations(lang) {
        const data = translations[lang];

        document.getElementById("characters_header").textContent = data.characters_header;

        const cards = document.querySelectorAll(".character-card");
        cards.forEach((card, index) => {
            const paragraphs = card.querySelectorAll("p");
            paragraphs[0].textContent = data.character_cards[index].title;
            paragraphs[1].textContent = data.character_cards[index].text;
        });

        const infoTexts = document.querySelectorAll(".info-text");
        infoTexts.forEach((el, index) => {
            el.textContent = data.info_texts[index];

            let next = el.nextElementSibling;
            if (!next || !next.classList.contains("info-description")) {
                next = document.createElement("p");
                next.className = "info-description";
                el.insertAdjacentElement("afterend", next);
            }
            next.textContent = data.info_descriptions[index];
            next.style.fontFamily = "'Jost', sans-serif";
        });
    }
});

