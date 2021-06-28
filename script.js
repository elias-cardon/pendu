const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
    "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = [
    "ornithorynque",
    "Jobba",
    "vacances",
    "fatigue",
    "fetes",
    "joyeux",
    "paranormal",
    "raisin",
    "vigne",
    "voiture",
    "camion",
    "moto",
    "roue",
    "verre",
    "bocal",
    "biberon",
    "cartouche",
    "lit",
    "indien",
    "matelas",
    "parapluie",
    "parasol",
    "paratonnerre",
    "tondeuse",
    "parachute",
    "pelouse",
    "herbe",
    "avion",
    "cacahuete",
    "creepypasta",
    "champignon",
    "zoo",
    "serpentin",
    "parthenogenese",
    "apopathodiaphulatophobie",
    "cyclopentanoperhydrophenanthrene",
    "hippopotomonstrosesquippedaliophobie",
    "aminomethylpyrimidinylhydroxyethylmethythiazolium",
    "joker",
    "largeur",
    "longueur",
    "tennis",
    "rodeo",
    "dynamo",
    "alimentation",
    "rencherir",
    "ocre",
    "dard",
    "tofu",
    "mort",
    "carte",
    "casque",
    "bureau",
    "ordinateur",
    "joie",
    "tristesse",
    "faux",
    "vrai",
    "loto",
    "culot",
    "suie",
    "soie",
    "zinc",
    "nous",
    "repu",
    "malt",
    "blog",
    "musique",
    "film",
    "cuisine",
    "ruban",
    "porte",
    "tableau",
    "apprentissage",
    "sac",
    "cartable",
    "souris",
    "clavier",
    "appel",
    "feuille",
    "papier",
    "ciseaux",
    "pierre",
    "shifoumi",
    "jeu",
    "jouer",
    "question",
    "affirmation",
    "chaise",
    "amour",
    "carton",
    "humour",
    "blague",
    "mur",
    "jardin",
    "jardinage",
    "patate",
    "chiffre",
    "nombre",
    "coronavirus",
    "covid",
    "maladie",
    "hirondelle",
    "semaine",
    "jour",
    "configuration",
    "doigt",
    "main",
    "vue",
    "boutique",
    "projet",
    "calculatrice",
    "brique",
    "chat",
    "chien",
    "dossier",
    "professionnel",
    "morpion",
    "plateforme",
    "aventure",
    "voyage",
    "portfolio",
    "ciel",
    "librairie",
    "externe",
    "mot",
    "stylo",
    "censure",
    "toilettes",
    "frigidaire",
    "charmant",
    "bouteille",
    "ennui",
    "pendu",
    "swagg",
    "rhododendron",
    "coccyx",
    "ecchymose",
    "chevalet",
    "diapason",
    "calligraphe",
    "veuf",
    "veuve",
    "licol",
    "naseau",
    "hennir",
    "houspiller",
    "bougre",
    "inoxydable",
    "acrimonie",
    "animadversion"
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordElement.innerHTML = `
    ${selectedWord
        .split("") // to array
        .map(
            (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
        )
        .join("")} 
    `; // to string
    const innerWord = wordElement.innerText.replace(/\n/g, "");
    if (innerWord === selectedWord) {
        finalMessage.innerText = "Félicitations ! Vous avez gagné ! 😃";
        finalMessageRevealWord.innerText = "";
        popup.style.display = "flex";
        playable = false;
    }
}

function updateWrongLettersElement() {
    wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Faux !</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        index < errors
            ? (part.style.display = "block")
            : (part.style.display = "none");
    });
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Vous avez perdu... Dommage. 😕";
        finalMessageRevealWord.innerText = `Le mot à trouver était: ${selectedWord}`;
        popup.style.display = "flex";
        playable = false;
    }
}

function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}

window.addEventListener("keypress", (e) => {
    if (playable) {
        const letter = e.key.toLowerCase();
        if (letter >= "a" && letter <= "z") {
            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersElement();
                } else {
                    showNotification();
                }
            }
        }
    }
});

playAgainButton.addEventListener("click", () => {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersElement();
    popup.style.display = "none";
});

// Init
displayWord();
