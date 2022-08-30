import { getRandomInt, rectangle } from "./game.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.addEventListener('click', event => mouseClick(event))

canvas.width = 500;
canvas.height = 500;
const numLine = 10
const numColum = 10

const cellSize = {
        Width: canvas.width / numLine,
        Height: canvas.height / numColum
}

let cells = []



function mouseClick(event) {
    let mouseX = event.layerX
    let mouseY = event.layerY
    let x = Math.floor(mouseX / cellSize.Width)
    let y = Math.floor(mouseY / cellSize.Height)
    let cell = cells[y][x]
    cell.alive = +!cell.alive
    render(cell)
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
                next: 0
                
            }
            line.push(cell)
        }
    }
}

function StartNeighbor() {
    cells.forEach((line, y) => {
        line.forEach((cell, x) => {
            cell.neighbors = []
            for(let dy = -1; dy <= 1; dy ++) {
                for(let dx = -1; dx <= 1; dx++) {
                    if(dx !== 0 || dy !== 0) {
                    let neigbourX = x + dx
                    let neigbourY = y + dy
                    if(neigbourX >= 0 && neigbourX < numLine && neigbourY >= 0 && neigbourY < numColum) {
                        let neigbourCell = cells[neigbourY][neigbourX]
                        cell.neighbors.push(neigbourCell)
                    }
                    }
                }
            }
        })
    })
}

function clearCells() {
    cells.forEach(line => {
        line.forEach(cell => {
            cell.alive = 0
        })
    })
}

function calculate() {
    cells.forEach(line => {
        line.forEach(cell => {
            let neigbourAlive =0
            cell.neighbors.forEach(nCell => {
                neigbourAlive += nCell.alive
            })
            if(cell.alive) cell.next = +(neigbourAlive >= 2 && neigbourAlive <= 3)
            else cell.next = +(neigbourAlive == 3)
        })
    })
}

function update() {
    cells.forEach(line => {
      line.forEach(cell => {
        cell.alive = cell.next
      })
    })
  }

function render() {
    cells.forEach(line => {
        line.forEach(cell => {
            renderCell(cell)
        })
    })
}
function renderCell(cell) {
    rectangle(ctx, cell.x, cell.y, cellSize.Width, cellSize.Height, 'black', 'white' )
    if (cell.alive) {
        rectangle(ctx, cell.x, cell.y, cellSize.Width, cellSize.Height, 'black', 'green')
    }
}



let IdAnimation
function executeGame() {
    execute()
    IdAnimation = requestAnimationFrame(executeGame)
}

function execute() {
    calculate()
    update()
    render()
}

//inicio
starCells()
StartNeighbor()
requestAnimationFrame(executeGame)

let btStart = document.getElementById("start")
btStart.onclick = () => {
  if(!IdAnimation) IdAnimation = requestAnimationFrame(executeGame)
}

let btStop = document.getElementById("stop")
btStop.onclick = () => {
  if(IdAnimation) cancelAnimationFrame(IdAnimation)
  IdAnimation = 0
}

let btClear = document.getElementById("clear")
btClear.onclick = () => {
  if(IdAnimation) cancelAnimationFrame(IdAnimation)
  IdAnimation = 0
  clearCells()
  render()
}

render()