/* Typing Effect */
const text = "Student | Web Developer | YouTube Creator";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }
}

typeEffect();

/* Scroll Reveal */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        if (elementTop < windowHeight - 120) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
