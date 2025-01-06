const Gameboard = (function() {
    // dom
    const cells = document.querySelectorAll('.cell')
    const statusMsg = document.getElementById('status-message')
    const restartBtn = document.getElementById('restart-btn')
    let gameActive = true
    let currentPlayer = 'X'
    let gameBoard = ["","","","","","","","",""]

    const tieMessage = "it's a tie!"
    statusMsg.innerHTML = `It's ${currentPlayer}'s turn`

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], //
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    // restart game
    function restartGame() {
        gameBoard = ["","","","","","","","",""]
        currentPlayer = 'X'
        statusMsg.innerHTML = `It's ${currentPlayer}'s turn`
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
        let roundWin = false
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
                roundWin = true
                break
            }
        }

        if (roundWin) {
            statusMsg.textContent = `${currentPlayer} has won!`
            gameActive = false
        } else if (!gameBoard.includes("")) {
            // tie
            statusMsg.textContent = tieMessage
            gameActive = false
        } else {
            changePlayer()
        }
    }

    function updateCell(cell, cellIndex) {
        gameBoard[cellIndex] = currentPlayer
        cell.innerHTML = currentPlayer
    }

    function changePlayer() {
        currentPlayer = (currentPlayer == "X") ? "O" : "X"
        statusMsg.textContent = `It's ${currentPlayer}'s turn`
    }

    cells.forEach(cell => cell.addEventListener('click', cellClick))
    restartBtn.addEventListener('click', restartGame)
})();