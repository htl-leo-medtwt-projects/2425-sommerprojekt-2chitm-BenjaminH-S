let memoryElapsedSeconds = 0;
let memoryTimerInterval;

AOS.init({
  duration: 800,
  once: true,
});

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

function showOptions() {
  const popup = document.getElementById("popup");
  if (popup) popup.classList.remove("hidden");
}

function closeOptions() {
  const popup = document.getElementById("popup");
  if (popup) popup.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const contrastToggle = document.getElementById("contrast-toggle");
  const langButtons = document.querySelectorAll(".flag-btn");

  function loadSettings() {
    const language = getCookie("language") || "de";
    const contrastMode = getCookie("contrastMode") || "dark";
    applyLanguage(language);
    applyContrast(contrastMode);
  }

  function applyLanguage(lang) {
    const translations = {
      de: {
        "settings-title": "Einstellungen",
        "contrast-label": "Kontrast",
        "language-label": "Sprache",
        "mediales": "Mediales",
        "welt": "Welt",
        "quiz": "FunHub",
        "geschichte": "Geschichte",
        "memory-title": "Memory",
        "memory-sub": "Erkenne die Charaktere!",
        "memory-button": "Starten",
        "wheel-title": "Glücksrad",
        "wheel-sub": "Drehe das Rad der Techniken!",
        "wheel-button": "Drehen",
        "quiz-title": "Quiz",
        "quiz-sub": "Teste dein Wissen!",
        "quiz-button": "Starten",
        "quote-title": "Zitate-Raten",
        "quote-sub": "Wer hat das gesagt?",
        "quote-button": "Starten"
      },
      en: {
        "settings-title": "Settings",
        "contrast-label": "Contrast",
        "language-label": "Language",
        "mediales": "Media",
        "welt": "World",
        "quiz": "FunHub",
        "geschichte": "Story",
        "memory-title": "Memory",
        "memory-sub": "Recognize the characters!",
        "memory-button": "Start",
        "wheel-title": "Wheel of Fortune",
        "wheel-sub": "Spin the wheel of techniques!",
        "wheel-button": "Spin",
        "quiz-title": "Quiz",
        "quiz-sub": "Test your knowledge!",
        "quiz-button": "Start",
        "quote-title": "Quote Guess",
        "quote-sub": "Who said this?",
        "quote-button": "Start"
      }
    };

    Object.entries(translations[lang]).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    document.documentElement.lang = lang;
    setCookie("language", lang, 7);
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

      if (navBar) navBar.style.backgroundColor = "black";
      if (navBar) navBar.style.color = "white";

      navItems.forEach((item, index) => {
        item.style.borderRight = "4px solid white";
        item.style.borderLeft = index === 0 ? "4px solid white" : "none";
      });

      if (settingsIcon) {
        settingsIcon.style.borderLeft = "none";
        settingsIcon.style.borderRight = "none";
      }

      if (settingsBox) settingsBox.style.backgroundColor = "white";
      if (searchBar) searchBar.style.backgroundColor = "white";

      if (quizPage) {
        document.body.style.backgroundImage = "url('../Img/Backgrounds/Quiz_Light.jpg')";
      }
    } else {
      document.body.classList.remove("light-mode");
      if (contrastToggle) contrastToggle.checked = false;

      if (navBar) navBar.style.backgroundColor = "#b82f10";
      if (navBar) navBar.style.color = "black";

      navItems.forEach((item, index) => {
        item.style.borderRight = "4px solid black";
        item.style.borderLeft = index === 0 ? "4px solid black" : "none";
      });

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
      document.body.classList.toggle("high-contrast", contrastToggle.checked);
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

  loadSettings();
});

document.querySelectorAll('.flag-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.flag-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

const memoryTimeLimits = {
  easy: 60,    
  medium: 30,
  hard: 15
};

let memoryTimer;
let memoryTimeLeft;

function startMemoryTimer(limitInSeconds) {
  memoryElapsedSeconds = 0;

  const display = document.getElementById("memory-timer-display");
  display.textContent = `Verbleibende Zeit: ${limitInSeconds} Sekunden`;

  let remaining = limitInSeconds;

  memoryTimerInterval = setInterval(() => {
    memoryElapsedSeconds++;
    remaining--;

    if (remaining >= 0) {
      display.textContent = `Dir verbleiben noch: ${remaining} Sekunden!`;
    }

    if (remaining <= 0) {
      clearInterval(memoryTimerInterval);
      display.textContent = `Die Zeit ist abgelaufen Jujuzist!`;
    }
  }, 1000);
}


function updateTimerDisplay() {
  const timerDisplay = document.getElementById("memory-timer-display");
  timerDisplay.textContent = `Verbleibende Zeit: ${memoryTimeLeft} Sekunden`;
}

const memoryCards_easy = [
  "gojo.png",
  "yuji.png",
  "nobara.png",
  "megumi.png"
];

const memoryCards_medium = [
  ...memoryCards_easy,
  "toji.png",
  "kenjaku.png"
];

const memoryCards_hard = [
  ...memoryCards_medium,
  "yuta.png",
  "mahito.png"
];

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function showMemoryResult() {
  const resultWrapper = document.getElementById("memory-result-wrapper");
  const resultDisplay = document.getElementById("memory-result-display");
  const timerDisplay = document.getElementById("memory-timer-display");

  clearInterval(memoryTimerInterval);
  if (timerDisplay) timerDisplay.textContent = "";

  const mode = document.getElementById("memory-mode-select").value;
  const totalTime = memoryTimeLimits[mode];

  let used = memoryElapsedSeconds;
  if (used > totalTime) used = totalTime;

  const minutes = Math.floor(used / 60);
  const seconds = used % 60;

  resultDisplay.textContent = `Du hast alle Paare in ${minutes}:${seconds < 10 ? '0' + seconds : seconds} Sekunden gefunden!`;
  resultWrapper.classList.remove("hidden");
}


function renderMemoryGame(cards) {
  const container = document.getElementById("memory-game");
  container.innerHTML = "";
  container.classList.remove("hidden");
  
  container.className = "memory-container";

  let flipped = [];
  let matched = [];

  cards.forEach((imageName, index) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.index = index;
    card.dataset.symbol = imageName;

    const inner = document.createElement("div");
    inner.classList.add("memory-card-inner");
    
    const front = document.createElement("div");
    front.classList.add("memory-front");
    front.style.backgroundImage = `url("../Img/FunHub/${imageName}")`;
    
    const back = document.createElement("div");
    back.classList.add("memory-back");
    
    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || flipped.length === 2 || matched.includes(index)) return;

      card.classList.add("flipped");
      flipped.push({ index, card });

      if (flipped.length === 2) {
        const [first, second] = flipped;
        
        if (first.card.dataset.symbol === second.card.dataset.symbol) {
          matched.push(first.index, second.index);
          flipped = [];
          
          if (matched.length === cards.length) {
            clearInterval(memoryTimer);
            setTimeout(() => {
            showMemoryResult();
            }, 500);
          }
        } else {
          setTimeout(() => {
            first.card.classList.remove("flipped");
            second.card.classList.remove("flipped");
            flipped = [];
          }, 1000);
        }
      }
    });

    container.appendChild(card);
  });
  
  const columnsCount = Math.ceil(Math.sqrt(cards.length));
  container.style.gridTemplateColumns = `repeat(${columnsCount}, 100px)`;
}

function startMemoryGame() {
  document.getElementById("memory-result-wrapper").classList.add("hidden");
  document.getElementById("memory-result-display").textContent = "";
  const mode = document.getElementById("memory-mode-select").value;
  const timeLimit = memoryTimeLimits[mode];
  startMemoryTimer(timeLimit);

  let baseCards;
  if (mode === "easy") baseCards = memoryCards_easy;
  else if (mode === "hard") baseCards = memoryCards_hard;
  else baseCards = memoryCards_medium;

  const cards = shuffle([...baseCards, ...baseCards]); 
  renderMemoryGame(cards);

  if (selectedMode === "hard" && playerWon) {
  unlockAchievement("memoryPro");
}
}

function endMemoryGame() {
  clearInterval(memoryTimerInterval);
  document.getElementById("memory-timer-display").textContent = "";
}

function replayMemoryGame() {
  endMemoryGame();
  startMemoryGame();
}
  
function spinWheel() {
  const result = document.getElementById("wheel-result");
  
  const techniques = [
    {
      name: "Hollow Purple",
      info: "Die Technik von Gojo Satoru, die die Anziehungskraft und Abstoßungskraft kombiniert",
      img: "../Img/FunHub/hollow_purple.png",
      user: "Gojo Satoru"
    },
    {
      name: "Cursed Technique Reversal: Red",
      info: "Die Grundtechnik zur Erzeugung von Abstoßungskraft",
      img: "../Img/FunHub/red.png",
      user: "Gojo Satoru"
    },
    {
      name: "Cursed Technique Lapse: Blue",
      info: "Die Grundtechnik zur Erzeugung von Anziehungskraft",
      img: "../Img/FunHub/blue.png",
      user: "Gojo Satoru"
    },
    {
      name: "Ten Shadows Technique",
      info: "Beschwörungstechnik von 10 Shikigami mit verschiedenen Fähigkeiten",
      img: "../Img/FunHub/ten_shadows.png",
      user: "Megumi Fushiguro"
    },
    {
      name: "Straw Doll Technique",
      info: "Fast wie Stamm-Rituale nur mit Nägel und Puppen gedacht für Menschen",
      img: "../Img/FunHub/straw_doll.png",
      user: "Kugisaki Nobara"
    },
    {
      name: "Cursed Speech",
      info: "Befehlangabe über Worte mit Fluchenergie, welche aber großen Schaden beim Nutzer anrichten können",
      img: "../Img/FunHub/cursed_speech.png",
      user: "Toge Inumaki, Yuta Okkotsu"
    },
    {
      name: "Idle Transfiguration",
      info: "Direkte und unausweichliche Seelenmanipulation des Zieles",
      img: "../Img/FunHub/idle_transfiguration.png",
      user: "Mahito"
    },
    {
      name: "Boogie Woogie",
      info: "Durch Klatschen die Plätze zweier Ziele tauschen",
      img: "../Img/FunHub/boogie_woogie.png",
      user: "Aoi Todo"
    },
    {
      name: "Projection Sorcery",
      info: "Unterteilungen von Bewegungen in 24 FPS (Frames per Second)",
      img: "../Img/FunHub/projection_sorcery.png",
      user: "Naoya Zenin"
    },
    {
      name: "Simple Domain",
      info: "Neutralisiert die Domäne von den Gegnern kurzzeitig",
      img: "../Img/FunHub/simple_domain.png",
      user: "Kasumi Miwa"
    },
    {
      name: "Falling Blossom Emotion",
      info: "Blockierung von starken Angriffen durch reaktive Bewegungen",
      img: "../Img/FunHub/falling_blossom.png",
      user: "Gojo Satoru"
    },
    {
      name: "New Shadow Style",
      info: "Zenin-Stil zur Vorhersage von Bewegungen des Gegners",
      img: "../Img/FunHub/shadow_style.png",
      user: "Kusakabe Shinichi"
    },
    {
      name: "Disaster Flames",
      info: "Kontrolle über tödliche Flammenattacken, die nur Zerstörung bringen",
      img: "../Img/FunHub/disaster_flames.png",
      user: "Jogo"
    },
    {
      name: "Disaster Plants",
      info: "Kontrolle von Mutternatur, wo das Grüne um uns herum genutzt werden kann",
      img: "../Img/FunHub/disaster_plants.png",
      user: "Hanami"
    },
    {
      name: "Disaster Water",
      info: "Wassermanipulation, vor allem in Dagons Domäne auftretend",
      img: "../Img/FunHub/disaster_water.png",
      user: "Dagon"
    },
    {
      name: "Black Flash",
      info: "Treffer im perfekten Moment der Fluchenergie, der je nach Zufälligkeit auftreten kann",
      img: "../Img/FunHub/black_flash.png",
      user: "Gojo Satoru, Yuji Itadori"
    },
    {
      name: "Piercing Blood",
      info: "Eine Technik meistens benutzt von Choso, lässt einen blutroten Strahl aus und kann bei längeranhaltender Anwendung tödlich sein.",
      img: "../Img/FunHub/piercing.png",
      user: "Choso"
    },
    {
      name: "Heavenly Restriction",
      info: "Haben keine Fluchenergie sind, aber übermenschlich stark",
      img: "../Img/FunHub/heavenly_restriction.png",
      user: "Toji Fushiguro, Maki Zenin"
    },
    {
      name: "Copy Technique",
      info: "Replikation von anderen Techniken replizieren",
      img: "../Img/FunHub/copy.png",
      user: "Yuta Okkotsu"
    },
    {
      name: "Domain Amplification",
      info: "Neutralisiert automatische Techniken wie Gojos Unendlichkeit",
      img: "../Img/FunHub/domain_amplification.png",
      user: "Gojo Satoru"
    },
    {
      name: "Ratio Technique",
      info: "Nanami trifft im Verhältnis 7:3 für maximalen Schaden",
      img: "../Img/FunHub/ratio.png",
      user: "Nanami Kento"
    },
    {
      name: "Over Time",
      info: "Ähnlich wie ein Power-Up, nur dass dieser nach 17 Uhr auftritt",
      img: "../Img/FunHub/over_time.png",
      user: "Nanami Kento"
    },
    {
      name: "Construction",
      info: "Man kann damit Objekte erschaffen mit Energie und Wissen",
      img: "../Img/FunHub/construction.png",
      user: "Kinji Hakari"
    },
    {
      name: "Antigravity System",
      info: "Die Technik lässt den Benutzer schweben und sein Gewicht verändern",
      img: "../Img/FunHub/antigravity.png",
      user: "Kenjaku"
    },
    {
      name: "Fire Arrow",
      info: "Feuerpfeile mit zermürbender und explodierender Durchschlagskraft, lässt nur Asche zurück",
      img: "../Img/FunHub/fire_arrow.png",
      user: "Ryoumen Sukuna"
    },
    {
      name: "Ice Formation",
      info: "Gefriert Umgebung die Umgebung, kann nach Wunsch des Benutzers verändert werden",
      img: "../Img/FunHub/ice.png",
      user: "Uraume"
    },
    {
      name: "Soul Liberation Blade",
      info: "Greift direkt die Seele an, nachdem man das Ziel getroffen hat",
      img: "../Img/FunHub/soul_blade.png",
      user: "Maki Zenin"
    }
  ];  
  
  result.innerHTML = "<p>Drehe das Rad...</p>";
  document.getElementById("wheel-button").disabled = true;
  
  setTimeout(() => {
    const selection = techniques[Math.floor(Math.random() * techniques.length)];
    
    result.style.opacity = 0;
    
    setTimeout(() => {
      result.innerHTML = `
  <div class="technique-result">
    <img src="${selection.img}" alt="${selection.name}" class="technique-img">
    <h4>${selection.name}</h4>
    <p class="technique-description">${selection.info}</p>
    <p class="technique-description">Bekannte Nutzer: ${selection.user}</p>
  </div>`;

      result.style.opacity = 1;
      document.getElementById("wheel-button").disabled = false;
    }, 300);
  }, 1000);
}
  
  function resetWheel() {
    document.getElementById("wheel-result").textContent = "";
  }
  
  let currentLanguage = "de"; 

  document.querySelectorAll('.flag-btn').forEach(btn => {
    btn.addEventListener("click", () => {
      currentLanguage = btn.dataset.lang;
    });
  });
  
  const quizData_de = [
    { question: "Was ist Gojo Satorus Technik?", options: ["Cursed Speech", "Ten Shadows", "Limitless", "Idle Transfiguration"], answer: "Limitless" },
    { question: "Wer ist der Träger Sukunas?", options: ["Toji", "Yuji", "Megumi", "Nanami"], answer: "Yuji" },
    { question: "Wie viele Finger hat Sukuna insgesamt?", options: ["10", "15", "20", "5"], answer: "20" },
    { question: "Wie heißt Megumis Technik?", options: ["Idle Transfiguration", "Ten Shadows", "Straw Doll", "Black Flash"], answer: "Ten Shadows" },
    { question: "Wer benutzt 'Cursed Speech'?", options: ["Toge", "Gojo", "Yuji", "Nobara"], answer: "Toge" },
    { question: "Wer ist der Vater von Megumi?", options: ["Naobito", "Toji", "Gojo", "Geto"], answer: "Toji" },
    { question: "Was ist 'Black Flash'?", options: ["Verfluchter Angriff", "Teleportation", "Technik von Gojo", "Verfluchtes Objekt"], answer: "Verfluchter Angriff" },
    { question: "Wie lautet Nobaras Waffe?", options: ["Hammer und Nägel", "Schwert", "Puppe", "Dolch"], answer: "Hammer und Nägel" },
    { question: "Wer wurde von Kenjaku übernommen?", options: ["Suguru Geto", "Nanami", "Yuta", "Mahito"], answer: "Suguru Geto" },
    { question: "Wie heißt der Schüler mit Panda-Form?", options: ["Yuta", "Panda", "Toge", "Ino"], answer: "Panda" },
    { question: "Was ist Gojos besondere Fähigkeit?", options: ["Infinite Void", "Idle Transfiguration", "Ten Shadows", "Straw Doll"], answer: "Infinite Void" },
    { question: "Wer benutzt die Technik 'Idle Transfiguration'?", options: ["Mahito", "Kenjaku", "Toji", "Maki"], answer: "Mahito" },
    { question: "Wer ist ein Nachkomme des Zenin-Clans?", options: ["Maki", "Nobara", "Yuji", "Gojo"], answer: "Maki" },
    { question: "Wie heißt das verfluchte Werkzeug von Maki?", options: ["Playful Cloud", "Black Rope", "Katana", "Hammer"], answer: "Playful Cloud" },
    { question: "Was ist Nanamis Beruf gewesen?", options: ["Büroangestellter", "Arzt", "Lehrer", "Student"], answer: "Büroangestellter" },
    { question: "Wer war Gojos bester Freund?", options: ["Geto", "Nanami", "Yaga", "Toji"], answer: "Geto" },
    { question: "Was ist Yuji Itadoris Motivation?", options: ["Menschen retten", "Reich werden", "Gojo beeindrucken", "Rache"], answer: "Menschen retten" },
    { question: "Wer ist Mahito?", options: ["Verfluchter Geist", "Zauberer", "Lehrer", "Fluchjäger"], answer: "Verfluchter Geist" },
    { question: "Wer ist Yuta Okkotsu mit einer verfluchten Seele verbunden?", options: ["Rika", "Nobara", "Maki", "Panda"], answer: "Rika" },
    { question: "Was ist das Ziel des Fluchkönigs Sukuna?", options: ["Wiedergeburt", "Machtübernahme", "Rache", "Weltfrieden"], answer: "Wiedergeburt" }
  ];
  
  const quizData_en = [
    { question: "What is Gojo Satoru’s technique?", options: ["Cursed Speech", "Ten Shadows", "Limitless", "Idle Transfiguration"], answer: "Limitless" },
    { question: "Who is Sukuna’s vessel?", options: ["Toji", "Yuji", "Megumi", "Nanami"], answer: "Yuji" },
    { question: "How many fingers does Sukuna have in total?",options: ["10", "15", "20", "5"], answer: "20" },
    { question: "What is the name of Megumi’s technique?", options: ["Idle Transfiguration", "Ten Shadows", "Straw Doll", "Black Flash"], answer: "Ten Shadows" },
    { question: "Who uses 'Cursed Speech'?", options: ["Toge", "Gojo", "Yuji", "Nobara"], answer: "Toge" },
    { question: "Who is Megumi’s father?", options: ["Naobito", "Toji", "Gojo", "Geto"], answer: "Toji" },
    { question: "What is 'Black Flash'?", options: ["Cursed attack", "Teleportation", "Gojo’s technique", "Cursed object"], answer: "Cursed attack" },
    { question: "What is Nobara’s weapon?", options: ["Hammer and nails", "Sword", "Doll", "Dagger"], answer: "Hammer and nails" },
    { question: "Who was taken over by Kenjaku?", options: ["Suguru Geto", "Nanami", "Yuta", "Mahito"], answer: "Suguru Geto" },
    { question: "Which student has a panda form?", options: ["Yuta", "Panda", "Toge", "Ino"], answer: "Panda" },
    { question: "What is Gojo’s special ability?", options: ["Infinite Void", "Idle Transfiguration", "Ten Shadows", "Straw Doll"], answer: "Infinite Void" },
    { question: "Who uses the technique 'Idle Transfiguration'?", options: ["Mahito", "Kenjaku", "Toji", "Maki"], answer: "Mahito" },
    { question: "Who is a descendant of the Zenin Clan?", options: ["Maki", "Nobara", "Yuji", "Gojo"], answer: "Maki" },
    { question: "What is the name of Maki’s cursed tool?", options: ["Playful Cloud", "Black Rope", "Katana", "Hammer"], answer: "Playful Cloud" },
    { question: "What was Nanami’s profession?", options: ["Office worker", "Doctor", "Teacher", "Student"], answer: "Office worker"},
    { question: "Who was Gojo’s best friend?", options: ["Geto", "Nanami", "Yaga", "Toji"], answer: "Geto" },
    { question: "What is Yuji Itadori’s motivation?", options: ["Saving people", "Getting rich", "Impressing Gojo", "Revenge"], answer: "Saving people" },
    { question: "Who is Mahito?", options: ["Cursed spirit", "Sorcerer", "Teacher", "Curse hunter"], answer: "Cursed spirit"},
    { question: "Who is Yuta Okkotsu bound to through a cursed soul?", options: ["Rika", "Nobara", "Maki", "Panda"], answer: "Rika" },
    { question: "What is the goal of the curse king Sukuna?", options: ["Rebirth", "Take over power", "Revenge", "World peace"], answer: "Rebirth"}
  ];

  const quoteData_de = [
    { quote: "Ich bin der stärkste.", options: ["Gojo", "Sukuna", "Nanami", "Yuji"], answer: "Gojo" },
    { quote: "Jeder in meiner Familie hat eine Rolle. Ich war das Opfer.", options: ["Megumi", "Toji", "Yuji", "Geto"], answer: "Megumi" },
    { quote: "Ich bin kein Held. Ich bin ein Zauberer.", options: ["Yuji", "Gojo", "Nobara", "Panda"], answer: "Yuji" },
    { quote: "Menschen sind faszinierend.", options: ["Geto", "Mahito", "Kenjaku", "Gojo"], answer: "Geto" },
    { quote: "Ich töte nicht ohne Grund.", options: ["Toji", "Maki", "Nanami", "Gojo"], answer: "Toji" },
    { quote: "Ich sterbe lieber als ein Monster, als als jemand, der nichts tut.", options: ["Yuji", "Megumi", "Yuta", "Toji"], answer: "Yuji" },
    { quote: "Wenn Gerechtigkeit nicht existiert, erschaffe ich sie selbst.", options: ["Geto", "Nanami", "Gojo", "Yuji"], answer: "Geto" },
    { quote: "Ich bin nicht besonders stark, ich bin einfach gewöhnt zu sterben.", options: ["Nanami", "Yuji", "Maki", "Toji"], answer: "Nanami" },
    { quote: "Ich hasse es, wenn jemand über sein Leben bestimmt.", options: ["Nobara", "Maki", "Gojo", "Yuji"], answer: "Nobara" },
    { quote: "Ich bin kein Spielzeug. Ich bin Panda.", options: ["Panda", "Toge", "Yuta", "Mahito"], answer: "Panda" },
    { quote: "Stärke ohne Liebe ist nichts wert.", options: ["Yaga", "Gojo", "Yuji", "Nanami"], answer: "Yaga" },
    { quote: "Du solltest nicht leben, weil du musst – sondern weil du willst.", options: ["Nanami", "Yuji", "Yuta", "Maki"], answer: "Nanami" },
    { quote: "Warum kämpfen wir überhaupt?", options: ["Megumi", "Yuji", "Gojo", "Toge"], answer: "Yuji" },
    { quote: "Verfluchte Energie kommt aus negativen Emotionen.", options: ["Gojo", "Yaga", "Geto", "Mahito"], answer: "Gojo" },
    { quote: "Ich habe keine Angst zu sterben. Ich habe Angst, nicht zu leben.", options: ["Yuji", "Nobara", "Maki", "Toji"], answer: "Nobara" },
    { quote: "Jeder Mensch trägt ein Gewicht, das er nicht zeigt.", options: ["Nanami", "Yuta", "Geto", "Megumi"], answer: "Megumi" },
    { quote: "Die Welt ist nicht gerecht, also sei du es.", options: ["Gojo", "Nanami", "Yuji", "Maki"], answer: "Nanami" },
    { quote: "Meine Technik ist nicht elegant – aber sie funktioniert.", options: ["Maki", "Toji", "Yuta", "Nobara"], answer: "Maki" },
    { quote: "Ich will, dass niemand stirbt.", options: ["Yuji", "Gojo", "Megumi", "Yuta"], answer: "Yuji" },
    { quote: "Die Schwachen haben keinen Platz in dieser Welt.", options: ["Naoya", "Toji", "Kenjaku", "Mahito"], answer: "Naoya" }
  ];

  const quoteData_en = [
    { quote: "I am the strongest.", options: ["Gojo", "Sukuna", "Nanami", "Yuji"], answer: "Gojo" },
    { quote: "Everyone in my family had a role. I was the victim.", options: ["Megumi", "Toji", "Yuji", "Geto"], answer: "Megumi" },
    { quote: "I'm not a hero. I'm a sorcerer.", options: ["Yuji", "Gojo", "Nobara", "Panda"], answer: "Yuji" },
    { quote: "Humans are fascinating.", options: ["Geto", "Mahito", "Kenjaku", "Gojo"], answer: "Geto" },
    { quote: "I don't kill without a reason.", options: ["Toji", "Maki", "Nanami", "Gojo"], answer: "Toji" },
    { quote: "I'd rather die as a monster than live doing nothing.", options: ["Yuji", "Megumi", "Yuta", "Toji"], answer: "Yuji" },
    { quote: "If justice doesn't exist, then I'll create it myself.", options: ["Geto", "Nanami", "Gojo", "Yuji"], answer: "Geto" },
    { quote: "I'm not particularly strong, I'm just used to dying.", options: ["Nanami", "Yuji", "Maki", "Toji"], answer: "Nanami" },
    { quote: "I hate when someone decides how you should live.", options: ["Nobara", "Maki", "Gojo", "Yuji"], answer: "Nobara" },
    { quote: "I'm not a toy. I'm Panda.", options: ["Panda", "Toge", "Yuta", "Mahito"], answer: "Panda" },
    { quote: "Strength without love is worthless.", options: ["Yaga", "Gojo", "Yuji", "Nanami"], answer: "Yaga" },
    { quote: "You shouldn't live because you have to – but because you want to.", options: ["Nanami", "Yuji", "Yuta", "Maki"], answer: "Nanami" },
    { quote: "Why do we even fight?", options: ["Megumi", "Yuji", "Gojo", "Toge"], answer: "Yuji" },
    { quote: "Cursed energy comes from negative emotions.", options: ["Gojo", "Yaga", "Geto", "Mahito"], answer: "Gojo" },
    { quote: "I'm not afraid to die. I'm afraid of not living.", options: ["Yuji", "Nobara", "Maki", "Toji"], answer: "Nobara" },
    { quote: "Everyone carries a weight they don’t show.", options: ["Nanami", "Yuta", "Geto", "Megumi"], answer: "Megumi" },
    { quote: "The world isn't fair, so you must be.", options: ["Gojo", "Nanami", "Yuji", "Maki"], answer: "Nanami" },
    { quote: "My technique isn’t elegant – but it works.", options: ["Maki", "Toji", "Yuta", "Nobara"], answer: "Maki" },
    { quote: "I don't want anyone to die.", options: ["Yuji", "Gojo", "Megumi", "Yuta"], answer: "Yuji" },
    { quote: "The weak have no place in this world.", options: ["Naoya", "Toji", "Kenjaku", "Mahito"], answer: "Naoya" }
  ];

  const extraQuizModes = {
    power: [
      { question: "Wie stark ist Gojo Satoru?", options: ["7", "8", "9", "10"], answer: "10" },
      { question: "Wie stark ist Panda?", options: ["4", "6", "8", "5"], answer: "6" }
    ],
    technique: [
      { question: "Welche Technik nutzt Megumi?", options: ["Zehn-Schattentechnik", "Unendlichkeit", "Flammenbeschwörung", "Domen-Einbruch"], answer: "Zehn-Schattentechnik" }
    ],
    facts: [
      { question: "Yuji stammt aus der Zenin-Familie.", options: ["Wahr", "Falsch"], answer: "Falsch" }
    ]
  };
  
  function getContextQuotes() {
    return currentLanguage === "de"
      ? getRandomSubset([
          { quote: "Ich werde euch alle beschützen, selbst wenn es mein Leben kostet.", options: ["Vor Turnier", "Beim Kampf gegen Mahito", "Nach dem Examen", "Beim Training"], answer: "Beim Kampf gegen Mahito" },
          { quote: "Ich werde euch zeigen, wie man wirklich kämpft.", options: ["Beim ersten Training", "Im Turnier", "Gegen Fluchgeist", "In Shibuya"], answer: "Im Turnier" },
          { quote: "Ich bin kein Held, ich bin ein Zauberer.", options: ["Im Klassenzimmer", "Während einer Mission", "Gegen Mahito", "Im Krankenhaus"], answer: "Während einer Mission" },
          { quote: "Wir müssen zusammenhalten, sonst verlieren wir.", options: ["Vor dem Turnier", "Vor Shibuya", "Nach dem Examen", "Im Krankenhaus"], answer: "Vor Shibuya" },
          { quote: "Warum kämpfen wir überhaupt?", options: ["In Shibuya", "Während eines Gesprächs mit Gojo", "Nach dem Examen", "Beim Kampf gegen Kenjaku"], answer: "Während eines Gesprächs mit Gojo" },
          { quote: "Ich habe keine Angst zu sterben.", options: ["Im Turnier", "Im Kampf gegen Fluch", "Bei Mahito", "Vor Shibuya"], answer: "Im Kampf gegen Fluch" },
          { quote: "Cursed Energy kommt aus negativen Emotionen.", options: ["Unterricht von Gojo", "Im Kampf gegen Sukuna", "Nach Mahitos Angriff", "Im Krankenhaus"], answer: "Unterricht von Gojo" },
          { quote: "Ich hasse es, wenn jemand über mein Leben bestimmt.", options: ["Nach dem Turnier", "Nach dem Kampf gegen Naoya", "Beim Training", "Vor dem Examen"], answer: "Nach dem Kampf gegen Naoya" },
          { quote: "Verfluchte Energie ist nichts ohne Kontrolle.", options: ["Im Unterricht", "Im Kampf gegen Geto", "Vor Mahito", "In der Schule"], answer: "Im Unterricht" },
          { quote: "Ich bin kein Spielzeug – ich bin Panda.", options: ["Vor einem Kampf", "Nach einem Spruch von Gojo", "In der Schule", "In Shibuya"], answer: "In der Schule" }
        ], 10)
      : getRandomSubset([
          { quote: "I’ll protect you all — even if it costs my life.", options: ["Before the tournament", "During the fight with Mahito", "After the exam", "During training"], answer: "During the fight with Mahito" },
          { quote: "I’ll show you how to fight properly.", options: ["First training", "In the tournament", "Against a curse", "In Shibuya"], answer: "In the tournament" },
          { quote: "I'm not a hero. I'm a sorcerer.", options: ["In the classroom", "During a mission", "Against Mahito", "In the hospital"], answer: "During a mission" },
          { quote: "We must stick together or we lose.", options: ["Before the tournament", "Before Shibuya", "After the exam", "In the hospital"], answer: "Before Shibuya" },
          { quote: "Why do we even fight?", options: ["In Shibuya", "Talking to Gojo", "After the exam", "Fighting Kenjaku"], answer: "Talking to Gojo" },
          { quote: "I'm not afraid to die.", options: ["In the tournament", "Fighting a curse", "With Mahito", "Before Shibuya"], answer: "Fighting a curse" },
          { quote: "Cursed energy comes from negative emotions.", options: ["During Gojo’s lesson", "Fighting Sukuna", "After Mahito", "In hospital"], answer: "During Gojo’s lesson" },
          { quote: "I hate when someone controls my life.", options: ["After the tournament", "After fighting Naoya", "During training", "Before the exam"], answer: "After fighting Naoya" },
          { quote: "Cursed energy is nothing without control.", options: ["In class", "Fighting Geto", "Before Mahito", "At school"], answer: "In class" },
          { quote: "I’m not a toy – I’m Panda.", options: ["Before a fight", "After Gojo’s joke", "At school", "In Shibuya"], answer: "At school" }
        ], 10);
  }

  function getRankQuotes() {
    return currentLanguage === "de"
      ? getRandomSubset([
          { quote: "Vertrauen ist nichts, was man einfach gibt – man verdient es.", options: ["Schüler", "1. Klasse", "Spezialrang", "Fluchgeist"], answer: "Spezialrang" },
          { quote: "Ich bin kein Spielzeug.", options: ["Schüler", "Fluch", "Spezialrang", "1. Klasse"], answer: "Schüler" },
          { quote: "Ich habe gesehen, wie die Welt stirbt.", options: ["Spezialrang", "1. Klasse", "Fluchgeist", "Schüler"], answer: "Fluchgeist" },
          { quote: "Manchmal muss man tun, was man hasst.", options: ["1. Klasse", "Schüler", "2. Klasse", "Fluch"], answer: "1. Klasse" },
          { quote: "Ich werde nie jemanden zurücklassen.", options: ["Schüler", "1. Klasse", "Spezialrang", "Unklassifiziert"], answer: "1. Klasse" },
          { quote: "Was ist ein Fluch ohne Angst?", options: ["Fluchgeist", "Spezialrang", "Schüler", "Unbekannt"], answer: "Fluchgeist" },
          { quote: "Stärke bedeutet Verantwortung.", options: ["Spezialrang", "1. Klasse", "2. Klasse", "Fluchgeist"], answer: "Spezialrang" },
          { quote: "Die Wahrheit ist manchmal verflucht.", options: ["Fluchgeist", "1. Klasse", "Spezialrang", "Schüler"], answer: "Fluchgeist" },
          { quote: "Ich bin nicht hier, um nett zu sein.", options: ["1. Klasse", "Spezialrang", "Schüler", "Fluchgeist"], answer: "1. Klasse" },
          { quote: "Ich bin der Stärkste.", options: ["Spezialrang", "1. Klasse", "Schüler", "Unklassifiziert"], answer: "Spezialrang" }
        ], 10)
      : getRandomSubset([
          { quote: "Trust isn’t something you give — it’s something you earn.", options: ["Student", "Grade 1", "Special Grade", "Cursed Spirit"], answer: "Special Grade" },
          { quote: "I’m not a toy.", options: ["Student", "Curse", "Special Grade", "Grade 1"], answer: "Student" },
          { quote: "I’ve seen the world die.", options: ["Special Grade", "Grade 1", "Cursed Spirit", "Student"], answer: "Cursed Spirit" },
          { quote: "Sometimes you must do what you hate.", options: ["Grade 1", "Student", "Grade 2", "Curse"], answer: "Grade 1" },
          { quote: "I will never leave anyone behind.", options: ["Student", "Grade 1", "Special Grade", "Unclassified"], answer: "Grade 1" },
          { quote: "What is a curse without fear?", options: ["Cursed Spirit", "Special Grade", "Student", "Unknown"], answer: "Cursed Spirit" },
          { quote: "Strength means responsibility.", options: ["Special Grade", "Grade 1", "Grade 2", "Cursed Spirit"], answer: "Special Grade" },
          { quote: "Truth is sometimes cursed.", options: ["Cursed Spirit", "Grade 1", "Special Grade", "Student"], answer: "Cursed Spirit" },
          { quote: "I’m not here to be nice.", options: ["Grade 1", "Special Grade", "Student", "Cursed Spirit"], answer: "Grade 1" },
          { quote: "I am the strongest.", options: ["Special Grade", "Grade 1", "Student", "Unclassified"], answer: "Special Grade" }
        ], 10);
  }

  function getRealOrFakeQuotes() {
    return currentLanguage === "de"
      ? getRandomSubset([
          { quote: "Ein Jujuzist weint nicht – er zerlegt.", options: ["Echt", "Fan-Erfindung"], answer: "Fan-Erfindung" },
          { quote: "Ich bin kein Held. Ich bin ein Zauberer.", options: ["Echt", "Fan-Erfindung"], answer: "Echt" },
          { quote: "Verfluchte Liebe ist auch eine Form der Macht.", options: ["Echt", "Fan-Erfindung"], answer: "Fan-Erfindung" },
          { quote: "Ich bin Panda. Das reicht.", options: ["Echt", "Fan-Erfindung"], answer: "Echt" },
          { quote: "Nur Schwäche braucht Mitgefühl.", options: ["Echt", "Fan-Erfindung"], answer: "Fan-Erfindung" },
          { quote: "Ich werde nicht sterben, bevor ich verstanden wurde.", options: ["Fan-Erfindung", "Echt"], answer: "Fan-Erfindung" },
          { quote: "Ich hasse es zu verlieren.", options: ["Echt", "Fan-Erfindung"], answer: "Echt" },
          { quote: "Der Tod ist nur ein weiteres Tor.", options: ["Fan-Erfindung", "Echt"], answer: "Fan-Erfindung" },
          { quote: "Du bist schwach. Und das ist okay.", options: ["Fan-Erfindung", "Echt"], answer: "Fan-Erfindung" },
          { quote: "Ich bin der stärkste.", options: ["Echt", "Fan-Erfindung"], answer: "Echt" }
        ], 10)
      : getRandomSubset([
          { quote: "A sorcerer doesn’t cry – he breaks things.", options: ["Real", "Fan-Made"], answer: "Fan-Made" },
          { quote: "I’m not a hero. I’m a sorcerer.", options: ["Real", "Fan-Made"], answer: "Real" },
          { quote: "Cursed love is still power.", options: ["Real", "Fan-Made"], answer: "Fan-Made" },
          { quote: "I’m Panda. That’s enough.", options: ["Real", "Fan-Made"], answer: "Real" },
          { quote: "Only weakness needs compassion.", options: ["Real", "Fan-Made"], answer: "Fan-Made" },
          { quote: "I won't die before being understood.", options: ["Fan-Made", "Real"], answer: "Fan-Made" },
          { quote: "I hate to lose.", options: ["Real", "Fan-Made"], answer: "Real" },
          { quote: "Death is just another door.", options: ["Fan-Made", "Real"], answer: "Fan-Made" },
          { quote: "You’re weak. And that’s okay.", options: ["Fan-Made", "Real"], answer: "Fan-Made" },
          { quote: "I am the strongest.", options: ["Real", "Fan-Made"], answer: "Real" }
        ], 10);
  }
  
  function getQuizQuestionsByMode(mode) {
    if (mode === "general") return getGeneralQuiz();
    if (mode === "power") return getPowerQuiz();
    if (mode === "technique") return getTechniqueQuiz();
    if (mode === "facts") return getFactsQuiz();
    return [];
  }
  
  function getQuoteQuestionsByMode(mode) {
    const data = currentLanguage === "de" ? quoteData_de : quoteData_en;
  
    if (mode === "classic") return getRandomSubset(data, 10);
    if (mode === "rank") return getRankQuotes();
    if (mode === "context") return getContextQuotes();
    if (mode === "realorfake") return getRealOrFakeQuotes();
  
    return [];
  }
  
  function startQuiz() {
    const mode = document.getElementById("quiz-mode-select").value;
    const questions = getQuizQuestionsByMode(mode);
    showQuiz(questions, "quiz-game");
  }
  
  function startQuoteGame() {
    const mode = document.getElementById("quote-mode-select").value;
    const questions = getQuoteQuestionsByMode(mode);
    showQuiz(questions, "quote-game", true);
  }

  function getGeneralQuiz() {
    const data = currentLanguage === "de" ? quizData_de : quizData_en;
    return getRandomSubset(data, 10);
  }
  
  const factsQuiz_de = [
    { question: "Yuji stammt aus der Zenin-Familie.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Gojo trägt immer eine Sonnenbrille.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Sukuna war einst ein Mensch.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Megumi ist ein Schüler der ersten Klasse.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Nanami ist jünger als Yuji.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Yuta Okkotsu ist stärker als Gojo.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Maki kann verfluchte Energie sehen.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Toge kann normale Sprache verwenden.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Mahito manipuliert Seelen.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Geto war nie ein Verbündeter Gojos.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Panda ist ein echter Panda.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Gojo unterrichtet an der Jujutsu-Schule.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Die Technik 'Black Flash' ist extrem selten.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Kenjaku ist Mahitos Meister.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Yuji kann Domen beschwören.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Nobara benutzt ein Schwert.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Sukuna hat 20 Finger.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Jujutsu Kaisen spielt in einer Fantasiewelt.", options: ["Wahr", "Falsch"], answer: "Falsch" },
    { question: "Yaga ist der Direktor der Schule.", options: ["Wahr", "Falsch"], answer: "Wahr" },
    { question: "Gojo kann sich teleportieren.", options: ["Wahr", "Falsch"], answer: "Falsch" }
  ];

  const factsQuiz_en = [
    { question: "Yuji is from the Zenin family.", options: ["True", "False"], answer: "False" },
    { question: "Gojo always wears sunglasses.", options: ["True", "False"], answer: "False" },
    { question: "Sukuna was once human.", options: ["True", "False"], answer: "True" },
    { question: "Megumi is a first-grade student.", options: ["True", "False"], answer: "True" },
    { question: "Nanami is younger than Yuji.", options: ["True", "False"], answer: "False" },
    { question: "Yuta Okkotsu is stronger than Gojo.", options: ["True", "False"], answer: "False" },
    { question: "Maki can see cursed energy.", options: ["True", "False"], answer: "False" },
    { question: "Toge can speak normally.", options: ["True", "False"], answer: "False" },
    { question: "Mahito manipulates souls.", options: ["True", "False"], answer: "True" },
    { question: "Geto was never Gojo’s ally.", options: ["True", "False"], answer: "False" },
    { question: "Panda is a real panda.", options: ["True", "False"], answer: "False" },
    { question: "Gojo teaches at the Jujutsu school.", options: ["True", "False"], answer: "True" },
    { question: "'Black Flash' is extremely rare.", options: ["True", "False"], answer: "True" },
    { question: "Kenjaku is Mahito’s master.", options: ["True", "False"], answer: "True" },
    { question: "Yuji can summon domains.", options: ["True", "False"], answer: "False" },
    { question: "Nobara uses a sword.", options: ["True", "False"], answer: "False" },
    { question: "Sukuna has 20 fingers.", options: ["True", "False"], answer: "True" },
    { question: "Jujutsu Kaisen takes place in a fantasy world.", options: ["True", "False"], answer: "False" },
    { question: "Yaga is the headmaster of the school.", options: ["True", "False"], answer: "True" },
    { question: "Gojo can teleport.", options: ["True", "False"], answer: "False" }
  ];
  

  function getFactsQuiz() {
    return getRandomSubset(currentLanguage === "de" ? factsQuiz_de : factsQuiz_en, 10);
  }
  
  const techniqueQuiz_de = [
    { question: "Welche Technik nutzt Gojo?", options: ["Unendlichkeit", "Zehn-Schattentechnik", "Idle Transfiguration", "Cursed Speech"], answer: "Unendlichkeit" },
    { question: "Was ist Gojos ultimative Technik?", options: ["Unendliche Leere", "Schwarzer Blitz", "Spielende Wolke", "Zerfall"], answer: "Unendliche Leere" },
    { question: "Wer nutzt 'Cursed Speech'?", options: ["Toge", "Yuta", "Megumi", "Kenjaku"], answer: "Toge" },
    { question: "Was benutzt Nobara als Waffe?", options: ["Hammer und Nägel", "Katana", "Dolch", "Puppe"], answer: "Hammer und Nägel" },
    { question: "Was ist Mahitos Technik?", options: ["Idle Transfiguration", "Unendlichkeit", "Zehn Schatten", "Flammenruf"], answer: "Idle Transfiguration" },
    { question: "Welche Technik nutzt Megumi?", options: ["Zehn-Schattentechnik", "Unendlichkeit", "Cursed Speech", "Idle Transfiguration"], answer: "Zehn-Schattentechnik" },
    { question: "Was macht die Technik 'Idle Transfiguration'?", options: ["Verändert Seelen", "Verlangsamt Zeit", "Beschwört Schatten", "Stellt Heilung bereit"], answer: "Verändert Seelen" },
    { question: "Welche Technik nutzt Sukuna?", options: ["Zerfall", "Schlitz und Brand", "Fluchflamme", "Blutgeißel"], answer: "Schlitz und Brand" },
    { question: "Was ist Yutas Hauptfähigkeit?", options: ["Rika", "Zehn Schatten", "Unendliche Leere", "Red Reverse"], answer: "Rika" },
    { question: "Welches Werkzeug nutzt Maki?", options: ["Spielende Wolke", "Black Rope", "Schwarzer Blitz", "Dolch"], answer: "Spielende Wolke" },
    { question: "Was ist 'Black Flash'?", options: ["Ein verstärkter Schlag", "Teleportation", "Schattenangriff", "Heiltechnik"], answer: "Ein verstärkter Schlag" },
    { question: "Wer kann keine verfluchte Energie nutzen?", options: ["Maki", "Yuji", "Gojo", "Nanami"], answer: "Maki" },
    { question: "Was ist die Basis von Gojos Technik?", options: ["Raumverzerrung", "Zeitkontrolle", "Unendliche Distanz", "Flammen"], answer: "Unendliche Distanz" },
    { question: "Was erzeugt Megumis Technik?", options: ["Shikigami", "Blitze", "Feuer", "Dome"], answer: "Shikigami" },
    { question: "Welche Technik verhindert, dass man Gojo berühren kann?", options: ["Unendlichkeit", "Unendliche Leere", "Schattenfeld", "Barriere"], answer: "Unendlichkeit" },
    { question: "Was macht 'Cursed Speech'?", options: ["Zwingt zum Gehorchen", "Lässt schweben", "Lässt Gegner schlafen", "Löscht Erinnerungen"], answer: "Zwingt zum Gehorchen" },
    { question: "Welche Technik nutzt Naobito?", options: ["Projektionszauber", "Fluchsplitter", "Schockwelle", "Zeitfaltung"], answer: "Projektionszauber" },
    { question: "Was macht 'Red Reverse'?", options: ["Zurückstoßen", "Heilen", "Beschleunigen", "Ziehen"], answer: "Zurückstoßen" },
    { question: "Welche Technik ist selten und spontan?", options: ["Black Flash", "Unendliche Leere", "Shikigami", "Red Reverse"], answer: "Black Flash" },
    { question: "Welcher Charakter nutzt keine Technik?", options: ["Toji", "Megumi", "Yuji", "Kenjaku"], answer: "Toji" }
  ];

  const techniqueQuiz_en = [
    { question: "What is Gojo’s main technique?", options: ["Infinity", "Ten Shadows", "Idle Transfiguration", "Cursed Speech"], answer: "Infinity" },
    { question: "What is Gojo’s ultimate move?", options: ["Infinite Void", "Black Flash", "Playful Cloud", "Decay"], answer: "Infinite Void" },
    { question: "Who uses 'Cursed Speech'?", options: ["Toge", "Yuta", "Megumi", "Kenjaku"], answer: "Toge" },
    { question: "What weapon does Nobara use?", options: ["Hammer and nails", "Katana", "Dagger", "Doll"], answer: "Hammer and nails" },
    { question: "What is Mahito’s technique?", options: ["Idle Transfiguration", "Infinity", "Ten Shadows", "Flame Summon"], answer: "Idle Transfiguration" },
    { question: "Which technique does Megumi use?", options: ["Ten Shadows Technique", "Infinity", "Cursed Speech", "Idle Transfiguration"], answer: "Ten Shadows Technique" },
    { question: "What does 'Idle Transfiguration' do?", options: ["Manipulates souls", "Slows time", "Summons shadows", "Heals"], answer: "Manipulates souls" },
    { question: "What technique does Sukuna use?", options: ["Decay", "Cleave and Dismantle", "Curse Flame", "Blood Scythe"], answer: "Cleave and Dismantle" },
    { question: "What is Yuta’s main power?", options: ["Rika", "Ten Shadows", "Infinite Void", "Red Reverse"], answer: "Rika" },
    { question: "What tool does Maki use?", options: ["Playful Cloud", "Black Rope", "Black Flash", "Dagger"], answer: "Playful Cloud" },
    { question: "What is 'Black Flash'?", options: ["An enhanced strike", "Teleportation", "Shadow attack", "Healing"], answer: "An enhanced strike" },
    { question: "Who cannot use cursed energy?", options: ["Maki", "Yuji", "Gojo", "Nanami"], answer: "Maki" },
    { question: "What is the basis of Gojo’s technique?", options: ["Spatial distortion", "Time control", "Infinite distance", "Flames"], answer: "Infinite distance" },
    { question: "What does Megumi’s technique summon?", options: ["Shikigami", "Lightning", "Fire", "Domain"], answer: "Shikigami" },
    { question: "Which technique prevents touching Gojo?", options: ["Infinity", "Infinite Void", "Shadow Barrier", "Shield"], answer: "Infinity" },
    { question: "What does 'Cursed Speech' do?", options: ["Forces obedience", "Levitation", "Sleep spell", "Memory wipe"], answer: "Forces obedience" },
    { question: "What technique does Naobito use?", options: ["Projection Sorcery", "Curse Splinter", "Shockwave", "Time fold"], answer: "Projection Sorcery" },
    { question: "What does 'Red Reverse' do?", options: ["Repels", "Heals", "Speeds up", "Pulls"], answer: "Repels" },
    { question: "Which technique is rare and spontaneous?", options: ["Black Flash", "Infinite Void", "Shikigami", "Red Reverse"], answer: "Black Flash" },
    { question: "Which character does not use techniques?", options: ["Toji", "Megumi", "Yuji", "Kenjaku"], answer: "Toji" }
  ];

  function getTechniqueQuiz() {
    return getRandomSubset(currentLanguage === "de" ? techniqueQuiz_de : techniqueQuiz_en, 10);
  }

  const powerQuiz_de = [
    { question: "Wie stark ist Gojo Satoru (1–10)?", options: ["7", "8", "9", "10"], answer: "10" },
    { question: "Wie stark ist Panda?", options: ["4", "6", "8", "5"], answer: "6" },
    { question: "Wie stark ist Sukuna in voller Form?", options: ["9", "10", "8", "7"], answer: "10" },
    { question: "Wie stark ist Nobara im Nahkampf?", options: ["6", "7", "8", "5"], answer: "7" },
    { question: "Wie stark ist Maki nach dem Zenin-Vorfall?", options: ["9", "7", "8", "10"], answer: "9" },
    { question: "Wie stark ist Yuta Okkotsu?", options: ["8", "9", "10", "7"], answer: "9" },
    { question: "Wie stark ist Mahito in seiner ersten Form?", options: ["6", "8", "9", "7"], answer: "7" },
    { question: "Wie stark ist Toji Fushiguro ohne verfluchte Energie?", options: ["8", "9", "10", "6"], answer: "9" },
    { question: "Wie stark ist Nanami im Vergleich zu Yuji?", options: ["gleich", "stärker", "schwächer", "unentschieden"], answer: "stärker" },
    { question: "Wie stark ist Kenjaku?", options: ["10", "9", "8", "7"], answer: "9" },
    { question: "Wie stark ist Toge bei vollem Einsatz?", options: ["7", "6", "8", "5"], answer: "7" },
    { question: "Wie stark ist Geto in seinem Prime?", options: ["10", "9", "8", "7"], answer: "9" },
    { question: "Wie stark ist Yuji am Anfang?", options: ["5", "4", "6", "3"], answer: "4" },
    { question: "Wie stark ist Inumaki bei Schwächen?", options: ["5", "6", "4", "3"], answer: "5" },
    { question: "Wie stark ist Shoko Ieiri im Kampf?", options: ["3", "4", "5", "6"], answer: "3" },
    { question: "Wie stark ist Gojo ohne Binden?", options: ["10", "9", "8", "7"], answer: "10" },
    { question: "Wie stark ist ein normaler Fluch der Klasse 1?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "Wie stark ist ein Fluch der Klasse S?", options: ["8", "9", "10", "11"], answer: "10" },
    { question: "Wie stark ist Rika als Fluchwesen?", options: ["9", "10", "8", "7"], answer: "10" },
    { question: "Wie stark ist Gojo mit der Unendlichen Leere?", options: ["10", "11", "9", "8"], answer: "10" }
  ];

  const powerQuiz_en = [
    { question: "How strong is Gojo Satoru (1–10)?", options: ["7", "8", "9", "10"], answer: "10" },
    { question: "How strong is Panda?", options: ["4", "6", "8", "5"], answer: "6" },
    { question: "How strong is Sukuna in full form?", options: ["9", "10", "8", "7"], answer: "10" },
    { question: "How strong is Nobara in close combat?", options: ["6", "7", "8", "5"], answer: "7" },
    { question: "How strong is Maki after the Zenin incident?", options: ["9", "7", "8", "10"], answer: "9" },
    { question: "How strong is Yuta Okkotsu?", options: ["8", "9", "10", "7"], answer: "9" },
    { question: "How strong is Mahito in his first form?", options: ["6", "8", "9", "7"], answer: "7" },
    { question: "How strong is Toji Fushiguro without cursed energy?", options: ["8", "9", "10", "6"], answer: "9" },
    { question: "How strong is Nanami compared to Yuji?", options: ["equal", "stronger", "weaker", "draw"], answer: "stronger" },
    { question: "How strong is Kenjaku?", options: ["10", "9", "8", "7"], answer: "9" },
    { question: "How strong is Toge at full power?", options: ["7", "6", "8", "5"], answer: "7" },
    { question: "How strong is Geto in his prime?", options: ["10", "9", "8", "7"], answer: "9" },
    { question: "How strong is Yuji at the beginning?", options: ["5", "4", "6", "3"], answer: "4" },
    { question: "How strong is Inumaki when weakened?", options: ["5", "6", "4", "3"], answer: "5" },
    { question: "How strong is Shoko Ieiri in combat?", options: ["3", "4", "5", "6"], answer: "3" },
    { question: "How strong is Gojo without blindfold?", options: ["10", "9", "8", "7"], answer: "10" },
    { question: "How strong is a standard Grade 1 curse?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "How strong is a Special Grade curse?", options: ["8", "9", "10", "11"], answer: "10" },
    { question: "How strong is Rika as a cursed spirit?", options: ["9", "10", "8", "7"], answer: "10" },
    { question: "How strong is Gojo using Infinite Void?", options: ["10", "11", "9", "8"], answer: "10" }
  ];
  

  function getPowerQuiz() {
    return getRandomSubset(currentLanguage === "de" ? powerQuiz_de : powerQuiz_en, 10);
  }

  function getRandomSubset(array, count = 10) {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  

function showQuiz(questions, containerId, isQuote = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  container.classList.remove("hidden");

  let current = 0;
  let score = 0;
  showNext();

  function showNext() {
    if (current >= questions.length) {
      showResults(score, questions.length, container);
      return;
    }

    const q = questions[current];
    const qElem = document.createElement("div");
    qElem.classList.add("question");

    if (isQuote) {
      qElem.innerHTML = `
        <div id="drop-zone" style="border:2px dashed #b82f10; padding:30px; margin-bottom:20px; min-height:40px;">
          <p style="font-style:italic;">"${q.quote}"</p>
          <div style="color:black; font-size:0.9em;">Ziehe die richtige Antwort hierher!</div>
        </div>
        <div id="drag-options" style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
          ${q.options.map(opt => `<button draggable="true" class="drag-btn" style="cursor:grab;">${opt}</button>`).join("")}
        </div>
      `;

      const dropZone = qElem.querySelector("#drop-zone");
      const dragBtns = qElem.querySelectorAll(".drag-btn");

      dropZone.addEventListener("dragover", e => {
        e.preventDefault();
        dropZone.style.background = "#ffe5e0";
      });
      dropZone.addEventListener("dragleave", () => {
        dropZone.style.background = "";
      });

      dragBtns.forEach(btn => {
        btn.addEventListener("dragstart", e => {
          e.dataTransfer.setData("text/plain", btn.textContent);
          setTimeout(() => btn.style.visibility = "hidden", 0);
        });
        btn.addEventListener("dragend", e => {
          btn.style.visibility = "";
        });
      });

      dropZone.addEventListener("drop", e => {
        e.preventDefault();
        dropZone.style.background = "";
        const answer = e.dataTransfer.getData("text/plain");
        dragBtns.forEach(b => b.disabled = true);

        if (answer === q.answer) {
          dropZone.innerHTML += `<div style="color:green; font-weight:bold;">✅ Richtig!</div>`;
          score++;
        } else {
          dropZone.innerHTML += `<div style="color:red; font-weight:bold;">❌ Falsch! (${q.answer})</div>`;
        }
        setTimeout(() => {
          current++;
          showNext();
        }, 1200);
      });
    } else {
      qElem.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map(opt => `<button>${opt}</button>`).join("")}
      `;

      const buttons = qElem.querySelectorAll("button");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          if (btn.textContent === q.answer) {
            btn.style.backgroundColor = "lightgreen";
            score++;
          } else {
            btn.style.backgroundColor = "lightcoral";
          }

          buttons.forEach(b => b.disabled = true);
          setTimeout(() => {
            current++;
            showNext();
          }, 800);
        });
      });
    }

    container.innerHTML = "";
    container.appendChild(qElem);
  }
}

  function showResults(score, total, container) {
    container.innerHTML = `
      <p>✅ ${score} von ${total} richtig!</p>
      <button onclick="restartGame('${container.id}')">Erneut spielen</button>
    `;
  }
  
  function restartGame(containerId) {
    if (containerId === "quiz-game") startQuiz();
    else startQuoteGame();
  }
  
let currentIndex = 0;

  function slide(direction) {
      const slider = document.getElementById("game-slider");
      const totalSlides = slider.children.length;

      currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;

      AOS.refreshHard();
  }

  document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
      duration: 800,
      once: false, 
    });
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