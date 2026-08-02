/*
  Newsletter do footer — validação simples de e-mail (sem backend real)
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("footer-newsletter-form");
  const emailInput = document.getElementById("footer-newsletter-email");
  const feedback = document.getElementById("footer-newsletter-feedback");

  if (!form || !emailInput || !feedback) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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
});