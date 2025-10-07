const INITIAL_GRID_SIZE = 16;

const grid = document.querySelector('.grid');
const settingsContainer = document.querySelector('.settings-container');

const gridSizeBtn = document.querySelector('.grid-size-btn');
const clearBtn = document.querySelector('.clear-btn');

const defaultBtn = document.querySelector('.default-btn');
const randomColorsBtn = document.querySelector('.random-colors-btn');
const darkeningBtn = document.querySelector('.darkening-btn');

let selectedBtn = defaultBtn;
defaultBtn.classList.add('highlight');

let penDown = false;

function createElement(tag, text = '') {
    const element = document.createElement(tag);
    if (text) {
        element.textContent = text;
    }
    return element;
}

function randInt(num) {
    return Math.floor(Math.random() * num);
}

function createGrid(rows) {
    for (let i = 0; i < rows; i++) {
        const rowDiv = createElement('div');
        rowDiv.classList.add('row');
        for (let j = 0; j < rows; j++) {
            const cell = createElement('div');
            cell.classList.add('cell');
            rowDiv.appendChild(cell);
        }
        grid.appendChild(rowDiv);
    }
}

function clearGrid() {
    const cells = grid.querySelectorAll('.cell');
    cells.forEach(cell => cell.style.backgroundColor = 'white');
}

function deleteGrid() {
    grid.replaceChildren();
}

function applyDefaultColor(cell) {
    cell.style.backgroundColor = 'black';
}

function applyRandomColor(cell) {
    cell.style.backgroundColor = `rgb(${randInt(256)}, ${randInt(256)}, ${randInt(256)})`;
}

function applyDarkening(cell) {
    const color = getComputedStyle(cell).backgroundColor;
    const rgba = color.split('(')[1].split(')')[0].split(', ').map(num => parseFloat(num));
    
    let alpha;
    if (rgba[0] !== 0 || rgba[1] !== 0 || rgba[2] !== 0) {
        alpha = 0;
    } else if (rgba.length !== 4) {
        alpha = 1;
    } else {
        alpha = rgba[3];
    }
    alpha = Math.min(alpha + 0.1, 1);
    cell.style.backgroundColor = `rgba(0, 0, 0, ${alpha})`;
}

function paintCell(cell) {
    const setting = selectedBtn.dataset.setting;
    if (setting === 'default') {
        applyDefaultColor(cell);
    } else if (setting === 'random') {
        applyRandomColor(cell);
    } else if (setting === 'darkening') {
        applyDarkening(cell);
    }
}

grid.addEventListener('click', event => {
    if (event.target.classList.contains('cell')) {
        penDown = !penDown;
        if (penDown) {
            paintCell(event.target);
        }
    }
});

grid.addEventListener('mouseover', event => {
    if (penDown && event.target.classList.contains('cell')) {
        paintCell(event.target);
    }
});

gridSizeBtn.addEventListener('click', () => {
    let gridSize = parseInt(prompt('Enter number of rows (1-150):'), 10);
    if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 150) {
        deleteGrid();
        createGrid(gridSize);
    }
});

settingsContainer.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        selectedBtn.classList.remove('highlight');
        event.target.classList.add('highlight')
        selectedBtn = event.target;
    }
});

clearBtn.addEventListener('click', () => {
    clearGrid();
});

createGrid(INITIAL_GRID_SIZE);