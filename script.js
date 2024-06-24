document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const restartButton = document.getElementById('restart');
  let currentPlayer = 'X';
  let boardState = Array(9).fill(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (boardState[cellIndex] !== null || checkWinner()) {
      return;
    }

    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      return;
    }

    if (boardState.every(cell => cell !== null)) {
      alert('Draw!');
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return boardState[index] === currentPlayer;
      });
    });
  }

  function restartGame() {
    boardState.fill(null);
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
  }

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartButton.addEventListener('click', restartGame);
});
