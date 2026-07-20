/*
  Lógica da seção "Em Destaque" (carrossel)
  Depende de:
  - featured-mock.js carregado antes deste arquivo (fornece `mockFeaturedEvents`)
  - markup de featured-section.html presente no DOM
*/

const calendarIconSvg = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>`;

const pinIconSvg = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>`;

const starIconSvg = `<svg viewBox="0 0 20 20"><path d="M10 1l2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L10 14.8 4.4 18l1.4-6.2L1 7.5l6.4-.6z"/></svg>`;

const trophyIconSvg = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 3h12v2h3v2a4 4 0 0 1-4 4h-.35A6 6 0 0 1 13 14.9V17h3v2H8v-2h3v-2.1A6 6 0 0 1 7.35 11H7a4 4 0 0 1-4-4V5h3V3zm-2 4a2 2 0 0 0 2 2V5H4v2zm16-2h-2v4a2 2 0 0 0 2-2V5z"/>
  </svg>`;

const chevronDownSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>`;

function renderFeatured() {
  const featuredTrack = document.getElementById("featured-track");
  const dotsContainer = document.getElementById("carousel-dots");

  featuredTrack.innerHTML = mockFeaturedEvents.map((evento, index) => `
    <article class="featured-card">
      <div class="featured-top-row">
        <span class="featured-rank">${String(index + 1).padStart(2, "0")}</span>
        <span class="featured-social">${trophyIconSvg} Inscrito por mais de ${evento.inscritosRecentes} nos últimos 30 dias</span>
      </div>
      <p class="featured-category">${evento.categoriaLabel}</p>
      <h3 class="featured-title">${evento.titulo}</h3>
      <div class="featured-rating">
        <span class="stars">${starIconSvg}${starIconSvg}${starIconSvg}${starIconSvg}${starIconSvg}</span>
        ${evento.avaliacaoCount} avaliações
      </div>
      ${evento.novo ? '<span class="featured-tag">Novo evento</span>' : ""}
      <div class="featured-meta-row">${calendarIconSvg} ${evento.data}</div>
      <div class="featured-meta-row">${pinIconSvg} ${evento.local}</div>
      <div class="featured-footer">
        <button class="btn-featured-cta">Inscreva-se ${chevronDownSvg}</button>
      </div>
    </article>
  `).join("");

  dotsContainer.innerHTML = mockFeaturedEvents.map((_, index) => `
    <button class="carousel-dot ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Ir para o destaque ${index + 1}"></button>
  `).join("");

  setupCarousel();
}

function setupCarousel() {
  const track = document.getElementById("featured-track");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  function cardStep() {
    const firstCard = track.querySelector(".featured-card");
    return firstCard ? firstCard.getBoundingClientRect().width + 20 : 300;
  }

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -cardStep(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: cardStep(), behavior: "smooth" });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: cardStep() * Number(dot.dataset.index), behavior: "smooth" });
    });
  });

  track.addEventListener("scroll", () => {
    const index = Math.round(track.scrollLeft / cardStep());
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  });
}

// Inicializa a seção assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", renderFeatured);