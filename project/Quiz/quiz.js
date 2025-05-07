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
        "quiz": "Quiz",
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
        "quiz": "Quiz",
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



function startMemoryGame() {
    const game = document.getElementById("memory-game");
    game.innerHTML = ""; 
    game.classList.remove("hidden");
  
    const chars = ["gojo", "megumi", "nobara", "yuji", "sukuna", "kenjaku"];
    const cards = [...chars, ...chars].sort(() => 0.5 - Math.random());
    let flipped = [];
  
    cards.forEach(char => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.innerHTML = `
        <div class="memory-card-inner">
          <div class="memory-front" style="background-image:url('../Img/FunHub/${char}.png')"></div>
          <div class="memory-back"></div>
        </div>`;
      card.addEventListener("click", () => flipCard(card, char));
      game.appendChild(card);
    });
  
    function flipCard(card, char) {
      if (card.classList.contains("flipped")) return;
      card.classList.add("flipped");
      flipped.push({ card, char });
  
      if (flipped.length === 2) {
        const [a, b] = flipped;
        if (a.char !== b.char) {
          setTimeout(() => {
            a.card.classList.remove("flipped");
            b.card.classList.remove("flipped");
          }, 1000);
        }
        flipped = [];
      }
    }
  }
  
  function replayMemoryGame() {
    startMemoryGame();
  }
  
  function spinWheel() {
    const result = document.getElementById("wheel-result");
    const techniques = ["Hollow Purple", "Ten Shadows", "Straw Doll", "Cursed Speech"];
    const selection = techniques[Math.floor(Math.random() * techniques.length)];
    result.textContent = `Du hast: ${selection}`;
  }
  
  function resetWheel() {
    document.getElementById("wheel-result").textContent = "";
  }
  
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
    {
      question: "What is Gojo Satoru’s technique?",
      options: ["Cursed Speech", "Ten Shadows", "Limitless", "Idle Transfiguration"],
      answer: "Limitless"
    },
    {
      question: "Who is Sukuna’s vessel?",
      options: ["Toji", "Yuji", "Megumi", "Nanami"],
      answer: "Yuji"
    },
    {
      question: "How many fingers does Sukuna have in total?",
      options: ["10", "15", "20", "5"],
      answer: "20"
    },
    {
      question: "What is the name of Megumi’s technique?",
      options: ["Idle Transfiguration", "Ten Shadows", "Straw Doll", "Black Flash"],
      answer: "Ten Shadows"
    },
    {
      question: "Who uses 'Cursed Speech'?",
      options: ["Toge", "Gojo", "Yuji", "Nobara"],
      answer: "Toge"
    },
    {
      question: "Who is Megumi’s father?",
      options: ["Naobito", "Toji", "Gojo", "Geto"],
      answer: "Toji"
    },
    {
      question: "What is 'Black Flash'?",
      options: ["Cursed attack", "Teleportation", "Gojo’s technique", "Cursed object"],
      answer: "Cursed attack"
    },
    {
      question: "What is Nobara’s weapon?",
      options: ["Hammer and nails", "Sword", "Doll", "Dagger"],
      answer: "Hammer and nails"
    },
    {
      question: "Who was taken over by Kenjaku?",
      options: ["Suguru Geto", "Nanami", "Yuta", "Mahito"],
      answer: "Suguru Geto"
    },
    {
      question: "Which student has a panda form?",
      options: ["Yuta", "Panda", "Toge", "Ino"],
      answer: "Panda"
    },
    {
      question: "What is Gojo’s special ability?",
      options: ["Infinite Void", "Idle Transfiguration", "Ten Shadows", "Straw Doll"],
      answer: "Infinite Void"
    },
    {
      question: "Who uses the technique 'Idle Transfiguration'?",
      options: ["Mahito", "Kenjaku", "Toji", "Maki"],
      answer: "Mahito"
    },
    {
      question: "Who is a descendant of the Zenin Clan?",
      options: ["Maki", "Nobara", "Yuji", "Gojo"],
      answer: "Maki"
    },
    {
      question: "What is the name of Maki’s cursed tool?",
      options: ["Playful Cloud", "Black Rope", "Katana", "Hammer"],
      answer: "Playful Cloud"
    },
    {
      question: "What was Nanami’s profession?",
      options: ["Office worker", "Doctor", "Teacher", "Student"],
      answer: "Office worker"
    },
    {
      question: "Who was Gojo’s best friend?",
      options: ["Geto", "Nanami", "Yaga", "Toji"],
      answer: "Geto"
    },
    {
      question: "What is Yuji Itadori’s motivation?",
      options: ["Saving people", "Getting rich", "Impressing Gojo", "Revenge"],
      answer: "Saving people"
    },
    {
      question: "Who is Mahito?",
      options: ["Cursed spirit", "Sorcerer", "Teacher", "Curse hunter"],
      answer: "Cursed spirit"
    },
    {
      question: "Who is Yuta Okkotsu bound to through a cursed soul?",
      options: ["Rika", "Nobara", "Maki", "Panda"],
      answer: "Rika"
    },
    {
      question: "What is the goal of the curse king Sukuna?",
      options: ["Rebirth", "Take over power", "Revenge", "World peace"],
      answer: "Rebirth"
    }
  ];
  
  
  
  function startQuiz() {
    const container = document.getElementById("quiz-game");
    if (!container) return;
  
    const quizButton = document.querySelector(".slide:nth-child(3) button");
    if (quizButton) quizButton.textContent = "Starten";
  
    container.classList.remove("hidden");
    container.innerHTML = "";
    let index = 0;
    let correctCount = 0;
  
    const lang = getCookie("language") || "de";
    const baseData = lang === "en" ? quizData_en : quizData_de;
    const shuffled = [...baseData].sort(() => 0.5 - Math.random());    
    const selectedQuestions = shuffled.slice(0, 5);
  
    showQuestion();
  
    function showQuestion() {
      const q = selectedQuestions[index];
      container.innerHTML = `<p>${q.question}</p>`;
  
      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.onclick = () => {
          const isCorrect = opt === q.answer;
          if (isCorrect) correctCount++;
  
          container.querySelectorAll(".quiz-option").forEach(b => {
            b.disabled = true;
            if (b.textContent === q.answer) {
              b.style.backgroundColor = "#4CAF50";
              b.style.color = "white";
            } else if (b.textContent === opt && !isCorrect) {
              b.style.backgroundColor = "#f44336";
              b.style.color = "white";
            } else {
              b.style.opacity = "0.6";
            }
          });
  
          setTimeout(() => {
            index++;
            if (index < selectedQuestions.length) {
              showQuestion();
            } else {
              showResults();
            }
          }, 1500);
        };
        container.appendChild(btn);
      });
    }
  
    function showResults() {
      container.innerHTML = `
        <h3>Quiz beendet!</h3>
        <p>Du hast <strong>${correctCount} von ${selectedQuestions.length}</strong> richtig beantwortet!</p>
      `;
  
      if (quizButton) quizButton.textContent = "Erneut spielen?";
    }
  }
  
  
  
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
  
  
  
  
  function startQuoteGame() {
    const container = document.getElementById("quote-game");
    if (!container) return;
  
    const quoteButton = document.querySelector(".slide:nth-child(4) button");
    if (quoteButton) quoteButton.textContent = "Starten";
  
    container.classList.remove("hidden");
    container.innerHTML = "";
    let index = 0;
    let correctCount = 0;
  
    const lang = getCookie("language") || "de";
    const baseQuotes = lang === "en" ? quoteData_en : quoteData_de;
    const shuffled = [...baseQuotes].sort(() => 0.5 - Math.random());    
    const selectedQuotes = shuffled.slice(0, 5);
  
    showQuote();
  
    function showQuote() {
      const q = selectedQuotes[index];
      container.innerHTML = `<p>„${q.quote}“</p>`;
  
      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quote-option";
        btn.textContent = opt;
        btn.onclick = () => {
          const isCorrect = opt === q.answer;
          if (isCorrect) correctCount++;
  
          container.querySelectorAll(".quote-option").forEach(b => {
            b.disabled = true;
            if (b.textContent === q.answer) {
              b.style.backgroundColor = "#4CAF50";
              b.style.color = "white";
            } else if (b.textContent === opt && !isCorrect) {
              b.style.backgroundColor = "#f44336";
              b.style.color = "white";
            } else {
              b.style.opacity = "0.6";
            }
          });
  
          setTimeout(() => {
            index++;
            if (index < selectedQuotes.length) {
              showQuote();
            } else {
              showResults();
            }
          }, 1500);
        };
        container.appendChild(btn);
      });
    }
  
    function showResults() {
      container.innerHTML = `
        <h3>Spiel beendet!</h3>
        <p>Du hast <strong>${correctCount} von ${selectedQuotes.length}</strong> richtig beantwortet!</p>
      `;
  
      if (quoteButton) quoteButton.textContent = "Erneut spielen?";
    }
  }
  
  
  
  let currentIndex = 0;

  function slide(direction) {
      const slider = document.getElementById("game-slider");
      const totalSlides = slider.children.length;
  
      currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  
  