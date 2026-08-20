/*
  <site-footer></site-footer>

  Mesmo princípio do site-header.js: Web Component nativo, sem Shadow DOM
  (para herdar o CSS global), com caminhos ajustados automaticamente
  conforme a página esteja na raiz ou dentro de /pages/.
*/

function getFooterBasePath() {
  return window.location.pathname.includes("/pages/") ? "../" : "";
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const base = getFooterBasePath();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="footer-topbar">
          <span class="footer-copyright">© 2026 Campus Connect. Todos os direitos reservados.</span>

          <nav class="footer-legal-links" aria-label="Links legais">
            <a href="#">Termos</a>
            <a href="#">Privacidade</a>
            <a href="#">Cookies</a>
          </nav>

          <div class="footer-social-icons">
            <a href="#" aria-label="Instagram" class="footer-social-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="footer-social-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" class="footer-social-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="6" width="20" height="12" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-main">
          <div class="footer-newsletter">
            <h3 class="footer-newsletter-title">Fique por dentro das novidades</h3>

            <form class="footer-newsletter-form" id="footer-newsletter-form">
              <input type="email" id="footer-newsletter-email" class="footer-newsletter-input"
                placeholder="Seu e-mail" aria-label="E-mail para receber novidades" required>
              <button type="submit" class="footer-newsletter-submit" aria-label="Inscrever-se">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </button>
            </form>

            <p class="footer-newsletter-desc">
              Receba os próximos eventos, workshops e novidades da universidade direto no seu e-mail.
            </p>
            <p class="footer-newsletter-feedback" id="footer-newsletter-feedback"></p>

            <div class="footer-social-text-links">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">YouTube</a>
            </div>
          </div>

          <nav class="footer-link-column" aria-label="Navegação">
            <h4 class="footer-column-title">Navegação</h4>
            <a href="${base}index.html">Início</a>
            <a href="${base}pages/events.html">Eventos</a>
            <a href="${base}pages/about.html">Sobre</a>
            <a href="${base}pages/profile.html">Perfil</a>
          </nav>

          <nav class="footer-link-column" aria-label="Institucional">
            <h4 class="footer-column-title">Institucional</h4>
            <a href="${base}pages/contact.html">Contato</a>
            <a href="#">FAQ</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
          </nav>

          <nav class="footer-link-column" aria-label="Comunidade">
            <h4 class="footer-column-title">Comunidade</h4>
            <a href="#">Criar Conta</a>
            <a href="#">Entrar</a>
            <a href="#">Ajuda</a>
            <a href="${base}pages/contact.html">Contato</a>
          </nav>
        </div>
      </footer>
    `;

    this.setupNewsletterForm();
  }

  setupNewsletterForm() {
    const form = this.querySelector("#footer-newsletter-form");
    const emailInput = this.querySelector("#footer-newsletter-email");
    const feedback = this.querySelector("#footer-newsletter-feedback");

    if (!form) return;

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();

      if (!isValidEmail(email)) {
        feedback.textContent = "Digite um e-mail válido.";
        feedback.className = "footer-newsletter-feedback error";
        return;
      }

      console.log("Inscrição na newsletter (simulada):", email);
      feedback.textContent = "Inscrição confirmada! Fique de olho no seu e-mail.";
      feedback.className = "footer-newsletter-feedback success";
      form.reset();
    });
  }
}

customElements.define("site-footer", SiteFooter);