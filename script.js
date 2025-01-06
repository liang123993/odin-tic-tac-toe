const Gameboard = (function() {
    // dom
    const cells = document.querySelectorAll('.cell')
    const statusMsg = document.getElementById('status-message')
    const restartBtn = document.getElementById('restart-btn')
    let gameActive = true
    let currentPlayer = 'X'
    let gameBoard = ["","","","","","","","",""]

    const winningMessage = `${currentPlayer} has won!`
    const tieMessage = "it's a tie!"
    const currentPlayerTurn = `It's ${currentPlayer}'s turn`
    statusMsg.innerHTML = currentPlayerTurn

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 2, 3],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    // restart game
    function restartGame() {
        gameBoard = ["","","","","","","","",""]
        currentPlayer = 'X'
        statusMsg.innerHTML = currentPlayerTurn
        cells.forEach(cell => cell.textContent = "")
        gameActive = true
    }

    // cell clicked
    function cellClick() {
        const cellIndex = this.getAttribute('cellIndex')
        // console.log(cellIndex)
        if (gameBoard[cellIndex] !== "" || !gameActive) {
            // do nothing
            return
        } else {
            updateCell(this, cellIndex)
            checkWinner()
        }        
    }

    function checkWinner() {
        roundWin = false
        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i]
            const cellA = gameBoard[condition[0]]
            const cellB = gameBoard[condition[1]]
            const cellC = gameBoard[condition[2]]
            // no winner yet
            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            }
            // win
            if (cellA === cellB && cellB === cellC) {
                roundwin = true
                break
            }
        }

        if (roundwin) {
            statusMsg.textContent = winningMessage
        }
    }

    function updateCell(cell, cellIndex) {
        gameBoard[cellIndex] = currentPlayer
        cell.innerHTML = currentPlayer
    }

    cells.forEach(cell => cell.addEventListener('click', cellClick))
    restartBtn.addEventListener('click', restartGame)
})();