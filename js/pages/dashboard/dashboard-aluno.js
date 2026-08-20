/*
  Lógica da Dashboard do Aluno (pages/dashboard-aluno.html)
  Depende de:
  - dashboard-aluno-mock.js carregado antes (fornece `dashboardAlunoMock`)
  - auth.js (opcional — usa o nome da sessão simulada se existir,
    senão cai no nome do mock)
*/

const colorVarByKey = {
  blue: "--color-primary",
  amber: "--color-amber",
  purple: "--color-purple",
  green: "--color-success"
};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof dashboardAlunoMock === "undefined") return;

  const user = window.CampusAuth ? window.CampusAuth.getCurrentUser() : null;
  const nomeCompleto = (user && user.nome) || dashboardAlunoMock.usuario.nome;
  const primeiroNome = nomeCompleto.split(" ")[0];

  const greetingEl = document.getElementById("dashboard-user-name");
  if (greetingEl) greetingEl.textContent = primeiroNome;

  renderProgressRings();
  renderHighlightCard();
  renderCertsCard();
  renderProfileCard(nomeCompleto);
  renderInscricoesList();
  renderRecommendCard();
  renderActivityTimeline();

  // ---------- Anéis de progresso concêntricos ----------
  function renderProgressRings() {
    const svg = document.getElementById("progress-rings");
    const legend = document.getElementById("progress-legend");
    if (!svg || !legend) return;

    const centro = 60;
    const raios = [50, 38, 26]; // do mais externo pro mais interno

    let svgHtml = "";
    let legendHtml = "";

    dashboardAlunoMock.progresso.forEach((item, index) => {
      const raio = raios[index] ?? raios[raios.length - 1];
      const circunferencia = 2 * Math.PI * raio;
      const offset = circunferencia - (circunferencia * item.percentual) / 100;
      const corVar = colorVarByKey[item.cor] || colorVarByKey.blue;

      svgHtml += `
        <circle class="progress-ring-track" cx="${centro}" cy="${centro}" r="${raio}"></circle>
        <circle
          class="progress-ring-value"
          cx="${centro}" cy="${centro}" r="${raio}"
          style="stroke: var(${corVar}); stroke-dasharray: ${circunferencia}; stroke-dashoffset: ${offset};"
        ></circle>
      `;

      legendHtml += `
        <li>
          <span class="legend-dot dot-${item.cor}" aria-hidden="true"></span>
          <span class="legend-label">${item.label}</span>
          <span class="legend-percent">${item.percentual}%</span>
        </li>
      `;
    });

    svg.innerHTML = svgHtml;
    legend.innerHTML = legendHtml;
  }

  // ---------- Card de destaque: próximo evento ----------
  function renderHighlightCard() {
    const card = document.getElementById("highlight-card");
    if (!card) return;

    const evento = dashboardAlunoMock.proximoEvento;

    card.innerHTML = `
      <div class="highlight-eyebrow">
        <span>Próximo Evento</span>
        <span class="highlight-badge">${evento.categoria}</span>
      </div>
      <p class="highlight-number">${evento.diasRestantes}<span> dias</span></p>
      <p class="highlight-title">${evento.titulo}</p>
      <p class="highlight-meta">${evento.data} · ${evento.local}</p>
    `;
  }

  // ---------- Certificados ----------
  function renderCertsCard() {
    const countEl = document.getElementById("certs-count");
    const barEl = document.getElementById("certs-bar");
    const captionEl = document.getElementById("certs-caption");
    if (!countEl || !barEl || !captionEl) return;

    const { emitidos, total } = dashboardAlunoMock.certificados;

    countEl.innerHTML = `${emitidos}<span> de ${total} disponíveis</span>`;

    barEl.innerHTML = Array.from({ length: total }, (_, i) => `
      <span class="certs-bar-segment ${i < emitidos ? "filled" : ""}"></span>
    `).join("");

    const restantes = total - emitidos;
    captionEl.textContent = restantes > 0
      ? `Faltam ${restantes} evento(s) concluído(s) para o próximo certificado.`
      : "Todos os certificados disponíveis foram emitidos!";
  }

  // ---------- Perfil ----------
  function renderProfileCard(nomeCompleto) {
    const card = document.getElementById("profile-card");
    if (!card) return;

    const { curso, pontos, eventosParticipados, diasAtivo } = dashboardAlunoMock.usuario;
    const initials = nomeCompleto.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    card.innerHTML = `
      <div class="profile-top">
        <span class="profile-avatar" aria-hidden="true">${initials}</span>
        <div>
          <p class="profile-name">${nomeCompleto}</p>
          <p class="profile-course">${curso}</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="profile-stat">
          <p class="profile-stat-value">${eventosParticipados}</p>
          <p class="profile-stat-label">Eventos</p>
        </div>
        <div class="profile-stat">
          <p class="profile-stat-value">${pontos}</p>
          <p class="profile-stat-label">Pontos</p>
        </div>
        <div class="profile-stat">
          <p class="profile-stat-value">${diasAtivo}</p>
          <p class="profile-stat-label">Dias ativo</p>
        </div>
      </div>
    `;
  }

  // ---------- Minhas inscrições ----------
  function renderInscricoesList() {
    const list = document.getElementById("inscricoes-list");
    if (!list) return;

    const statusLabel = {
      confirmada: "Confirmada",
      aguardando: "Aguardando",
      concluida: "Concluída"
    };

    list.innerHTML = dashboardAlunoMock.inscricoes.map((item) => `
      <li class="inscricao-item">
        <div class="inscricao-info">
          <p class="inscricao-title">${item.titulo}</p>
          <p class="inscricao-date">${item.data}</p>
        </div>
        <span class="status-badge status-${item.status}">${statusLabel[item.status] || item.status}</span>
      </li>
    `).join("");
  }

  // ---------- Recomendado para você ----------
  function renderRecommendCard() {
    const card = document.getElementById("recommend-card");
    if (!card) return;

    const evento = dashboardAlunoMock.recomendado;

    card.innerHTML = `
      <div class="recommend-image" style="background-image:url('${evento.imagem}')" aria-hidden="true">
        
      </div>
      <div class="recommend-body">
        <p class="recommend-category">${evento.categoria}</p>
        <h3 class="recommend-title">${evento.titulo}</h3>
        <p class="recommend-desc">${evento.descricao}</p>
        <div class="recommend-meta">
          <span>📅 ${evento.data}</span>
          <span>📍 ${evento.local}</span>
          <span>🎟️ ${evento.vagasRestantes} vagas</span>
        </div>
        <button class="btn btn-primary">Inscreva-se</button>
      </div>
    `;
  }

  // ---------- Atividade recente ----------
  function renderActivityTimeline() {
    const list = document.getElementById("activity-timeline");
    if (!list) return;

    list.innerHTML = dashboardAlunoMock.atividadeRecente.map((item) => `
      <li class="activity-item">
        <span class="activity-dot tipo-${item.tipo}" aria-hidden="true"></span>
        <span>
          <span class="activity-text">${item.texto}</span>
          <span class="activity-time">${item.tempo}</span>
        </span>
      </li>
    `).join("");
  }
});