const fs = require('fs')
const path = require('path')
const {
    Async,
    omit,
    pick,
    resultToAsync,
    constant
} = require('crocks')
const {
    fork,
    parse
} = require('../helpers/index')

const readAsync = Async.fromNode(fs.readFile)
const writeAsync = Async.fromNode(fs.writeFile)

const URL_INPUT = path.resolve(__dirname, '../mock/config.json')
const URL_OUTPUT = path.resolve(__dirname, '../mock/output.json')

const m = readAsync(URL_INPUT, 'utf8')
    .chain(resultToAsync(parse)) // Async ( Result )
    .map(pick(['rainbow']))
    .chain(x =>
        writeAsync(URL_OUTPUT, JSON.stringify(x, null, 2))
        .map(constant(x))
    )

fork(m)