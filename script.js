const body = document.querySelector('body')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')

const ROWS = 10
const COLS = 10

const state = {
    snake: [[0, 0], [1, 0], [2, 0], [3, 0]],
    apple: [9, 0],
}

renderGameZone()

function renderGameZone() {
    for (let i = 0; i < ROWS; i++) {
        const row = document.createElement('tr')

        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('td')
            if (state.snake.some(coords => coords[0] == j && coords[1] == i)) {
                cell.classList.add('snake')
            } else if (state.apple[0] == j && state.apple[1] == i) {
                cell.classList.add('apple')
            }

            row.append(cell)
        }

        tbody.append(row)
    }

    table.append(tbody)
    body.append(table)
}

