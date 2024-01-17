// ! recupero documenti dal DOM

const gridElement = document.getElementById("grid")
const button = document.querySelector("button")
const scoreElement = document.getElementById('score')
// ! Logica del gioco

let score = 0;

const playGame = () => {
    // svuoto la griglia
    gridElement.innerText = ' ';

    // Genero le celle e le stampo nella griglia
    for (let i =1; i <= 100; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.append(i);

        gridElement.appendChild(cell)

        // ! le celle cliccate diventano verdi

        cell.addEventListener('click',function(){

        if (cell.classList.contains('clicked')) return;
        cell.classList.add('clicked')

        score++;
        scoreElement.innerHTML = `score: ${score}`;
})
    }
}



// ! creo evento del button

button.addEventListener("click", playGame)

