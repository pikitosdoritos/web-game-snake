const body = document.querySelector('body')
const table = document.querySelector('table')
const tbody = document.querySelector('tbody')

const ROWS = 10
const COLS = 10
const stepInterval = 500
const arrows = ['right', 'down', 'left', 'up']
const shifts = {
    right: [1, 0],
    down: [0, 1],
    left: [-1, 0],
    up: [0, -1]
}
const state = {
    snake: [[0, 0], [1, 0], [2, 0], [3, 0]],
    apple: [9, 0],
    direction: 'right',
}

onkeydown = handleKey
renderGameZone()

setInterval(() => {
    move(state.direction)
    renderGameZone()
}, stepInterval)

function placeNewApple() {
    const x = Math.floor(Math.random() * ROWS)
    const y = Math.floor(Math.random() * COLS)

    if (state.snake.some(coords => coords[0] == x && coords[1] == y)) {
        placeNewApple()
    } else {
        state.apple = [x, y]
    }
}

function move(key) {
    let head = state.snake.at(-1)
    const shift = shifts[key]

    head = [(head[0] + shift[0] + 10) % 10, (head[1] + shift[1] + 10) % 10]

    state.snake.push(head)

    if (head[0] != state.apple[0] || head[1] != state.apple[1]) {
        state.snake.shift()

    } else {
        placeNewApple()
    }

}

function opposite(direction) {
    if (direction == 'up') return 'down'
    if (direction == 'down') return 'up'
    if (direction == 'left') return 'right'
    if (direction == 'right') return 'left'
}

function isMovePossible(direction) {
    return direction != opposite(state.direction)
}

function handleKey(e) {
    const key = e.key.slice(5).toLowerCase()

    if (arrows.includes(key) && isMovePossible(key)) {
        state.direction = key

        move(key)
        renderGameZone()
    }
}

function renderGameZone() {
    tbody.innerHTML = ''

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