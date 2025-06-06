document.addEventListener("DOMContentLoaded", function () {
    console.log("JS geladen");

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
                "quiz": "FunHub",
                "geschichte": "Geschichte",
                "clans": "Clans",
                "curses": "Flüche",
                "characters": "Weltaufbau",
                "gojo-clan": "Gojo Clan",
                "zenin-clan": "Zenin Clan",
                "kamo-clan": "Kamo Clan",
                "six-eyes": "Die Sechs Augen sind eine vererbte, einzigartige Augentechnik, die nur extrem selten innerhalb des Gojo-Clans auftritt – in Jahrhunderten vielleicht nur einmal. Sie verleihen dem Träger eine außergewöhnliche Wahrnehmung, die weit über das normale Sehen hinausgeht.",
                "gojo-description": "Der Gojo-Clan ist legendär – nicht nur wegen seiner Techniken, sondern auch, weil er Satoru Gojo hervorgebracht hat: Den ersten in 400 Jahren, der mit Sechs Augen (Rikugan) und der Unendlichkeit (Limitless) geboren wurde. Der Clan war immer stark, wurde aber durch Gojos Existenz praktisch unangreifbar.",
                "gojo_satoru": "Satoru Gojo ist der einzige in Jahrhunderten, der sowohl mit den Sechs Augen als auch der Technik Limitless geboren wurde – eine Kombination, die ihn nahezu unbesiegbar macht. Die Sechs Augen geben ihm eine übermenschliche Wahrnehmung und erlauben es ihm, verfluchte Energie bis ins kleinste Detail zu kontrollieren.",
                "zenin-description": "Der Zenin-Clan steht für Macht, Tradition und brutale Meritokratie. Der Clan glaubt an die Überlegenheit starker Techniken und schaut auf nicht-verfluchte Familienmitglieder mit Verachtung herab. Frauen und Techniken wie die der Zehn Schattentechnik wurden nur akzeptiert, wenn sie mit Macht einhergingen. Doch diese Ideologie führte auch zur eigenen Zersetzung. Interne Konflikte, Neid und Machtgier sorgten für den Zerfall des Clans.",
                "kamo-description" : "Der Kamo-Clan ist einer der ältesten und einflussreichsten Jujutsu-Clans Japans. Er ist berüchtigt für seine strenge Hierarchie, seine politische Kälte und seine Verbindung zur dunklen Vergangenheit des Jujutsu. Der Clan schätzt Effizienz und Reinheit der Abstammung über alles – sogar über Menschlichkeit.",
                "blood_tech": "Blutmanipulation ist eine mächtige Technik, die es dem Benutzer ermöglicht, das eigene Blut oder das Blut anderer zu kontrollieren und zu manipulieren. Diese Technik wird oft in Verbindung mit Fluchtechniken verwendet und erfordert eine präzise Kontrolle, da das Blut sowohl als Waffe als auch als Schutz eingesetzt werden kann.",
                "zenin_tech": "Die Meisterschaft von verfluchten Techniken bedeutet, die Kontrolle über mächtige, übernatürliche Kräfte zu erlangen, die durch Flüche oder verfluchte Energie erzeugt werden. Diese Techniken können unterschiedlichste Fähigkeiten umfassen, wie etwa Telekinese, Illusionen oder das Verfluchen von Gegnern. Ein wahrer Meister dieser Techniken nutzt sie nicht nur mit außergewöhnlicher Präzision, sondern kann auch Flüche auf höchstem Niveau entfesseln.",
                "noritoshi_kamo": "Der Kamo-Clan ist einer der ältesten und einflussreichsten Jujutsu-Clans Japans. Er ist berüchtigt für seine strenge Hierarchie, politische Kälte und seine Verbindung zur dunklen Vergangenheit der Jujutsu-Geschichte. Der Clan stellt Effizienz und Reinheit der Linie über alles – sogar über Menschlichkeit. Der Ruf des Kamo-Clans ist durch eine düstere Figur getrübt: Kamo Noritoshi (alt), besser bekannt als Kenjaku, ein abtrünniger Jujutsu-Zauberer, der für ethisch verwerfliche Experimente berüchtigt ist. Besonders bekannt ist sein grausames Experiment, bei dem er mit der Fluchgeburt Choso und seinen 'Brüdern' Hybridwesen aus Flüchen und Menschen erschuf.",
                "naobito_zenin" : "Naobito Zenin, Oberhaupt des Zenin-Clans, galt als einer der schnellsten Jujutsu-Zauberer seiner Zeit. Mit seiner Technik „Projection Sorcery“ konnte er eine Sekunde in 24 Einzelbilder aufteilen – und sich darin mit extremer Geschwindigkeit bewegen. Trotz seiner Arroganz und konservativen Weltanschauung war er ein starker Kämpfer, der die Ehre seines Clans hochhielt.",
                "mai_zenin":"Mai Zenin, eine Abkömmling des stolzen, aber kaltherzigen Zenin-Clans, war das genaue Gegenteil ihrer Zwillingsschwester Maki – schwächer im körperlichen Kampf, aber mit einer angeborenen Fluchtechnik ausgestattet. Trotz der geringeren Fluchenergie und der Geringschätzung durch ihren Clan, besaß Mai eine einzigartige Technik: Sie konnte mit ihrer Fluchkraft physische Objekte erschaffen – allerdings nur eines pro Tag.",    
                "gojo_powers": "Satoru Gojo kann mit seiner Limitless-Technik die Gesetze von Raum und Bewegung nach Belieben beeinflussen – er verlangsamt Gegner durch eine unendliche Annäherung, durchdringt Materie mit Blue und löscht ganze Zonen mit Purple, während die Sechs Augen ihm nicht nur perfekte Kontrolle über jede Regung verfluchter Energie geben, sondern ihm auch ermöglichen, selbst im Kampf stets mehrere Schritte vorauszudenken."
            },
            "en": {
                "settings-title": "Settings",
                "contrast-label": "Contrast",
                "language-label": "Language",
                "mediales": "Media",
                "welt": "World",
                "quiz": "FunHub",
                "geschichte": "Story",
                "clans": "Clans",
                "curses": "Curses",
                "characters": "World-Building",
                "gojo-clan": "Gojo Clan",
                "zenin-clan": "Zenin Clan",
                "kamo-clan": "Kamo Clan",
                "six-eyes": "The Six Eyes are a unique, inherited eye technique that appears extremely rarely within the Gojo clan—perhaps only once in centuries. They grant the wearer extraordinary perception that goes far beyond normal vision.",
                "gojo-description": "The Gojo clan is legendary—not only for its techniques, but also because it produced Satoru Gojo: the first in 400 years to be born with six eyes (Rikugan) and the power of infinity (Limitless). The clan was always strong, but Gojo's existence made it virtually unassailable.",
                "gojo_satoru": "Satoru Gojo is the only person in centuries to be born with both the Six Eyes and the Limitless technique—a combination that makes him virtually invincible. The Six Eyes give him superhuman perception and allow him to control cursed energy down to the smallest detail.",
                "zenin-description": "The Zenin clan stands for power, tradition, and brutal meritocracy. The clan believes in the superiority of strong techniques and looks down on non-cursed family members with contempt. Women and techniques like the Ten Shadow Technique were only accepted if they were accompanied by power. However, this ideology also led to its own disintegration. Internal conflicts, envy, and lust for power led to the clan's disintegration.",
                "kamo-description": "The Kamo clan is one of the oldest and most influential jujutsu clans in Japan. It is notorious for its strict hierarchy, political coldness, and its connection to the dark past of jujutsu history. The clan values ​​efficiency and purity of lineage above all else—even humanity.",
                "blood_tech": "Blood Manipulation is a powerful technique that allows the user to control and manipulate their own blood or the blood of others. This technique is often used in conjunction with curse techniques and requires precise control, as the blood can be used both as a weapon and as protection.",
                "zenin_tech": "Mastering cursed techniques means gaining control over powerful, supernatural forces generated by curses or cursed energy. These techniques can encompass a wide variety of abilities, such as telekinesis, illusions, or cursing opponents. A true master of these techniques not only uses them with exceptional precision but can also unleash curses of the highest order.", 
                "noritoshi_kamo": "The reputation of the Kamo clan is tarnished by a sinister figure: Kamo Noritoshi (old), better known as Kenjaku, a renegade jujutsu sorcerer notorious for ethically reprehensible experiments. Particularly well-known is his cruel experiment in which he created hybrid creatures of curses and humans with the curseborn Choso and his 'brothers.'",
                "naobito_zenin" : "Naobito Zenin, head of the Zenin clan, was considered one of the fastest jujutsu sorcerers of his time. With his „Projection Sorcery“ technique, he could split a second into 24 frames—and move within them at extreme speed. Despite his arrogance and conservative worldview, he was a strong fighter who upheld the honor of his clan.",
                "mai_zenin": "Mai Zenin, a descendant of the proud but cold-hearted Zenin clan, was the exact opposite of her twin sister Maki—weaker in physical combat, but endowed with an innate curse technique. Despite her lower curse energy and the disdain of her clan, Mai possessed a unique technique: she could create physical objects with her curse power—although only one per day.",  
                "gojo_powers" : "Satoru Gojo can use his Limitless technique to manipulate the laws of space and movement at will—slowing down opponents with an infinite approach, penetrating matter with Blue, and erasing entire zones with Purple, while the Six Eyes not only give him perfect control over every movement of cursed energy but also allow him to always think several steps ahead in battle."
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
        const quizPage = window.location.pathname.includes("World/world.html");
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
                        Sie verleihen dem Träger eine außergewöhnliche Wahrnehmung, die weit über das normale Sehen hinausgeht.</div>
                        <hr> 
                        
                        <div class="kid-container">
                        <div id="gojo_satoru">Satoru Gojo ist der einzige in Jahrhunderten, der sowohl mit den Sechs Augen als auch der Technik Limitless geboren wurde – eine Kombination, die ihn nahezu unbesiegbar macht. Die Sechs Augen geben ihm eine übermenschliche Wahrnehmung und erlauben es ihm, 
                        verfluchte Energie bis ins kleinste Detail zu kontrollieren.</div>
                        <img src="../Img/World/Kid_Gojo.png" alt="Gojo_Young" style="width: 260px; height: auto; border: 2px solid black;"></div>
                        
                        <div class="gojo-container">
                        <img src="../Img/World/Gojo_Powers.png" alt="Gojo" style="width: 260px; height: auto; border: 2px solid black;margin-left: 30vw;">
                        <div id="gojo_powers">
                        Satoru Gojo kann mit seiner Limitless-Technik die Gesetze von Raum und Bewegung nach Belieben beeinflussen – er verlangsamt Gegner durch eine unendliche Annäherung, durchdringt Materie mit Blue und löscht ganze Zonen mit Purple, 
                        während die Sechs Augen ihm nicht nur perfekte Kontrolle über jede Regung verfluchter Energie geben, sondern ihm auch ermöglichen, selbst im Kampf stets mehrere Schritte vorauszudenken.
                        </div>
                        `;
                } else if (clanName === "Zenin") {
                    clanHighlightElement.innerHTML = `
                    <hr> <span>Mastery of Cursed</span> <img src="../Img/World/Zenin_Tech.png" alt="Z_T" class="inline-eye"> <span>Techniques</span>
                    <div id="zenin_tech">Die Meisterschaft von verfluchten Techniken bedeutet, die Kontrolle über mächtige, übernatürliche Kräfte zu erlangen, die durch Flüche oder verfluchte Energie erzeugt werden. 
                    Diese Techniken können unterschiedlichste Fähigkeiten umfassen, wie etwa Telekinese, Illusionen oder das Verfluchen von Gegnern.
                    Ein wahrer Meister dieser Techniken nutzt sie nicht nur mit außergewöhnlicher Präzision, sondern kann auch Flüche auf höchstem Niveau entfesseln.</div>
                    <hr> 
                    
                    <div class="naobito_zenin_cont"> <img src="../Img/World/Naobito.png" alt="Naobito" style="width: 260px; height: auto; border: 2px solid black;margin-left: 30vw;"> 
                    <div id="naobito_zenin">Naobito Zenin, Oberhaupt des Zenin-Clans, galt als einer der schnellsten Jujutsu-Zauberer seiner Zeit. Mit seiner Technik „Projection Sorcery“ konnte er eine Sekunde in 24 Einzelbilder aufteilen – und sich darin mit extremer Geschwindigkeit bewegen. Trotz seiner Arroganz und konservativen Weltanschauung war er ein starker Kämpfer, der die Ehre seines Clans hochhielt.</div></div>
                    
                    <div class="mai_zenin_cont">  
                    <div id="mai_zenin">Mai Zenin, eine Abkömmling des stolzen, aber kaltherzigen Zenin-Clans, war das genaue Gegenteil ihrer Zwillingsschwester Maki – schwächer im körperlichen Kampf, aber mit einer angeborenen Fluchtechnik ausgestattet. Trotz der geringeren Fluchenergie und der Geringschätzung durch ihren Clan, besaß Mai eine einzigartige Technik: 
                    Sie konnte mit ihrer Fluchkraft physische Objekte erschaffen – allerdings nur eines pro Tag.</div>
                    <img src="../Img/World/Mai.png" class="mai" alt="Mai" style="width: 260px; height: auto; border: 2px solid black;">
                    </div>`;
                } else if (clanName === "Kamo") {
                    clanHighlightElement.innerHTML = `
                     <hr> <span>Blood</span> <img src="../Img/World/Kamo_Tech.png" alt="B_M" class="inline-eye"> <span>Manipulation</span>
                    <div id="blood_tech">Blutmanipulation ist eine mächtige Technik, die es dem Benutzer ermöglicht, das eigene Blut oder das Blut anderer zu kontrollieren und zu manipulieren. Diese Technik wird oft in Verbindung mit Fluchtechniken verwendet und erfordert eine präzise Kontrolle, 
                    da das Blut sowohl als Waffe als auch als Schutz eingesetzt werden kann.</div>
                    <hr> 
                    
                    <div class="noritoshi-container"> <img src="../Img/World/Noritoshi.png" class="noritoshi_old" alt="Noritoshi_Old" style="width: 260px; height: auto; border: 2px solid black;margin-left: 30vw;"> 
                    <div id="noritoshi_kamo">Der Ruf des Kamo-Clans ist durch eine düstere Figur getrübt: Kamo Noritoshi (alt), besser bekannt als Kenjaku, ein abtrünniger Jujutsu-Zauberer, der für ethisch verwerfliche Experimente berüchtigt ist. Besonders bekannt ist sein grausames Experiment, 
                    bei dem er mit der Fluchgeburt Choso und seinen „Brüdern“ Hybridwesen aus Flüchen und Menschen erschuf.</div></div>`;
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
                highlight: "Desaster Fluch der Vulkane",
                description: "Jogo ist einer der vier Speziellen Grade unter den Disaster Curses und verkörpert die menschliche Angst vor Vulkanen. Mit einer Kraft, die selbst die von erfahrenen Jujutsu-Zauberern übertrifft, nutzt er seine Fähigkeit, Flammen und Magma zu kontrollieren. Seine Kampfphilosophie betont den Triumph der Stärksten - eine brutale Meritokratie, die sein ganzes Denken beherrscht.",
                imageUrl: "../Img/World/Jogo_Full.png"
            },
            "Hanami": {
                title: "Hanami",
                highlight: "Desaster Fluch der Natur",
                description: "Hanami repräsentiert die menschliche Angst vor der Natur und deren Rache für den Umweltschaden. Als Spezieller Grad nutzt Hanami Pflanzen- und Holzmanipulation mit außergewöhnlicher Präzision. Im Gegensatz zu den anderen Disaster Curses zeigt Hanami eine gewisse Sensibilität für das Gleichgewicht der Natur und handelt aus der Überzeugung, dass die Menschen eine Bedrohung für die natürliche Ordnung darstellen.",
                imageUrl: "../Img/World/Hanami_Full.png"
            },
            "Mahito": {
                title: "Mahito",
                highlight: "Desaster Fluch der Menschenheit",
                description: "Mahito verkörpert die menschliche Angst voreinander – eine tiefere, dunkle Dimension der menschlichen Seele. Mit seiner Technik 'Idle Transfiguration' kann er die Seelen von Lebewesen manipulieren und ihre Körper nach Belieben umgestalten.",
                imageUrl: "../Img/World/Mahito_Full.png"
            },
            "Dagon": {
                title: "Dagon",
                highlight: "Desaster Fluch des Ozeans",
                description: "Dagon, anfangs als 'Rumpfisch-Fluch' bekannt, repräsentiert die menschliche Angst vor dem Ozean und seinen unergründlichen Tiefen. Nach seiner Transformation erreicht er einen Speziellen Grad und entwickelt eine ausgeprägte Persönlichkeit. Seine Fluch-Technik 'Horizont des Gefangenen Todes' erschafft eine Domain Expansion in Form eines Strandes, der von tödlichen Wasserkreaturen bevölkert wird.",
                imageUrl: "../Img/World/Dagon_Full.png"
            },
            "Sukuna": {
                title: "Sukuna",
                highlight: "König der Flüche",
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

    const sorcererCard = document.querySelector('.sorcerer-card');
    const curseUserCard = document.querySelector('.curse-user-card');
    
    sorcererCard.addEventListener('click', () => {
        sorcererCard.classList.add('selected-green');
        sorcererCard.classList.remove('dimmed-box', 'selected-red');
    
        curseUserCard.classList.remove('selected-red', 'selected-green');
        curseUserCard.classList.add('dimmed-box');
    });
    
    curseUserCard.addEventListener('click', () => {
        curseUserCard.classList.add('selected-red');
        curseUserCard.classList.remove('dimmed-box', 'selected-green');
    
        sorcererCard.classList.remove('selected-green', 'selected-red');
        sorcererCard.classList.add('dimmed-box');
    });
    
    const weaponCard = document.querySelector('.weapon-card');
    const energyCard = document.querySelector('.energy-card');
    
    weaponCard.addEventListener('click', () => {
        weaponCard.classList.add('selected-grey');
        weaponCard.classList.remove('dimmed-box', 'selected-blue');
    
        energyCard.classList.remove('selected-blue', 'selected-grey');
        energyCard.classList.add('dimmed-box');
    });
    
    energyCard.addEventListener('click', () => {
        energyCard.classList.add('selected-blue');
        energyCard.classList.remove('dimmed-box', 'selected-grey');
    
        weaponCard.classList.remove('selected-grey', 'selected-blue');
        weaponCard.classList.add('dimmed-box');
    });

const domainCard = document.querySelector('.domain-card');
const techniqueCard = document.querySelector('.technique-card');

domainCard.addEventListener('click', () => {
    domainCard.classList.add('selected-black');
    domainCard.classList.remove('dimmed-box', 'selected-purple');

    techniqueCard.classList.remove('selected-black', 'selected-purple');
    techniqueCard.classList.add('dimmed-box');
});

techniqueCard.addEventListener('click', () => {
    techniqueCard.classList.add('selected-purple');
    techniqueCard.classList.remove('dimmed-box', 'selected-black');

    domainCard.classList.remove('selected-purple', 'selected-black');
    domainCard.classList.add('dimmed-box');
});


const orgaCard = document.querySelector('.organisations-card');
const rankCard = document.querySelector('.ranking-card');

orgaCard.addEventListener('click', () => {
    orgaCard.classList.add('selected-brown');
    orgaCard.classList.remove('dimmed-box', 'selected-white');

    rankCard.classList.remove('selected-brown', 'selected-white');
    rankCard.classList.add('dimmed-box');
});

rankCard.addEventListener('click', () => {
    rankCard.classList.add('selected-white');
    rankCard.classList.remove('dimmed-box', 'selected-brown');

    orgaCard.classList.remove('selected-white', 'selected-brown');
    orgaCard.classList.add('dimmed-box');
});


});


const cursesData = {
    Jogo: {
        de: "Jogo ist einer der vier Spezialgrade unter den Katastrophenflüchen und verkörpert die menschliche Angst vor Vulkanen. Mit seinen Fähigkeiten, Flammen und Lava zu kontrollieren, übertrifft er selbst erfahrene Jujutsu-Zauberer.",
        en: "Jogo is one of the four Special Grades among the Disaster Curses and embodies human fear of volcanoes. With power that exceeds even that of experienced Jujutsu sorcerers, he uses his ability to control flames and magma.",
    },
    Hanami: {
        de: "Hanami repräsentiert die menschliche Angst vor der Natur und ihrem Racheakt für die Zerstörung der Umwelt. Sie nutzt Pflanzenmanipulation mit außergewöhnlicher Präzision.",
        en: "Hanami represents human fear of nature and its revenge for environmental damage. As a Special Grade, Hanami uses plant and wood manipulation with exceptional precision.",
    },
    Mahito: {
        de: "Mahito verkörpert die menschliche Angst voreinander – eine tiefere, dunkle Dimension der menschlichen Seele. Mit seiner Technik 'Idle Transfiguration' kann er die Seelen von Lebewesen manipulieren und ihre Körper nach Belieben umgestalten.",
        en: "Mahito embodies the fear humans have of each other – a concept as deep and dark as the human soul itself. His ability, 'Idle Transfiguration,' allows him to manipulate the soul of any being, reshaping their body at will.",
    },
    Dagon: {
        de: "Dagon, ursprünglich als 'Merman Curse' bekannt, repräsentiert die menschliche Angst vor dem Ozean. Mit seiner Technik 'Horizons of the Prison Death' erschafft er ein Domänen-Gebiet in Form eines Strandes, bevölkert mit tödlichen Meereswesen.",
        en: "Dagon, initially known as the 'Merman Curse,' represents human fear of the ocean and its unfathomable depths. After his transformation, he reaches Special Grade and develops a distinctive personality.",
    },
    Sukuna: {
        de: "Sukuna ist nicht nur ein gewöhnlicher Fluch, sondern eine legendäre Figur der Jujutsu-Geschichte – der 'König der Flüche'. Er wurde als Mensch in der Heian-Ära geboren, bevor er zu einem Fluch wurde, dessen Macht so immens war, dass seine Finger auch nach seinem Tod als mächtige verfluchte Objekte bewahrt wurden.",
        en: "Sukuna is no ordinary Cursed Spirit but a legendary figure from Jujutsu history – the 'King of Curses.' Born as a human sorcerer in the Heian Era, he was transformed into a curse feared even in an age of powerful sorcerers.",
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
    const sorcererCard = document.querySelector('.sorcerer-card');
    const curseUserCard = document.querySelector('.curse-user-card');

    sorcererCard.addEventListener('click', () => {
        sorcererCard.classList.add('selected-green');
        curseUserCard.classList.remove('selected-red');
    });

    curseUserCard.addEventListener('click', () => {
        curseUserCard.classList.add('selected-red');
        sorcererCard.classList.remove('selected-green');
    });


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

document.addEventListener("DOMContentLoaded", () => {
    const allCharacterCards = document.querySelectorAll('.character-card');

    allCharacterCards.forEach(card => {
        card.addEventListener('click', () => {
            allCharacterCards.forEach(c => c.classList.remove('selected-green', 'selected-red'));
            if (card.classList.contains('sorcerer-card')) {
                card.classList.add('selected-green');
            } else if (card.classList.contains('curse-user-card')) {
                card.classList.add('selected-red');
            } else {
                card.style.border = "2px solid var(--accent-color)";
                card.style.boxShadow = "0 0 15px var(--accent-shadow)";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const descriptions = document.querySelectorAll('.description');
    const languageButtons = document.querySelectorAll('.flag-btn');

    const translations = {
        "en": [
            "Cursed weapons are tools imbued with cursed energy, capable of harming cursed spirits even without the wielder using techniques. They come in many forms, from simple blades to complex artifacts.",
            "Cursed energy is born from negative human emotions. Sorcerers harness it to perform powerful techniques. Mastery of cursed energy is essential to survive in battles against curses.",
            "A powerful technique where a sorcerer creates a space that boosts their abilities.",
            "Unique abilities powered by cursed energy. Each user has their own style.",
            "Groups like Jujutsu High train sorcerers and fight cursed spirits.",
            "Sorcerers and curses are ranked from Grade 4 to Special Grade based on power."
        ],
        "de": [
            "Verfluchte Waffen sind mit verfluchter Energie durchtränkte Werkzeuge, die selbst ohne Techniken verfluchte Geister verletzen können. Sie gibt es in vielen Formen – von einfachen Klingen bis hin zu komplexen Artefakten.",
            "Verfluchte Energie entsteht aus negativen menschlichen Emotionen. Zauberer nutzen sie, um mächtige Techniken einzusetzen. Die Beherrschung dieser Energie ist essenziell im Kampf gegen Flüche.",
            "Eine mächtige Technik, bei der ein Zauberer einen Raum erschafft, der seine Fähigkeiten verstärkt.",
            "Einzigartige Fähigkeiten, die durch verfluchte Energie angetrieben werden. Jeder Nutzer hat seinen eigenen Stil.",
            "Gruppen wie Jujutsu High bilden Zauberer aus und kämpfen gegen Fluchgeister.",
            "Zauberer und Flüche werden von Grad 4 bis Sondergrad je nach Stärke eingestuft."
        ]
    };

    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (translations[lang]) {
                descriptions.forEach((el, idx) => {
                    el.textContent = translations[lang][idx];
                });
            }
        });
    });
});

const contrastToggle = document.getElementById('contrast-toggle');

const imageMap = [
    { selector: '.sorcerer-card img', dark: 'Jujutsu_Sorcerers.png', light: 'Jujutsu_Sorcerers_Dark.png' },
    { selector: '.curse-user-card img', dark: 'Curse_Users.png', light: 'Curse_Users_dark.png' },
    { selector: '.weapon-card img', dark: 'Cursed_Weapons.png', light: 'Cursed_Weapons_dark.png' },
    { selector: '.energy-card img', dark: 'Cursed_Energy.png', light: 'Cursed_Energy_dark.png' },
    { selector: '.domain-card img', dark: 'D_E.png', light: 'D_E_dark.png' },
    { selector: '.technique-card img', dark: 'C_T.png', light: 'C_T_dark.png' },
    { selector: '.organisations-card img', dark: 'Organisation.png', light: 'Organisation_dark.png' },
    { selector: '.ranking-card img', dark: 'Ranking.png', light: 'Ranking_dark.png' },
    { selector: '#jogo-btn', dark: 'Jogo.png', light: 'Jogo_dark.png' },
    { selector: '#hanami-btn', dark: 'Hanami.png', light: 'Hanami_dark.png' },
    { selector: '#mahito-btn', dark: 'Mahito.png', light: 'Mahito_dark.png' },
    { selector: '#dagon-btn', dark: 'Dagon.png', light: 'Dagon_dark.png' },
    { selector: '#sukuna-btn', dark: 'Sukuna.png', light: 'Sukuna_dark.png' },
    { selector: '#gojo-btn', dark: 'Gojo.png', light: 'Gojo_dark.png' },
    { selector: '#zenin-btn', dark: 'Zenin.png', light: 'Zenin_dark.png' },
    { selector: '#kamo-btn', dark: 'Kamo.png', light: 'Kamo_dark.png' },
    //{ selector: '#zenin-img', dark: 'Zenin_Tech.png', light: 'Zenin_Tech_dark.png' },
    //{ selector: '#kamo-img', dark: 'Kamo_Tech.png', light: 'Kamo_Tech_dark.png' }
];

function updateImagesForContrast(isLightMode) {
    imageMap.forEach(({ selector, light, dark }) => {
        const img = document.querySelector(selector);
        if (img) {
            img.src = `../Img/World/${isLightMode ? light : dark}`;
        }
    });
}

contrastToggle.addEventListener('change', () => {
    const isLightMode = contrastToggle.checked;
    document.body.classList.toggle('light-mode', isLightMode);
    updateImagesForContrast(isLightMode);
});

updateImagesForContrast(document.body.classList.contains('light-mode'));

document.querySelectorAll('.clan-btn, .clan-img, .curse-btn, .character-card').forEach((el, i) => {
    el.setAttribute("data-aos", "zoom-in");
    el.setAttribute("data-aos-delay", `${i * 100}`);
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('input[type="text"]');
    const suggestionsBox = document.getElementById("suggestions");

        const pages = [
        { label: "Main", url: "../Main/main.html" },
        { label: "Jujutsu Kognien", url: "../Main/main.html" },
        { label: "Welt", url: "../World/world.html" },
        { label: "Geschichte", url: "../Story/story.html" },
        { label: "Media", url: "../Media/media.html" },
        { label: "Mediales", url: "../Media/media.html" },
        { label: "World", url: "../World/world.html" },
        { label: "Story", url: "../Story/story.html" }
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