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
        const searchBar = document.querySelector('input[type="text"]'); // Select the search bar
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
  
  const quizData = [
    {
      question: "Was ist Gojo Satorus Technik?",
      options: ["Cursed Speech", "Ten Shadows", "Limitless", "Idle Transfiguration"],
      answer: "Limitless"
    },
    {
      question: "Wer ist der Träger Sukunas?",
      options: ["Toji", "Yuji", "Megumi", "Nanami"],
      answer: "Yuji"
    }
  ];
  
  function startQuiz() {
    const container = document.getElementById("quiz-game");
    container.classList.remove("hidden");
    container.innerHTML = "";
    let index = 0;
  
    showQuestion();
  
    function showQuestion() {
      const q = quizData[index];
      container.innerHTML = `<p>${q.question}</p>`;
      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.onclick = () => {
          alert(opt === q.answer ? "Richtig!" : "Falsch!");
          index++;
          if (index < quizData.length) showQuestion();
          else container.innerHTML = "Quiz beendet!";
        };
        container.appendChild(btn);
      });
    }
  }
  
  const quoteData = [
    {
      quote: "Jeder in meiner Familie hat eine Rolle. Ich war das Opfer.",
      options: ["Toji", "Geto", "Yuji", "Megumi"],
      answer: "Megumi"
    },
    {
      quote: "Ich bin der stärkste.",
      options: ["Sukuna", "Gojo", "Mahito", "Nanami"],
      answer: "Gojo"
    }
  ];
  
  function startQuoteGame() {
    const container = document.getElementById("quote-game");
    container.classList.remove("hidden");
    container.innerHTML = "";
    let index = 0;
  
    showQuote();
  
    function showQuote() {
      const q = quoteData[index];
      container.innerHTML = `<p>„${q.quote}“</p>`;
      q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "quote-option";
        btn.textContent = opt;
        btn.onclick = () => {
          alert(opt === q.answer ? "Richtig!" : `Falsch! Richtige Antwort: ${q.answer}`);
          index++;
          if (index < quoteData.length) showQuote();
          else container.innerHTML = "Zitate-Spiel beendet!";
        };
        container.appendChild(btn);
      });
    }
  }
  
  let currentIndex = 0;

  function slide(direction) {
      const slider = document.getElementById("game-slider");
      const totalSlides = slider.children.length;
  
      currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  
  