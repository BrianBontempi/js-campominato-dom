// ! recupero documenti dal DOM

const gridElement = document.getElementById("grid")
const button = document.querySelector("button")

// ! FUNZIONI

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
        cell.classList.toggle('clicked')
})
    }
}

// ! creo evento del button

button.addEventListener("click", playGame)

