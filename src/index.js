import { testDictionary, realDictionary } from './dictionary.js';

// for testing purposes, make sure to use the test dictionary
console.log('test dictionary:', testDictionary);

const dictionary = realDictionary;
const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6).fill().map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
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
    handleKey(e.key);
  };

  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', (e) => {
      handleKey(e.target.dataset.key);
    });
  });
}

function handleKey(key) {
  if (key === 'Enter') {
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
  if (key === 'Backspace') {
    removeLetter();
  }
  if (isLetter(key)) {
    addLetter(key);
  }

  updateGrid();
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function getNumOfOccurrencesInWord(word, letter) {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function getPositionOfOccurrence(word, letter, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) {
      result++;
    }
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500; // ms

  for (let i = 
