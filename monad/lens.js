const R = require('ramda')

const game = {
    name: 'Keep Talking and Nobody Explodes',
    genres: ['Puzzle', 'VR'],
    publisher: {
        name: 'Steel Crate Games',
        location: 'Ottawa, Canada'
    }
}

const name = R.lensProp('name')
const genre = R.lensPath(['genres', 0])
const puzzle = R.lensIndex(0)
const nameLens = R.lens(R.prop('name'), R.assoc('name'))
const makeUpper = a => a.toUpperCase()

console.log(
    game
)
console.log(
    R.view(name, game)
)
console.log(
    R.set(name, 'Name is modified!', game)
)
console.log(
    R.over(name, makeUpper, game)
)
console.log(
    R.view(genre, game)
)
console.log(
    R.view(puzzle, game.genres)
)
console.log(
    R.view(nameLens, game)
)
console.log(
    R.set(nameLens, 'Awesome!', game)
)

const people = [{
    name: 'Terry',
    cats: ['Korin', 'Sweep', 'Caterina']
}, {
    name: 'Trevor',
    cats: ['Jazz']
}]

const cats = R.lensProp('cats')
const uppercaseCats = R.map(R.over(cats, R.map(R.toUpper)))

console.log(
    uppercaseCats(people)
)

const person = {
    name: 'Terry',
    cats: [{
        name: 'Korin',
        age: 4
    }, {
        name: 'Sweep',
        age: 3
    }, {
        name: 'Catarina',
        age: 2
    }]
}

const doubleAge = R.over(R.lensProp('cats'), R.map(R.over(R.lensProp('age'), R.multiply(2))))

console.log(
    doubleAge(person)
)

// Composing Modifications
const nameB = R.lensProp('name')
const genreFirst = R.lensPath(['genres', 0])

console.log(
    R.compose(
        R.over(nameB, R.toUpper),
        R.set(genreFirst, 'Hola')
    )(game)
)

//  Composing Lenses
const enabledLens = R.lensPath(['enabled'])

const sshServiceLens = R.lensPath(['sshService'])
const sshServiceEnabledLens = R.compose(sshServiceLens, enabledLens)

const telnetServiceLens = R.lensPath(['telentService'])
const telnetServiceEnabledLens = R.compose(telnetServiceLens, enabledLens)

// Usage
// -----

const services = {
    sshService: {
        enabled: true
    },
    telnetService: {
        enabled: false
    },
}

console.assert(R.view(sshServiceEnabledLens, services) === true)
console.assert(R.view(telnetServiceEnabledLens, services) === false)