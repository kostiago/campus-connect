/*
  Lógica da página de Login (pages/login.html)
  Depende de:
  - auth.js carregado antes (fornece `CampusAuth`)
  - #login-form, #login-identifier, #login-password,
    #login-submit, #password-toggle, #login-feedback

  IMPORTANTE: esse "login" ainda é simulado — não existe backend
  validando usuário/senha de verdade. Qualquer combinação de e-mail
  válido + senha preenchida é aceita, só para permitir testar o
  menu de usuário condicional (ver auth.js e site-header.js).
  Quando existir um backend real, troque o bloco de submit por uma
  chamada de API de verdade.
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const identifierInput = document.getElementById("login-identifier");
  const passwordInput = document.getElementById("login-password");
  const submitBtn = document.getElementById("login-submit");
  const passwordToggle = document.getElementById("password-toggle");
  const feedback = document.getElementById("login-feedback");

  if (!form) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Habilita o botão "Entrar" só quando os dois campos têm conteúdo
  function updateSubmitState() {
    const hasContent = identifierInput.value.trim() !== "" && passwordInput.value.trim() !== "";
    submitBtn.disabled = !hasContent;
    submitBtn.classList.toggle("enabled", hasContent);
  }

  identifierInput.addEventListener("input", updateSubmitState);
  passwordInput.addEventListener("input", updateSubmitState);

  // Alterna a visibilidade da senha
  if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      passwordToggle.classList.toggle("showing", isPassword);
      passwordToggle.setAttribute("aria-label", isPassword ? "Ocultar senha" : "Mostrar senha");
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const identifier = identifierInput.value.trim();
    const password = passwordInput.value.trim();

    if (!isValidEmail(identifier)) {
      feedback.textContent = "Digite um e-mail institucional válido.";
      feedback.className = "login-feedback error";
      return;
    }

    if (password.length < 4) {
      feedback.textContent = "Senha muito curta.";
      feedback.className = "login-feedback error";
      return;
    }

    // Simulação: em produção, aqui entraria uma chamada real de API
    // que validaria a senha e retornaria o papel (role) do usuário.
    // Por enquanto, todo login simulado vira "aluno".
    const nomeSimulado = identifier.split("@")[0].replace(/[.\-_]/g, " ");

    if (window.CampusAuth) {
      window.CampusAuth.login("aluno", nomeSimulado);
    }

    feedback.textContent = "Login realizado! Redirecionando...";
    feedback.className = "login-feedback success";

    // login.html e dashboard-*.html são irmãos dentro de pages/,
    // então o nome do arquivo já basta, sem prefixo de caminho.
    const destino = (window.CampusAuth && window.CampusAuth.DASHBOARD_FILE_BY_ROLE[papel])
      || "../index.html"; // fallback, caso o papel não tenha dashboard mapeada

    setTimeout(() => {
      window.location.href = destino;
    }, 800);
  });
});