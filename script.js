const board = document.getElementById("board");
const turnText = document.getElementById("turn");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const drawMessage = document.getElementById("drawMessage");
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");

let currentPlayer = "red";
let boardState = Array(6).fill().map(() => Array(7).fill(null));
let scores = { red: 0, yellow: 0 };
let gameOver = false;

function renderBoard() {
  board.innerHTML = "";
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (boardState[row][col]) {
        cell.classList.add(boardState[row][col]);
      }
      cell.dataset.col = col;
      if (!gameOver) {
        cell.addEventListener("click", () => handleClick(col));
      }
      board.appendChild(cell);
    }
  }
}

function handleClick(col) {
  if (gameOver) return;
  for (let row = 5; row >= 0; row--) {
    if (!boardState[row][col]) {
      boardState[row][col] = currentPlayer;
      break;
    }
  }
  if (checkWinner()) {
    gameOver = true;
    turnText.textContent = (currentPlayer === "red" ? name1Input.value || "Player 1" : name2Input.value || "Player 2") + " Wins! 🎉";
    scores[currentPlayer]++;
    score1.textContent = scores.red;
    score2.textContent = scores.yellow;
    drawMessage.style.display = "none";
    renderBoard();
    return;
  }

  if (isDraw()) {
    gameOver = true;
    turnText.textContent = "Game Over";
    drawMessage.style.display = "block";
    renderBoard();
    return;
  }

  currentPlayer = currentPlayer === "red" ? "yellow" : "red";
  turnText.textContent = currentPlayer === "red" ? `${name1Input.value || "Player 1"}'s Turn` : `${name2Input.value || "Player 2"}'s Turn`;
  drawMessage.style.display = "none";
  renderBoard();
}

function checkWinner() {
  function checkDirection(r, c, dr, dc) {
    let color = boardState[r][c];
    if (!color) return false;
    for (let i = 1; i < 4; i++) {
      let nr = r + dr * i;
      let nc = c + dc * i;
      if (nr < 0 || nr >= 6 || nc < 0 || nc >= 7 || boardState[nr][nc] !== color) {
        return false;
      }
    }
    return true;
  }
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (
        checkDirection(r, c, 0, 1) ||
        checkDirection(r, c, 1, 0) ||
        checkDirection(r, c, 1, 1) ||
        checkDirection(r, c, 1, -1)
      ) {
        return true;
      }
    }
  }
  return false;
}

function isDraw() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      if (!boardState[row][col]) {
        return false;
      }
    }
  }
  return true;
}

function restart() {
  boardState = Array(6).fill().map(() => Array(7).fill(null));
  currentPlayer = "red";
  gameOver = false;
  turnText.textContent = `${name1Input.value || "Player 1"}'s Turn`;
  drawMessage.style.display = "none";
  renderBoard();
}

function updateNames() {
  label1.textContent = `😊 ${name1Input.value || "Player 1"}:`;
  label2.textContent = `😊 ${name2Input.value || "Player 2"}:`;
  turnText.textContent = currentPlayer === "red" ? `${name1Input.value || "Player 1"}'s Turn` : `${name2Input.value || "Player 2"}'s Turn`;
}

renderBoard();