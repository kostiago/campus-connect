const calendarIconSvg = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>`;

const pinIconSvg = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>
  </svg>`;

const arrowIconSvg = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>`;

// Categorias que pertencem à HOME — usado para "Todos" não puxar eventos
// de outras páginas que compartilham o mesmo mock (ex: academico, esportes...)
const homeCategorias = ["tecnologia", "pesquisa", "design", "carreira"];

document.addEventListener("DOMContentLoaded", () => {
  const eventsGrid = document.getElementById("events-grid");
  const eventsEmpty = document.getElementById("events-empty");
  const filterPills = document.querySelectorAll(".course-pill");

  if (!eventsGrid || !eventsEmpty) return;

  function renderEvents(categoria) {
    const eventosFiltrados = categoria === "todos"
      ? mockEvents.filter((evento) => homeCategorias.includes(evento.categoria))
      : mockEvents.filter((evento) => evento.categoria === categoria);

    // A home é só uma "vitrine" — nunca mostra mais que 6 cards,
    // não importa quantos eventos existam no mock (o resto fica
    // reservado para a página completa de eventos).
    const eventosParaExibir = eventosFiltrados.slice(0, 6);

    eventsGrid.innerHTML = eventosParaExibir.map((evento) => `
      <article class="event-item-card">
        <div class="event-item-image" aria-hidden="true">
          <span class="event-item-badge badge-${evento.categoria}">${evento.categoriaLabel}</span>
          ${calendarIconSvg}
        </div>
        <div class="event-item-body">
          <h3 class="event-item-title">${evento.titulo}</h3>
          <div class="event-item-meta">
            <span>${calendarIconSvg} ${evento.data}</span>
            <span>${pinIconSvg} ${evento.local}</span>
          </div>
          <p class="event-item-desc">${evento.descricao}</p>
          <div class="event-item-footer">
            <button class="btn btn-secondary">Ver detalhes ${arrowIconSvg}</button>
          </div>
        </div>
      </article>
    `).join("");

    eventsEmpty.style.display = eventosParaExibir.length === 0 ? "block" : "none";
    eventsGrid.style.display = eventosParaExibir.length === 0 ? "none" : "grid";
  }

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      renderEvents(pill.dataset.categoria);
    });
  });

  renderEvents("todos");
});