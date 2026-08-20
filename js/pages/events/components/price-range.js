document.addEventListener("DOMContentLoaded", () => {
  const minInput = document.getElementById("price-min");
  const maxInput = document.getElementById("price-max");
  const fill = document.getElementById("price-range-fill");
  const minLabel = document.getElementById("price-min-label");
  const maxLabel = document.getElementById("price-max-label");

  if (!minInput || !maxInput) return;

  const limite = Number(minInput.max);

  function atualizarSlider() {
    let minVal = Number(minInput.value);
    let maxVal = Number(maxInput.value);

    // Impede que os cursores se cruzem
    if (minVal > maxVal - 5) {
      minVal = maxVal - 5;
      minInput.value = minVal;
    }

    const minPct = (minVal / limite) * 100;
    const maxPct = (maxVal / limite) * 100;

    fill.style.left = `${minPct}%`;
    fill.style.width = `${maxPct - minPct}%`;

    minLabel.textContent = `$${minVal}`;
    maxLabel.textContent = `$${maxVal}`;
  }

  minInput.addEventListener("input", atualizarSlider);
  maxInput.addEventListener("input", atualizarSlider);

  atualizarSlider();
});