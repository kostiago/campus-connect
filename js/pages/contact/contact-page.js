/*
  Formulário de Contato — validação simples (sem backend real)
  Depende de:
  - #contact-form
  - #contact-form-feedback
*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-form-feedback");

  if (!form || !feedback) return;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = form.subject.value;

    if (!firstName || !lastName || !message) {
      feedback.textContent = "Preencha nome, sobrenome e mensagem antes de enviar.";
      feedback.className = "form-feedback error";
      return;
    }

    if (!isValidEmail(email)) {
      feedback.textContent = "Digite um e-mail válido.";
      feedback.className = "form-feedback error";
      return;
    }

    console.log("Mensagem de contato (simulada):", {
      firstName,
      lastName,
      email,
      phone: form.phone.value.trim(),
      subject,
      message
    });

    feedback.textContent = "Mensagem enviada! Vamos te responder em breve.";
    feedback.className = "form-feedback success";
    form.reset();
  });
});