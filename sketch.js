
let width
let height
let cellSize = 100
let cols
let rows
let cells

function setup()
{
    width = window.innerWidth - 20
    height = window.innerHeight - 20
    createCanvas(width, height)

    cols = floor(width / cellSize)
    rows = floor(height / cellSize)

    cells = []

    for(var j = 0; j < rows; j++)
    {
        row = []
        for(var i = 0; i < cols; i++)
        {
            if(random(100) < 10)
                row.push(1)
            else
                row.push(0)
        }
        cells.push(row)
    }
}

function calculateCells()
{
    let newCells = cells

    for(var j = 0; j < rows; j++)
    {
        for(var i = 0; i < cols; i++)
        {
            numNeighbours = calculateNeighbours(j, i)

            if(cells[j][i] == 1 && (numNeighbours < 2 || numNeighbours > 3))
                newCells[j][i] = 0
            else if(cells[j][i] == 0 && numNeighbours == 3)
                newCells[j][i] = 1
        }
    }

    cells = newCells
}

function calculateNeighbours(j, i)
{
    numNeighbours = 0

    for(var y = j - 1; y <= j + 1; y++)
    {
        for(var x = i - 1; x <= i + 1; x++)
        {
            if(y >= cols || y < 0 || x >= rows || x < 0)
                continue
            
            if(cells[y][x] == 1)
                numNeighbours++
        }
    }

    if(cells[j][i] == 1)
        numNeighbours--

    return numNeighbours
}

function draw()
{
    background(255)
    fill(0)
    rect(0, 0, cols * cellSize, rows * cellSize)

    for(var j = 0; j < rows; j++)
    {
        for(var i = 0; i < cols; i++)
        {
            if(cells[j][i] == 1)
            {
                fill(255, 255, 0)
                rect(i * cellSize, j * cellSize, i * cellSize + cellSize, j * cellSize + cellSize)
            }
        }
    }

    stroke(100)
    strokeWeight(0.5)

    for(var i = 0; i <= width; i += cellSize)
        line(i, 0, i, rows * cellSize)

    for(var i = 0; i <= height; i += cellSize)
        line(0, i, cols * cellSize, i)
    
    //calculateCells()
}