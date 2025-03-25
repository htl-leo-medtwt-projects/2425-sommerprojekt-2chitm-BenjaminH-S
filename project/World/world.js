document.addEventListener("DOMContentLoaded", function () {
    console.log("world.js loaded!");

    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll(".section");

    // Handle section switching for side menu
    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const targetSection = this.getAttribute("data-section");
            sections.forEach(section => {
                if (section.getAttribute("data-section") === targetSection) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });
        });
    });

    // Handle popups for images
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

    // Handle navigation links
    const navItems = document.querySelectorAll("ul li a");

    navItems.forEach(item => {
        item.addEventListener("click", function (event) {
            const targetSection = this.getAttribute("id");

            // Check if the link is for a section on the same page
            if (sections.some(section => section.getAttribute("data-section") === targetSection)) {
                event.preventDefault(); // Prevent navigation for same-page sections
                sections.forEach(section => {
                    if (section.getAttribute("data-section") === targetSection) {
                        section.classList.remove("hidden");
                    } else {
                        section.classList.add("hidden");
                    }
                });
            }
            // Otherwise, allow default navigation for external links
        });
    });
});