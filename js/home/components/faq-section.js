document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  function setAnswerHeight(item, isOpen) {
    const answer = item.querySelector(".faq-answer");
    answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "0px";
  }

  faqItems.forEach((item) => {
    const questionRow = item.querySelector(".faq-question-row");

    setAnswerHeight(item, item.classList.contains("active"));

    questionRow.addEventListener("click", () => {
      const isCurrentlyOpen = item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        setAnswerHeight(otherItem, false);
      });

      if (!isCurrentlyOpen) {
        item.classList.add("active");
        setAnswerHeight(item, true);
      }
    });
  });

  window.addEventListener("resize", () => {
    faqItems.forEach((item) => {
      if (item.classList.contains("active")) setAnswerHeight(item, true);
    });
  });
});