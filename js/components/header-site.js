/*
  <site-header current="..."></site-header>

  Depende de auth.js carregado ANTES deste script (fornece `CampusAuth`).

  - Visitante (não logado): nav principal fixa (Início, Eventos, Sobre, Contato).
  - Logado: a nav principal muda para os itens mais usados do PRÓPRIO
    papel (ver `mainNavByRole`), em vez das rotas públicas. O restante
    das rotas privadas daquele papel (que não está na nav principal)
    fica disponível no dropdown do usuário — sem duplicar links entre
    os dois lugares.
  - Papéis acumulam hierarquicamente para fins de rotas privadas
    disponíveis: aluno < organizador < administrador.
*/

function getBasePath() {
  return window.location.pathname.includes("/pages") ? "../" : "";
}

const ROLE_HIERARCHY = ["aluno", "organizador", "administrador"];

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const base = getBasePath();
    const currentPage = this.getAttribute("current") || "";
    const user = window.CampusAuth ? window.CampusAuth.getCurrentUser() : null;

    const routes = {
      home: `${base}index.html`,
      events: `${base}pages/events.html`,
      about: `${base}pages/about.html`,
      contact: `${base}pages/contact.html`,
      login: `${base}pages/login.html`,
      register: `${base}pages/register.html`,

      // rotas privadas — só usadas dentro do menu do usuário
      profile: `${base}pages/profile.html`,
      myRegistrations: `${base}pages/my-registrations.html`,
      favorites: `${base}pages/favorites.html`,
      certificates: `${base}pages/certificates.html`,
      myEvents: `${base}pages/my-events.html`,
      createEvent: `${base}pages/create-event.html`,
      admin: `${base}pages/admin.html`,
      adminUsers: `${base}pages/admin-users.html`,
      adminReports: `${base}pages/admin-reports.html`,
      adminSettings: `${base}pages/admin-settings.html`
    };

    // Rota do painel — depende do papel do usuário logado, por isso
    // é calculada à parte (usa o mapeamento centralizado em auth.js).
    const dashboardFile = user && window.CampusAuth
      ? window.CampusAuth.DASHBOARD_FILE_BY_ROLE[user.role]
      : null;
    const dashboardRoute = dashboardFile ? `${base}pages/${dashboardFile}` : "#";

    // ---------- Nav principal — muda conforme o papel logado ----------
    // Visitante vê a nav pública padrão. Usuários logados veem os itens
    // mais usados do próprio papel direto na barra, em vez das rotas
    // públicas — o restante das rotas privadas fica só no dropdown.
    const publicNavItems = [
      { label: "Início", href: routes.home, key: "inicio" },
      { label: "Eventos", href: routes.events, key: "eventos" },
      { label: "Sobre", href: routes.about, key: "sobre" },
      { label: "Contato", href: routes.contact, key: "contato" }
    ];

    const mainNavByRole = {
      aluno: [
        { label: "Meu Painel", href: dashboardRoute, key: "painel" },
        { label: "Eventos", href: routes.events, key: "eventos" },
        { label: "Minhas Inscrições", href: routes.myRegistrations, key: "inscricoes" },
        { label: "Favoritos", href: routes.favorites, key: "favoritos" },
        { label: "Certificados", href: routes.certificates, key: "certificados" }
      ],
      organizador: [
        { label: "Meu Painel", href: dashboardRoute, key: "painel" },
        { label: "Eventos", href: routes.events, key: "eventos" },
        { label: "Meus Eventos", href: routes.myEvents, key: "meus-eventos" },
        { label: "Criar Evento", href: routes.createEvent, key: "criar-evento" }
      ],
      administrador: [
        { label: "Meu Painel", href: dashboardRoute, key: "painel" },
        { label: "Administração", href: routes.admin, key: "admin" },
        { label: "Criar Evento", href: routes.createEvent, key: "criar-evento" },
        { label: "Meus Eventos", href: routes.myEvents, key: "meus-eventos" },
        { label: "Relatórios", href: routes.adminReports, key: "admin-relatorios" },
        { label: "Usuários", href: routes.adminUsers, key: "admin-usuarios" }
      ]
    };

    const navItems = user
      ? (mainNavByRole[user.role] || publicNavItems)
      : publicNavItems;

    const navHtml = navItems.map((item) => `
      <li>
        <a href="${item.href}" ${item.key === currentPage ? 'aria-current="page"' : ""}>
          ${item.label}
        </a>
      </li>
    `).join("");

    this.innerHTML = `  
      <header class="site-header">
        <div class="logo">
          <span class="logo-icon" aria-hidden="true">🎓</span>
          <span>Campus <span class="logo-highlight">Connect</span></span>
        </div>

        <nav class="main-nav" aria-label="Navegação principal">
          <ul>${navHtml}</ul>
        </nav>

        <div class="header-actions">
          <div class="search-wrapper">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.2" />
              <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
            <input type="search" id="search" class="search-input"
              placeholder="Buscar eventos, workshops, palestras..." aria-label="Buscar eventos">
          </div>

          ${user
        ? this.renderUserMenu(routes, currentPage, user, navItems)
        : this.renderGuestButtons(routes)
      }
        </div>
      </header>
    `;

    if (user) {
      this.setupUserMenuToggle();
    }
  }

  // ---------- Visitante: links de Entrar / Criar Conta ----------
  renderGuestButtons(routes) {
    return `
      <a href="${routes.login}" class="btn btn-secondary">
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="currentColor" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 13C8.33033 13 5.32016 15.4204 5.02395 18.5004C4.99752 18.7753 5.22389 19 5.50003 19H18.5C18.7762 19.0025 18.9761 18.7753 18.9761 18.5004C18.6799 15.4204 15.6697 13 12 13Z"
            fill="currentColor" opacity="0.25" />
        </svg>
        Entrar
      </a>
      <a href="${routes.register}" class="btn btn-primary">
        <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M8.5 3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V18.5C3.5 19.6046 4.39543 20.5 5.5 20.5H18.5C19.6046 20.5 20.5 19.6046 20.5 18.5V5.5C20.5 4.39543 19.6046 3.5 18.5 3.5H11.5"
            stroke="currentColor" stroke-linecap="round" />
          <path d="M12 8V16" stroke="currentColor" stroke-linecap="round" />
          <path d="M16 12H8" stroke="currentColor" stroke-linecap="round" />
        </svg>
        Criar Conta
      </a>
    `;
  }

  // ---------- Rotas privadas, acumuladas por papel ----------
  getPrivateRoutesForRole(routes, role) {
    const icon = {
      perfil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`,
      inscricoes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M9 15l2 2 4-4"/></svg>`,
      favoritos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>`,
      certificados: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5"/></svg>`,
      "meus-eventos": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
      "criar-evento": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
      admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg>`,
      "admin-usuarios": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="3"/><path d="M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1"/><circle cx="18" cy="8" r="2.5"/></svg>`,
      "admin-relatorios": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>`,
      "admin-config": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/></svg>`
    };

    const desc = {
      perfil: "Seus dados pessoais e preferências",
      inscricoes: "Eventos em que você já está inscrito",
      favoritos: "Eventos que você salvou para depois",
      certificados: "Certificados emitidos automaticamente",
      "meus-eventos": "Eventos que você organiza",
      "criar-evento": "Publique um novo evento no calendário",
      admin: "Visão geral da plataforma",
      "admin-usuarios": "Gerencie contas e permissões",
      "admin-relatorios": "Métricas e dados de participação",
      "admin-config": "Ajustes gerais do sistema"
    };

    const routesByRole = {
      aluno: [
        { label: "Perfil", href: routes.profile, key: "perfil" },
        { label: "Minhas Inscrições", href: routes.myRegistrations, key: "inscricoes" },
        { label: "Favoritos", href: routes.favorites, key: "favoritos" },
        { label: "Certificados", href: routes.certificates, key: "certificados" }
      ],
      organizador: [
        { label: "Meus Eventos", href: routes.myEvents, key: "meus-eventos" },
        { label: "Criar Evento", href: routes.createEvent, key: "criar-evento" }
      ],
      administrador: [
        { label: "Administração", href: routes.admin, key: "admin" },
        { label: "Usuários", href: routes.adminUsers, key: "admin-usuarios" },
        { label: "Relatórios", href: routes.adminReports, key: "admin-relatorios" },
        { label: "Configurações", href: routes.adminSettings, key: "admin-config" }
      ]
    };

    const roleIndex = ROLE_HIERARCHY.indexOf(role);
    if (roleIndex === -1) return [];

    return ROLE_HIERARCHY
      .slice(0, roleIndex + 1)
      .flatMap((r) => routesByRole[r])
      .map((item) => ({ ...item, icon: icon[item.key] || "", desc: desc[item.key] || "" }))
  }

  getFeaturedPreviewEvents() {
    return [
      { rank: "01", categoria: "Tecnologia", titulo: "Hackathon UFMG 2025", data: "23 jul", local: "Bloco de Engenharia" },
      { rank: "02", categoria: "Pesquisa", titulo: "Semana de Iniciação Científica", data: "28 jul", local: "Auditório Central" },
      { rank: "03", categoria: "Design", titulo: "Workshop de Design Thinking", data: "02 ago", local: "Laboratório de Inovação" }
    ];
  }

  // ---------- Usuário logado: avatar + dropdown ----------
  // `mainNavItems` são os itens já mostrados na barra principal —
  // qualquer rota privada que já esteja lá é removida do dropdown,
  // pra não duplicar o mesmo link em dois lugares.
  renderUserMenu(routes, currentPage, user, mainNavItems) {
    const mainNavKeys = new Set(mainNavItems.map((item) => item.key));
    const privateRoutes = this.getPrivateRoutesForRole(routes, user.role)
      .filter((item) => !mainNavKeys.has(item.key));

    const initials = user.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    const roleLabels = {
      aluno: "Aluno",
      organizador: "Organizador",
      administrador: "Administrador"
    };

    const menuItemsHtml = privateRoutes.map((item) => `
      <a href="${item.href}" class="user-menu-item" ${item.key === currentPage ? 'aria-current="page"' : ""}>
        <span class="user-menu-item-icon" aria-hidden="true">${item.icon}</span>
        <span class="user-menu-item-text">
          <span class="user-menu-item-label">${item.label}</span>
          <span class="user-menu-item-desc">${item.desc}</span>
        </span>
      </a>
    `).join("");

    const featuredEvents = this.getFeaturedPreviewEvents();

    const slidesHtml = featuredEvents.map((evento, index) => `
      <div class="mega-slide ${index === 0 ? "active" : ""}" data-slide-index="${index}">
        <div class="mega-slide-visual">
          <span class="mega-slide-rank">${evento.rank}</span>
          <span class="mega-slide-category">${evento.categoria}</span>
        </div>
        <h4 class="mega-slide-title">${evento.titulo}</h4>
        <p class="mega-slide-meta">${evento.data} · ${evento.local}</p>
      </div>
    `).join("");

    const dotsHtml = featuredEvents.map((_, index) => `
      <button class="mega-slider-dot ${index === 0 ? "active" : ""}" data-dot-index="${index}" aria-label="Ver destaque ${index + 1}"></button>
    `).join("");

    return `
      <div class="user-menu-wrapper">
        <button class="btn btn-secondary user-menu-trigger" id="user-menu-trigger" aria-haspopup="true">
          <span class="user-avatar" aria-hidden="true">${initials}</span>
          <span class="user-menu-name">${user.nome}</span>
          <svg class="user-menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
 
        <div class="user-menu-mega" id="user-menu-mega">
          <div class="user-menu-mega-inner">
            <div class="user-menu-mega-left">
              <span class="user-menu-role-badge">${roleLabels[user.role] || user.role}</span>
 
              <div class="user-menu-items">
                ${menuItemsHtml}
              </div>
 
              <button class="user-menu-item user-menu-logout" id="user-menu-logout">
                Sair
              </button>
            </div>
 
            <div class="user-menu-mega-right">
              <p class="mega-right-eyebrow">Em destaque</p>
              <div class="mega-slider" id="mega-slider">
                ${slidesHtml}
              </div>
              <div class="mega-slider-dots" id="mega-slider-dots">
                ${dotsHtml}
              </div>
              <a href="${routes.events}" class="mega-right-link">Ver todos os eventos →</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Abrir/fechar o mega menu agora é feito só em CSS (:hover / :focus-within
  // em .user-menu-wrapper) — aqui só cuidamos do slider e do logout.
  setupUserMenuToggle() {
    const logoutBtn = this.querySelector("#user-menu-logout");
    const slider = this.querySelector("#mega-slider");
    const dots = this.querySelectorAll(".mega-slider-dot");
    const slides = this.querySelectorAll(".mega-slide");

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        if (window.CampusAuth) window.CampusAuth.logout();
        window.location.reload();
      });
    }

    if (!slider || slides.length === 0) return;

    let activeIndex = 0;

    function goToSlide(index) {
      activeIndex = index;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => goToSlide(Number(dot.dataset.dotIndex)));
    });

    // Avança automaticamente a cada 4s enquanto o menu estiver aberto
    let autoplay = setInterval(() => {
      goToSlide((activeIndex + 1) % slides.length);
    }, 4000);

    const wrapper = this.querySelector(".user-menu-wrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseleave", () => clearInterval(autoplay));
      wrapper.addEventListener("mouseenter", () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => {
          goToSlide((activeIndex + 1) % slides.length);
        }, 4000);
      });
    }
  }
}

customElements.define("site-header", SiteHeader);