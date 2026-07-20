const words = [
    "estudantes",
    "professores",
    "talentos",
    "empresas",
    "instituições"
]

const colorClasses = ["word-blue", "word-green", "word-purple", "word-amber"];

const word = document.getElementById("word");
let index = 0;

word.classList.add(colorClasses[0]);

setInterval(() => {
    word.classList.remove("show");
    word.classList.add("hide");

    setTimeout(() => {
        index =(index + 1) % words.length;
        word.textContent = words[index];

        colorClasses.forEach((c) => word.classList.remove(c));
        word.classList.add(colorClasses[index % colorClasses.length]);

        word.classList.remove("hide");
        word.classList.add("show");
    }, 350);
}, 2500);