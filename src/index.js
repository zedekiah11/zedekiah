import { testDictionary, realDictionary } from './dictionary.js';

console.log('test dictionary:', testDictionary);

const dictionary = realDictionary;
const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
  usedKeys: {}, // Track the used keys and their states
};

function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j);
    }
  }

  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letter;
  box.id = `box${row}${col}`;

  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key.toLowerCase();
    if (key === 'enter') {
      handleSubmit();
    } else if (key === 'backspace') {
      removeLetter();
    } else if (isLetter(key) && !state.usedKeys[key]) {
      addLetter(key);
    }

    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500; // ms

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;

    setTimeout(() => {
      if (letter === state.secret[i]) {
        box.classList.add('right');
        updateKeyColor(letter, 'correct');
      } else if (state.secret.includes(letter)) {
        box.classList.add('wrong');
        updateKeyColor(letter, 'misplaced');
      } else {
        box.classList.add('empty');
        updateKeyColor(letter, 'disabled');
      }
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add('animated');
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  setTimeout(() => {
    if (isWinner) {
      alert('Congratulations!');
    } else if (isGameOver) {
      alert(`Better luck next time! The word was ${state.secret}.`);
    }
  }, 3 * animation_duration);
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 5) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}

function handleSubmit() {
  if (state.currentCol === 5) {
    const word = getCurrentWord();
    if (isWordValid(word)) {
      revealWord(word);
      state.currentRow++;
      state.currentCol = 0;
    } else {
      alert('Not a valid word.');
    }
  }
}

function updateKeyColor(letter, status) {
  const keyButton = document.querySelector(`button[data-key="${letter}"]`);
  if (keyButton) {
    keyButton.classList.remove('correct', 'misplaced', 'disabled'); // Remove previous status classes
    if (status !== 'disabled') {
      keyButton.classList.add(status);
    } else {
      keyButton.classList.add('disabled');
      keyButton.disabled = true; // Disable button to prevent further clicks
    }
    state.usedKeys[letter] = status === 'disabled'; // Mark the key as used or not
  }
}

function setupOnScreenKeyboard() {
  const keyboardContainer = document.getElementById('keyboard');
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  rows.forEach((rowKeys) => {
    const row = document.createElement('div');
    row.className = 'keyboard-row';

    rowKeys.forEach((key) => {
      const keyButton = document.createElement('button');
      keyButton.textContent = key;
      keyButton.className = 'key';
      keyButton.setAttribute('data-key', key.toLowerCase());

      if (key === 'Enter' || key === 'Backspace') {
        keyButton.classList.add('large');
      }

      keyButton.onclick = () => handleKeyPress(key);
      row.appendChild(keyButton);
    });

    keyboardContainer.appendChild(row);
  });
}

function handleKeyPress(key) {
  key = key.toLowerCase();
  if (key === 'enter') {
    handleSubmit();
  } else if (key === 'backspace') {
    removeLetter();
  } else if (isLetter(key) && !state.usedKeys[key]) {
    addLetter(key);
  }

  updateGrid();
}

function startGame() {
  const game = document.getElementById('game');
  drawGrid(game);
  registerKeyboardEvents();
  setupOnScreenKeyboard();
}

startGame();
