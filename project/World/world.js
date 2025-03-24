document.addEventListener("DOMContentLoaded", function () {
    console.log("world.js loaded!");

    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".section");

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetSection = this.getAttribute("data-section");
            sections.forEach(section => {
                if (section.getAttribute("data-section") == targetSection) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });
        });
    });

    const images = document.querySelectorAll(".clan img, .curse img, .character img");

    images.forEach(image => {
        image.addEventListener("click", function () {
            const detailPopup = document.createElement("div");
            detailPopup.classList.add("detail-popup");
            detailPopup.innerHTML = `
                <div class="popup-content">
                    <span class="close">&times;</span>
                    <h2>${this.alt}</h2>
                    <p>Details about ${this.alt}...</p>
                </div>
            `;
            document.body.appendChild(detailPopup);

            const closeButton = detailPopup.querySelector(".close");
            closeButton.addEventListener("click", function () {
                detailPopup.remove();
            });
        });
    });

    const navItems = document.querySelectorAll("ul li a");

    navItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const targetSection = this.getAttribute("id");
            sections.forEach(section => {
                if (section.getAttribute("data-section") == targetSection) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });
        });
    });
});