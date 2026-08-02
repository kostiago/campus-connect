document.addEventListener("DOMContentLoaded", () => {

    const featuredCard = document.querySelector(".news-featured");
    const secondaryList = document.querySelector(".news-secondary-list");

    if (!featuredCard || !secondaryList) return;

    const syncHeight = () => {

        secondaryList.style.height =
            `${featuredCard.getBoundingClientRect().height}px`;

    };

    syncHeight();

    new ResizeObserver(syncHeight).observe(featuredCard);

});