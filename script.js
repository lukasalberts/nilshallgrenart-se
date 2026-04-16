const artworks = [
    { thumb: "images/thumb/verk-01.webp", full: "images/verk-01.webp", title: "Springande grönska" },
    { thumb: "images/thumb/verk-02.webp", full: "images/verk-02.webp", title: "Filosofisk kinesisk 8:a i rörelse" },
    { thumb: "images/thumb/verk-03.webp", full: "images/verk-03.webp", title: "Danskt stjärnspel" },
    { thumb: "images/thumb/verk-04.webp", full: "images/verk-04.webp", title: "Påsk på Österlen" },
    { thumb: "images/thumb/verk-05.webp", full: "images/verk-05.webp", title: "Ilska, hat och kärlek" },
    { thumb: "images/thumb/verk-06.webp", full: "images/verk-06.webp", title: "Norrsken" },
    { thumb: "images/thumb/verk-07.webp", full: "images/verk-07.webp", title: "Oändliga vägar" },
    { thumb: "images/thumb/verk-08.webp", full: "images/verk-08.webp", title: "Nyansernas tid" },
    { thumb: "images/thumb/verk-09.webp", full: "images/verk-09.webp", title: "Strömmande själafloden" },
    { thumb: "images/thumb/verk-10.webp", full: "images/verk-10.webp", title: "Lycklighetens taggar" },
    { thumb: "images/thumb/verk-11.webp", full: "images/verk-11.webp", title: "Färggranna blodkroppar" },
    { thumb: "images/thumb/verk-12.webp", full: "images/verk-12.webp", title: "Blodshimmel" },
    { thumb: "images/thumb/verk-13.webp", full: "images/verk-13.webp", title: "Sorgsen ursinnighet" },
    { thumb: "images/thumb/verk-14.webp", full: "images/verk-14.webp", title: "Skimrande melankoli" },
    { thumb: "images/thumb/verk-15.webp", full: "images/verk-15.webp", title: "Marina rörelser" },
    { thumb: "images/thumb/verk-16.webp", full: "images/verk-16.webp", title: "Kryssets biverkningar" },
    { thumb: "images/thumb/verk-17.webp", full: "images/verk-17.webp", title: "Solnedgången till Johanna" }
];

// Hero background — use a random artwork
const heroImg = new Image();
const heroIdx = Math.floor(Math.random() * artworks.length);
heroImg.onload = () => {
    document.getElementById("hero-bg").style.backgroundImage = `url(${artworks[heroIdx].full})`;
};
heroImg.src = artworks[heroIdx].full;

// Subtle parallax on hero
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const hero = document.getElementById("hero-bg");
    if (scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Sticky nav background on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 80);
});

// Build gallery
const gallery = document.getElementById("gallery");
artworks.forEach((art, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
        <img src="${art.thumb}" alt="${art.title}" loading="lazy">
        <div class="item-overlay">
            <p class="item-title">${art.title}</p>
        </div>
    `;
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
});

// Scroll reveal — IntersectionObserver
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Gallery items staggered reveal
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, i * 80);
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".gallery-item").forEach(el => galleryObserver.observe(el));

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function updateLightbox() {
    const art = artworks[currentIndex];
    lightboxImg.src = art.full;
    lightboxImg.alt = art.title;
    lightboxTitle.textContent = art.title;
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + artworks.length) % artworks.length;
    updateLightbox();
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", () => navigate(-1));
document.getElementById("lightbox-next").addEventListener("click", () => navigate(1));

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Touch swipe for lightbox
let touchStartX = 0;
lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
lightbox.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) {
        navigate(diff > 0 ? -1 : 1);
    }
});
