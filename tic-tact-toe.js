
/*
    The following file contains all the logic for the tic-tac-toe game. 
    - Brian
**/
const game = {
    xWin: 0,
    oWin: 0,
    draws: 0,
    active: true,
    currentPlayer: "O",
    tiles: ["", "", "", "", "", "", "", "", ""],
    winningConditions: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ]
}

const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `Player ${game.currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `${game.currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCellIndex) {
    game.tiles[clickedCellIndex] = game.currentPlayer;
    document.getElementById("game-status").innerHTML = game.currentPlayer;
    if (game.currentPlayer == "X")
        drawX(clickedCellIndex);
    else
        drawCircle(clickedCellIndex);

}

function handlePlayerChange() {
    game.currentPlayer = game.currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    console.log(game.tiles);
    let roundWon = false;
    let typeOfWin = "";
    for (let i = 0; i <= 7; i++) {
        const winCondition = game.winningConditions[i];
        let a = game.tiles[winCondition[0]];
        let b = game.tiles[winCondition[1]];
        let c = game.tiles[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;

            if (i < 3) {
                typeOfWin = "horizontal";
            } else if (i >= 3 && i < 6) {
                typeOfWin = "vertical";
            } else if (i == 6) {
                typeOfWin = "diagonalR";
            } else if (i == 7) {
                typeOfWin = "diagonalL";
            }

            colorWinnerTiles(winCondition[0], winCondition[1], winCondition[2], typeOfWin);

            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        if (game.currentPlayer == "X")
            game.xWin += 1;
        else if (game.currentPlayer == "O")
            game.oWin += 1;
        game.active = false;
        updateScore();
        return;
    }

    let roundDraw = !game.tiles.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        game.draws += 1;
        game.active = false;
        updateScore();
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellIndex) {

    if (game.tiles[clickedCellIndex] !== "" || !game.active) {
        return;
    }

    handleCellPlayed(clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    game.active = true;
    game.currentPlayer = "O";
    game.tiles = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    clearCanvas();
}

function updateScore() {
    window.localStorage.setItem('game', JSON.stringify(game));
    document.getElementById("xScore").innerHTML = "X:" + game.xWin;
    document.getElementById("OScore").innerHTML = "O:" + game.oWin;
    document.getElementById("draws").innerHTML = "Draws:" + game.draws;
}

//Recovers data if user closed window
function startScore() {
    game.xWin = JSON.parse(window.localStorage.getItem('game')).xWin;
    game.oWin = JSON.parse(window.localStorage.getItem('game')).oWin;
    game.draws = JSON.parse(window.localStorage.getItem('game')).draws;

    console.log("This ran 2");
    document.getElementById("xScore").innerHTML = "X:" + game.xWin;
    document.getElementById("OScore").innerHTML = "O:" + game.oWin;
    document.getElementById("draws").innerHTML = "Draws:" + game.draws;

}

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
startScore();