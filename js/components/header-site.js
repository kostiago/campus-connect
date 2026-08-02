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
        { label: "Eventos", href: routes.events, key: "eventos" },
        { label: "Minhas Inscrições", href: routes.myRegistrations, key: "inscricoes" },
        { label: "Favoritos", href: routes.favorites, key: "favoritos" },
        { label: "Certificados", href: routes.certificates, key: "certificados" }
      ],
      organizador: [
        { label: "Eventos", href: routes.events, key: "eventos" },
        { label: "Meus Eventos", href: routes.myEvents, key: "meus-eventos" },
        { label: "Criar Evento", href: routes.createEvent, key: "criar-evento" }
      ],
      administrador: [
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
            <input type="search" id="event-search" class="search-input"
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
      .flatMap((r) => routesByRole[r]);
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
        ${item.label}
      </a>
    `).join("");

    return `
      <div class="user-menu-wrapper">
        <button class="user-menu-trigger" id="user-menu-trigger" aria-haspopup="true" aria-expanded="false">
          <span class="user-avatar" aria-hidden="true">${initials}</span>
          <span class="user-menu-name">${user.nome}</span>
          <svg class="user-menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <div class="user-menu-dropdown" id="user-menu-dropdown" role="menu">
          <div class="user-menu-header">
            <span class="user-menu-role-badge">${roleLabels[user.role] || user.role}</span>
          </div>

          ${menuItemsHtml}

          <button class="user-menu-item user-menu-logout" id="user-menu-logout">
            Sair
          </button>
        </div>
      </div>
    `;
  }

  setupUserMenuToggle() {
    const trigger = this.querySelector("#user-menu-trigger");
    const dropdown = this.querySelector("#user-menu-dropdown");
    const logoutBtn = this.querySelector("#user-menu-logout");

    if (!trigger || !dropdown) return;

    function closeMenu() {
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
      if (!this.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        if (window.CampusAuth) window.CampusAuth.logout();
        window.location.reload();
      });
    }
  }
}

customElements.define("site-header", SiteHeader);