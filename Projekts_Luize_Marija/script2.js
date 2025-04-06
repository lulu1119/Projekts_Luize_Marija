const colors = ["aqua", "green", "purple", "beige", "yellow", "pink"];
const cards = [...colors, ...colors];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let turns = 0;
let matched = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById("game-board");
const timeDisplay = document.getElementById("time");
const turnsDisplay = document.getElementById("turns");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    clearInterval(interval);
    timer = 0;
    turns = 0;
    matched = 0;
    timeDisplay.textContent = timer;
    turnsDisplay.textContent = turns;
    gameBoard.innerHTML = "";
    const shuffled = shuffle(cards);

    shuffled.forEach(color => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.color = color;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    interval = setInterval(() => {
        timer++;
        timeDisplay.textContent = timer;
    }, 1000);
}

function flipCard() {
    if (lockBoard || this.classList.contains("flipped")) return;
    this.classList.add("flipped");
    turns++;
    turnsDisplay.textContent = turns;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        matched += 2;
        resetTurn();
        if (matched === cards.length) {
            clearInterval(interval);
            setTimeout(() => alert(`Apsveicam! Laiks: ${timer}s, Pagriezienu skaits: ${turns}`), 300);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 1000);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById("restart").addEventListener("click", startGame);
window.addEventListener("DOMContentLoaded", startGame);
