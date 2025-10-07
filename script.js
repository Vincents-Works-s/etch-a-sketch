const INITIAL_GRID_SIZE = 16;

const grid = document.querySelector('.grid');
const gridSizeBtn = document.querySelector('.grid-size-btn');

let penDown = false;

function createElement(tag, text = '') {
    const element = document.createElement(tag);
    if (text) {
        element.textContent = text;
    }
    return element;
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

function deleteGrid() {
    grid.replaceChildren();
}

grid.addEventListener('click', () => {
    penDown = !penDown;
});

grid.addEventListener('mousemove', event => {
    if (penDown && event.target.classList.contains('cell')) {
        event.target.style.backgroundColor = 'black';
    }
});

gridSizeBtn.addEventListener('click', () => {
    let gridSize = parseInt(prompt('Enter number of rows (1-150):'), 10);
    if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 150) {
        deleteGrid();
        createGrid(gridSize);
    }
});

createGrid(INITIAL_GRID_SIZE);