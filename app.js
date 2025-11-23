/**
 * Vanishing Tic-Tac-Toe PWA Application
 * Handles UI interactions and game flow
 */

// Game instance
let game = new VanishingTicTacToe();

// DOM elements
const gameBoard = document.getElementById('gameBoard');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const winningLine = document.getElementById('winningLine');
const lineElement = document.getElementById('line');
const cells = document.querySelectorAll('.cell');

// AI move delay for better UX
const AI_DELAY = 600;

/**
 * Initialize the game
 */
function init() {
    // Set up event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetButton.addEventListener('click', resetGame);
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    // Handle PWA install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt(deferredPrompt);
    });
    
    updateUI();
}

/**
 * Handle cell click event
 */
function handleCellClick(event) {
    const cell = event.currentTarget;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);
    
    // Only allow moves if it's player X's turn and game is not over
    if (game.currentPlayer !== 'X' || game.gameOver) {
        return;
    }
    
    // Try to make the move
    const result = game.makeMove(x, y);
    
    if (result.success) {
        // Handle vanishing animation if a piece was removed
        if (result.vanishedMove) {
            const vanishedCell = getCellElement(result.vanishedMove.x, result.vanishedMove.y);
            vanishedCell.classList.add('vanishing');
            setTimeout(() => {
                vanishedCell.classList.remove('vanishing');
            }, 500);
        }
        
        updateUI();
        
        // If game is not over and it's AI's turn, make AI move
        if (!game.gameOver && game.currentPlayer === 'O') {
            setTimeout(makeAIMove, AI_DELAY);
        }
    }
}

/**
 * Make AI move
 */
function makeAIMove() {
    const move = AIPlayer.getNextMove(game);
    
    if (move) {
        const result = game.makeMove(move.x, move.y);
        
        if (result.success) {
            // Handle vanishing animation if a piece was removed
            if (result.vanishedMove) {
                const vanishedCell = getCellElement(result.vanishedMove.x, result.vanishedMove.y);
                vanishedCell.classList.add('vanishing');
                setTimeout(() => {
                    vanishedCell.classList.remove('vanishing');
                }, 500);
            }
            
            updateUI();
        }
    }
}

/**
 * Update the UI based on current game state
 */
function updateUI() {
    // Update cells
    cells.forEach(cell => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const value = game.getCell(x, y);
        
        // Clear previous classes
        cell.classList.remove('x', 'o', 'occupied');
        cell.textContent = '';
        
        // Set new value
        if (value) {
            cell.textContent = value;
            cell.classList.add(value.toLowerCase(), 'occupied');
        }
    });
    
    // Update status
    if (game.gameOver) {
        const winner = game.getWinner();
        statusElement.textContent = `Player ${winner} wins!`;
        statusElement.style.color = winner === 'X' ? 'var(--x-color)' : 'var(--o-color)';
        drawWinningLine();
    } else {
        statusElement.textContent = `Player ${game.currentPlayer}'s turn`;
        statusElement.style.color = 'var(--primary-color)';
        winningLine.classList.remove('visible');
    }
}

/**
 * Draw the winning line
 */
function drawWinningLine() {
    if (!game.winningLine) return;
    
    const boardRect = gameBoard.getBoundingClientRect();
    const cellSize = boardRect.width / 3;
    const offset = cellSize / 2;
    
    const start = game.winningLine[0];
    const end = game.winningLine[2];
    
    const x1 = start.x * cellSize + offset;
    const y1 = start.y * cellSize + offset;
    const x2 = end.x * cellSize + offset;
    const y2 = end.y * cellSize + offset;
    
    lineElement.setAttribute('x1', x1);
    lineElement.setAttribute('y1', y1);
    lineElement.setAttribute('x2', x2);
    lineElement.setAttribute('y2', y2);
    
    winningLine.classList.add('visible');
}

/**
 * Get cell element by coordinates
 */
function getCellElement(x, y) {
    return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
}

/**
 * Reset the game
 */
function resetGame() {
    game.reset();
    updateUI();
}

/**
 * Show PWA install prompt
 */
function showInstallPrompt(deferredPrompt) {
    // Create install prompt element
    const promptDiv = document.createElement('div');
    promptDiv.className = 'install-prompt visible';
    promptDiv.innerHTML = `
        <span>Install this app for offline play!</span>
        <button id="installBtn">Install</button>
        <button class="close" id="closePrompt">✕</button>
    `;
    document.body.appendChild(promptDiv);
    
    // Handle install button click
    document.getElementById('installBtn').addEventListener('click', async () => {
        promptDiv.classList.remove('visible');
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
        setTimeout(() => promptDiv.remove(), 300);
    });
    
    // Handle close button click
    document.getElementById('closePrompt').addEventListener('click', () => {
        promptDiv.classList.remove('visible');
        setTimeout(() => promptDiv.remove(), 300);
    });
}

// Handle window resize for winning line
window.addEventListener('resize', () => {
    if (game.gameOver && game.winningLine) {
        drawWinningLine();
    }
});

// Initialize the game when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
