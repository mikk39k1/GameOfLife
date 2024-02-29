

document.addEventListener('DOMContentLoaded', () => {
    const gridElement = document.getElementById('grid');
    let grid, cols, rows;
    const cellSize = 20;

    function createGrid(width, height) {
        cols = width;
        rows = height;
        gridElement.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
        grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
        drawGrid();
    }

    function drawGrid() {
        gridElement.innerHTML = '';
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.style.backgroundColor = grid[x][y] ? 'black' : '#eee';
                cell.addEventListener('click', () => {
                    grid[x][y] = grid[x][y] ? 0 : 1;
                    drawGrid();
                });
                gridElement.appendChild(cell);
            }
        }
    }

    function updateGrid() {
        let newGrid = new Array(cols).fill(null).map(() => new Array(rows).fill(0));
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                let neighbors = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        let newX = x + dx, newY = y + dy;
                        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
                            neighbors += grid[newX][newY];
                        }
                    }
                }
                let alive = grid[x][y] === 1;
                if (alive && (neighbors < 2 || neighbors > 3)) newGrid[x][y] = 0;
                else if (!alive && neighbors === 3) newGrid[x][y] = 1;
                else newGrid[x][y] = grid[x][y];
            }
        }
        grid = newGrid;
        drawGrid();
    }

    document.getElementById('start').addEventListener('click', () => {
        setInterval(updateGrid, 250); // Update every 250ms
    });

    createGrid(20, 20); // Dette kan ændres til at starte med en anden størrelse
});


const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    location.reload();
});
