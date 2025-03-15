let popup = document.getElementById('popup');
let contrastToggle = document.getElementById("contrast-toggle");

function toggleContrast() {
    if (document.body.classList.contains("light-mode")) {
     
        document.body.classList.remove("light-mode");
        localStorage.setItem("contrastMode", "dark");
    } else {
        
        document.body.classList.add("light-mode");
        localStorage.setItem("contrastMode", "light");
    }
}


if (localStorage.getItem("contrastMode") === "light") {
    document.body.classList.add("light-mode");
    contrastToggle.checked = true; 
}


contrastToggle.addEventListener("change", toggleContrast);


function Options() {
    popup.style.display = "block";
}

function closeOptions() {
    popup.style.display = "none";
}


document.getElementById('rad').addEventListener("click", function(event) {
    event.preventDefault();
    Options();
});

function setGerman() {
    document.getElementById("settings-title").innerText = "Einstellungen";
    document.getElementById("contrast-label").innerText = "Kontrast"; 

    document.getElementById("flag-de").parentElement.innerHTML = `
        <span id="language-label">Sprache</span>
        <button class="flag-btn" id="flag-de">
            <img src="../Img/Flags/deutsch.png" alt="Deutsch" width="100px" height="50px">
        </button>
        <button class="flag-btn" id="flag-en">
            <img src="../Img/Flags/englisch.png" alt="English" width="100px" height="50px">
        </button>`;

    document.getElementById("mediales").innerText = "Mediales";
    document.getElementById("welt").innerText = "Welt";
    document.getElementById("quiz").innerText = "Quiz";
    document.getElementById("geschichte").innerText = "Geschichte";

    addEventListeners(); 
}

function setEnglish() {
    document.getElementById("settings-title").innerhtml = "Settings";
    document.getElementById("contrast-label").innerText = "Contrast"; 

    document.getElementById("flag-de").parentElement.innerHTML = `
        <span id="language-label">Language</span>
        <button class="flag-btn" id="flag-de">
            <img src="../Img/Flags/deutsch.png" alt="Deutsch" width="100px" height="50px">
        </button>
        <button class="flag-btn" id="flag-en">
            <img src="../Img/Flags/englisch.png" alt="English" width="100px" height="50px">
        </button>`;

    document.getElementById("mediales").innerText = "Media";
    document.getElementById("welt").innerText = "World";
    document.getElementById("quiz").innerText = "Quiz";
    document.getElementById("geschichte").innerText = "Story";

    addEventListeners(); 
}

function addEventListeners() {
    document.getElementById("flag-de").addEventListener("click", setGerman);
    document.getElementById("flag-en").addEventListener("click", setEnglish);
}


if (localStorage.getItem("contrastMode") === "light") {
    document.body.classList.add("light-mode");
    document.getElementById("contrast-toggle").checked = true;
}
