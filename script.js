const artworks = [
    { src: "images/verk-01.jpg", title: "Springande grönska" },
    { src: "images/verk-02.jpg", title: "Filosofisk kinesisk 8:a i rörelse" },
    { src: "images/verk-03.jpg", title: "Danskt stjärnspel" },
    { src: "images/verk-04.jpg", title: "Påsk på Österlen" },
    { src: "images/verk-05.jpg", title: "Ilska, hat och kärlek" },
    { src: "images/verk-06.jpg", title: "Norrsken" },
    { src: "images/verk-07.jpg", title: "Oändliga vägar" },
    { src: "images/verk-08.jpg", title: "Nyansernas tid" },
    { src: "images/verk-09.jpg", title: "Strömmande själafloden" },
    { src: "images/verk-10.jpg", title: "Lycklighetens taggar" },
    { src: "images/verk-11.jpg", title: "Färggranna blodkroppar" },
    { src: "images/verk-12.jpg", title: "Blodshimmel" },
    { src: "images/verk-13.jpg", title: "Sorgsen ursinnighet" },
    { src: "images/verk-14.jpg", title: "Skimrande melankoli" },
    { src: "images/verk-15.jpg", title: "Marina rörelser" },
    { src: "images/verk-16.jpg", title: "Kryssets biverkningar" },
    { src: "images/verk-17.jpg", title: "Solnedgången till Johanna" }
];

// Build gallery
const gallery = document.getElementById("gallery");
artworks.forEach((art, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.style.animationDelay = `${i * 0.08}s`;
    item.innerHTML = `
        <img src="${art.src}" alt="${art.title}" loading="lazy">
        <p class="item-title">${art.title}</p>
    `;
    item.addEventListener("click", () => openLightbox(i));
    gallery.appendChild(item);
});

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
    lightboxImg.src = art.src;
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
