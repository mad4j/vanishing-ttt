/**
 * Vanishing Tic-Tac-Toe Game Logic
 * 
 * Game Rules:
 * - Classic 3x3 Tic-Tac-Toe grid
 * - Each player can only have 3 symbols on the board at a time
 * - After placing 3 symbols, the oldest symbol vanishes when placing a new one
 * - First player to get 3 in a row wins
 */

class VanishingTicTacToe {
    constructor() {
        // Game board represented as 2D array
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        
        // Current player: 'X' or 'O'
        this.currentPlayer = 'X';
        
        // Track moves for vanishing mechanic [{ x, y, player }, ...]
        this.moves = [];
        
        // Winning line coordinates if game is won
        this.winningLine = null;
        
        // Game over flag
        this.gameOver = false;
        
        // Winner of the game
        this.winner = null;
        
        // All possible winning lines
        this.WINNING_LINES = [
            // Rows
            [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
            [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}],
            [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],
            // Columns
            [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
            [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
            [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
            // Diagonals
            [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
            [{x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 2}]
        ];
    }
    
    /**
     * Make a move at the specified position
     * @param {number} x - Column index (0-2)
     * @param {number} y - Row index (0-2)
     * @returns {Object} - { success: boolean, vanishedMove: {x, y} | null }
     */
    makeMove(x, y) {
        // Check if game is over or cell is occupied
        if (this.gameOver || this.board[y][x] !== null) {
            return { success: false, vanishedMove: null };
        }
        
        // Place the current player's symbol
        this.board[y][x] = this.currentPlayer;
        this.moves.push({ x, y, player: this.currentPlayer });
        
        let vanishedMove = null;
        
        // Remove the oldest move if there are more than 6 moves total
        if (this.moves.length > 6) {
            const oldMove = this.moves.shift();
            this.board[oldMove.y][oldMove.x] = null;
            vanishedMove = oldMove;
        }
        
        // Check for winner
        this.checkWinner();
        
        // Switch player if game is not over
        if (!this.gameOver) {
            this.switchPlayer();
        }
        
        return { success: true, vanishedMove };
    }
    
    /**
     * Switch to the other player
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    /**
     * Check if there is a winner
     */
    checkWinner() {
        for (const line of this.WINNING_LINES) {
            const [pos1, pos2, pos3] = line;
            const cell1 = this.board[pos1.y][pos1.x];
            const cell2 = this.board[pos2.y][pos2.x];
            const cell3 = this.board[pos3.y][pos3.x];
            
            if (cell1 && cell1 === cell2 && cell2 === cell3) {
                this.winningLine = line;
                this.winner = this.currentPlayer;
                this.gameOver = true;
                return;
            }
        }
        
        this.winningLine = null;
        this.winner = null;
    }
    
    /**
     * Get the value of a cell
     * @param {number} x - Column index
     * @param {number} y - Row index
     * @returns {string|null} - 'X', 'O', or null
     */
    getCell(x, y) {
        return this.board[y][x];
    }
    
    /**
     * Check if a cell is empty
     * @param {number} x - Column index
     * @param {number} y - Row index
     * @returns {boolean}
     */
    isEmpty(x, y) {
        return this.board[y][x] === null;
    }
    
    /**
     * Get all empty cells
     * @returns {Array} - Array of {x, y} coordinates
     */
    getEmptyCells() {
        const emptyCells = [];
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (this.isEmpty(x, y)) {
                    emptyCells.push({ x, y });
                }
            }
        }
        return emptyCells;
    }
    
    /**
     * Create a copy of the current game state
     * @returns {VanishingTicTacToe}
     */
    clone() {
        const cloned = new VanishingTicTacToe();
        cloned.board = this.board.map(row => [...row]);
        cloned.currentPlayer = this.currentPlayer;
        cloned.moves = [...this.moves];
        cloned.winningLine = this.winningLine;
        cloned.gameOver = this.gameOver;
        return cloned;
    }
    
    /**
     * Reset the game to initial state
     */
    reset() {
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.currentPlayer = 'X';
        this.moves = [];
        this.winningLine = null;
        this.winner = null;
        this.gameOver = false;
    }
    
    /**
     * Get the winner of the game
     * @returns {string|null} - 'X', 'O', or null
     */
    getWinner() {
        return this.winner;
    }
}

/**
 * AI Player Logic
 * Strategy:
 * 1. Check for winning move
 * 2. Block opponent's winning move
 * 3. Pick random available move
 */
class AIPlayer {
    /**
     * Get the next move for the AI
     * @param {VanishingTicTacToe} game - Current game state
     * @returns {Object|null} - {x, y} coordinates or null
     */
    static getNextMove(game) {
        // Check if AI can win
        const winningMove = this.findWinningMove(game, 'O');
        if (winningMove) {
            return winningMove;
        }
        
        // Check if need to block opponent
        const blockingMove = this.findWinningMove(game, 'X');
        if (blockingMove) {
            return blockingMove;
        }
        
        // Pick random available move
        const emptyCells = game.getEmptyCells();
        if (emptyCells.length > 0) {
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
        
        return null;
    }
    
    /**
     * Find a winning move for the specified player
     * @param {VanishingTicTacToe} game - Current game state
     * @param {string} player - 'X' or 'O'
     * @returns {Object|null} - {x, y} coordinates or null
     */
    static findWinningMove(game, player) {
        const emptyCells = game.getEmptyCells();
        
        for (const cell of emptyCells) {
            // Create a simulated game state
            const simulatedGame = game.clone();
            
            // Set the player we're testing for
            // If testing a different player than current, switch to that player
            if (player !== simulatedGame.currentPlayer) {
                simulatedGame.switchPlayer();
            }
            
            // Make the move and check if it wins
            simulatedGame.makeMove(cell.x, cell.y);
            
            // Check if this move resulted in a win for the target player
            if (simulatedGame.gameOver && simulatedGame.getWinner() === player) {
                return cell;
            }
        }
        
        return null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VanishingTicTacToe, AIPlayer };
}
