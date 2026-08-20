document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const eventoId = params.get("id");

  const evento = mockEvents.find((e) => e.id === eventoId);

  if (!evento) {
    document.querySelector(".event-details-page").innerHTML =
      `<p style="padding:40px;text-align:center;color:var(--color-text-muted);">Evento não encontrado.</p>`;
    return;
  }

  document.getElementById("details-page-title").textContent = "Detalhes do Evento";
  document.getElementById("details-hero-img").src = evento.imagem;
  document.getElementById("details-hero-img").alt = evento.titulo;
  document.getElementById("details-hero-category").textContent = evento.categoriaLabel;
  document.getElementById("details-title").textContent = evento.titulo;
  document.getElementById("details-date").textContent = evento.data;
  document.getElementById("details-time-range").textContent = evento.hora;
  document.getElementById("details-local").textContent = evento.local;
  document.getElementById("details-description").textContent = evento.descricao;

  const percentual = Math.round((evento.inscritos / evento.vagasTotal) * 100);
  document.getElementById("details-vagas").textContent =
    `${evento.inscritos}/${evento.vagasTotal} (${percentual}%)`;

  document.getElementById("details-price").textContent =
    evento.preco > 0 ? `$${evento.preco}` : "Gratuito";



  // Compartilhamento
  document.querySelectorAll(".ticket-share-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const tipo = btn.dataset.share;
      const url = window.location.href;
      const texto = `Confira o evento: ${evento.titulo}`;

      if (tipo === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
      } else if (tipo === "twitter") {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`, "_blank");
      } else if (tipo === "email") {
        window.location.href = `mailto:?subject=${encodeURIComponent(evento.titulo)}&body=${encodeURIComponent(texto + " " + url)}`;
      } else if (tipo === "copy") {
        await navigator.clipboard.writeText(url);
        btn.innerHTML = "✓";
        setTimeout(() => {
          btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>`;
        }, 1500);
      }
    });
  });

  // Botão "Adicionar ao Calendário" — placeholder por enquanto
  document.getElementById("details-add-calendar-btn").addEventListener("click", () => {
    alert(`Adicionar "${evento.titulo}" ao calendário ainda não está conectado — isso é só a interface.`);
  });

  // Termos e Condições (só renderiza se o evento tiver o campo)
  if (evento.termos && evento.termos.length > 0) {
    const termsBlock = document.getElementById("details-terms-block");
    const termsContent = document.getElementById("details-terms-content");
    termsBlock.style.display = "block";

    termsContent.innerHTML = evento.termos.map((grupo) => `
      <div class="terms-group">
        <h4>${grupo.titulo}</h4>
        <ul>
          ${grupo.itens.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // Mapa de assentos (condicional — só se mapaAssentos === true)
  if (evento.mapaAssentos && evento.categoriasAssentos) {
    const sidebar = document.getElementById("seatplan-card");
    const visual = document.getElementById("seatplan-visual");
    const legend = document.getElementById("seatplan-legend");

    sidebar.style.display = "block";

    visual.innerHTML = evento.categoriasAssentos.map((cat) => `
      <div class="seatplan-row" style="background:${cat.cor}">${cat.nome}</div>
    `).join("");

    legend.innerHTML = evento.categoriasAssentos.map((cat) => `
      <div class="seatplan-legend-item">
        <span class="seatplan-legend-dot" style="background:${cat.cor}"></span>
        <div class="seatplan-legend-text">
          <div class="seatplan-legend-name">${cat.nome}</div>
          <div class="seatplan-legend-type">${cat.tipo === "sentado" ? "Sentado" : "Em pé"}</div>
        </div>
        <span class="seatplan-legend-price">${cat.preco > 0 ? `$${cat.preco}` : "Gratuito"}</span>
      </div>
    `).join("");
  }

  // Lotes de ingresso
  if (evento.lotes && evento.lotes.length > 0) {
    const lotesCard = document.getElementById("lotes-card");
    const lotesList = document.getElementById("lotes-list");
    lotesCard.style.display = "block";

    lotesList.innerHTML = evento.lotes.map((lote, index) => {
      const esgotado = lote.inscritos >= lote.vagasTotal;
      const precoLabel = lote.preco > 0 ? `$${lote.preco}` : "Gratuito";
      const vagasRestantes = lote.vagasTotal - lote.inscritos;

      return `
        <div class="lote-item ${esgotado ? "esgotado" : ""}" data-lote-index="${index}">
          <div class="lote-header">
            <div class="lote-header-left">
              <div class="lote-nome-row">
                <p class="lote-nome">${lote.nome}</p>
                ${esgotado ? `<span class="lote-badge-esgotado">Esgotado</span>` : ""}
              </div>
              <span class="lote-vagas-info">
                ${esgotado ? "Nenhuma vaga disponível" : `${vagasRestantes} vagas restantes`}
              </span>
            </div>
            <div class="lote-header-right">
              <span class="lote-preco">${precoLabel}</span>
              ${!esgotado ? `
                <svg class="lote-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              ` : ""}
            </div>
          </div>
          <div class="lote-body">
            <div class="lote-body-inner">
              <ul class="lote-beneficios">
                ${lote.beneficios.map((b) => `
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    ${b}
                  </li>
                `).join("")}
              </ul>
              <button class="lote-inscrever-btn">Inscrever-se</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Toggle accordion — só nos lotes não esgotados
    lotesList.querySelectorAll(".lote-item:not(.esgotado) .lote-header").forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.closest(".lote-item");
        const jaAberto = item.classList.contains("aberto");

        // Fecha todos antes de abrir o clicado (accordion de um só por vez)
        lotesList.querySelectorAll(".lote-item.aberto").forEach((aberto) => {
          aberto.classList.remove("aberto");
        });

        if (!jaAberto) {
          item.classList.add("aberto");
        }
      });
    });

    // Botão de inscrição (por enquanto só um placeholder de feedback)
    lotesList.querySelectorAll(".lote-inscrever-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // não deixa o clique "vazar" pro header e fechar o accordion
        const item = btn.closest(".lote-item");
        const index = Number(item.dataset.loteIndex);
        const lote = evento.lotes[index];
        alert(`Inscrição no "${lote.nome}" ainda não está conectada a um backend — isso é só a interface.`);
      });
    });
  }

  // Card de abas (Timeline / Patrocinadores / Palestrante / Detalhes Adicionais)
  if (evento.programacao && evento.programacao.length > 0) {
    const tabsBlock = document.getElementById("details-tabs-block");
    tabsBlock.style.display = "block";

    // Timeline
    document.getElementById("panel-timeline").innerHTML = `
      <div class="timeline-list">
        ${evento.programacao.map((item) => `
          <div class="timeline-item">
            <div class="timeline-when">
              <strong>${item.titulo}</strong>
              <span class="timeline-date">${item.data}</span>
              <span class="timeline-time">${item.horario}</span>
            </div>
            <div class="timeline-dot-col">
              <span class="timeline-dot"></span>
            </div>
            <div class="timeline-content">
              <p>${item.descricao}</p>
              <span>Por ${item.responsavel}</span>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    // Ícones simples por tipo de rede social
    const socialIcons = {
      linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21H9z"/></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
      twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1c.5 1.6 2 2.8 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>`,
      website: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`
    };

    // Patrocinadores (clicáveis)
    document.getElementById("panel-patrocinadores").innerHTML =
      evento.patrocinadores && evento.patrocinadores.length > 0
        ? `<div class="patrocinadores-list">
            ${evento.patrocinadores.map((p) => `
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="patrocinador-chip">
                ${socialIcons.website}
                ${p.nome}
              </a>
            `).join("")}
          </div>`
        : `<div class="tab-empty-state">Nenhum patrocinador cadastrado para este evento.</div>`;

    // Palestrante (com LinkedIn + redes sociais)
    document.getElementById("panel-palestrante").innerHTML =
      evento.palestrante
        ? `<div class="palestrante-card">
            <div class="palestrante-info">
              <h4>${evento.palestrante.nome}</h4>
              <div class="cargo">${evento.palestrante.cargo}</div>
              <div class="bio">${evento.palestrante.bio}</div>
              <div class="palestrante-socials">
                ${evento.palestrante.linkedin ? `
                  <a href="${evento.palestrante.linkedin}" target="_blank" rel="noopener noreferrer" class="palestrante-social-btn" aria-label="LinkedIn">
                    ${socialIcons.linkedin}
                  </a>
                ` : ""}
                ${(evento.palestrante.redesSociais || []).map((rede) => `
                  <a href="${rede.url}" target="_blank" rel="noopener noreferrer" class="palestrante-social-btn" aria-label="${rede.tipo}">
                    ${socialIcons[rede.tipo] || socialIcons.website}
                  </a>
                `).join("")}
              </div>
            </div>
          </div>`
        : `<div class="tab-empty-state">Nenhum palestrante cadastrado para este evento.</div>`;

    // Troca de abas
    const tabs = tabsBlock.querySelectorAll(".details-tab");
    const panels = tabsBlock.querySelectorAll(".details-tab-panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        tabsBlock.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add("active");
      });
    });
  }
});