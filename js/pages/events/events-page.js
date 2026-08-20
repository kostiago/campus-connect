/*
  Lógica da página completa de Eventos (pages/events.html)
  Depende de:
  - events-mock.js carregado antes (fornece `mockEvents`, compartilhado
    com a home — cada página filtra suas próprias categorias válidas)
  - #events-tabs-bar com botões .events-tab[data-categoria]
  - #events-page-grid onde os cards são renderizados
  - #pagination-nav, #results-per-page-select, #pagination-summary

  Nota: só a barra de categorias filtra os eventos nesta versão.
  Os filtros da sidebar (Período, Local, Ano Letivo) são apenas visuais
  por enquanto — os inputs estão com `disabled` no HTML de propósito.
*/

const calendarIconSvgPage = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>`;

const clockIconSvgPage = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
  </svg>`;

const pinIconSvgPage = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>`;

const chevronLeftSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>`;
const chevronRightSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg>`;

// Categorias que pertencem à página completa de eventos — usado para
// "Todos os Eventos" não puxar itens da home (tecnologia, pesquisa, design)
// que compartilham o mesmo mock.
const pageCategorias = ["tecnologia","pesquisa", "design", "academico", "esportes", "cultural", "carreira", "social"];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("events-page-grid");
  const tabs = document.querySelectorAll(".events-tab");
  const paginationNav = document.getElementById("pagination-nav");
  const resultsPerPageSelect = document.getElementById("results-per-page-select");
  const paginationSummary = document.getElementById("pagination-summary");
  const searchInput = document.getElementById("event-search");

  if (!grid) return;

  // Estado da página atual (filtro + paginação)
  let currentCategoria = "todos";
  let currentSearch = "";
  let currentPage = 1;
  let resultsPerPage = Number(resultsPerPageSelect?.value) || 6;

  function normalizar(text){
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function getFilteredEvents() {
  let eventos = currentCategoria === "todos"
    ? mockEvents.filter((evento) => pageCategorias.includes(evento.categoria))
    : mockEvents.filter((evento) => evento.categoria === currentCategoria);

  if (currentSearch.trim() !== "") {
    const word = normalizar(currentSearch.trim());
    eventos = eventos.filter((evento) => {
      const titulo = normalizar(evento.titulo || "");
      const descricao = normalizar(evento.descricao || "");
      return titulo.includes(word) || descricao.includes(word);
    });
  }

  return eventos;
}

 function renderCards(eventos) {
    if (eventos.length === 0) {
      grid.innerHTML = `<div class="events-page-empty">Nenhum evento encontrado nessa categoria.</div>`;
      return;
    }

    grid.innerHTML = eventos.map((evento) => {
      const percentual = Math.round((evento.inscritos / evento.vagasTotal) * 100);
      const precoLabel = evento.preco > 0 ? `$${evento.preco}` : "Gratuito";

      return `
      <a href="event-details.html?id=${evento.id}" class="event-page-card-link">
        <article class="event-page-card">
          <div class="event-page-image">
            <img src="${evento.imagem}" alt="${evento.titulo}">
            <div class="event-page-badge-row">
              <span class="event-page-badge badge-${evento.categoria}">${evento.categoriaLabel}</span>
              <span class="event-page-status">Ativo</span>
            </div>
          </div>
          <div class="event-page-body">
            <div class="event-page-datetime">${evento.data} — ${evento.hora}</div>
            <h3 class="event-page-title">${evento.titulo}</h3>
            <div class="event-page-location">${pinIconSvgPage} <span>${evento.local}</span></div>
            <div class="event-page-progress-row">
              <div class="event-page-progress-track">
                <div class="event-page-progress-fill" style="width:${percentual}%"></div>
              </div>
              <span class="event-page-progress-pct">${percentual}%</span>
              <span class="event-page-price">${precoLabel}</span>
            </div>
          </div>
        </article>
      </a>
    `;
    }).join("");
  }

  // Gera a lista de números de página com reticências, no formato:
  // 1  2  3  4  5  6  7  8  ...  25  (primeira, vizinhas da atual, última)
  function getPageNumbers(current, total) {
    const delta = 2; // quantas páginas mostrar de cada lado da atual
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    });

    return rangeWithDots;
  }

  function renderPagination(totalItems, totalPages) {
    if (!paginationNav) return;

    if (totalPages <= 1) {
      paginationNav.innerHTML = "";
      return;
    }

    const pages = getPageNumbers(currentPage, totalPages);
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    paginationNav.innerHTML = `
      <button class="pagination-btn pagination-nav-btn" data-action="prev" ${isFirstPage ? "disabled" : ""}>
        ${chevronLeftSvg} Back
      </button>

      ${pages.map((page) => page === "..."
        ? `<span class="pagination-ellipsis">...</span>`
        : `<button class="pagination-btn ${page === currentPage ? "active" : ""}" data-page="${page}">${page}</button>`
      ).join("")}

      <button class="pagination-btn pagination-nav-btn" data-action="next" ${isLastPage ? "disabled" : ""}>
        Next ${chevronRightSvg}
      </button>
    `;

    paginationNav.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPage = Number(btn.dataset.page);
        renderPage();
      });
    });

    const prevBtn = paginationNav.querySelector('[data-action="prev"]');
    const nextBtn = paginationNav.querySelector('[data-action="next"]');

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderPage();
        }
      });
    }
  }

  function renderSummary(totalItems) {
    if (!paginationSummary) return;

    if (totalItems === 0) {
      paginationSummary.textContent = "0 resultados";
      return;
    }

    const start = (currentPage - 1) * resultsPerPage + 1;
    const end = Math.min(currentPage * resultsPerPage, totalItems);
    paginationSummary.textContent = `${start}-${end} de ${totalItems}`;
  }

  function renderPage() {
    const eventosFiltrados = getFilteredEvents();
    const totalItems = eventosFiltrados.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / resultsPerPage));

    // Se a página atual ficou fora do intervalo (ex: trocou o filtro
    // e sobraram menos páginas), volta pra última válida.
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * resultsPerPage;
    const eventosDaPagina = eventosFiltrados.slice(startIndex, startIndex + resultsPerPage);

    renderCards(eventosDaPagina);
    renderPagination(totalItems, totalPages);
    renderSummary(totalItems);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategoria = tab.dataset.categoria;
      currentPage = 1; // volta pra primeira página ao trocar de categoria
      renderPage();
    });
  });

  if (resultsPerPageSelect) {
    resultsPerPageSelect.addEventListener("change", () => {
      resultsPerPage = Number(resultsPerPageSelect.value);
      currentPage = 1;
      renderPage();
    });
  }

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentSearch = searchInput.value;
        currentPage = 1; // volta pra primeira página ao buscar
        renderPage();
      }, 250);
    });
  }

  renderPage();
});