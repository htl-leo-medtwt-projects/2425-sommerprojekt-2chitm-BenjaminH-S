let rad = document.getElementById('rad');
let popup = document.getElementById('popup');

function Options() {
    popup.style.display = "block";
}

function closeOptions() {
    popup.style.display = "none";
}

rad.addEventListener("click", function(event) {
    event.preventDefault();
    Options();
});

function setGerman() {
    document.getElementById("settings-title").innerText = "Einstellungen"
    document.getElementById("contrast-label").innerText = "Kontrast"
    document.getElementById("language-label").innerText = "Sprache"
    document.getElementById("mediales").innerText = "Mediales"
    document.getElementById("welt").innerText = "Welt"
    document.getElementById("quiz").innerText = "Quiz"
    document.getElementById("geschichte").innerText = "Geschichte"
}

function setEnglish() {
    document.getElementById("settings-title").innerText = "Settings"
    document.getElementById("contrast-label").innerText = "Contrast"
    document.getElementById("language-label").innerText = "Language"
    document.getElementById("mediales").innerText = "Media"
    document.getElementById("welt").innerText = "World"
    document.getElementById("quiz").innerText = "Quiz"
    document.getElementById("geschichte").innerText = "Story"
}


document.getElementById("flag-de").addEventListener("click", setGerman);
document.getElementById("flag-en").addEventListener("click", setEnglish);
