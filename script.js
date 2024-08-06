const imgs = document.querySelectorAll(".header-slider ul img");
const preBtn = document.querySelector(".control-pre");
const nextBtn = document.querySelector(".control-next");

let currentIndex = 0;
let slideInterval;

function changeSlide(index) {
    imgs.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % imgs.length;
    changeSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    changeSlide(currentIndex);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

preBtn.addEventListener("click", () => {
    stopSlideShow();
    prevSlide();
    startSlideShow();
});

nextBtn.addEventListener("click", () => {
    stopSlideShow();
    nextSlide();
    startSlideShow();
});

document.addEventListener("DOMContentLoaded", () => {
    changeSlide(currentIndex);
    startSlideShow();
});

// Smooth horizontal scrolling for product containers
const scrollContainers = document.querySelectorAll(".products");

scrollContainers.forEach(container => {
    container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: 'smooth'
        });
    });
});

// Debounce function to optimize wheel event handling
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

scrollContainers.forEach(container => {
    container.addEventListener("wheel", debounce((e) => {
        e.preventDefault();
        container.scrollBy({
            left: e.deltaY < 0 ? -100 : 100,
            behavior: 'smooth'
        });
    }, 100));
});
