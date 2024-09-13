import { testDictionary, realDictionary } from './dictionary.js';

// for testing purposes, make sure to use the test dictionary
console.log('test dictionary:', testDictionary);

const dictionary = realDictionary;
const state = {
  secret: dictionary[Math.floor(Math.random() * dictionary.length)],
  grid: Array(6)
    .fill()
    .map(() => Array(5).fill('')),
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
  } else if (key === 'Backspace') {
    removeLetter();
  } else if (isLetter(key)) {
    addLetter(key);
  }

  updateGrid();
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr, '');
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function getNumOfOccurrencesInWord(word, letter) {
  return word.split(letter).length - 1;
}

function getPositionOfOccurrence(word, letter, position) {
  let count = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) count++;
  }
  return count;
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500; // ms

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(state.secret, letter);
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
    const letterPosition = getPositionOfOccurrence(guess, letter, i);

    setTimeout(() => {
      if (numOfOccurrencesGuess > numOfOccurrencesSecret && letterPosition > numOfOccurrencesSecret) {
        box.classList.add('empty');
      } else {
        if (letter === state.secret[i]) {
          box.classList.add('right');
        } else if (state.secret.includes(letter)) {
          box.classList.add('wrong');
        } else {
          box.classList.add('empty');
        }
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
      alert(`Game over. The word was ${state.secret}.`);
    }
  }, 3 * animation_duration);
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol < 5) {
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
    updateGrid();
  }
}

function removeLetter() {
  if (state.currentCol > 0) {
    state.currentCol--;
    state.grid[state.currentRow][state.currentCol] = '';
    updateGrid();
  }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game');
  drawGrid(gameContainer);
  registerKeyboardEvents();
});
