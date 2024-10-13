let score = 0;
let highScore = 0;
let activeHole = null;
let gameInterval = null;
let moleTimeout = null;
let timeLeft = 30;
let timerInterval = null;

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const highScoreBoard = document.getElementById('high-score');
const timeBoard = document.getElementById('time');
const startButton = document.getElementById('start-button');

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function showMole() {
    if (activeHole) {
        activeHole.querySelector('.mole').style.display = 'none';
    }
    activeHole = randomHole();
    activeHole.querySelector('.mole').style.display = 'block';

    if (moleTimeout) {
        clearTimeout(moleTimeout);
    }
    moleTimeout = setTimeout(() => {
        if (activeHole) {
            activeHole.querySelector('.mole').style.display = 'none';
            activeHole = null;
        }
    }, 800);
}

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeBoard.textContent = timeLeft;

    gameInterval = setInterval(showMole, 1000);
    timerInterval = setInterval(updateTimer, 1000);

    setTimeout(() => {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert('Game Over! Your score is ' + score);
        if (score > highScore) {
            highScore = score;
            highScoreBoard.textContent = highScore;
        }
        startButton.disabled = false;
    }, 30000);
}

function updateTimer() {
    timeLeft--;
    timeBoard.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        clearInterval(timerInterval);
        alert('Game Over! Your score is ' + score);
        if (score > highScore) {
            highScore = score;
            highScoreBoard.textContent = highScore;
        }
        startButton.disabled = false;
    }
}

holes.forEach(hole => {
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);

    hole.addEventListener('click', () => {
        if (hole.querySelector('.mole').style.display === 'block') {
            score++;
            scoreBoard.textContent = score;
            hole.querySelector('.mole').style.display = 'none';
            activeHole = null;
        }
    });
});

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    startGame();
});

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});