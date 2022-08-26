
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID_WIDTH = 500;
const GRID_HEIGHT = 500;
canvas.width = GRID_WIDTH;
canvas.height = GRID_HEIGHT;

const numLine = 10
const numColum = 10

let cells = []

const cellSize = {
        Width: canvas.width / numLine,
        Height: canvas.height / numColum
}


function starCells() {
    for(let y = 0; y < numLine; y++){
        let line = []
        cells.push(line)

        for(let x = 0; x < numColum; x++) {
            let cell = {
                alive: getRandomInt(0, 2),
                x: x * cellSize.Width,
                y: y * cellSize.Height,
                
            }
            line.push(cell)
        }
    }
}

function render() {
    cells.forEach(line => {
        line.forEach(cell => {
            renderCell(cell)
        })
    })
}
function renderCell(cell) {
    rectangle(cell.x, cell.y, cellSize.Width, cellSize.Height, 'black', 'white' )
    if (cell.alive) {
        rectangle(cell.x, cell.y, cellSize.Width, cellSize.Height, 'black', 'green')
    }
}

function rectangle(x, y, larg, alt, corBorda, corInterna) {
    ctx.fillStyle = corInterna
    ctx.strokeStyle = corBorda
    if(corInterna) ctx.fillRect(x, y, larg, alt)
    if(corBorda) ctx.strokeRect(x, y, larg, alt)
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function gameOflife(numLine, numColum) {
    starCells()
    render()
}

gameOflife()