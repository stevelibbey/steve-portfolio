// Carousel functionality
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('carouselDots');

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update buttons
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides - 1;
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Modal functionality
function openModal(imageElement) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalContent');

    // Create an img element with the same src as the clicked image
    const imgSrc = imageElement.src;
    const imgAlt = imageElement.alt;
    modalContent.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;

    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
}

// Initialize carousel
updateCarousel();

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollIndicator').style.width = scrolled + '%';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveCarousel(-1);
    if (e.key === 'ArrowRight') moveCarousel(1);
    if (e.key === 'Escape') closeModal();
});
