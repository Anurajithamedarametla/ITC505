document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5;
    let stepCounter = 0;
    let timer = 0;
    let interval;

    const gameBoard = document.getElementById('gameBoard');
    const stepCounterDisplay = document.getElementById('stepCounter');
    const timerDisplay = document.getElementById('timer');
    const newGameButton = document.getElementById('newGameButton');

    newGameButton.addEventListener('click', startNewGame);

    function startNewGame() {
        clearInterval(interval);
        timer = 0;
        stepCounter = 0;
        stepCounterDisplay.textContent = stepCounter;
        timerDisplay.textContent = timer;
        gameBoard.innerHTML = '';
        initializeBoard();
        randomizeBoard();
        interval = setInterval(() => {
            timer++;
            timerDisplay.textContent = timer;
        }, 1000);
    }

    function initializeBoard() {
        console.log('initializeBoard')
        for (let i = 0; i < boardSize * boardSize; i++) {
            const light = document.createElement('div');
            light.classList.add('light');
            light.addEventListener('click', () => {
                toggleLights(i);
                checkWin();
                stepCounter++;
                stepCounterDisplay.textContent = stepCounter;
            });
            gameBoard.appendChild(light);
        }
    }

    function randomizeBoard() {
        console.log('randomizeBoard')
        let steps = []
        for (let i = 0; i < boardSize*boardSize; i++){//boardSize * boardSize; i++) {
            if (Math.random() < 0.4) { // Simulate random clicks to generate a solvable board
                toggleLights(i);
                let row = Math.floor(i / boardSize);
                let col = i % boardSize;
                steps.push([row+1, col+1])
                //console.log('(',row,',',col,')')
            }
        }
        console.log(steps.reverse())
    }

    function toggleLights(index) {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;

        // Toggle the clicked light and adjacent lights
        toggleLight(row, col);
        toggleLight(row - 1, col);
        toggleLight(row + 1, col);
        toggleLight(row, col - 1);
        toggleLight(row, col + 1);

       
    }

    function toggleLight(row, col) {
        if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) return;
        const index = row * boardSize + col;
        const light = gameBoard.children[index];
        light.classList.toggle('on');
    }

    function checkWin() {
        const lights = [...gameBoard.children];
        const win = lights.every(light => !light.classList.contains('on'));
        if (win) {
            clearInterval(interval);
            alert('Congratulations, you won!');
        }
    }

    startNewGame(); // Start a new game when the page loads
});
