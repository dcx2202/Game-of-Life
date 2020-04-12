
let width
let height
let cellSize = 5
let cols
let rows
let cells

function setup()
{
    //frameRate(10)
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
    let newCells = []

    for(var j = 0; j < rows; j++)
    {
        row = []
        for(var i = 0; i < cols; i++)
            row.push(0)
            newCells.push(row)
    }

    for(var j = 0; j < rows; j++)
    {
        for(var i = 0; i < cols; i++)
        {
            numNeighbours = calculateNeighbours(j, i)

            if(cells[j][i] == 1 && (numNeighbours < 2 || numNeighbours > 3))
                newCells[j][i] = 0
            else if(cells[j][i] == 0 && numNeighbours == 3)
                newCells[j][i] = 1
            else
                newCells[j][i] = cells[j][i]
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
            if(y >= rows || y < 0 || x >= cols || x < 0)
                continue
            
            numNeighbours += cells[y][x]
        }
    }

    numNeighbours -= cells[j][i]

    return numNeighbours
}

function turnCellOn()
{
    x = floor((mouseX * cols) / width)
    y = floor((mouseY * rows) / height)

    cells[y][x] = 1
}

function mousePressed()
{
    turnCellOn()
}

function mouseDragged()
{
    turnCellOn()
}

function draw()
{
    background(255)
    fill(0)
    rect(0, 0, cols * cellSize, rows * cellSize)

    for(var j = 0; j < cells.length; j++)
    {
        for(var i = 0; i < cells[j].length; i++)
        {        
            if(cells[j][i] == 1)
            {
                fill(255, 255, 0)
                rect(i * cellSize, j * cellSize, cellSize, cellSize)
            }
        }
    }

    stroke(100)
    strokeWeight(0.5)

    for(var i = 0; i <= width; i += cellSize)
        line(i, 0, i, rows * cellSize)

    for(var i = 0; i <= height; i += cellSize)
        line(0, i, cols * cellSize, i)
    
    calculateCells()
}
