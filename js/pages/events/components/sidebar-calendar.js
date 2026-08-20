document.addEventListener("DOMContentLoaded", () => {
  const monthLabel = document.getElementById("calendar-month-label");
  const daysGrid = document.getElementById("calendar-days");
  const prevBtn = document.getElementById("calendar-prev");
  const nextBtn = document.getElementById("calendar-next");

  if (!daysGrid) return;

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const hoje = new Date();
  let mesAtual = hoje.getMonth();
  let anoAtual = hoje.getFullYear();
  let diaSelecionado = null;

  function renderCalendario() {
    monthLabel.textContent = `${nomesMeses[mesAtual]} ${anoAtual}`;

    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
    const diasNoMesAnterior = new Date(anoAtual, mesAtual, 0).getDate();

    const celulas = [];

    // Dias do mês anterior (preenchimento)
    for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
      celulas.push({ dia: diasNoMesAnterior - i, outside: true });
    }
    // Dias do mês atual
    for (let d = 1; d <= diasNoMes; d++) {
      celulas.push({ dia: d, outside: false });
    }
    // Completa a última semana com dias do próximo mês
    while (celulas.length % 7 !== 0) {
      celulas.push({ dia: celulas.length - (primeiroDiaSemana + diasNoMes) + 1, outside: true });
    }

    daysGrid.innerHTML = celulas.map(({ dia, outside }) => {
      const isToday = !outside && dia === hoje.getDate() && mesAtual === hoje.getMonth() && anoAtual === hoje.getFullYear();
      const isSelected = !outside && diaSelecionado === dia;
      const classes = ["calendar-day"];
      if (outside) classes.push("outside-month");
      if (isToday) classes.push("today");
      if (isSelected) classes.push("selected");

      return `<button class="${classes.join(" ")}" ${outside ? "disabled" : `data-dia="${dia}"`}>${dia}</button>`;
    }).join("");

    daysGrid.querySelectorAll(".calendar-day:not(.outside-month)").forEach((btn) => {
      btn.addEventListener("click", () => {
        diaSelecionado = Number(btn.dataset.dia);
        renderCalendario();
      });
    });
  }

  prevBtn.addEventListener("click", () => {
    mesAtual--;
    if (mesAtual < 0) { mesAtual = 11; anoAtual--; }
    renderCalendario();
  });

  nextBtn.addEventListener("click", () => {
    mesAtual++;
    if (mesAtual > 11) { mesAtual = 0; anoAtual++; }
    renderCalendario();
  });

  renderCalendario();
});