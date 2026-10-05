// ! recupero documenti dal DOM

const gridElement = document.getElementById("grid")
const button = document.querySelector("button")
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
const difficultyElement = document.getElementById('difficulty')

// ! variabili di base

const totalBombs = 16;

// ! FUNZIONI

// ! calcolo il numero di celle in base alla difficoltà scelta
const getTotalCells = (difficulty) => {
    if (difficulty === 'medium') return 81;
    if (difficulty === 'hard') return 49;
    return 100;
}

// ! genero un numero casuale tra min e max
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ! genero le bombe: numeri casuali tutti diversi tra 1 e il numero di celle
const generateBombs = (maxNumber, bombsNumber) => {
    const bombs = [];
    while (bombs.length < bombsNumber) {
        const randomNumber = getRandomNumber(1, maxNumber);
        if (!bombs.includes(randomNumber)) bombs.push(randomNumber);
    }
    return bombs;
}

// ! Logica del gioco

const playGame = () => {
    // svuoto la griglia, il punteggio e il messaggio
    gridElement.innerText = '';
    messageElement.innerText = '';

    let score = 0;
    let isGameOver = false;
    scoreElement.innerText = `score: ${score}`;

    // recupero la difficoltà scelta e il numero di celle
    const difficulty = difficultyElement.value;
    const totalCells = getTotalCells(difficulty);

    // punteggio massimo: tutte le celle che non sono bombe
    const maxScore = totalCells - totalBombs;

    // genero le bombe e le stampo in console
    const bombs = generateBombs(totalCells, totalBombs);
    console.log('bombe:', bombs);

    // ! scopro tutte le bombe del tabellone
    const revealBombs = () => {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < cells.length; i++) {
            if (bombs.includes(i + 1)) cells[i].classList.add('bomb');
        }
    }

    // ! fine partita
    const endGame = (hasWon) => {
        isGameOver = true;
        revealBombs();
        const message = hasWon ? 'Hai vinto!' : 'Hai calpestato una bomba! Hai perso.';
        messageElement.innerText = `${message} Punteggio: ${score}`;
        console.log(`partita terminata - ${message} Punteggio: ${score}`);
    }

    // Genero le celle e le stampo nella griglia
    for (let i = 1; i <= totalCells; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell', difficulty);
        cell.append(i);

        gridElement.appendChild(cell)

        cell.addEventListener('click',function(){

            // se la partita è finita o la cella è già cliccata non faccio nulla
            if (isGameOver || cell.classList.contains('clicked')) return;
            cell.classList.add('clicked')

            // ! controllo se ho calpestato una bomba
            if (bombs.includes(i)) {
                cell.classList.add('bomb');
                endGame(false);
                return;
            }

            // altrimenti incremento il punteggio
            score++;
            scoreElement.innerText = `score: ${score}`;

            // ! controllo se ho raggiunto il punteggio massimo
            if (score === maxScore) endGame(true);
        })
    }
}

// ! creo evento del button

button.addEventListener("click", playGame)
