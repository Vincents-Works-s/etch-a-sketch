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

createGrid(100);

grid.addEventListener('click', () => {
    penDown = !penDown;
});

grid.addEventListener('mousemove', event => {
    if (penDown && !event.target.classList.contains('grid')) {
        console.log(event.target.classList);
        event.target.style.backgroundColor = 'black';
    }
});

gridSizeBtn.addEventListener('click', () => {
    deleteGrid();
    createGrid(prompt());
});