document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("featured-track");
    const dotsContainer = document.getElementById("carousel-dots");

    const cards = [...track.querySelectorAll(".featured-card-link")];

    const prevBtn = document.getElementById("carousel-prev");
    const nextBtn = document.getElementById("carousel-next");

    if (!track || cards.length === 0) return;

    const cardsPerPage = 2;
    const gap = 20;
    const autoPlayTime = 5000;

    let currentPage = 0;

    function cardStep() {
        return cards[0].getBoundingClientRect().width + gap;
    }

    function totalPages() {
        return Math.ceil(cards.length / cardsPerPage);
    }

    function updateDots() {

        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentPage);
        });

    }

    function goToPage(page) {

        currentPage = page;

        track.scrollTo({

            left: currentPage * cardStep() * cardsPerPage,

            behavior: "smooth"

        });

        updateDots();

    }

    /*==============================
        CRIA DOTS
    ==============================*/

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages(); i++) {

        const dot = document.createElement("button");

        dot.className = "carousel-dot";

        if (i === 0)
            dot.classList.add("active");

        dot.dataset.index = i;

        dot.setAttribute(
            "aria-label",
            `Ir para a página ${i + 1}`
        );

        dotsContainer.appendChild(dot);

    }

    const dots = [...dotsContainer.querySelectorAll(".carousel-dot")];

    /*==============================
        DOTS
    ==============================*/

    dots.forEach((dot) => {

        dot.addEventListener("click", () => {

            goToPage(Number(dot.dataset.index));

            restartAutoPlay();

        });

    });

    /*==============================
        PRÓXIMO
    ==============================*/

    function nextSlide() {

        currentPage++;

        if (currentPage >= totalPages()) {

            currentPage = 0;

        }

        goToPage(currentPage);

    }

    /*==============================
        ANTERIOR
    ==============================*/

    function previousSlide() {

        currentPage--;

        if (currentPage < 0) {

            currentPage = totalPages() - 1;

        }

        goToPage(currentPage);

    }

    /*==============================
        BOTÕES
    ==============================*/

    nextBtn.addEventListener("click", () => {

        nextSlide();

        restartAutoPlay();

    });

    prevBtn.addEventListener("click", () => {

        previousSlide();

        restartAutoPlay();

    });

    /*==============================
        AUTOPLAY
    ==============================*/

    let autoPlay = setInterval(nextSlide, autoPlayTime);

    function restartAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = setInterval(nextSlide, autoPlayTime);

    }

    /*==============================
        PAUSA
    ==============================*/

    track.addEventListener("mouseenter", () => {

        clearInterval(autoPlay);

    });

    track.addEventListener("mouseleave", () => {

        restartAutoPlay();

    });

});